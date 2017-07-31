/**
 * date-time-picker.module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { ModalComponent } from './picker-modal/modal.component';
import { MomentPipe } from './pipes/moment.pipe';
import { DateTimePickerComponent } from './date-time-picker.component';
var DateTimePickerModule = (function () {
    function DateTimePickerModule() {
    }
    return DateTimePickerModule;
}());
export { DateTimePickerModule };
DateTimePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                declarations: [
                    DatePickerComponent,
                    TimePickerComponent,
                    ModalComponent,
                    MomentPipe,
                    DateTimePickerComponent
                ],
                exports: [
                    DatePickerComponent,
                    TimePickerComponent,
                    ModalComponent,
                    MomentPipe,
                    DateTimePickerComponent
                ],
                providers: []
            },] },
];
/** @nocollapse */
DateTimePickerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=date-time-picker.module.js.map