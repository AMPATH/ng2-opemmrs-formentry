import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurePipe } from './components/file-upload/secure.pipe';
import { DataSources } from './form-entry/data-sources/data-sources';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SecurePipe
                    ],
                    imports: [CommonModule],
                    exports: [
                        SecurePipe
                    ],
                    providers: [
                        DataSources
                    ],
                },] },
    ];
    /** @nocollapse */
    SharedModule.ctorParameters = function () { return []; };
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.module.js.map