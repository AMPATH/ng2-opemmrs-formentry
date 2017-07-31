/**
 * time-picker.component
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment/moment';
// const myDpStyles: string = require('./time-picker.component.css');
// const myDpTpl: string = require('./time-picker.component.html');
// webpack2_
var TimePickerComponent = (function () {
    function TimePickerComponent() {
        this.showSecond = true;
        this.viewFormat = 'hh:mm A';
        this.use12Hour = false;
        this.returnObject = 'js';
        this.onSelectTime = new EventEmitter();
        this.onTimePickerCancel = new EventEmitter();
        this.hourFormat = 'HH';
    }
    TimePickerComponent.prototype.ngOnInit = function () {
        if (this.use12Hour) {
            this.hourFormat = 'hh';
        }
        this.time = this.initTime ? moment(this.initTime, this.viewFormat) : moment();
        // check if the input initDate has value
        if (this.initTime) {
            this.time = this.returnObject === 'string' ? moment(this.initTime, this.viewFormat) :
                moment(this.initTime);
        }
        else {
            this.time = moment();
        }
    };
    TimePickerComponent.prototype.increaseHour = function () {
        this.time = this.time.clone().add(1, 'h');
    };
    TimePickerComponent.prototype.decreaseHour = function () {
        this.time = this.time.clone().subtract(1, 'h');
    };
    TimePickerComponent.prototype.increaseMinute = function () {
        this.time = this.time.clone().add(1, 'm');
    };
    TimePickerComponent.prototype.decreaseMinute = function () {
        this.time = this.time.clone().subtract(1, 'm');
    };
    TimePickerComponent.prototype.increaseSecond = function () {
        this.time = this.time.clone().add(1, 's');
    };
    TimePickerComponent.prototype.decreaseSecond = function () {
        this.time = this.time.clone().subtract(1, 's');
    };
    TimePickerComponent.prototype.selectTime = function () {
        var selectTime = this.parseToReturnObjectType(this.time);
        this.onSelectTime.emit(selectTime);
        this.cancelTimePicker();
        return;
    };
    TimePickerComponent.prototype.selectNow = function () {
        var selectTime = this.parseToReturnObjectType(moment());
        this.onSelectTime.emit(selectTime);
        this.cancelTimePicker();
        return;
    };
    TimePickerComponent.prototype.clearTime = function () {
        this.onSelectTime.emit(null);
        this.cancelTimePicker();
        return;
    };
    TimePickerComponent.prototype.cancelTimePicker = function () {
        this.onTimePickerCancel.emit(false);
        return;
    };
    TimePickerComponent.prototype.parseToReturnObjectType = function (time) {
        switch (this.returnObject) {
            case 'js':
                return time.toDate();
            case 'string':
                return time.format(this.viewFormat);
            case 'moment':
                return time;
            case 'json':
                return time.toJSON();
            case 'array':
                return time.toArray();
            case 'iso':
                return time.toISOString();
            case 'object':
                return time.toObject();
            default:
                return time;
        }
    };
    return TimePickerComponent;
}());
export { TimePickerComponent };
TimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'time-picker',
                template: "\n      <picker-modal (onOverlayClick)=\"cancelTimePicker()\">\n          <div class=\"picker-wrap\">\n              <div class=\"picker-box\">\n                  <div class=\"picker-header\">Time Picker</div>\n                  <div class=\"picker-table\">\n                      <ul class=\"picker-table-time\">\n                          <li class=\"picker-table-number hour\">\n                              <span class=\"arrow up\" (click)=\"increaseHour()\"></span>\n                              {{time | moment: hourFormat}}\n                              <span class=\"arrow down\" (click)=\"decreaseHour()\"></span>\n                          </li>\n                          <li class=\"picker-table-separator\">:</li>\n                          <li class=\"picker-table-number minute\">\n                              <span class=\"arrow up\" (click)=\"increaseMinute()\"></span>\n                              {{time | moment: 'mm'}}\n                              <span class=\"arrow down\" (click)=\"decreaseMinute()\"></span>\n                          </li>\n                          <li *ngIf=\"showSecond\" class=\"picker-table-separator\">:</li>\n                          <li *ngIf=\"showSecond\" class=\"picker-table-number second\">\n                              <span class=\"arrow up\" (click)=\"increaseSecond()\"></span>\n                              {{time | moment: 'ss'}}\n                              <span class=\"arrow down\" (click)=\"decreaseSecond()\"></span>\n                          </li>\n                          <li *ngIf=\"use12Hour\" class=\"picker-table-meridiem meridiem\">\n                              {{time | moment: 'A'}}\n                          </li>\n                      </ul>\n                  </div>\n                  <div class=\"picker-footer\">\n                      <div class=\"picker-action action-now\" (click)=\"selectNow()\"><span class=\"text\">Now</span></div>\n                      <div class=\"picker-action action-confirm\" (click)=\"selectTime()\"><span class=\"text\">Confirm</span></div>\n                      <div class=\"picker-action action-clear\" (click)=\"clearTime()\"><span class=\"text\">Clear</span></div>\n                      <div class=\"picker-action action-close\" (click)=\"cancelTimePicker()\"><span class=\"text\">Close</span></div>\n                  </div>\n              </div>\n          </div>\n      </picker-modal>\n    ",
                styles: ['./time-picker.component.css'],
            },] },
];
/** @nocollapse */
TimePickerComponent.ctorParameters = function () { return []; };
TimePickerComponent.propDecorators = {
    'initTime': [{ type: Input },],
    'showSecond': [{ type: Input },],
    'viewFormat': [{ type: Input },],
    'use12Hour': [{ type: Input },],
    'returnObject': [{ type: Input },],
    'onSelectTime': [{ type: Output },],
    'onTimePickerCancel': [{ type: Output },],
};
//# sourceMappingURL=time-picker.component.js.map