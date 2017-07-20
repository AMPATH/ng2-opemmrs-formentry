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
var SelectQuestion = (function (_super) {
    __extends(SelectQuestion, _super);
    function SelectQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.renderingType = 'select';
        _this.options = options.options || [];
        _this.controlType = AfeControlType.AfeFormControl;
        _this.dataSource = options.dataSource || '';
        return _this;
    }
    return SelectQuestion;
}(QuestionBase));
export { SelectQuestion };
//# sourceMappingURL=select-question.js.map