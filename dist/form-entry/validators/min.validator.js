var MinValidator = /** @class */ (function () {
    function MinValidator() {
    }
    MinValidator.prototype.validate = function (min) {
        return function (control) {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                var v = control.value;
                return v >= min ? null : { 'min': { requiredValue: min, actualValue: v } };
            }
            return null;
        };
    };
    return MinValidator;
}());
export { MinValidator };
//# sourceMappingURL=min.validator.js.map