import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select.component';
import { SelectDropdownComponent } from './select-dropdown.component';
var SelectModule = (function () {
    function SelectModule() {
    }
    return SelectModule;
}());
export { SelectModule };
SelectModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SelectComponent,
                    SelectDropdownComponent
                ],
                exports: [
                    SelectComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule
                ]
            },] },
];
/** @nocollapse */
SelectModule.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map