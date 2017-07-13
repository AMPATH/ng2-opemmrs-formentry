import * as _ from 'lodash';
import { DataSources } from '../data-sources/data-sources';
import { GroupNode, LeafNode, ArrayNode } from './form-node';
var Form = (function () {
    function Form(schema, FormFactory, questionFactory) {
        this.schema = schema;
        this.FormFactory = FormFactory;
        this.questionFactory = questionFactory;
        this.valueProcessingInfo = {};
        this.existingOrders = {};
        this._showErrors = false;
        this._dataSourcesContainer = new DataSources();
    }
    Object.defineProperty(Form.prototype, "dataSourcesContainer", {
        get: function () {
            return this._dataSourcesContainer;
        },
        enumerable: true,
        configurable: true
    });
    Form.prototype.searchNodeByPath = function (node, path, found) {
        var _this = this;
        var children = node.children;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
                var child = children[key];
                if (child instanceof GroupNode) {
                    if (path === child.path) {
                        found.push(child);
                        return found;
                    }
                    this.searchNodeByPath(child, path, found);
                }
                else if (child instanceof LeafNode) {
                    if (path === child.path) {
                        found.push(child);
                        return found;
                    }
                }
                else if (child instanceof ArrayNode) {
                    if (path === child.path) {
                        found.push(child);
                        return found;
                    }
                    var aChild = child;
                    aChild.children.forEach(function (aChildNode) {
                        _this.searchNodeByPath(aChildNode, path, found);
                    });
                }
            }
        }
        return found;
    };
    Form.prototype.searchNodeByQuestionId = function (questionId, questionType) {
        var found = [];
        if (questionType) {
            this.searchNodeByQuestionType(this.rootNode, questionType, found);
        }
        else {
            this.findNodesByQuestionId(this.rootNode, questionId, found);
        }
        return found;
    };
    Form.prototype.searchNodeByQuestionType = function (rootNode, questionType, found) {
        var _this = this;
        if (rootNode instanceof GroupNode) {
            var nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this.searchNodeByQuestionType(nodeAsGroup.children[o], questionType, found);
            }
        }
        if (rootNode instanceof ArrayNode) {
            var nodeAsArray = rootNode;
            nodeAsArray.children.forEach(function (node) {
                _this.searchNodeByQuestionType(node, questionType, found);
            });
        }
        if (rootNode instanceof LeafNode) {
            var questionBase = rootNode.question;
            if (questionBase.extras && questionBase.extras.type && questionBase.extras.type === questionType) {
                found.push(rootNode);
            }
        }
    };
    Form.prototype.findNodesByQuestionId = function (rootNode, questionId, results) {
        var _this = this;
        if (rootNode.question.key === questionId) {
            results.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            var nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this.findNodesByQuestionId(nodeAsGroup.children[o], questionId, results);
            }
        }
        if (rootNode instanceof ArrayNode) {
            var nodeAsArray = rootNode;
            nodeAsArray.children.forEach(function (node) {
                _this.findNodesByQuestionId(node, questionId, results);
            });
        }
    };
    Object.defineProperty(Form.prototype, "valid", {
        get: function () {
            return this.rootNode.control.valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "showErrors", {
        get: function () {
            return this._showErrors;
        },
        set: function (show) {
            this._showErrors = show;
        },
        enumerable: true,
        configurable: true
    });
    Form.prototype.markInvalidControls = function (node, invalidControlNodes) {
        var _this = this;
        var children = node.children;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
                var child = children[key];
                if (child instanceof GroupNode) {
                    this.markInvalidControls(child, invalidControlNodes);
                }
                else if (child instanceof LeafNode) {
                    var questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        var c = child.control;
                        if (!c.valid && !c.disabled) {
                            if (invalidControlNodes) {
                                invalidControlNodes.push(child);
                            }
                            c.markAsTouched();
                        }
                    }
                }
                else if (child instanceof ArrayNode) {
                    var arrayNode = child;
                    if (arrayNode && arrayNode.children && arrayNode.children.length > 0) {
                        _.forEach(arrayNode.children, function (groupNode) {
                            _this.markInvalidControls(groupNode, invalidControlNodes);
                        });
                    }
                }
            }
        }
        return invalidControlNodes;
    };
    Form.prototype.updateHiddenDisabledStateForAllControls = function () {
        this._updateHiddenDisabledStateForAllControls(this.rootNode);
    };
    Form.prototype._updateHiddenDisabledStateForAllControls = function (rootNode) {
        var _this = this;
        if (rootNode.control) {
            if (rootNode.control.updateDisabledState) {
                rootNode.control.updateDisabledState();
            }
            if (rootNode.control.updateHiddenState) {
                rootNode.control.updateHiddenState();
            }
        }
        if (rootNode instanceof GroupNode) {
            var nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this._updateHiddenDisabledStateForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            var nodeAsArray = rootNode;
            nodeAsArray.children.forEach(function (node) {
                _this._updateHiddenDisabledStateForAllControls(node);
            });
        }
    };
    return Form;
}());
export { Form };
//# sourceMappingURL=form.js.map