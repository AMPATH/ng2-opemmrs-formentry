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
import { QuestionBase } from '../question-base';
var NestedQuestion = (function (_super) {
    __extends(NestedQuestion, _super);
    function NestedQuestion(options) {
        return _super.call(this, options) || this;
    }
    return NestedQuestion;
}(QuestionBase));
export { NestedQuestion };
//# sourceMappingURL=nested-questions.js.map