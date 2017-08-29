var QuestionBase = (function () {
    function QuestionBase(options) {
        this.defaultValue = options.defaultValue;
        this.originalValue = options.originalValue;
        this.extras = options.extras;
        this.renderingType = options.type;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators || [];
        this.required = options.required;
        this.hide = options.hide;
        this.disable = options.disable;
        this.alert = options.alert;
        this.historicalDataValue = options.historicalDataValue;
        this.calculateExpression = options.calculateExpression;
    }
    QuestionBase.prototype.setHistoricalValue = function (v) {
        this.enableHistoricalValue = v;
    };
    // show by default
    QuestionBase.prototype.showHistoricalEncounterDate = function (v) {
        this.showHistoricalValueDate = v === undefined ? true : v;
    };
    return QuestionBase;
}());
export { QuestionBase };
//# sourceMappingURL=question-base.js.map