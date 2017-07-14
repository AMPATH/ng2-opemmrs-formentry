import { Component, Input, forwardRef, Renderer } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var RemoteFileUploadComponent = (function () {
    function RemoteFileUploadComponent(renderer) {
        this.renderer = renderer;
        this.uploading = false;
        this.innerValue = null;
        // the method set in registerOnChange, it is just
        // a placeholder for a method that takes one parameter,
        // we use it to emit changes back to the form
        this.propagateChange = function (_) { };
    }
    Object.defineProperty(RemoteFileUploadComponent.prototype, "dataSource", {
        get: function () {
            return this._dataSource;
        },
        set: function (v) {
            this._dataSource = v;
        },
        enumerable: true,
        configurable: true
    });
    RemoteFileUploadComponent.prototype.ngOnInit = function () {
    };
    RemoteFileUploadComponent.prototype.upload = function (data) {
        var _this = this;
        if (this.dataSource) {
            this.uploading = true;
            this.dataSource.fileUpload(data).subscribe(function (result) {
                console.log('Result', result);
                _this.innerValue = result.image;
                _this.propagateChange(_this.innerValue);
                _this.uploading = false;
            }, function (error) {
                _this.uploading = false;
            });
        }
    };
    // this is the initial value set to the component
    RemoteFileUploadComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    RemoteFileUploadComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // not used, used for touch input
    RemoteFileUploadComponent.prototype.registerOnTouched = function () { };
    // change events from the textarea
    RemoteFileUploadComponent.prototype.onChange = function (event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    };
    RemoteFileUploadComponent.prototype.clearValue = function () {
        this.innerValue = null;
        this.propagateChange(this.innerValue);
    };
    RemoteFileUploadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'remote-file-upload',
                    template: "\n      <div>\n          <file-uploader [(ngModel)]=\"innerValue\" (onClear)=\"clearValue()\" (fileChanged)=\"upload($event)\">\n          </file-uploader>\n          <img *ngIf=\"innerValue\" class=\"img-responsive\" [src]=\"innerValue | secure:this.dataSource.fetchFile\" alt=\"\" />\n          <div *ngIf=\"loading\">\n              resolving....\n          </div>\n      </div>\n    ",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return RemoteFileUploadComponent; }),
                            multi: true,
                        }
                    ],
                    styles: ["img {\n        margin-left: auto;\n\t    margin-right: auto;\n\t    display: block;\n    }"
                    ]
                },] },
    ];
    /** @nocollapse */
    RemoteFileUploadComponent.ctorParameters = function () { return [
        { type: Renderer, },
    ]; };
    RemoteFileUploadComponent.propDecorators = {
        'dataSource': [{ type: Input },],
    };
    return RemoteFileUploadComponent;
}());
export { RemoteFileUploadComponent };
//# sourceMappingURL=file-upload.component.js.map