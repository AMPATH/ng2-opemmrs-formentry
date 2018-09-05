import { Injectable } from '@angular/core';
// import { AbstractControl } from '@angular/forms';
import { LeafNode, GroupNode, ArrayNode } from './form-node';
import { NestedQuestion, RepeatingQuestion, QuestionGroup } from '../question-models/models';
import { FormControlService } from './form-control.service';
import { QuestionFactory } from './question.factory';
import { AfeControlType, AfeFormArray } from '../../abstract-controls-extension/control-extensions';
import { ControlRelationsFactory } from './control-relations.factory';
import { Validations } from '../validators/validations';
import { Form } from './form';
var FormFactory = /** @class */ (function () {
    function FormFactory(controlService, questionFactroy, controlRelationsFactory) {
        this.controlService = controlService;
        this.questionFactroy = questionFactroy;
        this.controlRelationsFactory = controlRelationsFactory;
        this.hd = {
            getValue: function () {
                return 20;
            }
        };
    }
    FormFactory.prototype.createForm = function (schema, dataSource) {
        var form = new Form(schema, this, this.questionFactroy);
        if (dataSource) {
            for (var key in dataSource) {
                if (dataSource.hasOwnProperty(key)) {
                    form.dataSourcesContainer.registerDataSource(key, dataSource[key], false);
                }
            }
        }
        var question = this.questionFactroy.createQuestionModel(schema, form);
        form.rootNode = this.createNode(question, null, null, form);
        this.buildRelations(form.rootNode);
        form.updateHiddenDisabledStateForAllControls();
        form.updateAlertsForAllControls();
        return form;
    };
    FormFactory.prototype.buildRelations = function (rootNode) {
        Validations.JSExpressionValidatorsEnabled = false;
        this.controlRelationsFactory.buildRelations(rootNode);
        // enable js expression validations
        Validations.JSExpressionValidatorsEnabled = true;
    };
    FormFactory.prototype.createNode = function (question, parentNode, parentControl, form) {
        var node = null;
        if (question instanceof NestedQuestion) {
            if (question instanceof RepeatingQuestion) {
                node = this.createArrayNode(question, parentNode, parentControl, form);
            }
            else {
                node = this.createGroupNode(question, parentNode, parentControl, form);
            }
        }
        else {
            node = this.createLeafNode(question, parentNode, parentControl, form);
        }
        return node;
    };
    FormFactory.prototype.createLeafNode = function (question, parentNode, parentControl, form) {
        var controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
        return new LeafNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
    };
    FormFactory.prototype.createGroupNode = function (question, parentNode, parentControl, form) {
        var controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
        var groupNode = new GroupNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
        this.createNodeChildren(question, groupNode, (controlModel || parentControl), form);
        return groupNode;
    };
    FormFactory.prototype.createArrayNode = function (question, parentNode, parentControl, form) {
        var _this = this;
        var controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
        var arrayNode = new ArrayNode(question, controlModel, parentControl, this, form, parentNode ? parentNode.path : undefined);
        arrayNode.createChildFunc = this.createArrayNodeChild;
        arrayNode.removeChildFunc = this.removeArrayNodeChild;
        arrayNode.addChildNodeCreatedListener(function (node) {
            Validations.JSExpressionValidatorsEnabled = false;
            _this.controlRelationsFactory.buildArrayNodeRelations(node);
            Validations.JSExpressionValidatorsEnabled = true;
        });
        return arrayNode;
    };
    FormFactory.prototype.createNodeChildren = function (question, node, parentControl, form) {
        var _this = this;
        question.questions.forEach(function (element) {
            var child = _this.createNode(element, node, parentControl, form);
            node.setChild(element.key, child);
        });
        return node.children;
    };
    FormFactory.prototype.createArrayNodeChild = function (question, node, factory) {
        if (factory === null || factory === undefined) {
            factory = this;
        }
        var groupQuestion = new QuestionGroup({
            key: node.path + '.' + node.children.length + '',
            type: 'group', extras: question.extras, label: '', questions: question.questions
        });
        if (question.controlType === AfeControlType.None) {
            groupQuestion.controlType = question.controlType;
        }
        var group = factory.createGroupNode(groupQuestion, null, null, node.form);
        node.children.push(group);
        if (node.control instanceof AfeFormArray) {
            var nodeControl = node.control;
            nodeControl.setControl(nodeControl.controls.length, group.control);
        }
        return group;
    };
    FormFactory.prototype.removeArrayNodeChild = function (index, node) {
        var nodeToRemove = node.children[index];
        node.children.splice(index, 1);
        if (node.control !== null || node.control !== undefined) {
            if (node.control instanceof AfeFormArray) {
                var control = node.control;
                var controlIndexToRemove = control.controls.indexOf(nodeToRemove.control);
                if (controlIndexToRemove >= 0) {
                    control.removeAt(controlIndexToRemove);
                }
            }
        }
    };
    FormFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormFactory.ctorParameters = function () { return [
        { type: FormControlService, },
        { type: QuestionFactory, },
        { type: ControlRelationsFactory, },
    ]; };
    return FormFactory;
}());
export { FormFactory };
//# sourceMappingURL=form.factory.js.map