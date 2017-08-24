import {
  Component, OnInit, Input, Inject
} from '@angular/core';
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

@Component({
  selector: 'form-renderer',
  templateUrl: 'form-renderer.component.html',
  styles: ['../../style/app.css', DEFAULT_STYLES]
})
export class FormRendererComponent implements OnInit {

  @Input() public parentComponent: FormRendererComponent;
  @Input() public node: NodeBase;
  @Input() public parentGroup: AfeFormGroup;
  public childComponents: FormRendererComponent[] = [];
  public showTime: boolean;
  public showWeeks: boolean;
  public activeTab: number;
  public dataSource: DataSource;
  public isCollapsed: boolean = false;

  constructor(
  private validationFactory: ValidationFactory,
  private dataSources: DataSources,
  private formErrorsService: FormErrorsService,
  @Inject(DOCUMENT) private document: any) {
    this.activeTab = 0;
  }

  public ngOnInit() {
    this.setUpRemoteSelect();
    this.setUpFileUpload();
    if (this.node && this.node.form) {
      const tab = this.node.form.valueProcessingInfo.lastFormTab;
      if (tab && tab !== this.activeTab) {
        this.activeTab = tab;
      }
    }
    if (this.node && this.node.question.renderingType === 'form') {
      this.formErrorsService.announceErrorField$.subscribe(
        (error) => {
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

  public addChildComponent(child: FormRendererComponent) {
    this.childComponents.push(child);
  }

  public setUpRemoteSelect() {
    if (this.node && this.node.question.extras &&
    this.node.question.renderingType === 'remote-select') {
      this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
      if (this.dataSource && this.node.question.dataSourceOptions) {
        this.dataSource.dataSourceOptions = this.node.question.dataSourceOptions;
      }
    }
  }

  public setUpFileUpload() {
    if (this.node && this.node.question.extras && this.node.question.renderingType === 'file') {
      this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
      console.log('Key', this.node.question);
      console.log('Data source', this.dataSource);
    }

  }


 public clickTab(tabNumber) {
    this.activeTab = tabNumber;
  }

  public loadPreviousTab() {
    if (!this.isCurrentTabFirst()) {
      this.clickTab(this.activeTab - 1);
      document.body.scrollTop = 0;
    }
  }

  public  isCurrentTabFirst() {
    return this.activeTab === 0;
  }

  public  isCurrentTabLast() {
    return this.activeTab === this.node.question['questions'].length - 1;
  }

  public  loadNextTab() {
    if (!this.isCurrentTabLast()) {
      this.clickTab(this.activeTab + 1);
      document.body.scrollTop = 0;
    }
  }
  public  tabSelected($event) {
    this.activeTab = $event.index;
    this.setPreviousTab();
  }
  public  setPreviousTab() {
    if (this.node && this.node.form) {
      this.node.form.valueProcessingInfo['lastFormTab'] = this.activeTab;
    }

  }
 public   hasErrors() {
    return this.node.control.touched && !this.node.control.valid;
  }

  public  errors() {
    return this.getErrors(this.node);
  }


  public scrollToControl(error: string) {

    const tab: number = +error.split(',')[0];
    const elSelector = error.split(',')[1] + 'id';

    // the tab components
    const tabComponent: FormRendererComponent = this.childComponents[tab];

    this.clickTab(tab);

    setTimeout(() => {

      // expand all sections
      tabComponent.childComponents.forEach((section) => {
        section.isCollapsed = false;

        setTimeout(() => {
          const element: any = this.document.getElementById(elSelector);
          element.focus();
        }, 200);
      });

    }, 200);
  }

  public onDateChanged(node: LeafNode) {
    this.node = node;
  }

  public upload(event) {
    console.log('Event', event);
    console.log('Data', this.dataSource);
  }

  public toggleInformation(infoId) {
    const e = document.getElementById(infoId);

    if (e.style.display == 'block') {
        e.style.display = 'none';
     } else {
        e.style.display = 'block';
     }
 

    console.log('InfoId', infoId);
  }


   private getErrors(node: NodeBase) {
    const errors: any = node.control.errors;

    if (errors) {

      return this.validationFactory.errors(errors, node.question);
    }

    return [];
  }
}
