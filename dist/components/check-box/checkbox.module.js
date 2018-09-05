import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxControlComponent } from './checkbox.component';
var CheckboxModule = /** @class */ (function () {
    function CheckboxModule() {
    }
    CheckboxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        CheckboxControlComponent
                    ],
                    exports: [
                        CheckboxControlComponent
                    ],
                    imports: [CommonModule, FormsModule]
                },] },
    ];
    /** @nocollapse */
    CheckboxModule.ctorParameters = function () { return []; };
    return CheckboxModule;
}());
export { CheckboxModule };
//# sourceMappingURL=checkbox.module.js.map