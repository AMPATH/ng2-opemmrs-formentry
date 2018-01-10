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
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { NestedQuestion } from './interfaces/nested-questions';
var QuestionGroup = (function (_super) {
    __extends(QuestionGroup, _super);
    function QuestionGroup(options) {
        var _this = _super.call(this, options) || this;
        _this.isExpanded = true;
        _this.renderingType = 'group';
        _this.questions = options.questions || [];
        _this.controlType = AfeControlType.AfeFormGroup;
        return _this;
    }
    return QuestionGroup;
}(NestedQuestion));
export { QuestionGroup };
//# sourceMappingURL=group-question.js.map