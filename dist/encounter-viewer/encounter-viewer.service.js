import { Injectable } from '@angular/core';
import { GroupNode, LeafNode, ArrayNode } from '../form-entry/form-factory/form-node';
import * as _ from 'lodash';
var comma = ', ';
var newLine = '\n';
var EncounterViewerService = (function () {
    function EncounterViewerService() {
    }
    EncounterViewerService.prototype.traverse = function (node, schema, initialValue) {
        var _this = this;
        var answer = initialValue || '';
        if (node.question.renderingType === 'form' || node.question.renderingType === 'page'
            || node.question.renderingType === 'section') {
            _.forEach(node.children, function (childNode) {
                _this.traverse(childNode, schema);
            });
        }
        else {
            if (this.hasAnswer(node)) {
                if (node instanceof ArrayNode) {
                    _.forEach(node.children, function (childNode) {
                        answer = _this.traverse(childNode, schema, answer);
                    });
                }
                else if (node instanceof LeafNode || node instanceof GroupNode) {
                    answer += this.getAnswers(node.initialValue, '', schema);
                }
            }
            node.initialValue = answer.toUpperCase();
        }
        return answer;
    };
    EncounterViewerService.prototype.hasAnswer = function (node) {
        var answered = false;
        if (node.initialValue) {
            answered = true;
        }
        return answered;
    };
    EncounterViewerService.prototype.questionsAnswered = function (node, answered) {
        var _this = this;
        var $answered = answered || [];
        if (node.question.renderingType === 'page') {
            _.forEach(node.children, function (childNode) {
                _this.questionsAnswered(childNode, $answered);
            });
        }
        else if (node.question.renderingType === 'section') {
            _.forEach(node.children, function (childNode) {
                if (_this.hasAnswer(childNode)) {
                    $answered.push(true);
                }
            });
        }
        else {
            return this.hasAnswer(node);
        }
        if ($answered.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    EncounterViewerService.prototype.getAnswers = function (initialValue, separator, schema) {
        var _this = this;
        var answer = '';
        if (initialValue.value) {
            if (this.isConcept(initialValue.value)) {
                var a = this.findFormAnswerLabel(initialValue.concept.uuid, initialValue.value.uuid, schema);
                if (a) {
                    answer += a + separator;
                }
                else {
                    answer = initialValue.value.display + comma;
                }
            }
            else {
                answer += this.getAnswers(initialValue.value, '', schema);
            }
        }
        else if (_.isNumber(initialValue)) {
            answer += initialValue + separator;
        }
        else if (this.isDate(initialValue)) {
            answer += this.convertTime(initialValue);
        }
        else if (initialValue.groupMembers) {
            if (initialValue.groupMembers.length === 1) {
                answer += this.getAnswers(initialValue.groupMembers[0], newLine, schema);
            }
            else {
                _.forEach(initialValue.groupMembers, function (groupMember) {
                    answer += newLine + newLine + groupMember.display + newLine;
                });
            }
        }
        else if (_.isArray(initialValue)) {
            _.forEach(initialValue, function (val) {
                answer += _this.getAnswers(val, comma, schema);
            });
        }
        else if (_.isString(initialValue)) {
            return initialValue + separator;
        }
        return answer;
    };
    EncounterViewerService.prototype.isConcept = function (value) {
        if (value.uuid) {
            return true;
        }
        else {
            return false;
        }
    };
    EncounterViewerService.prototype.isDate = function (val) {
        if (Date.parse(val)) {
            return true;
        }
        else {
            return false;
        }
    };
    EncounterViewerService.prototype.convertTime = function (unixTimestamp) {
        var a = new Date(unixTimestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var suffix = hour < 12 ? 'AM' : 'PM';
        var time;
        if (hour === 0 && min === 0) {
            time = date + ' ' + month + ' ' + year;
        }
        else {
            time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + suffix + ' (EAT)';
        }
        return time;
    };
    EncounterViewerService.prototype.findFormAnswerLabel = function (questionUuid, answerUuid, schema) {
        var _this = this;
        var label;
        if (schema.pages) {
            _.forEach(schema.pages, function (page) {
                var l = _this.findFormAnswerLabel(questionUuid, answerUuid, page);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.sections) {
            _.forEach(schema.sections, function (section) {
                var l = _this.findFormAnswerLabel(questionUuid, answerUuid, section);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.questions) {
            _.forEach(schema.questions, function (question) {
                if (question.questions) {
                    var l = _this.findFormAnswerLabel(questionUuid, answerUuid, question);
                    if (l) {
                        label = l;
                    }
                }
                else {
                    if (question.questionOptions.concept === questionUuid
                        && question.questionOptions.answers) {
                        _.forEach(question.questionOptions.answers, function (answer) {
                            if (answer.concept === answerUuid) {
                                label = answer.label;
                            }
                        });
                    }
                }
            });
        }
        return label;
    };
    return EncounterViewerService;
}());
export { EncounterViewerService };
EncounterViewerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EncounterViewerService.ctorParameters = function () { return []; };
//# sourceMappingURL=encounter-viewer.service.js.map