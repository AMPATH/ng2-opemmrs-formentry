import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { ValidationFactory } from '../form-factory/validation.factory';
import { FormErrorsService } from '../services';
var ErrorRendererComponent = /** @class */ (function () {
    function ErrorRendererComponent(validationFactory, formErrorsService) {
        this.validationFactory = validationFactory;
        this.formErrorsService = formErrorsService;
    }
    ErrorRendererComponent.prototype.ngOnInit = function () {
    };
    ErrorRendererComponent.prototype.showErrors = function () {
        return !this.form.valid && this.form.showErrors;
    };
    Object.defineProperty(ErrorRendererComponent.prototype, "errorNodes", {
        get: function () {
            var invalidControls = this.form.markInvalidControls(this.form.rootNode, []);
            return invalidControls;
        },
        enumerable: true,
        configurable: true
    });
    ErrorRendererComponent.prototype.getControlError = function (node) {
        var errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    };
    ErrorRendererComponent.prototype.announceErrorField = function (errorNode) {
        var _this = this;
        var nodes = this.form.searchNodeByQuestionId(errorNode.path.substring(0, errorNode.path.indexOf('.')));
        _.forEach(nodes, function (node) {
            if (node.question.renderingType === 'page') {
                var pageIndex = _this.getPageIndex(node);
                _this.formErrorsService.announceErrorField(pageIndex + ',' + errorNode.question.key);
            }
        });
    };
    ErrorRendererComponent.prototype.getPageIndex = function (node) {
        var questionGroup = this.form.rootNode.question;
        return questionGroup.questions.indexOf(node.question);
    };
    ErrorRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'error-renderer',
                    template: "\n      <div *ngIf=\"showErrors()\" class=\"container\">\n      <ul class=\"list-group\">\n        <li class=\"list-group-item list-group-item-warning\" *ngFor=\"let errorNode of errorNodes\" (click)=announceErrorField(errorNode)>\n          <div class=\"error\" *ngIf=\"errorNode.control.valid == false\">\n            <h4>{{errorNode.question.label}}</h4>\n            <span class=\"text-danger\"> {{getControlError(errorNode)}}</span>\n          </div>\n        </li>\n      </ul>\n      </div>\n    ",
                    styles: ["\n      ul{list-style:none}.list-group-item{padding:2px 15px;cursor:pointer}ul li:hover{background-color:white}h4{margin-top:7px;margin-bottom:7px}\n    "]
                },] },
    ];
    /** @nocollapse */
    ErrorRendererComponent.ctorParameters = function () { return [
        { type: ValidationFactory, },
        { type: FormErrorsService, },
    ]; };
    ErrorRendererComponent.propDecorators = {
        'form': [{ type: Input },],
    };
    return ErrorRendererComponent;
}());
export { ErrorRendererComponent };
//# sourceMappingURL=error-renderer.component.js.map