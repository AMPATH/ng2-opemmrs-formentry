import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/Rx';
import { Option } from '../form-entry/question-models/select-option';
var AfeNgSelectComponent = /** @class */ (function () {
    function AfeNgSelectComponent() {
        this.question_options = [];
        this.errors = [];
        this.propagateChange = function (_) { };
    }
    AfeNgSelectComponent.prototype.getChangingText = function (event) {
        var _this = this;
        // console.log(event);
        this.getData(event).subscribe(function (options) {
            _this.question_options = options;
        });
    };
    AfeNgSelectComponent.prototype.writeValue = function (obj) {
    };
    AfeNgSelectComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    AfeNgSelectComponent.prototype.registerOnTouched = function (fn) { };
    AfeNgSelectComponent.prototype.ngOnChanges = function (changes) { };
    AfeNgSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.extras) {
            if (this.extras.originalValue) {
                this.resolveSelectedOption(this.extras.originalValue).subscribe(function (option) {
                    _this.selected_question_option = option;
                });
            }
        }
    };
    AfeNgSelectComponent.prototype.getData = function (searchText) {
        var _this = this;
        this.subject = new BehaviorSubject([]);
        var OptionsObservable = this.dataSource.searchOptions(searchText);
        OptionsObservable.subscribe(function (options) {
            console.log('options', options);
            var mappedOptions = new Array();
            for (var i = 0; i < options.length; i++) {
                mappedOptions.push(new Option(options[i]));
            }
            _this.subject.next(mappedOptions);
        }, function (error) {
            _this.subject.error(error);
        });
        return this.subject.asObservable();
    };
    AfeNgSelectComponent.prototype.onValueChange = function (event) { };
    AfeNgSelectComponent.prototype.resolveSelectedOption = function (value) {
        var _this = this;
        this.subjectOption = new BehaviorSubject(null);
        var OptionObservable = this.dataSource.resolveSelectedValue(value);
        OptionObservable.subscribe(function (option) {
            console.log('option', option);
            _this.subjectOption.next(option);
        }, function (error) {
            _this.subjectOption.error(error);
        });
        return this.subjectOption.asObservable();
    };
    AfeNgSelectComponent.prototype.resetOptions = function () {
        this.subject.next(new Array());
    };
    AfeNgSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'afe-ng-select',
                    template: "<ng-select\n                   (searchInputText)=\"getChangingText($event)\"\n                    (ngModelChange)=\"onValueChange($event)\"\n                    [options]=\"question_options\"\n                    [multiple]=\"multiple\" >\n            </ng-select>\n  ",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return AfeNgSelectComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    AfeNgSelectComponent.ctorParameters = function () { return []; };
    AfeNgSelectComponent.propDecorators = {
        'dataSource': [{ type: Input },],
        'multiple': [{ type: Input },],
        'extras': [{ type: Input },],
    };
    return AfeNgSelectComponent;
}());
export { AfeNgSelectComponent };
//# sourceMappingURL=afe-ng-select.component.js.map