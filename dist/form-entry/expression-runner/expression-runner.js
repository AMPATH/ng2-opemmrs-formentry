import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
import { ArrayNode } from '../form-factory/form-node';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
var moment = require('moment');
var ExpressionRunner = (function () {
    function ExpressionRunner() {
    }
    ExpressionRunner.prototype.getRunnable = function (expression, control, helper, dataDependencies, form) {
        var runner = this;
        var runnable = {
            run: function () {
                /* tslint:disable */
                var scope = {};
                if (control.uuid) {
                    scope[control.uuid] = control.value;
                }
                window['moment'] = moment;
                // scope.moment = moment;
                scope['myValue'] = control.value;
                runner.getControlRelationValueString(control, scope);
                runner.getHelperMethods(helper, scope);
                runner.getDataDependencies(dataDependencies, scope);
                if (form) {
                    // console.error('Form defined', form);
                    runner.getDataDependencies(form.dataSourcesContainer.dataSources, scope);
                }
                var paramList = '';
                var argList = '';
                for (var o in scope) {
                    paramList = paramList === "" ? paramList + o : paramList + ',' + o;
                    argList = argList === "" ? argList + "scope['" + o + "']" : argList + ",scope['" + o + "']";
                }
                // prevent more than one return statements
                if (expression.indexOf('return') === -1) {
                    expression = '"return ' + expression + '"';
                }
                var funcDeclarationCode = 'var afeDynamicFunc = new Function("' + paramList + '", ' + expression + ');';
                var funcCallCode = 'afeDynamicFunc.call(this ' + (argList === '' ? '' : ',' + argList) + ');';
                try {
                    if (Object.keys(scope).indexOf('undefined') >= 0) {
                        console.warn('Missing reference found', expression, scope);
                        return false;
                    }
                    //console.info('results: ', expression, eval(funcDeclarationCode + funcCallCode));
                    return eval(funcDeclarationCode + funcCallCode);
                }
                catch (e) {
                    // if (window['error_count']) {
                    //     window['error_count'] = window['error_count'] + 1;
                    // } else {
                    //     window['error_count'] = 1;
                    // }
                    // console.error(window['error_count'] + ' Error running expression:' + expression + '. ',
                    //     e, control, 'Effective Expression', (funcDeclarationCode + funcCallCode));
                    // console.error('Error running expression:' + expression + '. ',
                    //     e, control, 'Effective Expression', (funcDeclarationCode + funcCallCode));
                    // Uncomment the line above during debugging
                    // console.error('Error running expression:' + expression, scope);
                    return false;
                }
                /* tslint:enable */
            }
        };
        return runnable;
    };
    ExpressionRunner.prototype.getControlRelationValueString = function (control, scope) {
        var _this = this;
        if (control && control.controlRelations && control.controlRelations.relations) {
            control.controlRelations.relations.forEach(function (relation) {
                if (relation.relatedTo instanceof AfeFormArray ||
                    relation.relatedTo instanceof AfeFormControl ||
                    relation.relatedTo instanceof AfeFormGroup) {
                    var related = relation.relatedTo;
                    var relatedAsControl = relation.relatedTo;
                    if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                        scope[related.uuid] = relation.relatedTo.value;
                    }
                    else {
                        scope[related.uuid] = relation.relatedTo.value && relation.relatedTo.value.value ?
                            relation.relatedTo.value.value : relation.relatedTo.value;
                    }
                }
            });
        }
        if (control && control.controlRelations && control.controlRelations.otherRelations
            && control.controlRelations.otherRelations.length > 0) {
            control.controlRelations.otherRelations.forEach(function (node) {
                if (node instanceof ArrayNode) {
                    var arrayNode = node;
                    var uuid_1 = control.uuid;
                    var controlRelationsFactory_1 = new ControlRelationsFactory();
                    var relationsForControl_1 = [];
                    // get all related controls
                    arrayNode.children.forEach(function (child) {
                        relationsForControl_1 = relationsForControl_1.concat(controlRelationsFactory_1.getRelationsForControl(uuid_1, child));
                        ;
                    });
                    _this.setControlArrayValues(control, relationsForControl_1, scope);
                }
            });
        }
    };
    ExpressionRunner.prototype.setControlArrayValues = function (control, relationsForControl, scope) {
        var _this = this;
        var keys = this._getFormControlKeys(relationsForControl);
        keys.forEach(function (key) {
            var values = _this._getValuesForKey(key, relationsForControl);
            scope[key] = values;
        });
    };
    ExpressionRunner.prototype._getFormControlKeys = function (array) {
        var keys = [];
        array.forEach(function (control) {
            if (keys.indexOf(control.uuid) === -1) {
                keys.push(control.uuid);
            }
        });
        return keys;
    };
    ExpressionRunner.prototype._getValuesForKey = function (key, array) {
        var values = [];
        array.forEach(function (control) {
            if (control.uuid === key) {
                values.push(control.value);
            }
        });
        return values;
    };
    ExpressionRunner.prototype.getHelperMethods = function (obj, scope) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    };
    ExpressionRunner.prototype.getDataDependencies = function (obj, scope) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    };
    return ExpressionRunner;
}());
export { ExpressionRunner };
//# sourceMappingURL=expression-runner.js.map