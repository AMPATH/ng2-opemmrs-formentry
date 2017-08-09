import { Component, OnInit, Input, forwardRef, ViewChild, Output, EventEmitter, Renderer } from '@angular/core';
import { SelectComponent } from '../../components/select/select.component';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
import * as _ from 'lodash';
@Component({
    selector: 'remote-select',
    templateUrl: 'remote-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RemoteSelectComponent),
            multi: true,
        }]
})
export class RemoteSelectComponent implements OnInit, ControlValueAccessor {
    // @Input() dataSource: DataSource;
    @Input() placeholder: string = 'Search...';
    @Input() componentID: string;
    items = [];
    value = [];
    loading = false;
    searchText: string = '';
    notFoundMsg = 'match no found';
    @Output() done: EventEmitter<any> = new EventEmitter<any>();

    characters = [];
    @ViewChild(SelectComponent) private selectC: SelectComponent;


    private _dataSource: DataSource;
    @Input()
    public get dataSource(): DataSource {
        return this._dataSource;
    }
    public set dataSource(v: DataSource) {
        this._dataSource = v;
        if (this._dataSource && this._dataSource.dataFromSourceChanged) {
            this.subscribeToDataSourceDataChanges();
        }
    }


    constructor(private renderer: Renderer) { }

    ngOnInit() {

    }

    subscribeToDataSourceDataChanges() {
        this._dataSource.dataFromSourceChanged.subscribe((results) => {
            if (results.length > 0) {
                this.items = results;
                this.notFoundMsg = '';
                // console.log('updating items', results, this.selectC.value);
                this.restoreSelectedValue(this.selectC.value, results);
            } else {
                this.notFoundMsg = 'Not found';
                this.items = [];
            }
        });
    }

    public typed(value: any): void {
        this.search(value);
    }
    search(value: string) {
        if (this.dataSource) {
            this.searchText = value;
            this.notFoundMsg = 'Loading.........';
            this.dataSource.searchOptions(value)
                .subscribe((result) => {
                    if (result.length > 0) {
                        let existing = _.map(this.value, _.clone);
                        let concat = existing.concat(result);
                        this.items = _.uniqBy(concat, 'value');
                    }
                    this.notFoundMsg = '';
                }, (error) => {
                    this.notFoundMsg = 'Errored';
                });
        }
    }

    restoreSelectedValue(value, results) {
        let found = false;
        _.each(results, (item) => {
            if (item.value === value) {
                setTimeout(() => {
                    this.selectC.select(value);
                    this.selectC.value = value;
                });
                found = true;
            }
        });
        if (!found) {
            // console.log('not found after loading items', value, results);
            setTimeout(() => {
                this.selectC.select('');
                this.selectC.value = '';
            });
        }
    }

    canSearch(searchText: string) {
        return (searchText.length - this.searchText.length >= 3 ||
            (searchText.length - this.searchText.length <= 3 && searchText !== '')) && this.loading === false;
    }

    // this is the initial value set to the component
    public writeValue(value: any) {
        if (value && value !== '') {
            if (this.dataSource) {
                this.loading = true;
                this.dataSource.resolveSelectedValue(value).subscribe((result: any) => {
                    this.items = [result];
                    setTimeout(() => {
                        this.selectC.select(result.value);
                        this.selectC.value = result.value;
                    });
                    this.loading = false;
                }, (error) => {
                    this.loading = false;
                });
            }
        }
    }
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    // not used, used for touch input
    public registerOnTouched() { }
    // change events from the textarea
    onChange(event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    }
    removed(event) {
        console.log('Removed');
        this.propagateChange('');
    }
    selected(event) {
        this.propagateChange(event.value);
    }

    // the method set in registerOnChange, it is just
    // a placeholder for a method that takes one parameter,
    // we use it to emit changes back to the form
    private propagateChange = (_: any) => { };
}
