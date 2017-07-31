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
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
var UiSelectQuestion = (function (_super) {
    __extends(UiSelectQuestion, _super);
    function UiSelectQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.renderingType = 'ui-select';
        _this.options = options.options || [];
        _this.controlType = AfeControlType.AfeFormControl;
        return _this;
    }
    return UiSelectQuestion;
}(QuestionBase));
export { UiSelectQuestion };
//# sourceMappingURL=ui-select-question.js.map