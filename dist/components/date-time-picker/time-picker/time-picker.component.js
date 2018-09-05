/**
 * time-picker.component
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment/moment';
// const myDpStyles: string = require('./time-picker.component.css');
// const myDpTpl: string = require('./time-picker.component.html');
// webpack2_
var TimePickerComponent = /** @class */ (function () {
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
    TimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'time-picker',
                    template: "\n      <picker-modal (onOverlayClick)=\"cancelTimePicker()\">\n          <div class=\"picker-wrap\">\n              <div class=\"picker-box\">\n                  <div class=\"picker-header\">Time Picker</div>\n                  <div class=\"picker-table\">\n                      <ul class=\"picker-table-time\">\n                          <li class=\"picker-table-number hour\">\n                              <span class=\"arrow up\" (click)=\"increaseHour()\"></span>\n                              {{time | moment: hourFormat}}\n                              <span class=\"arrow down\" (click)=\"decreaseHour()\"></span>\n                          </li>\n                          <li class=\"picker-table-separator\">:</li>\n                          <li class=\"picker-table-number minute\">\n                              <span class=\"arrow up\" (click)=\"increaseMinute()\"></span>\n                              {{time | moment: 'mm'}}\n                              <span class=\"arrow down\" (click)=\"decreaseMinute()\"></span>\n                          </li>\n                          <li *ngIf=\"showSecond\" class=\"picker-table-separator\">:</li>\n                          <li *ngIf=\"showSecond\" class=\"picker-table-number second\">\n                              <span class=\"arrow up\" (click)=\"increaseSecond()\"></span>\n                              {{time | moment: 'ss'}}\n                              <span class=\"arrow down\" (click)=\"decreaseSecond()\"></span>\n                          </li>\n                          <li *ngIf=\"use12Hour\" class=\"picker-table-meridiem meridiem\">\n                              {{time | moment: 'A'}}\n                          </li>\n                      </ul>\n                  </div>\n                  <div class=\"picker-footer\">\n                      <div class=\"picker-action action-now\" (click)=\"selectNow()\"><span class=\"text\">Now</span></div>\n                      <div class=\"picker-action action-confirm\" (click)=\"selectTime()\"><span class=\"text\">Confirm</span></div>\n                      <div class=\"picker-action action-clear\" (click)=\"clearTime()\"><span class=\"text\">Clear</span></div>\n                      <div class=\"picker-action action-close\" (click)=\"cancelTimePicker()\"><span class=\"text\">Close</span></div>\n                  </div>\n              </div>\n          </div>\n      </picker-modal>\n    ",
                    styles: ["\n      *,*::before,*::after{box-sizing:border-box}.picker-wrap{width:95vw;max-width:40rem;font-family:'Open Sans'}.picker-box{width:100%;padding:0.625rem 1rem;user-select:none}.picker-header,.picker-footer{font-size:1.333rem;line-height:2.5rem;height:2.5rem;width:100%}.picker-header{text-align:center}.picker-table{width:100%;margin:2.5rem 0}.picker-table-time{font-size:2.37rem;line-height:2.5rem;list-style:none;margin:0;padding:0;display:flex;justify-content:center;width:100%;user-select:none}.picker-table-number,.picker-table-meridiem,.picker-table-separator{text-align:center}.picker-table-number,.picker-table-meridiem{position:relative;width:20%}.arrow{position:absolute;left:50%;border:solid #777;border-width:0 .2rem .2rem 0;display:inline-block;padding:.25rem;cursor:pointer}.arrow.up{top:-1rem;transform:translateX(-50%) rotate(-135deg)}.arrow.down{bottom:-1rem;transform:translateX(-50%) rotate(45deg)}.arrow:hover{border-color:#1975d2}.picker-table-separator{width:calc(20% / 3)}.picker-footer{display:flex;justify-content:center;width:100%;cursor:pointer}.picker-footer .picker-action{width:25%;text-align:center}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-now::before,.picker-footer .action-confirm::before,.picker-footer .action-clear::before,.picker-footer .action-close::before{content:\" \";position:relative;display:inline-block;height:0;width:0}.picker-footer .action-now::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-confirm::before{width:1rem;height:1rem;border-radius:100%;background-color:#00B5AD}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom, transparent 35%, #777 35%, #777 65%, transparent 65%),linear-gradient(to right, transparent 35%, #777 35%, #777 65%, transparent 65%);transform:rotate(45deg)}\n    "],
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
    return TimePickerComponent;
}());
export { TimePickerComponent };
//# sourceMappingURL=time-picker.component.js.map