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
        /*setTimeout(function() {
          let _body = document.getElementById('content-wrapper').getBoundingClientRect(),
            elem = document.getElementById('section-modal-main');
          if (elem) {
            let elemBox = elem.getBoundingClientRect();
            if (elemBox.bottom > _body.bottom) {
              elem.style.bottom = '36px';
            }
          }
        }, 0);*/
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
    return DateTimePickerComponent;
}());
export { DateTimePickerComponent };
DateTimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'date-time-picker',
                template: "\n      <div class='row'>\n          <div *ngIf=\"!showTime\" class='col-xs-12 col-md-12'>\n              <input *ngIf=\"!showWeeks\" type=\"text\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n                  readonly placeholder=\"Select Date\" />\n              <div *ngIf=\"showWeeks\" class=\"input-group\">\n                  <input type=\"text\" class=\"form-control\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n                      readonly placeholder=\"Select Date\">\n                  <div class=\"input-group-btn\">\n                      <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Weeks <span class=\"caret\"></span></button>\n                      <ul class=\"dropdown-menu up\">\n                          <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\"><span> {{count}} Weeks</span></li>\n                      </ul>\n                  </div>\n              </div>\n          </div>\n          <div *ngIf=\"showTime\" class='col-xs-8 col-md-8'>\n              <input *ngIf=\"!showWeeks\" type=\"text\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n                  readonly placeholder=\"Select Date\" />\n              <div *ngIf=\"showWeeks\" class=\"input-group\">\n                  <input type=\"text\" class=\"form-control\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n                      readonly placeholder=\"Select Date\">\n                  <div class=\"input-group-btn\">\n                      <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Weeks <span class=\"caret\"></span></button>\n                      <ul class=\"dropdown-menu up\">\n                          <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\"><span> {{count}} Weeks</span></li>\n                      </ul>\n                  </div>\n              </div>\n          </div>\n          <div *ngIf=\"showTime\" class='col-xs-4 col-md-4'>\n              <input type=\"text\" class=\"form-control\" [value]=\"value | date: 'shortTime'\" (focus)=\"toggleTimePicker(true)\" readonly placeholder=\"Select Time\"\n              />\n          </div>\n      </div>\n      <date-picker *ngIf=\"showDatePicker\" [initDate]=\"value\" (onSelectDate)=\"setDate($event)\" (onDatePickerCancel)=\"toggleDatePicker($event)\"></date-picker>\n\n      <time-picker *ngIf=\"showTimePicker\" [initTime]=\"value\" [use12Hour]=\"true\" (onSelectTime)=\"setTime($event)\" (onTimePickerCancel)=\"toggleTimePicker($event)\"></time-picker>\n    ",
                styles: ["\n      input[readonly]{background-color:#fff}.up{bottom:100% !important;top:auto !important}.glyphicon{top:1px}\n    "],
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
//# sourceMappingURL=date-time-picker.component.js.map