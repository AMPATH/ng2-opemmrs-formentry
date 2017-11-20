import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { SelectModule } from 'ng2-select/ng2-select';
import { SelectModule } from '../../components/select';
import { RemoteSelectComponent } from './remote-select.component';
var RemoteSelectModule = (function () {
    function RemoteSelectModule() {
    }
    RemoteSelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, SelectModule, FormsModule],
                    exports: [RemoteSelectComponent],
                    declarations: [RemoteSelectComponent],
                    providers: [],
                },] },
    ];
    /** @nocollapse */
    RemoteSelectModule.ctorParameters = function () { return []; };
    return RemoteSelectModule;
}());
export { RemoteSelectModule };
//# sourceMappingURL=remote-select.module.js.map