import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { LeafNode, GroupNode } from '../form-factory/form-node';
import { ObsAdapterHelper } from './obs-adapter-helper';
var ObsValueAdapter = (function () {
    function ObsValueAdapter(helper) {
        this.helper = helper;
    }
    ObsValueAdapter.prototype.generateFormPayload = function (form) {
        return this.helper.getObsNodePayload(form.rootNode);
        // TODO: Get rid of the section below when the helper is stable.
        // // Traverse  to get all nodes
        // let pages = this.traverse(form.rootNode);
        // // Extract actual question nodes
        // let questionNodes = this.getQuestionNodes(pages);
        // // Get obs Payload
        // return this.getObsPayload(questionNodes);
    };
    ObsValueAdapter.prototype.populateForm = function (form, payload) {
        this.helper.setNodeValue(form.rootNode, payload);
        // TODO: Get rid of the section below when the helper is stable.
        // // Traverse  to get all nodes
        // let pages = this.traverse(form.rootNode);
        // // Extract actual question nodes
        // let questionNodes = this.getQuestionNodes(pages);
        // // Extract set obs
        // this.setValues(questionNodes, payload);
    };
    // TODO: Get rid of all the functions below as they will not be needed
    // once the helper is stable
    ObsValueAdapter.prototype.setValues = function (nodes, payload, forcegroup) {
        if (nodes) {
            var _loop_1 = function (node) {
                if (node instanceof LeafNode) {
                    this_1.setObsValue(node, payload);
                    if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
                        node.question.setHistoricalValue(false);
                    }
                }
                else if (node.question && node.question.extras && node.question.renderingType === 'group' || forcegroup) {
                    var groupObs = _.find(payload, function (o) {
                        return o.concept.uuid === node.question.extras.questionOptions.concept && o.groupMembers;
                    });
                    if (groupObs) {
                        if (node.node) {
                            node.node['initialValue'] = groupObs;
                        }
                        this_1.setValues(node.groupMembers, groupObs.groupMembers);
                    }
                    if (forcegroup && node.payload) {
                        this_1.setValues(node.groupMembers, node.payload.groupMembers);
                    }
                }
                else if (node instanceof GroupNode && node.question.extras.type === 'complex-obs') {
                    this_1.setComplexObsValue(node, payload);
                }
                else if (node.question && node.question.extras && node.question.renderingType === 'repeating' && !forcegroup) {
                    this_1.setRepeatingGroupValues(node, payload);
                    node.node.control.updateValueAndValidity();
                }
                else {
                    throw new Error('not implemented');
                }
            };
            var this_1 = this;
            for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                var node = nodes_1[_i];
                _loop_1(node);
            }
        }
    };
    ObsValueAdapter.prototype.setObsValue = function (node, payload) {
        if (node.question && node.question.extras &&
            (node.question.extras.type === 'obs' ||
                (node.question.extras.type === 'complex-obs-child' &&
                    node.question.extras.questionOptions.obsField === 'value')) &&
            node.question.extras.questionOptions.rendering !== 'multiCheckbox') {
            var obs = _.find(payload, function (o) {
                return o.concept.uuid === node.question.extras.questionOptions.concept;
            });
            if (obs) {
                if (obs.value instanceof Object) {
                    node.control.setValue(obs.value.uuid);
                    node.control.updateValueAndValidity();
                }
                else {
                    node.control.setValue(obs.value);
                    node.control.updateValueAndValidity();
                }
                node['initialValue'] = { obsUuid: obs.uuid, value: obs.value };
            }
        }
        else {
            var multiObs = _.filter(payload, function (o) {
                return o.concept.uuid === node.question.extras.questionOptions.concept;
            });
            if (multiObs && multiObs.length > 0) {
                node.control.setValue(this.getMultiselectValues(multiObs));
                node.control.updateValueAndValidity();
                node['initialValue'] = multiObs;
            }
        }
    };
    ObsValueAdapter.prototype.setComplexObsValue = function (node, payload) {
        var valueField;
        var dateField;
        // tslint:disable-next-line:forin
        for (var o in node.children) {
            if (node.children[o].question.extras.questionOptions.obsField === 'value') {
                valueField = node.children[o];
            }
            if (node.children[o].question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = node.children[o];
            }
        }
        // set the usual obs value
        this.setObsValue(valueField, payload);
        // set the obs date
        var obs = _.find(payload, function (o) {
            return o.concept.uuid === node.question.extras.questionOptions.concept;
        });
        if (obs) {
            dateField['initialValue'] = { obsUuid: obs.uuid, value: obs.obsDatetime };
            dateField.control.setValue(obs.obsDatetime);
            dateField.control.updateValueAndValidity();
        }
    };
    ObsValueAdapter.prototype.getMultiselectValues = function (multiObs) {
        var values = [];
        for (var _i = 0, multiObs_1 = multiObs; _i < multiObs_1.length; _i++) {
            var m = multiObs_1[_i];
            values.push(m.value.uuid);
        }
        return values;
    };
    ObsValueAdapter.prototype.setRepeatingGroupValues = function (node, payload) {
        var groupRepeatingObs = _.filter(payload, function (o) {
            var found = o.concept.uuid === node.question.extras.questionOptions.concept;
            var intersect = false;
            if (found && o.groupMembers) {
                var obs = o.groupMembers.map(function (a) {
                    return a.concept.uuid;
                });
                var schemaQuestions = node.question.questions.map(function (a) {
                    return a.extras.questionOptions.concept;
                });
                intersect = (_.intersection(obs, schemaQuestions).length > 0);
            }
            return found && intersect;
        });
        if (groupRepeatingObs.length > 0) {
            node.node['initialValue'] = groupRepeatingObs;
            for (var i = 0; i < groupRepeatingObs.length; i++) {
                node.node.createChildNode();
            }
        }
        var groups = [];
        var index = 0;
        var _loop_2 = function (child) {
            var children = Object.keys(child.children).map(function (key) { return child.children[key]; });
            var groupPayload = groupRepeatingObs[index];
            groups.push({ question: node.question, groupMembers: children, payload: groupPayload });
            index++;
        };
        for (var _i = 0, _a = node.node.children; _i < _a.length; _i++) {
            var child = _a[_i];
            _loop_2(child);
        }
        this.setValues(groups, groupRepeatingObs, true);
    };
    ObsValueAdapter.prototype.getQuestionNodes = function (pages) {
        var merged = [];
        var arrays = [];
        for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
            var page = pages_1[_i];
            for (var _a = 0, _b = page.page; _a < _b.length; _a++) {
                var section = _b[_a];
                arrays.push(section.section);
            }
        }
        return merged.concat.apply([], arrays);
    };
    ObsValueAdapter.prototype.repeatingGroup = function (nodes) {
        var toReturn = [];
        for (var _i = 0, nodes_2 = nodes; _i < nodes_2.length; _i++) {
            var node = nodes_2[_i];
            toReturn.push({ question: node.question, groupMembers: this.traverse(node) });
        }
        return toReturn;
    };
    ObsValueAdapter.prototype.processGroup = function (obs, obsPayload) {
        if (obs.question && obs.question.extras && obs.question.extras.questionOptions.rendering === 'group') {
            var members = _.filter(this.getObsPayload(obs.groupMembers), function (o) {
                return o.value !== '';
            });
            var mappedMembers = members.map(function (a) {
                return a.voided;
            });
            if (members.length > 0 && mappedMembers.every(Boolean)) {
                obsPayload.push({
                    uuid: obs.node.initialValue.uuid,
                    voided: true
                });
            }
            else if (members.length > 0) {
                if (obs.node.initialValue) {
                    obsPayload.push({
                        uuid: obs.node.initialValue.uuid,
                        groupMembers: members
                    });
                }
                else {
                    obsPayload.push({
                        concept: obs.question.extras.questionOptions.concept,
                        groupMembers: members
                    });
                }
            }
        }
    };
    ObsValueAdapter.prototype.mapInitialGroup = function (group) {
        var current = {};
        for (var _i = 0, _a = group.groupMembers; _i < _a.length; _i++) {
            var member = _a[_i];
            var value = '';
            if (member.value instanceof Object) {
                value = member.value.uuid;
            }
            else if (member.value) {
                value = member.value;
            }
            else if (member.groupMembers && member.groupMembers.length > 0) {
                current = this.mapInitialGroup(group);
            }
            current[member.concept.uuid + ':' + value] = value;
        }
        return current;
    };
    ObsValueAdapter.prototype.mapModelGroup = function (node, value) {
        var current = {};
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                var groupQuestion = _.find(node.question.questions, { key: key });
                var modelValue = value[key];
                if (modelValue instanceof Object) {
                }
                else if (modelValue !== '') {
                    current[groupQuestion.extras.questionOptions.concept + ':'
                        + modelValue] = modelValue;
                }
            }
        }
        return current;
    };
    ObsValueAdapter.prototype.processRepeatingGroups = function (node, obsPayload) {
        var initialValues = [];
        if (node.node.initialValue) {
            for (var _i = 0, _a = node.node.initialValue; _i < _a.length; _i++) {
                var group = _a[_i];
                initialValues.push({ uuid: group.uuid, value: this.mapInitialGroup(group) });
            }
        }
        var repeatingModel = [];
        for (var _b = 0, _c = node.node.control.value; _b < _c.length; _b++) {
            var value = _c[_b];
            repeatingModel.push({ value: this.mapModelGroup(node, value) });
        }
        var deleted = this.leftOuterJoinArrays(initialValues, repeatingModel);
        var newObs = this.leftOuterJoinArrays(repeatingModel, initialValues);
        var groupConcept = node.question.extras.questionOptions.concept;
        var newObsPayload = [];
        if (deleted.length > 0) {
            var deletedObs = this.createGroupDeletedObs(deleted);
            for (var _d = 0, deletedObs_1 = deletedObs; _d < deletedObs_1.length; _d++) {
                var d = deletedObs_1[_d];
                obsPayload.push(d);
            }
            if (newObs.length > 0) {
                newObsPayload = this.createGroupNewObs(newObs, groupConcept);
            }
        }
        else {
            newObsPayload = this.createGroupNewObs(newObs, groupConcept);
        }
        if (newObsPayload.length > 0) {
            for (var _e = 0, newObsPayload_1 = newObsPayload; _e < newObsPayload_1.length; _e++) {
                var p = newObsPayload_1[_e];
                obsPayload.push(p);
            }
        }
    };
    ObsValueAdapter.prototype.leftOuterJoinArrays = function (first, second) {
        var unique = first.filter(function (obj) {
            return !second.some(function (obj2) {
                return _.isEqual(obj.value, obj2.value);
            });
        });
        return unique;
    };
    ObsValueAdapter.prototype.createGroupNewObs = function (payload, groupConcept) {
        var newPayload = [];
        for (var _i = 0, payload_1 = payload; _i < payload_1.length; _i++) {
            var obs = payload_1[_i];
            var groupPayload = [];
            /* tslint:disable */
            for (var key in obs.value) {
                var concept = key.split(':')[0];
                var value = key.split(':')[1];
                groupPayload.push({ concept: concept, value: value });
            }
            newPayload.push({ concept: groupConcept, groupMembers: groupPayload });
            /* tslint:enable */
        }
        return newPayload;
    };
    ObsValueAdapter.prototype.createGroupDeletedObs = function (payload) {
        var deletedObs = [];
        for (var _i = 0, payload_2 = payload; _i < payload_2.length; _i++) {
            var d = payload_2[_i];
            deletedObs.push({ uuid: d.uuid, voided: true });
        }
        return deletedObs;
    };
    ObsValueAdapter.prototype.getExactTime = function (datetime) {
        return datetime.substring(0, 19).replace('T', ' ');
    };
    ObsValueAdapter.prototype.processObs = function (obs, obsPayload) {
        if (obs.control && obs.question.extras) {
            var obsValue = {
                concept: obs.question.extras.questionOptions.concept,
                value: (obs.question.extras.questionOptions.rendering === 'date' && !this.isEmpty(obs.control.value)) ?
                    this.getExactTime(obs.control.value) : obs.control.value
            };
            if (obs.question.extras.questionOptions.rendering === 'multiCheckbox') {
                var multis = this.processMultiSelect(obs.question.extras.questionOptions.concept, obs.control.value);
                if (obs.initialValue) {
                    var mappedInitial = obs.initialValue.map(function (a) {
                        return { uuid: a.uuid, value: { concept: a.concept.uuid, value: a.value.uuid } };
                    });
                    var mappedCurrent = multis.map(function (a) {
                        return { value: a };
                    });
                    var deletedObs = this.leftOuterJoinArrays(mappedInitial, mappedCurrent);
                    var newObs = this.leftOuterJoinArrays(mappedCurrent, mappedInitial);
                    this.processDeletedMultiSelectObs(deletedObs, obsPayload);
                    this.processNewMultiSelectObs(newObs, obsPayload);
                }
                else {
                    this.processNewMultiSelectObs(multis, obsPayload);
                }
            }
            else {
                if (obs.initialValue && obs.initialValue.value && obsValue) {
                    this.updateOrVoidObs(obsValue, obs.initialValue, obsPayload);
                }
                else if (obsValue.value !== '' && obsValue.value !== null) {
                    obsPayload.push(obsValue);
                }
            }
        }
    };
    ObsValueAdapter.prototype.processComplexObs = function (node, obsPayload) {
        var valueField;
        var dateField;
        // tslint:disable-next-line:forin
        for (var o in node.children) {
            if (node.children[o].question.extras.questionOptions.obsField === 'value') {
                valueField = node.children[o];
            }
            if (node.children[o].question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = node.children[o];
            }
        }
        if (valueField) {
            // process obs as usual
            this.processObs(valueField, obsPayload);
            // obtain the last inserted obs and set the obsDatetime
            var createdPayload = obsPayload.length > 0 ? obsPayload[obsPayload.length - 1] : undefined;
            if (createdPayload &&
                ((createdPayload.concept && createdPayload.concept === node.question.extras.questionOptions.concept) ||
                    (valueField.initialValue && createdPayload.uuid === valueField.initialValue.obsUuid))) {
                if (dateField.initialValue && dateField.control.value !== dateField.initialValue.value) {
                    createdPayload.obsDatetime = dateField.control.value;
                }
            }
        }
    };
    ObsValueAdapter.prototype.processDeletedMultiSelectObs = function (values, obsPayload) {
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            obsPayload.push({ uuid: value.uuid, voided: true });
        }
    };
    ObsValueAdapter.prototype.processNewMultiSelectObs = function (values, obsPayload) {
        for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
            var multi = values_2[_i];
            if (multi.value instanceof Object) {
                obsPayload.push(multi.value);
            }
            else {
                obsPayload.push(multi);
            }
        }
    };
    ObsValueAdapter.prototype.updateOrVoidObs = function (obsValue, initialValue, obsPayload) {
        if (this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, voided: true });
        }
        else if (!this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, value: obsValue.value });
        }
    };
    ObsValueAdapter.prototype.isEmpty = function (value) {
        if (value === '' ||
            value === null ||
            value === undefined) {
            return true;
        }
        return false;
    };
    ObsValueAdapter.prototype.traverse = function (o, type) {
        var questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                var returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (var key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                var page = this.traverse(o.children[key]);
                                questions.push({ page: page });
                                break;
                            case 'section':
                                var section = this.traverse(o.children[key]);
                                questions.push({ section: section });
                                break;
                            case 'group':
                                var qs = this.traverse(o.children[key]);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
                                var rep = this.repeatingGroup(o.children[key].children);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: rep });
                                break;
                            default:
                                questions.push(o.children[key]);
                                break;
                        }
                    }
                }
            }
        }
        return questions;
    };
    ObsValueAdapter.prototype.processMultiSelect = function (concept, values) {
        var multiSelectObs = [];
        if (values && values !== null) {
            for (var _i = 0, values_3 = values; _i < values_3.length; _i++) {
                var value = values_3[_i];
                var obs = {
                    concept: concept,
                    value: value
                };
                multiSelectObs.push(obs);
            }
        }
        return multiSelectObs;
    };
    ObsValueAdapter.prototype.isObs = function (node) {
        return (node.question.extras.type === 'obs' ||
            node.question.extras.type === 'obsGroup' ||
            node.question.extras.type === 'complex-obs');
    };
    ObsValueAdapter.prototype.getObsPayload = function (nodes) {
        var obsPayload = [];
        for (var _i = 0, nodes_3 = nodes; _i < nodes_3.length; _i++) {
            var node = nodes_3[_i];
            if (this.isObs(node)) {
                if (node.groupMembers, node.question.extras.questionOptions.rendering === 'group') {
                    this.processGroup(node, obsPayload);
                }
                else if (node.groupMembers, node.question.extras.questionOptions.rendering === 'repeating') {
                    this.processRepeatingGroups(node, obsPayload);
                }
                else if (node instanceof GroupNode && node.question.extras.type === 'complex-obs') {
                    this.processComplexObs(node, obsPayload);
                }
                else {
                    this.processObs(node, obsPayload);
                }
            }
        }
        return obsPayload;
    };
    ObsValueAdapter.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ObsValueAdapter.ctorParameters = function () { return [
        { type: ObsAdapterHelper, },
    ]; };
    return ObsValueAdapter;
}());
export { ObsValueAdapter };
//# sourceMappingURL=obs.adapter.js.map