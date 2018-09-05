var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { FormGroup } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
var AfeFormGroup = /** @class */ (function (_super) {
    __extends(AfeFormGroup, _super);
    function AfeFormGroup(controls, validator, asyncValidator) {
        var _this = _super.call(this, controls, validator, asyncValidator) || this;
        _this.hiderHelper = new HiderHelper();
        _this.disablerHelper = new DisablerHelper();
        _this.AlertHelper = new AlertHelper();
        _this._controlRelations = new ControlRelations(_this);
        _this.hiders = [];
        _this.disablers = [];
        _this.alerts = [];
        return _this;
    }
    Object.defineProperty(AfeFormGroup.prototype, "controlRelations", {
        get: function () {
            return this._controlRelations;
        },
        enumerable: true,
        configurable: true
    });
    AfeFormGroup.prototype.hide = function () {
        this.hiderHelper.hideControl(this);
    };
    AfeFormGroup.prototype.show = function () {
        this.hiderHelper.showControl(this);
    };
    AfeFormGroup.prototype.disable = function (param) {
        _super.prototype.disable.call(this, param);
        _super.prototype.setValue.call(this, {});
    };
    AfeFormGroup.prototype.setHidingFn = function (newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    };
    AfeFormGroup.prototype.clearHidingFns = function () {
        this.hiderHelper.clearHidersForControl(this);
    };
    AfeFormGroup.prototype.updateHiddenState = function () {
        this.hiderHelper.evaluateControlHiders(this);
    };
    AfeFormGroup.prototype.setDisablingFn = function (newDisabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    };
    AfeFormGroup.prototype.clearDisablingFns = function () {
        this.disablerHelper.clearDisablersForControl(this);
    };
    AfeFormGroup.prototype.updateDisabledState = function () {
        this.disablerHelper.evaluateControlDisablers(this);
    };
    AfeFormGroup.prototype.setAlertFn = function (newHider) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    };
    AfeFormGroup.prototype.clearMessageFns = function () {
        this.AlertHelper.clearAlertsForControl(this);
    };
    AfeFormGroup.prototype.updateAlert = function () {
        this.AlertHelper.evaluateControlAlerts(this);
    };
    return AfeFormGroup;
}(FormGroup));
export { AfeFormGroup };
//# sourceMappingURL=afe-form-group.js.map