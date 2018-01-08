import { Injectable } from '@angular/core';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { GroupNode, LeafNode, ArrayNode } from './form-node';
var ControlRelationsFactory = (function () {
    function ControlRelationsFactory() {
    }
    ControlRelationsFactory.prototype.buildRelations = function (rootNode) {
        var controlsStore = this.mapControlIds(rootNode, {});
        for (var key in controlsStore) {
            if (controlsStore.hasOwnProperty(key)) {
                var nodeBase = controlsStore[key];
                this.setRelations(controlsStore, nodeBase);
            }
        }
    };
    ControlRelationsFactory.prototype.buildArrayNodeRelations = function (node) {
        var form = node.form;
        if (!form) {
            return;
        }
        var rootNode = form.rootNode;
        // build relations for controls in the same array
        this.buildRelations(node);
        // build relations for control outside the array
        var rootControlsStore = this.mapControlIds(rootNode, {});
        var arrayControlStore = this.mapControlIds(node, {});
        for (var key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                var child = rootControlsStore[key];
                if (child instanceof LeafNode) {
                    var questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        this.setRelations(arrayControlStore, child);
                    }
                }
            }
        }
        // define relations for controls outside the group to controls in this group
        this.createRelationsToArrayControls(node);
        // fire relations
        for (var id in arrayControlStore) {
            if (arrayControlStore.hasOwnProperty(id)) {
                var child = arrayControlStore[id];
                var control = child.control;
                control.updateHiddenState();
                control.updateAlert();
            }
        }
    };
    ControlRelationsFactory.prototype.createRelationsToArrayControls = function (node) {
        var form = node.form;
        var rootNode = form.rootNode;
        // build relations for control outside the array
        var rootControlsStore = this.mapControlIds(rootNode, {});
        var arrayControlStore = this.mapControlIds(node, {});
        // loop through form controls
        for (var key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                var rChild = rootControlsStore[key];
                var parentNodePath = node.path.substring(0, node.path.lastIndexOf('.'));
                if (rChild.path.indexOf(parentNodePath + '.') === -1) {
                    var _loop_1 = function (id) {
                        if (arrayControlStore.hasOwnProperty(id)) {
                            var aChild = arrayControlStore[id];
                            var aChildId = aChild.question.key;
                            if (this_1.hasRelation(aChildId, rChild.question)) {
                                var nodes = node.form.searchNodeByPath(rootNode, parentNodePath, []);
                                if (nodes.length > 0) {
                                    var an = nodes[0];
                                    var rootControl_1 = rChild.control;
                                    if (rootControl_1.controlRelations.otherRelations.indexOf(an) === -1) {
                                        rootControl_1.controlRelations.otherRelations.push(an);
                                    }
                                    aChild.control.addValueChangeListener(function (value) {
                                        if (rootControl_1.updateCalculatedValue) {
                                            rootControl_1.updateCalculatedValue();
                                        }
                                        rootControl_1.updateValueAndValidity();
                                        if (rootControl_1.updateHiddenState) {
                                            rootControl_1.updateHiddenState();
                                        }
                                        if (rootControl_1.updateAlert) {
                                            rootControl_1.updateAlert();
                                        }
                                        if (rootControl_1.updateDisabledState) {
                                            rootControl_1.updateDisabledState();
                                        }
                                    });
                                }
                            }
                        }
                    };
                    var this_1 = this;
                    // loop through controls in the array group
                    for (var id in arrayControlStore) {
                        _loop_1(id);
                    }
                }
            }
        }
    };
    ControlRelationsFactory.prototype.getRelationsForControl = function (id, node) {
        var relations = new Array();
        var nodeBaseArray = node.form.searchNodeByQuestionId(id);
        if (nodeBaseArray.length > 0) {
            var nodeBase = nodeBaseArray[0];
            var controlList = this.mapControlIds(node, {});
            for (var key in controlList) {
                if (controlList.hasOwnProperty(key)) {
                    if (this.hasRelation(controlList[key].question.key, nodeBase.question)) {
                        relations.push(controlList[key].control);
                    }
                }
            }
        }
        return relations;
    };
    ControlRelationsFactory.prototype.mapControlIds = function (node, controlsStore) {
        var children = node.children;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
                var child = children[key];
                if (child instanceof GroupNode) {
                    this.mapControlIds(child, controlsStore);
                }
                else if (child instanceof LeafNode) {
                    var questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
                else if (child instanceof ArrayNode) {
                    var questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
            }
        }
        return controlsStore;
    };
    ControlRelationsFactory.prototype.setRelations = function (controlsStore, nodeBase) {
        var questionBase = nodeBase.question;
        var id = questionBase.key;
        for (var key in controlsStore) {
            if (controlsStore.hasOwnProperty(key) && key !== id) {
                var node = controlsStore[key];
                var question = node.question;
                if (this.hasRelation(id, question, nodeBase)) {
                    this.addRelationToControl(node.control, nodeBase.control);
                }
                // add conditional required and conditional answered relations
                if (typeof question.required === 'object') {
                    var required = question.required;
                    if (required.type === 'conditionalRequired') {
                        if (required.referenceQuestionId === id) {
                            this.addRelationToControl(node.control, nodeBase.control);
                        }
                    }
                }
            }
        }
    };
    ControlRelationsFactory.prototype.hasRelation = function (id, questionBase, nodeBase) {
        var hasRelation = false;
        if (questionBase.validators && questionBase.validators.length > 0) {
            questionBase.validators.forEach(function (element) {
                if (element instanceof JsExpressionValidationModel) {
                    var model = element;
                    var failsWhenExpression = model.failsWhenExpression;
                    if (failsWhenExpression && failsWhenExpression.indexOf(id) !== -1) {
                        hasRelation = true;
                    }
                }
                else if (element instanceof ConditionalValidationModel && element.type === 'conditionalAnswered'
                    && element.referenceQuestionId === id) {
                    hasRelation = true;
                }
            });
        }
        // add hiders and disablers relations
        if (!hasRelation) {
            if (typeof questionBase.hide === 'string') {
                var hide = questionBase.hide;
                if (hide.length > 0 && hide.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
            else if (typeof questionBase.hide === 'object') {
                var hideObj = questionBase.hide;
                if (hideObj.field === id) {
                    hasRelation = true;
                }
            }
            if (questionBase.alert && typeof questionBase.alert === 'object') {
                hasRelation = true;
            }
            if (typeof questionBase.disable === 'string') {
                var disable = questionBase.disable;
                if (disable.length > 0 && disable.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
        }
        // add calculate expressions relations
        if (!hasRelation && questionBase.calculateExpression && questionBase.calculateExpression.length > 0
            && questionBase.calculateExpression.indexOf(id) !== -1) {
            hasRelation = true;
        }
        return hasRelation;
    };
    ControlRelationsFactory.prototype.addRelationToControl = function (control, related) {
        //  let relations = control.controlRelations.relations;
        //
        //  let hasRelation = false;
        //
        //   relations.forEach(element => {
        //
        //     let controlRelation: ControlRelation = element as ControlRelation;
        //
        //     let relation: AfeFormControl | AfeFormArray = controlRelation.control as AfeFormControl | AfeFormArray;
        //
        //     if ( control.uuid !== undefined && control.uuid === relation.uuid ) {
        //       hasRelation = true;
        //     }
        //   });
        // if ( !hasRelation ) {
        control.controlRelations.addRelatedControls(related);
        // }
    };
    return ControlRelationsFactory;
}());
export { ControlRelationsFactory };
ControlRelationsFactory.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ControlRelationsFactory.ctorParameters = function () { return []; };
//# sourceMappingURL=control-relations.factory.js.map