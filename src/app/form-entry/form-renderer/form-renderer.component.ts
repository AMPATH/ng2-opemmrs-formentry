import {
  Component, OnInit, Input, Inject
} from '@angular/core';
import '../../../style/app.css';
import 'hammerjs';
import { DEFAULT_STYLES } from './form-renderer.component.css';
import { DOCUMENT } from '@angular/platform-browser';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase, LeafNode } from '../form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { ValidationFactory } from '../form-factory/validation.factory';
import { DataSource } from '../question-models/interfaces/data-source';
import { FormErrorsService } from '../services';
import { QuestionGroup } from '../question-models/group-question';
import * as moment from 'moment';

@Component({
  selector: 'form-renderer',
  templateUrl: 'form-renderer.component.html',
  styles: [DEFAULT_STYLES]
})
export class FormRendererComponent implements OnInit {

  @Input() parentComponent: FormRendererComponent;
  @Input() node: NodeBase;
  @Input() parentGroup: AfeFormGroup;
  childComponents: FormRendererComponent[] = [];
  showTime: boolean;
  showWeeks: boolean;
  activeTab: number;
  showAppointments: boolean = false;
  loadingAppointments: boolean = false;
  errorLoadingAppointments: boolean = false;
  appointmentsLoaded: boolean = false;
  appointments: Array<any> = [];
  today: string = '';
  dataSource: DataSource;
  public isCollapsed: boolean = false;

  constructor(private validationFactory: ValidationFactory,
              private dataSources: DataSources, private formErrorsService: FormErrorsService,
              @Inject(DOCUMENT) private document: Document) {
    this.activeTab = 0;
  }

  ngOnInit() {
    this.setUpRemoteSelect();
    if (this.node && this.node.form) {
      let tab = this.node.form.valueProcessingInfo.lastFormTab;
      if (tab && tab !== this.activeTab) {
        this.activeTab = tab;
      }
    }
    if (this.node && this.node.question.renderingType === 'form') {
      this.formErrorsService.announceErrorField$.subscribe(
        error => {
          this.scrollToControl(error);
        });
    }

    if (this.node && this.node.question.renderingType === 'section') {
       this.isCollapsed = !(this.node.question as QuestionGroup).isExpanded;
    }

    if (this.parentComponent) {
      this.parentComponent.addChildComponent(this);
    }
  }

  addChildComponent(child: FormRendererComponent) {
    this.childComponents.push(child);
  }

  setUpRemoteSelect() {
    if (this.node && this.node.question.extras && this.node.question.renderingType === 'remote-select') {
      this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
      if (this.dataSource && this.node.question.dataSourceOptions) {
        this.dataSource.dataSourceOptions = this.node.question.dataSourceOptions;
      }
    }
  }


  clickTab(tabNumber) {
    this.activeTab = tabNumber;
  }

  loadPreviousTab() {
    if (!this.isCurrentTabFirst()) {
      this.clickTab(this.activeTab - 1);
      document.body.scrollTop = 0;
    }
  }

  isCurrentTabFirst() {
    return this.activeTab === 0;
  }

  isCurrentTabLast() {
    return this.activeTab === this.node.question['questions'].length - 1;
  }

  loadNextTab() {
    if (!this.isCurrentTabLast()) {
      this.clickTab(this.activeTab + 1);
      document.body.scrollTop = 0;
    }
  }
  tabSelected($event) {
    this.activeTab = $event.index;
    this.setPreviousTab();
  }
  setPreviousTab() {
    if (this.node && this.node.form) {
      this.node.form.valueProcessingInfo['lastFormTab'] = this.activeTab;
    }

  }
  hasErrors() {
    return this.node.control.touched && !this.node.control.valid;
  }

  errors() {
    return this.getErrors(this.node);
  }

  private getErrors(node: NodeBase) {
    let errors: any = node.control.errors;

    if (errors) {

      return this.validationFactory.errors(errors, node.question);
    }

    return [];
  }

  scrollToControl(error: string) {

    let tab: number = +error.split(',')[0];
    let elSelector = error.split(',')[1] + 'id';

    // the tab components
    let tabComponent: FormRendererComponent = this.childComponents[tab];

    this.clickTab(tab);

    setTimeout(() => {

      // expand all sections
      tabComponent.childComponents.forEach(section => {
        section.isCollapsed = false;

        setTimeout(() => {
          let element: any = this.document.getElementById(elSelector);
          element.focus();
        }, 200);
      });

    }, 200);
  }

  onDateChanged(node: LeafNode) {
    this.resetProperties();
    if (node.question.extras.questionOptions.concept
      && (node.question.extras.questionOptions.concept === 'a8a666ba-1350-11df-a1f1-0026b9348838'
      || node.question.extras.questionOptions.concept === 'a89d2398-1350-11df-a1f1-0026b9348838')) {
      node.control.valueChanges.subscribe((v) => {
        if (!this.showAppointments) {
          this.loadingAppointments = true;
          this.showAppointments = true;
          let dataSource;
          if (node.form && node.form.dataSourcesContainer.dataSources) {
            dataSource = node.form.dataSourcesContainer.dataSources.monthlyScheduleResourceService;
          }
          let locationUuid = node.form.dataSourcesContainer.dataSources.userLocation.uuid;
          if (dataSource && locationUuid) {
            let startDate = moment(v).startOf('week').add(1, 'day').format('YYYY-MM-DD');
            let endDate = moment(v).endOf('week').subtract(1, 'day').format('YYYY-MM-DD');
            this.today = moment(v).format('DD-MM-YYYY');
            // create 5 week days
            let _data = [];
            for (let i = 1; i <= 5; i++) {
              _data.push({
                date: moment(v).startOf('week').add(i, 'day').format('DD-MM-YYYY'),
                count: 0
              });
            }
            dataSource.getMonthlySchedule({
              startDate: startDate,
              endDate: endDate,
              limit: 5,
              locationUuids: locationUuid
            }).subscribe((data) => {
              this.appointmentsLoaded = true;
              this.loadingAppointments = false;
              _data.map((appointment, index) => {
                appointment.count = data[index] !== undefined ? data[index].count.scheduled : 0;
              });
              this.appointments = _data;
            }, (error) => {
              this.loadingAppointments = false;
              this.errorLoadingAppointments = true;
              this.showAppointments = false;
              console.error(error);
            });
          } else {
            this.showAppointments = false;
            this.errorLoadingAppointments = true;
          }
        }
      });
    }
  }

  resetProperties() {
    this.loadingAppointments = false;
    this.appointmentsLoaded = false;
    this.errorLoadingAppointments = false;
    this.showAppointments = false;
    this.appointments = [];
    this.today = '';
  }
}
