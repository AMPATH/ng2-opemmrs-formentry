import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { Validations } from './validations';
var JsExpressionValidator = (function () {
    function JsExpressionValidator() {
    }
    JsExpressionValidator.prototype.validate = function (model, form) {
        // convert helper functions to string
        return function (control) {
            if (!Validations.JSExpressionValidatorsEnabled) {
                return null;
            }
            var expression = model.failsWhenExpression;
            var helper = new JsExpressionHelper();
            var dataDependencies = {};
            var helperFunctions = helper.helperFunctions;
            var runnable = new ExpressionRunner().getRunnable(expression, control, helperFunctions, dataDependencies, form);
            if (runnable.run()) {
                return { 'js_expression': { 'expression': expression, message: model.message } };
            }
            return null;
        };
    };
    return JsExpressionValidator;
}());
export { JsExpressionValidator };
//# sourceMappingURL=js-expression.validator.js.map