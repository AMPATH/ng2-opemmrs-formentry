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
var FileUploadQuestion = (function (_super) {
    __extends(FileUploadQuestion, _super);
    function FileUploadQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.showTime = true;
        _this.showWeeksAdder = false;
        _this.renderingType = 'file';
        _this.dataSource = options.dataSource;
        _this.controlType = AfeControlType.AfeFormControl;
        return _this;
    }
    return FileUploadQuestion;
}(QuestionBase));
export { FileUploadQuestion };
//# sourceMappingURL=file-upload-question.js.map