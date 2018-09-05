/**
 * date-picker.component
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment/moment';
import * as _ from 'lodash';
// const myDpStyles: string = require('./date-picker.component.css');
// const myDpTpl: string = require('./date-picker.component.html');
// webpack2_
var DatePickerComponent = /** @class */ (function () {
    function DatePickerComponent() {
        this.locale = 'en';
        this.viewFormat = 'll';
        this.returnObject = 'js';
        this.onDatePickerCancel = new EventEmitter();
        this.onSelectDate = new EventEmitter();
        this.onDisplayMonths = false;
        this.onDisplayYears = false;
        this.displayYearsIndex = 0;
        this.monthsShort = moment.monthsShort();
    }
    DatePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initValue();
        // default to current year range
        _.each(this.fullYearRange, function (v, i) {
            _this.currentYear = _this.calendarDate.clone().startOf('year').year();
            if (v.indexOf(_this.currentYear) !== -1) {
                _this.displayYearsIndex = i;
            }
        });
        this.displayYearRange = this.fullYearRange[this.displayYearsIndex];
        this.generateCalendar();
    };
    DatePickerComponent.prototype.prev = function () {
        if (this.onDisplayYears) {
            this.displayYearsIndex--;
            if (this.displayYearsIndex < 0) {
                this.displayYearsIndex = 0;
            }
            this.displayYearRange = this.fullYearRange[this.displayYearsIndex];
        }
        else {
            this.calendarDate = this.calendarDate.clone().subtract(1, 'M');
        }
        this.generateCalendar();
    };
    DatePickerComponent.prototype.showMonthSelection = function () {
        this.onDisplayMonths = true;
        this.onDisplayYears = false;
    };
    DatePickerComponent.prototype.showYearSelection = function () {
        this.onDisplayYears = true;
        this.onDisplayMonths = false;
    };
    DatePickerComponent.prototype.next = function () {
        if (this.onDisplayYears) {
            this.displayYearsIndex++;
            if (this.displayYearsIndex >= this.fullYearRange.length) {
                this.displayYearsIndex = this.fullYearRange.length - 1;
            }
            this.displayYearRange = this.fullYearRange[this.displayYearsIndex++];
        }
        else {
            this.calendarDate = this.calendarDate.clone().add(1, 'M');
        }
        this.generateCalendar();
    };
    DatePickerComponent.prototype.selectDay = function (day) {
        var daysDifference = day.diff(this.calendarDate.clone().startOf('date'), 'days');
        day = this.calendarDate.clone().add(daysDifference, 'd');
        var selectedDay = this.parseToReturnObjectType(day);
        this.onSelectDate.emit(selectedDay);
        this.cancelDatePicker();
        return;
    };
    DatePickerComponent.prototype.selectMonth = function (month) {
        this.calendarDate = this.calendarDate.clone().month(month);
        this.onDisplayMonths = false;
        this.generateCalendar();
    };
    DatePickerComponent.prototype.selectYear = function (year) {
        this.calendarDate = this.calendarDate.clone().year(year);
        this.onDisplayYears = false;
        this.generateCalendar();
    };
    DatePickerComponent.prototype.selectToday = function () {
        var today = this.parseToReturnObjectType(moment());
        this.onSelectDate.emit(today);
        this.cancelDatePicker();
        return;
    };
    DatePickerComponent.prototype.clearPickDate = function () {
        this.onSelectDate.emit(null);
        this.cancelDatePicker();
        return;
    };
    DatePickerComponent.prototype.cancelDatePicker = function () {
        this.onDatePickerCancel.emit(false);
        return;
    };
    DatePickerComponent.prototype.generateYears = function () {
        var currentYear = moment().year();
        var nextYear = moment().add('year', 1).year();
        var startYr = this.calendarDate.clone().subtract(100, 'y').year();
        // const endYr = this.calendarDate.clone().add(10, 'y').year();
        var years = [];
        for (var year = startYr; year <= nextYear; year++) {
            years.push(year);
        }
        this.fullYearRange = _.chunk(years, 14);
    };
    DatePickerComponent.prototype.initValue = function () {
        // set moment locale (default is en)
        moment.locale(this.locale);
        // set today value
        this.today = moment().startOf('date');
        this.currentMonth = this.monthsShort[moment().month()];
        this.currentYear = moment().year();
        // set week days name array
        this.dayNames = moment.weekdaysShort(true);
        // check if the input initDate has value
        if (this.initDate) {
            this.calendarDate = this.returnObject === 'string' ? moment(this.initDate, this.viewFormat) :
                moment(this.initDate);
            this.selectedDate = this.calendarDate.clone().startOf('date');
        }
        else {
            this.calendarDate = moment();
        }
        this.generateYears();
    };
    DatePickerComponent.prototype.generateCalendar = function () {
        this.calendarDays = [];
        var start = 0 - (this.calendarDate.clone().startOf('month').day() +
            (7 - moment.localeData().firstDayOfWeek())) % 7;
        var end = 41 + start; // iterator ending point
        for (var i = start; i <= end; i += 1) {
            var day = this.calendarDate.clone().startOf('month').add(i, 'days');
            this.calendarDays.push(day);
        }
    };
    DatePickerComponent.prototype.parseToReturnObjectType = function (day) {
        switch (this.returnObject) {
            case 'js':
                return day.toDate();
            case 'string':
                return day.format(this.viewFormat);
            case 'moment':
                return day;
            case 'json':
                return day.toJSON();
            case 'array':
                return day.toArray();
            case 'iso':
                return day.toISOString();
            case 'object':
                return day.toObject();
            default:
                return day;
        }
    };
    DatePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'date-picker',
                    template: "\n    <picker-modal (onOverlayClick)=\"cancelDatePicker()\">\n      <div class=\"picker-wrap\">\n        <div class=\"picker-box\">\n          <div class=\"picker-header\">\n            <div class=\"picker-header-nav\">\n              <span class=\"nav-prev\" (click)=\"prev()\"></span>\n            </div>\n            <div class=\"picker-header-content\">\n              <div class=\"content\">\n                <span (click)=\"showMonthSelection()\" class=\"month\">{{calendarDate | moment: \"MMMM\"}}</span>\n                <span class=\"seperator\">|</span>\n                <span (click)=\"showYearSelection()\" class=\"year\">{{calendarDate | moment: \"YYYY\"}}</span>\n              </div>\n            </div>\n            <div class=\"picker-header-nav\">\n              <span class=\"nav-next\" (click)=\"next()\"></span>\n            </div>\n          </div>\n          <div class=\"picker-calendar\">\n            <div class=\"picker-calendar-row\" *ngIf=\"!onDisplayMonths && !onDisplayYears\">\n              <span class=\"picker-weekday\" *ngFor=\"let day of dayNames\">{{ day }}</span>\n            </div>\n            <div class=\"picker-calendar-row\" *ngIf=\"!onDisplayMonths && !onDisplayYears\">\n                        <span class=\"picker-day\" (click)=\"selectDay(day)\" [ngClass]=\"{\n                           'out-focus': day.month() != calendarDate.month(),\n                           'today': day.isSame(today),\n                           'selected': day.isSame(selectedDate)\n                          }\" *ngFor=\"let day of calendarDays\">\n                        {{ day | moment: 'D'}}\n                    </span>\n            </div>\n            <div class=\"picker-calendar-row\" *ngIf=\"onDisplayMonths\">\n                        <span class=\"picker-month\" *ngFor=\"let month of monthsShort\"\n                              (click)=\"selectMonth(month)\"\n                              [ngClass]=\"{\n                           'selected': month === currentMonth\n                          }\">\n                        {{ month }}\n                    </span>\n            </div>\n            <div class=\"picker-calendar-row\" *ngIf=\"onDisplayYears\">\n                        <span class=\"picker-year\" *ngFor=\"let year of displayYearRange\"\n                              (click)=\"selectYear(year)\"\n                              [ngClass]=\"{\n                           'selected': year === currentYear\n                          }\">\n                        {{ year }}\n                    </span>\n            </div>\n          </div>\n          <div class=\"picker-footer\">\n            <div class=\"picker-action action-today\" (click)=\"selectToday()\"><span class=\"text\">Today</span></div>\n            <div class=\"picker-action action-clear\" (click)=\"clearPickDate()\"><span class=\"text\">Clear</span></div>\n            <div class=\"picker-action action-close\" (click)=\"cancelDatePicker()\"><span class=\"text\">Close</span></div>\n          </div>\n        </div>\n      </div>\n    </picker-modal>\n  ",
                    styles: ["\n    *,*::before,*::after{box-sizing:border-box}.picker-wrap{width:95vw;max-width:666px}.picker-box{font-family:'Open Sans';min-width:400px !important;padding:0.625rem 1rem;user-select:none}.picker-header,.picker-footer{font-size:1.333rem;line-height:2.5rem;display:flex;height:2.5rem;width:100%}.picker-header-nav{position:relative;cursor:pointer;width:calc(100% / 8)}.picker-header-nav>*{position:absolute;top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%, -50%)}.picker-header-nav .nav-prev::before,.picker-header-nav .nav-next::before{content:\" \";border-top:.5em solid transparent;border-bottom:.5em solid transparent;border-right:.75em solid #000;width:0;height:0;display:block;margin:0 auto}.picker-header-nav .nav-next::before{border-right:0;border-left:.75em solid #000}.picker-header-content{width:calc(100% * 6 / 8);text-align:center}.picker-header-content .month{font-size:1.778rem;line-height:2.5rem;margin-right:.5rem;font-weight:700}.picker-header-content .year{font-style:italic;color:#999}.picker-calendar{width:100%}.picker-calendar .picker-calendar-row{display:flex;flex-wrap:wrap;width:100%;margin-bottom:0.625rem}.picker-calendar .picker-weekday{font-weight:700;text-align:left;color:#999;width:calc(100% / 7)}.picker-calendar .picker-day,.picker-calendar .picker-month,.picker-calendar .picker-year{font-size:1.333rem;line-height:2.5rem;position:relative;height:2.5rem;text-align:center;cursor:pointer;width:calc(100% / 7)}.picker-calendar .picker-day:hover,.picker-calendar .picker-month:hover,.picker-calendar .picker-year:hover{background:#b1dcfb}.picker-calendar .out-focus{color:#ddd}.picker-calendar .out-focus:hover{color:#000}.picker-calendar .selected{background:#0089ec;color:#fff}.picker-calendar .selected:hover{background:#0089ec}.picker-calendar .today::before{content:\" \";position:absolute;top:2px;right:2px;width:0;height:0;border-top:.5em solid #0059bc;border-left:.5em solid transparent}.picker-footer{cursor:pointer}.picker-footer .picker-action{text-align:center;width:calc(100% / 3)}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-today::before,.picker-footer .action-clear::before,.picker-footer .action-close::before{content:\" \";position:relative;display:inline-block;height:0;width:0}.picker-footer .action-today::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom, transparent 35%, #777 35%, #777 65%, transparent 65%),linear-gradient(to right, transparent 35%, #777 35%, #777 65%, transparent 65%);transform:rotate(45deg)}\n  "],
                },] },
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = function () { return []; };
    DatePickerComponent.propDecorators = {
        'initDate': [{ type: Input },],
        'locale': [{ type: Input },],
        'viewFormat': [{ type: Input },],
        'returnObject': [{ type: Input },],
        'onDatePickerCancel': [{ type: Output },],
        'onSelectDate': [{ type: Output },],
    };
    return DatePickerComponent;
}());
export { DatePickerComponent };
//# sourceMappingURL=date-picker.component.js.map