var HiderHelper = /** @class */ (function () {
    function HiderHelper() {
    }
    HiderHelper.prototype.hideControl = function (control) {
        control.hidden = true;
        if (control.disable) {
            control.disable();
        }
    };
    HiderHelper.prototype.showControl = function (control) {
        control.hidden = false;
    };
    HiderHelper.prototype.setHiderForControl = function (control, hider) {
        control.hiders.push(hider);
    };
    HiderHelper.prototype.clearHidersForControl = function (control) {
        control.hiders.splice(0);
        control.hidden = false;
    };
    HiderHelper.prototype.evaluateControlHiders = function (control) {
        var hiddenValue = false;
        control.hiders.forEach(function (hider) {
            hider.reEvaluateHidingExpression();
            if (hider.toHide === true) {
                hiddenValue = true;
            }
        });
        control.hidden = hiddenValue;
        if (control.hidden && control.disable) {
            control.disable();
            // control.setValue(null);
        }
    };
    HiderHelper.prototype.setUpReEvaluationWhenValueChanges = function (control) {
        if (control.updateHiddenState) {
            control.valueChanges.subscribe(function (val) {
                control.updateHiddenState();
            });
        }
    };
    return HiderHelper;
}());
export { HiderHelper };
//# sourceMappingURL=hider-helpers.js.map