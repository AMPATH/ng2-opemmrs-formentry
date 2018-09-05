import { Injectable } from '@angular/core';
import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
var PersonAttribuAdapter = /** @class */ (function () {
    function PersonAttribuAdapter() {
    }
    PersonAttribuAdapter.prototype.generateFormPayload = function (form) {
        return this.generateNodePayload(form.rootNode);
    };
    PersonAttribuAdapter.prototype.generateNodePayload = function (rootNode) {
        var nodes = this.getPersonAttributeNodes(rootNode);
        var payload = [];
        nodes.forEach(function (node) {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '' &&
                node.initialValue !== node.control.value) {
                if (node.question.extras.questionOptions.isSimpleValue === true) {
                    payload.push({
                        attributeType: node.question.extras.questionOptions.attributeType,
                        value: node.control.value
                    });
                }
                else {
                    payload.push({
                        attributeType: node.question.extras.questionOptions.attributeType,
                        hydratedObject: node.control.value
                    });
                }
            }
        });
        return payload;
    };
    PersonAttribuAdapter.prototype.populateForm = function (form, payload) {
        this.populateNode(form.rootNode, payload);
    };
    PersonAttribuAdapter.prototype.populateNode = function (rootNode, payload) {
        if (!Array.isArray(payload)) {
            throw 'Expected an array of attributes';
        }
        var nodes = this.getPersonAttributeNodes(rootNode);
        nodes.forEach(function (node) {
            payload.forEach(function (element) {
                if (element.attributeType.uuid
                    === node.question.extras.questionOptions.attributeType) {
                    if (element.value.uuid) {
                        node.control.setValue(element.value.uuid);
                        node.initialValue = element.value.uuid;
                    }
                    else {
                        node.control.setValue(element.value);
                        node.initialValue = element.value;
                    }
                }
            });
        });
    };
    PersonAttribuAdapter.prototype.getPersonAttributeNodes = function (rootNode) {
        var results = [];
        this._getPersonAttributesNodes(rootNode, results);
        return results;
    };
    PersonAttribuAdapter.prototype._getPersonAttributesNodes = function (rootNode, array) {
        var _this = this;
        if (rootNode.question.extras &&
            rootNode.question.extras.type === 'personAttribute') {
            array.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            var node = rootNode;
            // tslint:disable-next-line:forin
            for (var o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getPersonAttributesNodes(node.children[o], array);
                }
            }
        }
        if (rootNode instanceof ArrayNode) {
            var node = rootNode;
            node.children.forEach(function (child) {
                _this._getPersonAttributesNodes(child, array);
            });
        }
    };
    PersonAttribuAdapter.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PersonAttribuAdapter.ctorParameters = function () { return []; };
    return PersonAttribuAdapter;
}());
export { PersonAttribuAdapter };
//# sourceMappingURL=person-attribute.adapter.js.map