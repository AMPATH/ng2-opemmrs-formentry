/**
 * moment.pipe
 */
import { Pipe } from '@angular/core';
var MomentPipe = (function () {
    function MomentPipe() {
    }
    MomentPipe.prototype.transform = function (moment, format) {
        return format ? moment.format(format) : moment.format('MMM DD, YYYY');
    };
    return MomentPipe;
}());
export { MomentPipe };
MomentPipe.decorators = [
    { type: Pipe, args: [{
                name: 'moment'
            },] },
];
/** @nocollapse */
MomentPipe.ctorParameters = function () { return []; };
//# sourceMappingURL=moment.pipe.js.map