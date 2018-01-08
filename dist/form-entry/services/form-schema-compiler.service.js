import { Injectable } from '@angular/core';
import * as _ from 'lodash';
var FormSchemaCompiler = (function () {
    function FormSchemaCompiler() {
    }
    /**
     *
     *
     * @param {Object} formSchema
     * @param {Array<any>} referencedComponents
     * @returns {Object} formSchema
     *
     * @memberOf FormSchemaCompiler
     */
    FormSchemaCompiler.prototype.compileFormSchema = function (formSchema, referencedComponents) {
        // get all referenced forms
        var refForms = this.getReferencedForms(formSchema, referencedComponents);
        if (_.isEmpty(refForms)) {
            return formSchema;
        }
        ;
        // get all place-holders from the form schema
        var placeHolders = this.getAllPlaceholderObjects(formSchema);
        if (_.isEmpty(placeHolders)) {
            return formSchema;
        }
        // replace all placeHolders
        this.replaceAllPlaceholdersWithActualObjects(refForms, placeHolders);
        return formSchema;
    };
    FormSchemaCompiler.prototype.findSchemaByName = function (schemaArray, nameOfSchema) {
        if (_.isEmpty(schemaArray) || _.isEmpty(nameOfSchema)) {
            return;
        }
        var foundSchema = {};
        _.each(schemaArray, function (schema) {
            if (schema.name === nameOfSchema) {
                foundSchema = schema;
            }
        });
        return foundSchema;
    };
    FormSchemaCompiler.prototype.getPageInSchemaByLabel = function (schema, pageLabel) {
        if (_.isEmpty(schema) || _.isEmpty(pageLabel)) {
            return;
        }
        var foundPage = {};
        _.each(schema.pages, function (page) {
            if (page.label === pageLabel) {
                foundPage = page;
            }
        });
        return foundPage;
    };
    FormSchemaCompiler.prototype.getSectionInSchemaByPageLabelBySectionLabel = function (schema, pageLabel, sectionLabel) {
        if (_.isEmpty(schema) || _.isEmpty(pageLabel) || _.isEmpty(sectionLabel)) {
            return;
        }
        var foundPage = this.getPageInSchemaByLabel(schema, pageLabel);
        if (_.isEmpty(foundPage)) {
            return;
        }
        var foundSection = {};
        _.each(foundPage.sections, function (section) {
            if (section.label === sectionLabel) {
                foundSection = section;
            }
        });
        return foundSection;
    };
    FormSchemaCompiler.prototype.getQuestionByIdInSchema = function (schema, questionId) {
        if (_.isEmpty(schema) || _.isEmpty(questionId)) {
            return;
        }
        if (Array.isArray(schema)) {
            var question = void 0;
            for (var i = 0; i < schema.length; i++) {
                if (!_.isEmpty(schema[i])) {
                    question = this.getQuestionByIdInSchema(schema[i], questionId);
                }
                if (!_.isEmpty(question)) {
                    break;
                }
            }
            return question;
        }
        else if (typeof schema === 'object') {
            if (this.isQuestionObjectWithId(schema, questionId)) {
                return schema;
            }
            else if (this.isSchemaSubObjectExpandable(schema)) {
                var toExpand = (schema.pages || schema.sections || schema.questions);
                return this.getQuestionByIdInSchema(toExpand, questionId);
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    };
    FormSchemaCompiler.prototype.getQuestionsArrayByQuestionIdInSchema = function (schema, questionId) {
        if (_.isEmpty(schema) || _.isEmpty(questionId)) {
            return;
        }
        return this.getQuestionsArrayByQuestionId(schema, schema, questionId);
    };
    FormSchemaCompiler.prototype.getQuestionsArrayByQuestionId = function (parent, object, questionId) {
        if (Array.isArray(object)) {
            var returnedValue = void 0;
            for (var i = 0; i < object.length; i++) {
                if (!_.isEmpty(object[i])) {
                    returnedValue = this.getQuestionsArrayByQuestionId(object, object[i], questionId);
                }
                if (!_.isEmpty(returnedValue)) {
                    break;
                }
            }
            return returnedValue;
        }
        else if (typeof object === 'object') {
            if (this.isQuestionObjectWithId(object, questionId)) {
                return parent;
            }
            else if (this.isSchemaSubObjectExpandable(object)) {
                var toExpand = (object.pages || object.sections || object.questions);
                return this.getQuestionsArrayByQuestionId(toExpand, toExpand, questionId);
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    };
    // object is page or section or question
    FormSchemaCompiler.prototype.isSchemaSubObjectExpandable = function (object) {
        if (typeof object === 'object') {
            var objectKeys = Object.keys(object);
            if (_.includes(objectKeys, 'pages') ||
                _.includes(objectKeys, 'sections') ||
                _.includes(objectKeys, 'questions')) {
                return true;
            }
        }
        return false;
    };
    FormSchemaCompiler.prototype.isQuestionObjectWithId = function (object, id) {
        return object['id'] === id;
    };
    FormSchemaCompiler.prototype.getAllPlaceholderObjects = function (schema) {
        var referencedObjects = [];
        this.extractPlaceholderObjects(schema, referencedObjects);
        return referencedObjects;
    };
    FormSchemaCompiler.prototype.extractPlaceholderObjects = function (subSchema, objectsArray) {
        if (_.isEmpty(subSchema)) {
            return;
        }
        if (Array.isArray(subSchema)) {
            for (var i = 0; i < subSchema.length; i++) {
                if (!_.isEmpty(subSchema[i])) {
                    this.extractPlaceholderObjects(subSchema[i], objectsArray);
                }
            }
        }
        else if (typeof subSchema === 'object') {
            if (!_.isEmpty(subSchema.reference)) {
                objectsArray.push(subSchema);
            }
            else if (this.isSchemaSubObjectExpandable(subSchema)) {
                var toExpand = (subSchema.pages || subSchema.sections || subSchema.questions);
                this.extractPlaceholderObjects(toExpand, objectsArray);
            }
        }
    };
    FormSchemaCompiler.prototype.fillPlaceholderObject = function (placeHolderObject, referenceObject) {
        for (var member in referenceObject) {
            if (_.isEmpty(placeHolderObject[member])) {
                placeHolderObject[member] = referenceObject[member];
            }
        }
        return placeHolderObject;
    };
    FormSchemaCompiler.prototype.replaceAllPlaceholdersWithActualObjects = function (keyValReferencedForms, placeHoldersArray) {
        var _this = this;
        _.each(placeHoldersArray, function (placeHolder) {
            var referencedObject = _this.getReferencedObject(placeHolder.reference, keyValReferencedForms);
            if (_.isEmpty(referencedObject)) {
                console.error('Form compile: Error finding referenced object', placeHolder.reference);
            }
            else {
                placeHolder = _this.fillPlaceholderObject(placeHolder, referencedObject);
                placeHolder = _this.removeExcludedQuestionsFromPlaceholder(placeHolder);
                delete placeHolder['reference'];
            }
        });
        return placeHoldersArray;
    };
    FormSchemaCompiler.prototype.removeObjectFromArray = function (array, object) {
        var indexOfObject = array.indexOf(object);
        if (indexOfObject === -1) {
            return;
        }
        array.splice(indexOfObject, 1);
    };
    FormSchemaCompiler.prototype.removeExcludedQuestionsFromPlaceholder = function (placeHolder) {
        var _this = this;
        if (Array.isArray(placeHolder.reference.excludeQuestions)) {
            _.each(placeHolder.reference.excludeQuestions, function (excludedQuestionId) {
                var questionsArray = _this.getQuestionsArrayByQuestionIdInSchema(placeHolder, excludedQuestionId);
                if (!Array.isArray(questionsArray)) {
                    return;
                }
                var question = _this.getQuestionByIdInSchema(questionsArray, excludedQuestionId);
                _this.removeObjectFromArray(questionsArray, question);
            });
        }
        return placeHolder;
    };
    FormSchemaCompiler.prototype.getReferencedObject = function (referenceData, keyValReferencedForms) {
        if (_.isEmpty(referenceData.form)) {
            console.error('Form compile: reference missing form attribute', referenceData);
            return;
        }
        if (_.isEmpty(keyValReferencedForms[referenceData.form])) {
            console.error('Form compile: referenced form alias not found', referenceData);
            return;
        }
        if (!_.isEmpty(referenceData.questionId)) {
            return this.getQuestionByIdInSchema(keyValReferencedForms[referenceData.form], referenceData.questionId);
        }
        if (!_.isEmpty(referenceData.page) && !_.isEmpty(referenceData.section)) {
            return this.getSectionInSchemaByPageLabelBySectionLabel(keyValReferencedForms[referenceData.form], referenceData.page, referenceData.section);
        }
        if (!_.isEmpty(referenceData.page)) {
            return this.getPageInSchemaByLabel(keyValReferencedForms[referenceData.form], referenceData.page);
        }
        console.error('Form compile: Unsupported reference type', referenceData.reference);
    };
    FormSchemaCompiler.prototype.getReferencedForms = function (formSchema, formSchemasLookupArray) {
        var _this = this;
        var referencedForms = formSchema.referencedForms;
        if (_.isEmpty(referencedForms)) {
            return;
        }
        var keyValReferencedForms = {};
        _.each(referencedForms, function (reference) {
            keyValReferencedForms[reference.alias] =
                _this.findSchemaByName(formSchemasLookupArray, reference.formName);
        });
        return keyValReferencedForms;
    };
    return FormSchemaCompiler;
}());
export { FormSchemaCompiler };
FormSchemaCompiler.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FormSchemaCompiler.ctorParameters = function () { return []; };
//# sourceMappingURL=form-schema-compiler.service.js.map