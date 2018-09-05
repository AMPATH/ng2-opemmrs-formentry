import { Injectable } from '@angular/core';
import { HistoricalEncounterDataService } from '../services/historical-encounter-data.service';
import { JsExpressionHelper } from './js-expression-helper';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
var HistoricalHelperService = /** @class */ (function () {
    function HistoricalHelperService() {
    }
    HistoricalHelperService.prototype.evaluate = function (expr, dataSources) {
        var HD = new HistoricalEncounterDataService();
        HD.registerEncounters('prevEnc', dataSources['rawPrevEnc']);
        var deps = {
            HD: HD
        };
        var helper = new JsExpressionHelper();
        var control = new AfeFormControl();
        var runner = new ExpressionRunner();
        var runnable = runner.getRunnable(expr, control, helper.helperFunctions, deps);
        return runnable.run();
    };
    HistoricalHelperService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HistoricalHelperService.ctorParameters = function () { return []; };
    return HistoricalHelperService;
}());
export { HistoricalHelperService };
//# sourceMappingURL=historical-expression-helper-service.js.map