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
import { ValidationModel } from './validation.model';
var MaxValidationModel = (function (_super) {
    __extends(MaxValidationModel, _super);
    function MaxValidationModel(validations) {
        var _this = _super.call(this, validations) || this;
        var max = validations.max;
        _this.max = +max;
        return _this;
    }
    return MaxValidationModel;
}(ValidationModel));
export { MaxValidationModel };
//# sourceMappingURL=max-validation.model.js.map