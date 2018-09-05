import { Component, Input, Inject } from '@angular/core';
import { EncounterViewerService } from '../encounter-viewer.service';
import { DataSources } from '../../index';
var EncounterViewerComponent = /** @class */ (function () {
    function EncounterViewerComponent(encounterViewerService, dataSources) {
        this.encounterViewerService = encounterViewerService;
        this.dataSources = dataSources;
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
            console.log(this.rootNode);
        },
        enumerable: true,
        configurable: true
    });
    EncounterViewerComponent.prototype.ngOnInit = function () {
        if (this.rootNode && this.rootNode.question.extras
            && this.rootNode.question.renderingType === 'file') {
            this.fileDataSource =
                this.dataSources.dataSources[this.rootNode.question.dataSource];
        }
        else if (this.rootNode && this.rootNode.question.extras
            && this.rootNode.question.renderingType === 'remote-select') {
            this.remoteDataSource =
                this.dataSources.dataSources[this.rootNode.question.dataSource];
        }
        else {
            this.customDataSource = this.encounterViewerService;
        }
    };
    EncounterViewerComponent.prototype.questionsAnswered = function (node) {
        var $answered = this.encounterViewerService.questionsAnswered(node);
        return $answered;
    };
    EncounterViewerComponent.prototype.questionAnswered = function (node) {
        var answered = this.encounterViewerService.hasAnswer(node);
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
    EncounterViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'encounter-viewer',
                    template: "\n      <div class=\"viewer\">\n\n\n        <div *ngIf=\"rootNode.question.renderingType === 'form'\" class=\"form\">\n          <div *ngFor=\"let question of rootNode.question.questions; let i = index;\">\n            <div *ngIf=\"questionsAnswered(rootNode.children[question.key])\">\n              <div [attr.id]=\"'page'+i\" class=\"panel panel-default\">\n                <p class=\"page-label panel-heading text-primary\">{{question.label}}</p>\n                <div class=\"panel-body\">\n                  <encounter-viewer [node]=\"rootNode.children[question.key]\" [schema]=\"_schema\" [parentComponent]=\"this\" [parentGroup]=\"rootNode.control\"></encounter-viewer>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div *ngIf=\"rootNode.question.renderingType === 'page'\" class=\"page\">\n          <encounter-viewer *ngFor=\"let question of rootNode.question.questions\" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\"\n            [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n        </div>\n\n\n        <div *ngIf=\"rootNode.question.renderingType === 'section'&& questionsAnswered(rootNode)\"\n          class=\"section\">\n          <div class=\"panel panel-primary\">\n            <p class=\"panel-heading section-label\">{{ rootNode.question.label }}</p>\n          </div>\n          <div *ngFor=\"let question of rootNode.question.questions\">\n            <encounter-viewer [node]=\"rootNode.children[question.key]\" [parentComponent]=\"this\" [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n          </div>\n        </div>\n\n        <!--Leaf Controls-->\n        <div style=\"margin-left:10px;\">\n        <form *ngIf=\"rootNode.question.controlType === 0\" [formGroup]=\"parentGroup\">\n          <div *ngIf=\"rootNode.control.value\">\n          <div class=\"question-answer\">\n            <label *ngIf=\"rootNode.question.label\" [attr.for]=\"rootNode.question.key\" style=\"font-weight:400;\">\n                {{ rootNode.question.label }}\n            </label>\n            <span *ngIf=\"checkForColon(rootNode.question.label)\">:</span>\n            <div [ngSwitch]=\"rootNode.question.renderingType\" style=\"display:inline-block; font-weight:bold;\">\n                <div *ngSwitchCase=\" 'file' \">\n                  <file-preview [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"fileDataSource\"></file-preview>\n                </div>\n                <div *ngSwitchCase=\"'remote-select'\">\n                  <remote-answer [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"remoteDataSource\"></remote-answer>\n                </div>\n                <div *ngSwitchDefault style=\"display:inline-block\">\n                    <question-control [schema]=\"_schema\" [value]=\"rootNode.control.value\" [dataSource]=\"customDataSource\"></question-control>\n                  </div>\n            </div>\n     \n          </div>\n          </div>\n        </form>\n      </div>\n\n        <!--Array Controls-->\n        <div *ngIf=\"rootNode.question.controlType === 1 && questionsAnswered(rootNode)\">\n          <div [ngSwitch]=\"rootNode.question.renderingType\">\n            <div *ngSwitchCase=\" 'repeating' \">\n              <div [ngSwitch]=\"rootNode.question.extras.type\">\n                <div *ngSwitchCase=\"'testOrder'\">\n                  <label>{{rootNode.question.label}}:</label>\n                  <div *ngFor=\"let child of rootNode.children; let i=index \">\n                    <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                      \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n                  </div>\n                </div>\n          \n                <div *ngSwitchCase=\"'obsGroup'\">\n                  <div *ngFor=\"let child of rootNode.children; let i=index \">\n                    <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                      \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div *ngIf=\"rootNode.question.controlType === 2\">\n\n          <!--GROUP-->\n          <div [ngSwitch]=\"rootNode.question.renderingType \">\n            <div *ngSwitchCase=\" 'group' \">\n              <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                        \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n            <div *ngSwitchCase=\" 'field-set' \">\n              <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                        \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n          </div>\n        </div>\n\n\n\n        </div>\n    ",
                    styles: ["\n      .page-label{font-size:20px;font-weight:bold}.section-label{font-size:18px;font-weight:500}.panel-primary{border:none !important}.question-answer{font-size:16px}.panel{margin-bottom:5px}div.section{margin-bottom:15px !important}.line-breaker{white-space:pre-line}hr{margin:10px}\n    "],
                },] },
    ];
    /** @nocollapse */
    EncounterViewerComponent.ctorParameters = function () { return [
        { type: EncounterViewerService, },
        { type: DataSources, decorators: [{ type: Inject, args: [DataSources,] },] },
    ]; };
    EncounterViewerComponent.propDecorators = {
        'parentGroup': [{ type: Input },],
        'parentComponent': [{ type: Input },],
        'node': [{ type: Input },],
        'schema': [{ type: Input },],
        'encounter': [{ type: Input },],
        'form': [{ type: Input },],
    };
    return EncounterViewerComponent;
}());
export { EncounterViewerComponent };
//# sourceMappingURL=encounter-viewer.component.js.map