/**
 * moment.pipe
 */
import { Pipe } from '@angular/core';
var MomentPipe = /** @class */ (function () {
    function MomentPipe() {
    }
    MomentPipe.prototype.transform = function (moment, format) {
        return format ? moment.format(format) : moment.format('MMM DD, YYYY');
    };
    MomentPipe.decorators = [
        { type: Pipe, args: [{ name: 'moment' },] },
    ];
    /** @nocollapse */
    MomentPipe.ctorParameters = function () { return []; };
    return MomentPipe;
}());
export { MomentPipe };
//# sourceMappingURL=moment.pipe.js.map