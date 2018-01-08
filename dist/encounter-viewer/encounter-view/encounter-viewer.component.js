import { Component, Input } from '@angular/core';
import { EncounterViewerService } from '../encounter-viewer.service';
var EncounterViewerComponent = (function () {
    function EncounterViewerComponent(encService) {
        this.encService = encService;
    }
    Object.defineProperty(EncounterViewerComponent.prototype, "node", {
        set: function (rootNode) {
            this.rootNode = rootNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterViewerComponent.prototype, "schema", {
        set: function (schema) {
            this._schema = schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterViewerComponent.prototype, "encounter", {
        set: function (enc) {
            this.enc = enc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterViewerComponent.prototype, "form", {
        set: function (form) {
            this.rootNode = form.rootNode;
            this._schema = form.schema;
            this.encService.traverse(this.rootNode, this._schema);
        },
        enumerable: true,
        configurable: true
    });
    EncounterViewerComponent.prototype.ngOnInit = function () { };
    EncounterViewerComponent.prototype.questionsAnswered = function (node) {
        var $answered = this.encService.questionsAnswered(node);
        return $answered;
    };
    EncounterViewerComponent.prototype.questionAnswered = function (node) {
        var answered = this.encService.hasAnswer(node);
        return answered;
    };
    EncounterViewerComponent.prototype.checkForColon = function (questionLabel) {
        if (questionLabel.indexOf(':') === -1) {
            return true;
        }
        else {
            return false;
        }
    };
    EncounterViewerComponent.prototype.isEncounterDetails = function (node) {
        if (node.question.label === 'Encounter Details'
            || node.question.label.indexOf('Encounter') > -1) {
            return true;
        }
        else {
            return false;
        }
    };
    return EncounterViewerComponent;
}());
export { EncounterViewerComponent };
EncounterViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'encounter-viewer',
                template: "\n      <div class=\"viewer\">\n      <div id=\"page0\" *ngIf=\"enc\">\n      <encounter-details [encounter]=\"enc\"></encounter-details>\n      </div>\n\n      <div *ngIf=\"rootNode.question.renderingType === 'form'\" class=\"form\">\n        <div *ngFor=\"let question of rootNode.question.questions; let i = index;\">\n          <div *ngIf=\"questionsAnswered(rootNode.children[question.key]) && !isEncounterDetails(rootNode.children[question.key])\">\n            <div [attr.id]=\"'page'+i\" class=\"panel panel-default\">\n              <p class=\"page-label panel-heading text-primary\">{{question.label}}</p>\n              <div class=\"panel-body\">\n                <encounter-viewer [node]=\"rootNode.children[question.key]\" [schema]=\"schema\" [parentComponent]=\"this\"></encounter-viewer>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n        <div *ngIf=\"rootNode.question.renderingType === 'page'\" class=\"page\">\n          <encounter-viewer *ngFor=\"let question of rootNode.question.questions\" [parentComponent]=\"this\"\n          [node]=\"rootNode.children[question.key]\" [schema]=\"schema\"></encounter-viewer>\n        </div>\n\n\n        <div *ngIf=\"rootNode.question.renderingType === 'section'&& questionsAnswered(rootNode) && !isEncounterDetails(rootNode)\" class=\"section\">\n          <div class=\"panel panel-primary\">   \n          <p class=\"panel-heading section-label\">{{ rootNode.question.label }}</p>\n          </div>\n          <div *ngFor=\"let question of rootNode.question.questions\">\n            <encounter-viewer [node]=\"rootNode.children[question.key]\" [parentComponent]=\"this\"\n            [schema]=\"schema\"></encounter-viewer>\n          </div>\n        </div>\n\n\n        <div *ngIf=\"questionAnswered(rootNode)\">\n          <div class=\"question-answer\">\n            {{ rootNode.question.label }}\n            <span *ngIf=\"checkForColon(rootNode.question.label)\">:</span>\n            <span class=\"line-breaker\">{{rootNode.initialValue}}</span>\n          </div>\n          <hr>\n        </div>\n      </div>\n    ",
                styles: ["\n      .page-label{font-size:20px;font-weight:bold}.section-label{font-size:18px;font-weight:500}.panel-primary{border:none !important}.question-answer{font-weight:700;font-size:14px}.panel{margin-bottom:5px}div.section{margin-bottom:15px !important}.line-breaker{white-space:pre-line}hr{margin:10px}\n    "]
            },] },
];
/** @nocollapse */
EncounterViewerComponent.ctorParameters = function () { return [
    { type: EncounterViewerService, },
]; };
EncounterViewerComponent.propDecorators = {
    'parentComponent': [{ type: Input },],
    'node': [{ type: Input },],
    'schema': [{ type: Input },],
    'encounter': [{ type: Input },],
    'form': [{ type: Input },],
};
//# sourceMappingURL=encounter-viewer.component.js.map