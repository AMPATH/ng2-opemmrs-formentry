import { Pipe, WrappedValue, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DomSanitizer } from '@angular/platform-browser';
// import { FileUploadResourceService } from '../../etl-api/file-upload-resource.service';
// Using similarity from AsyncPipe to avoid having to pipe |secure|async in HTML.
// tslint:disable-next-line:use-pipe-transform-interface
var SecurePipe = (function () {
    function SecurePipe(_ref, sanitizer) {
        this._ref = _ref;
        this.sanitizer = sanitizer;
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
        this._result = new BehaviorSubject(null);
        this.result = this._result.asObservable();
        this._internalSubscription = null;
    }
    SecurePipe.prototype.ngOnDestroy = function () {
        if (this._subscription) {
            this._dispose();
        }
    };
    SecurePipe.prototype.transform = function (url, getfile) {
        this.getfile = getfile;
        var obj = this.internalTransform(url);
        return this.asyncTrasnform(obj);
    };
    SecurePipe.prototype.internalTransform = function (url) {
        var _this = this;
        if (!url) {
            return this.result;
        }
        if (this.previousUrl !== url) {
            this.previousUrl = url;
            this._internalSubscription = this.getfile(url)
                .subscribe(function (m) {
                var sanitized = _this.sanitizer.bypassSecurityTrustUrl(m);
                _this._result.next(sanitized);
            });
        }
        return this.result;
    };
    SecurePipe.prototype.asyncTrasnform = function (obj) {
        if (!this._obj) {
            if (obj) {
                this._subscribe(obj);
            }
            this._latestReturnedValue = this._latestValue;
            return this._latestValue;
        }
        if (obj !== this._obj) {
            this._dispose();
            return this.asyncTrasnform(obj);
        }
        if (this._latestValue === this._latestReturnedValue) {
            return this._latestReturnedValue;
        }
        this._latestReturnedValue = this._latestValue;
        return WrappedValue.wrap(this._latestValue);
    };
    SecurePipe.prototype._subscribe = function (obj) {
        var _this = this;
        this._obj = obj;
        this._subscription = obj.subscribe({
            next: function (value) {
                return _this._updateLatestValue(obj, value);
            }, error: function (e) { throw e; }
        });
    };
    SecurePipe.prototype._dispose = function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        if (this._internalSubscription) {
            this._internalSubscription.unsubscribe();
        }
        this._internalSubscription = null;
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
    };
    SecurePipe.prototype._updateLatestValue = function (async, value) {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref.markForCheck();
        }
    };
    return SecurePipe;
}());
export { SecurePipe };
SecurePipe.decorators = [
    { type: Pipe, args: [{
                name: 'secure',
                pure: false
            },] },
];
/** @nocollapse */
SecurePipe.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
    { type: DomSanitizer, },
]; };
//# sourceMappingURL=secure.pipe.js.map