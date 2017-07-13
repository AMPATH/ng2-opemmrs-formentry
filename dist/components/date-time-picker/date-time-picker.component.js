import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Moment from 'moment';
var DateTimePickerComponent = (function () {
    function DateTimePickerComponent() {
        this.showDate = true;
        this.showTime = false;
        this.showWeeks = false;
        this.weeks = [2, 4, 6, 8, 12, 16, 24];
        this.onDateChange = new EventEmitter();
        this.showDatePicker = false;
        this.showTimePicker = false;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    DateTimePickerComponent.prototype.ngOnInit = function () { };
    DateTimePickerComponent.prototype.weeksSelected = function (count) {
        var now = new Date();
        var nextDate = now.setDate(now.getDate() + count * 7);
        this.value = Moment(nextDate).format();
    };
    DateTimePickerComponent.prototype.setDate = function (date) {
        if (date && date !== '') {
            this.value = Moment(date).format();
        }
        else {
            this.value = date;
        }
    };
    DateTimePickerComponent.prototype.setTime = function (time) {
        if (time && time !== '') {
            this.value = Moment(time).format();
        }
        else {
            this.value = time;
        }
        return;
    };
    DateTimePickerComponent.prototype.toggleDatePicker = function (status) {
        this.showDatePicker = status;
        setTimeout(function () {
            var _body = document.getElementById('section-box-body').getBoundingClientRect(), elem = document.getElementById('section-modal-main');
            if (elem) {
                var elemBox = elem.getBoundingClientRect();
                if (elemBox.bottom > _body.bottom) {
                    elem.style.bottom = '36px';
                }
            }
        }, 0);
        return;
    };
    DateTimePickerComponent.prototype.toggleTimePicker = function (status) {
        this.showTimePicker = status;
        return;
    };
    Object.defineProperty(DateTimePickerComponent.prototype, "value", {
        get: function () {
            return this.modelValue;
        },
        set: function (val) {
            this.modelValue = val;
            this.onDateChange.emit(val);
            this.onChange(val);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    DateTimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DateTimePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    DateTimePickerComponent.prototype.writeValue = function (value) {
        if (value instanceof Date) {
            this.value = Moment(value).format();
        }
        else {
            this.value = value;
        }
    };
    DateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'date-time-picker',
                    template: './date-time-picker.component.html',
                    styles: ['./date-time-picker.component.css'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return DateTimePickerComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    DateTimePickerComponent.ctorParameters = function () { return []; };
    DateTimePickerComponent.propDecorators = {
        'modelValue': [{ type: Input },],
        'showDate': [{ type: Input },],
        'showTime': [{ type: Input },],
        'showWeeks': [{ type: Input },],
        'weeks': [{ type: Input },],
        'onDateChange': [{ type: Output },],
    };
    return DateTimePickerComponent;
}());
export { DateTimePickerComponent };
//# sourceMappingURL=date-time-picker.component.js.map