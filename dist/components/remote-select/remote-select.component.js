import { Component, Input, forwardRef, ViewChild, Output, EventEmitter, Renderer } from '@angular/core';
import { SelectComponent } from '../../components/select/select.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
var RemoteSelectComponent = /** @class */ (function () {
    function RemoteSelectComponent(renderer) {
        this.renderer = renderer;
        // @Input() dataSource: DataSource;
        this.placeholder = 'Search...';
        this.items = [];
        this.value = [];
        this.loading = false;
        this.searchText = '';
        this.notFoundMsg = 'match no found';
        this.done = new EventEmitter();
        this.characters = [];
        // the method set in registerOnChange, it is just
        // a placeholder for a method that takes one parameter,
        // we use it to emit changes back to the form
        this.propagateChange = function (_) { };
    }
    Object.defineProperty(RemoteSelectComponent.prototype, "dataSource", {
        get: function () {
            return this._dataSource;
        },
        set: function (v) {
            this._dataSource = v;
            if (this._dataSource && this._dataSource.dataFromSourceChanged) {
                this.subscribeToDataSourceDataChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    RemoteSelectComponent.prototype.ngOnInit = function () {
    };
    RemoteSelectComponent.prototype.subscribeToDataSourceDataChanges = function () {
        var _this = this;
        this._dataSource.dataFromSourceChanged.subscribe(function (results) {
            if (results.length > 0) {
                _this.items = results;
                _this.notFoundMsg = '';
                // console.log('updating items', results, this.selectC.value);
                _this.restoreSelectedValue(_this.selectC.value, results);
            }
            else {
                _this.notFoundMsg = 'Not found';
                _this.items = [];
            }
        });
    };
    RemoteSelectComponent.prototype.typed = function (value) {
        this.search(value);
    };
    RemoteSelectComponent.prototype.search = function (value) {
        var _this = this;
        if (this.dataSource) {
            this.searchText = value;
            this.notFoundMsg = 'Loading.........';
            this.dataSource.searchOptions(value)
                .subscribe(function (result) {
                if (result.length > 0) {
                    var existing = _.map(_this.value, _.clone);
                    var concat = existing.concat(result);
                    _this.items = _.uniqBy(concat, 'value');
                }
                _this.notFoundMsg = '';
            }, function (error) {
                _this.notFoundMsg = 'Errored';
            });
        }
    };
    RemoteSelectComponent.prototype.restoreSelectedValue = function (value, results) {
        var _this = this;
        var found = false;
        _.each(results, function (item) {
            if (item.value === value) {
                setTimeout(function () {
                    _this.selectC.select(value);
                    _this.selectC.value = value;
                });
                found = true;
            }
        });
        if (!found) {
            // console.log('not found after loading items', value, results);
            setTimeout(function () {
                _this.selectC.select('');
                _this.selectC.value = '';
            });
        }
    };
    RemoteSelectComponent.prototype.canSearch = function (searchText) {
        return (searchText.length - this.searchText.length >= 2 ||
            (searchText.length - this.searchText.length <= 2 && searchText !== '')) && this.loading === false;
    };
    // this is the initial value set to the component
    RemoteSelectComponent.prototype.writeValue = function (value) {
        var _this = this;
        if (value && value !== '') {
            if (this.dataSource) {
                this.loading = true;
                this.dataSource.resolveSelectedValue(value).subscribe(function (result) {
                    _this.items = [result];
                    setTimeout(function () {
                        _this.selectC.select(result.value);
                        _this.selectC.value = result.value;
                    });
                    _this.loading = false;
                }, function (error) {
                    _this.loading = false;
                });
            }
        }
    };
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    RemoteSelectComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // not used, used for touch input
    RemoteSelectComponent.prototype.registerOnTouched = function () { };
    // change events from the textarea
    RemoteSelectComponent.prototype.onChange = function (event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    };
    RemoteSelectComponent.prototype.removed = function (event) {
        console.log('Removed');
        this.propagateChange('');
    };
    RemoteSelectComponent.prototype.selected = function (event) {
        this.propagateChange(event.value);
    };
    RemoteSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'remote-select',
                    template: "\n      <div>\n          <ng-select [id]=\"componentID\" [noFilter]=\"0\" (selected)=\"selected($event)\" (deselected)=\"removed($event)\" [options]=\"items\" [allowClear]=\"true\"\n              [placeholder]=\"placeholder\" [notFoundMsg]=\"notFoundMsg\" (typed)=\"typed($event)\" tabindex=\"0\">\n          </ng-select>\n          <div *ngIf=\"loading\">\n              resolving....\n          </div>\n      </div>\n    ",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return RemoteSelectComponent; }),
                            multi: true,
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    RemoteSelectComponent.ctorParameters = function () { return [
        { type: Renderer, },
    ]; };
    RemoteSelectComponent.propDecorators = {
        'placeholder': [{ type: Input },],
        'componentID': [{ type: Input },],
        'done': [{ type: Output },],
        'selectC': [{ type: ViewChild, args: [SelectComponent,] },],
        'dataSource': [{ type: Input },],
    };
    return RemoteSelectComponent;
}());
export { RemoteSelectComponent };
//# sourceMappingURL=remote-select.component.js.map