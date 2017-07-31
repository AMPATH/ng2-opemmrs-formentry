import { Injectable } from '@angular/core';
import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
import { ObsValueAdapter } from './obs.adapter';
import { OrderValueAdapter } from './order.adapter';
var moment = require('moment');
var EncounterAdapter = (function () {
    function EncounterAdapter(ordersAdapter, obsAdapter) {
        this.ordersAdapter = ordersAdapter;
        this.obsAdapter = obsAdapter;
    }
    EncounterAdapter.prototype.populateForm = function (form, payload) {
        this.populateNode(form.rootNode, payload);
        if (Array.isArray(payload.orders)) {
            this.ordersAdapter.populateForm(form, payload);
        }
        if (Array.isArray(payload.obs)) {
            this.obsAdapter.populateForm(form, payload.obs);
        }
    };
    EncounterAdapter.prototype.populateNode = function (rootNode, payload) {
        if (payload === undefined || payload === null) {
            throw 'Expected payload';
        }
        var nodes = this.getEncounterNodes(rootNode);
        nodes.forEach(function (node) {
            switch (node.question.extras.type) {
                case 'encounterDatetime':
                    if (payload['encounterDatetime']) {
                        console.log('date', payload['encounterDatetime']);
                        node.control.setValue(moment(payload['encounterDatetime']).toDate());
                        node.initialValue = moment(payload['encounterDatetime']).toDate();
                    }
                    break;
                case 'encounterProvider':
                    if (payload['provider'] && payload['provider'].uuid) {
                        node.control.setValue(payload['provider'].uuid);
                        node.initialValue = payload['provider'].uuid;
                    }
                    break;
                case 'encounterLocation':
                    if (payload['location'] && payload['location'].uuid) {
                        node.control.setValue(payload['location'].uuid);
                        node.initialValue = payload['location'].uuid;
                    }
                    break;
                default:
                    break;
            }
        });
    };
    EncounterAdapter.prototype.generateFormPayload = function (form) {
        var payload = this.generateNodePayload(form.rootNode);
        this.setNonFilledPayloadMembers(form, payload);
        payload['obs'] = this.obsAdapter.generateFormPayload(form) || [];
        payload['orders'] = this.ordersAdapter.generateFormPayload(form) || [];
        return payload;
    };
    EncounterAdapter.prototype.generateNodePayload = function (rootNode) {
        var nodes = this.getEncounterNodes(rootNode);
        var payload = {};
        nodes.forEach(function (node) {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '') {
                switch (node.question.extras.type) {
                    case 'encounterDatetime':
                        var dateValue = moment(node.control.value)
                            .utcOffset(rootNode.form.valueProcessingInfo.utcOffset || '+0300');
                        payload['encounterDatetime'] = dateValue.format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 'encounterProvider':
                        payload['provider'] = node.control.value;
                        break;
                    case 'encounterLocation':
                        payload['location'] = node.control.value;
                        break;
                    default:
                        break;
                }
            }
        });
        return payload;
    };
    EncounterAdapter.prototype.getEncounterNodes = function (rootNode) {
        var results = [];
        this._getEncounterNodes(rootNode, results);
        return results;
    };
    EncounterAdapter.prototype.setNonFilledPayloadMembers = function (form, payload) {
        if (form.valueProcessingInfo.patientUuid) {
            this.setPayloadPatientUuid(payload, form.valueProcessingInfo.patientUuid);
        }
        if (form.valueProcessingInfo.visitUuid) {
            this.setPayloadVisitUuid(payload, form.valueProcessingInfo.visitUuid);
        }
        if (form.valueProcessingInfo.encounterTypeUuid) {
            this.setPayloadEncounterTypeUuid(payload, form.valueProcessingInfo.encounterTypeUuid);
        }
        if (form.valueProcessingInfo.formUuid) {
            this.setPayloadFormUuid(payload, form.valueProcessingInfo.formUuid);
        }
        if (form.valueProcessingInfo.encounterUuid) {
            this.setPayloadEncounterUuid(payload, form.valueProcessingInfo.encounterUuid);
        }
    };
    EncounterAdapter.prototype.setPayloadPatientUuid = function (payload, patientUuid) {
        payload['patient'] = patientUuid;
    };
    EncounterAdapter.prototype.setPayloadVisitUuid = function (payload, visitUuid) {
        payload['visit'] = visitUuid;
    };
    EncounterAdapter.prototype.setPayloadEncounterTypeUuid = function (payload, encounterTypeUuid) {
        payload['encounterType'] = encounterTypeUuid;
    };
    EncounterAdapter.prototype.setPayloadFormUuid = function (payload, formUuid) {
        payload['form'] = formUuid;
    };
    EncounterAdapter.prototype.setPayloadEncounterUuid = function (payload, encounterUuid) {
        payload['uuid'] = encounterUuid;
    };
    EncounterAdapter.prototype._getEncounterNodes = function (rootNode, array) {
        var _this = this;
        if (this._isEncounterNode(rootNode)) {
            array.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            var node = rootNode;
            // tslint:disable-next-line:forin
            for (var o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getEncounterNodes(node.children[o], array);
                }
            }
        }
        if (rootNode instanceof ArrayNode) {
            var node = rootNode;
            node.children.forEach(function (child) {
                _this._getEncounterNodes(child, array);
            });
        }
    };
    EncounterAdapter.prototype._isEncounterNode = function (node) {
        if (node.question.extras &&
            (node.question.extras.type === 'encounterDatetime' ||
                node.question.extras.type === 'encounterProvider' ||
                node.question.extras.type === 'encounterLocation')) {
            return true;
        }
        return false;
    };
    return EncounterAdapter;
}());
export { EncounterAdapter };
EncounterAdapter.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EncounterAdapter.ctorParameters = function () { return [
    { type: OrderValueAdapter, },
    { type: ObsValueAdapter, },
]; };
//# sourceMappingURL=encounter.adapter.js.map