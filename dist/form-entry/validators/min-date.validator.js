import { DateValidator } from './date.validator';
var MinDateValidator = (function () {
    function MinDateValidator() {
    }
    MinDateValidator.prototype.validate = function (min) {
        return function (control) {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                if (!new DateValidator().validate(control.value)) {
                    var newDate = new Date(control.value);
                    return newDate.getTime() < min.getTime() ? { 'mindate': { 'requiredDate': min, actualDate: newDate } } : null;
                }
                else {
                    return { 'mindate': { 'requiredDate': min } };
                }
            }
            return null;
        };
    };
    return MinDateValidator;
}());
export { MinDateValidator };
//# sourceMappingURL=min-date.validator.js.map