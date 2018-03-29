import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploaderModule } from 'ngx-file-uploader';
import { SharedModule } from '../../shared.module';
// import { SelectModule } from 'ng2-select/ng2-select';
import { SelectModule } from '../../components/select';
import { RemoteFileUploadComponent } from './file-upload.component';
var RemoteFileUploadModule = (function () {
    function RemoteFileUploadModule() {
    }
    return RemoteFileUploadModule;
}());
export { RemoteFileUploadModule };
RemoteFileUploadModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, SelectModule, FormsModule, FileUploaderModule, SharedModule],
                exports: [RemoteFileUploadComponent],
                declarations: [RemoteFileUploadComponent],
                providers: [],
            },] },
];
/** @nocollapse */
RemoteFileUploadModule.ctorParameters = function () { return []; };
//# sourceMappingURL=file-upload.module.js.map