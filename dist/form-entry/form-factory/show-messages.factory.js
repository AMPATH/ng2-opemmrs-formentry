import { Injectable } from '@angular/core';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
var AlertsFactory = (function () {
    function AlertsFactory(expressionRunner, expressionHelper) {
        this.expressionRunner = expressionRunner;
        this.expressionHelper = expressionHelper;
    }
    AlertsFactory.prototype.getJsExpressionshowAlert = function (question, control, form) {
        var runnable = this.expressionRunner.getRunnable(question.alert.alertWhenExpression, control, this.expressionHelper.helperFunctions, {}, form);
        var showAlert = {
            shown: false,
            alertWhenExpression: question.alert.alertWhenExpression,
            alertMessage: question.alert.message,
            reEvaluateAlertExpression: function () {
                var result = runnable.run();
                showAlert.shown = result;
            }
        };
        return showAlert;
    };
    return AlertsFactory;
}());
export { AlertsFactory };
AlertsFactory.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AlertsFactory.ctorParameters = function () { return [
    { type: ExpressionRunner, },
    { type: JsExpressionHelper, },
]; };
//# sourceMappingURL=show-messages.factory.js.map