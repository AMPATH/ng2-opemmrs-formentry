var JsExpressionHelper = (function () {
    function JsExpressionHelper() {
    }
    JsExpressionHelper.prototype.calcBMI = function (height, weight) {
        var r;
        if (height && weight) {
            r = (weight / (height / 100 * height / 100)).toFixed(1);
        }
        return height && weight ? parseFloat(r) : null;
    };
    JsExpressionHelper.prototype.isEmpty = function (val) {
        if (val === undefined || val === null || val === '' || val === 'null' || val === 'undefined') {
            return true;
        }
        if (Array.isArray(val) && val.length === 0) {
            return true;
        }
        return false;
    };
    JsExpressionHelper.prototype.arrayContains = function (array, members) {
        if (Array.isArray(members)) {
            if (members.length === 0) {
                return true;
            }
            var contains = true;
            for (var i = 0; i < members.length; i++) {
                var val = members[i];
                if (array.indexOf(val) === -1) {
                    contains = false;
                }
            }
            ;
            return contains;
        }
        else {
            return array.indexOf(members) !== -1;
        }
    };
    JsExpressionHelper.prototype.extractRepeatingGroupValues = function (key, array) {
        var values = array.map(function (item) {
            return item[key];
        });
        return values;
    };
    JsExpressionHelper.prototype.formatDate = function (value, format, offset) {
        format = format || 'yyyy-MM-dd';
        offset = offset || '+0300';
        if (!(value instanceof Date)) {
            value = new Date(value);
            if (value === null || value === undefined) {
                throw new Error('DateFormatException: value passed ' +
                    'is not a valid date');
            }
        }
        return value; // TODO implement this
        // return $filter('date')(value, format, offset);
    };
    JsExpressionHelper.prototype.arrayContainsAny = function (array, members) {
        if (Array.isArray(members)) {
            if (members.length === 0) {
                return true;
            }
            var contains = false;
            for (var i = 0; i < members.length; i++) {
                var val = members[i];
                if (array.indexOf(val) !== -1) {
                    contains = true;
                }
            }
            return contains;
        }
        else {
            return array.indexOf(members) !== -1;
        }
    };
    Object.defineProperty(JsExpressionHelper.prototype, "helperFunctions", {
        get: function () {
            var helper = this;
            return {
                arrayContainsAny: helper.arrayContainsAny,
                calcBMI: helper.calcBMI,
                isEmpty: helper.isEmpty,
                arrayContains: helper.arrayContains,
                extractRepeatingGroupValues: helper.extractRepeatingGroupValues,
            };
        },
        enumerable: true,
        configurable: true
    });
    return JsExpressionHelper;
}());
export { JsExpressionHelper };
//# sourceMappingURL=js-expression-helper.js.map