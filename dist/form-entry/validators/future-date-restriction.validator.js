import { DateValidator } from './date.validator';
var FutureDateRestrictionValidator = /** @class */ (function () {
    function FutureDateRestrictionValidator() {
    }
    FutureDateRestrictionValidator.prototype.validate = function (control) {
        if (control.hidden) {
            return null;
        }
        var value = control.value;
        var now = new Date();
        if (value && value.length !== 0) {
            if (!new DateValidator().validate(value)) {
                var d = new Date(value);
                return d.getTime() > now.getTime() ? { 'futureDateRestriction': true } : null;
            }
        }
        return null;
    };
    return FutureDateRestrictionValidator;
}());
export { FutureDateRestrictionValidator };
//# sourceMappingURL=future-date-restriction.validator.js.map