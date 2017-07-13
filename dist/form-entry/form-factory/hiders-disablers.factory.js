import { Injectable } from '@angular/core';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
var HidersDisablersFactory = (function () {
    function HidersDisablersFactory(expressionRunner, expressionHelper) {
        this.expressionRunner = expressionRunner;
        this.expressionHelper = expressionHelper;
    }
    HidersDisablersFactory.prototype.getJsExpressionDisabler = function (question, control, form) {
        var runnable = this.expressionRunner.getRunnable(question.disable, control, this.expressionHelper.helperFunctions, {}, form);
        var disabler = {
            toDisable: false,
            disableWhenExpression: question.disable,
            reEvaluateDisablingExpression: function () {
                var result = runnable.run();
                disabler.toDisable = result;
            }
        };
        return disabler;
    };
    HidersDisablersFactory.prototype.getJsExpressionHider = function (question, control, form) {
        var hide = question.hide;
        var value = typeof hide === 'object' ? this.convertHideObjectToString(hide) : question.hide;
        var runnable = this.expressionRunner.getRunnable(value, control, this.expressionHelper.helperFunctions, {}, form);
        var hider = {
            toHide: false,
            hideWhenExpression: value,
            reEvaluateHidingExpression: function () {
                var result = runnable.run();
                hider.toHide = result;
            }
        };
        return hider;
    };
    HidersDisablersFactory.prototype.convertHideObjectToString = function (hide) {
        if (hide.value instanceof Array) {
            var arrayStr = "'" + hide.value.join("','") + "'";
            var exp = '!arrayContains([' + arrayStr + '],' + hide.field + ')';
            return exp;
        }
        return '';
    };
    HidersDisablersFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HidersDisablersFactory.ctorParameters = function () { return [
        { type: ExpressionRunner, },
        { type: JsExpressionHelper, },
    ]; };
    return HidersDisablersFactory;
}());
export { HidersDisablersFactory };
//# sourceMappingURL=hiders-disablers.factory.js.map