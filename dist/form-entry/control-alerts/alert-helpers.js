var AlertHelper = /** @class */ (function () {
    function AlertHelper() {
    }
    AlertHelper.prototype.hideAlert = function (control) {
        control.shown = false;
    };
    AlertHelper.prototype.showAlert = function (control) {
        control.shown = true;
    };
    AlertHelper.prototype.setAlertsForControl = function (control, alert) {
        control.alerts.push(alert);
    };
    AlertHelper.prototype.clearAlertsForControl = function (control) {
        control.alerts.splice(0);
        control.alert = '';
    };
    AlertHelper.prototype.evaluateControlAlerts = function (control) {
        var messageValue = '';
        control.alerts.forEach(function (message) {
            message.reEvaluateAlertExpression();
            if (message.shown === true) {
                messageValue = message.alertMessage;
            }
            else {
                messageValue = '';
            }
        });
        control.alert = messageValue;
        // if (control.message && control.disable) {
        //     control.disable();
        //     // control.setValue(null);
        // }
    };
    AlertHelper.prototype.setUpReEvaluationWhenValueChanges = function (control) {
        if (control.updateAlert) {
            control.valueChanges.subscribe(function (val) {
                control.updateAlert();
            });
        }
    };
    return AlertHelper;
}());
export { AlertHelper };
//# sourceMappingURL=alert-helpers.js.map