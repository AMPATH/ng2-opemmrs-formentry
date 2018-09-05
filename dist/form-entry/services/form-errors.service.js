import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var FormErrorsService = /** @class */ (function () {
    function FormErrorsService() {
        this.announceErrorFieldSource = new Subject();
        this.announceErrorField$ = this.announceErrorFieldSource.asObservable();
    }
    FormErrorsService.prototype.announceErrorField = function (error) {
        this.announceErrorFieldSource.next(error);
    };
    // Observable string sources
    FormErrorsService.control = null;
    FormErrorsService.tab = null;
    FormErrorsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormErrorsService.ctorParameters = function () { return []; };
    return FormErrorsService;
}());
export { FormErrorsService };
//# sourceMappingURL=form-errors.service.js.map