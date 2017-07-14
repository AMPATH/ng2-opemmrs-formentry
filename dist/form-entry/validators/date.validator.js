var DateValidator = (function () {
    function DateValidator() {
    }
    DateValidator.prototype.validate = function (control) {
        if (control.hidden) {
            return null;
        }
        var value = control.value;
        if (value && value.length !== 0) {
            // YYYY-MM-DD or DD-MM-YYYY
            var test = !/Invalid|NaN/.test(new Date(value).toString());
            return test ? null : { 'date': true };
        }
        else {
            return null;
        }
    };
    return DateValidator;
}());
export { DateValidator };
//# sourceMappingURL=date.validator.js.map