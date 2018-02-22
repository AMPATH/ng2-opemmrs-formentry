/*
This service checks if the debug mode on ng2-amrs
has been enabled by checking cookies.
If the debug mode has been enabled then
it returns true and all fields are displayed
for use by testers
*/
import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
var DebugModeService = (function () {
    function DebugModeService(_cookieservice) {
        this._cookieservice = _cookieservice;
        this.cookieKey = 'formDebug';
    }
    DebugModeService.prototype.debugEnabled = function () {
        // check if the hidefield
        var serviceCookie = this._cookieservice.get(this.cookieKey);
        // console.log('Service Cookie', serviceCookie);
        if (typeof serviceCookie === 'undefined') {
            return false;
        }
        else {
            if (serviceCookie === 'true') {
                return true;
            }
            else {
                return false;
            }
        }
    };
    return DebugModeService;
}());
export { DebugModeService };
DebugModeService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DebugModeService.ctorParameters = function () { return [
    { type: CookieService, },
]; };
//# sourceMappingURL=debug-mode.service.js.map