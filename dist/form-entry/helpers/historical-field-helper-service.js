import * as _ from 'lodash';
var HistoricalFieldHelperService = /** @class */ (function () {
    function HistoricalFieldHelperService() {
    }
    HistoricalFieldHelperService.prototype.getDisplayTextFromOptions = function (question, valueProperty, displayProperty) {
        var displayText = '';
        var historicalValue = question.historicalDataValue;
        if (_.isArray(historicalValue.value)) {
            var valueConverted_1 = 0;
            _.each(historicalValue.value, function (val) {
                _.each(question.options, function (option) {
                    if (option[valueProperty] === val) {
                        if (valueConverted_1 === 0) {
                            displayText = displayText + option[displayProperty];
                        }
                        else {
                            displayText = displayText + ', ' + option[displayProperty];
                        }
                        valueConverted_1++;
                    }
                });
            });
        }
        else {
            _.each(question.options, function (option) {
                if (option[valueProperty] === historicalValue.value) {
                    displayText = option[displayProperty];
                }
            });
        }
        return displayText;
    };
    return HistoricalFieldHelperService;
}());
export { HistoricalFieldHelperService };
//# sourceMappingURL=historical-field-helper-service.js.map