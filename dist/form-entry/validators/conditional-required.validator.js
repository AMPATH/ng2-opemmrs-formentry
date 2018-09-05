var ConditionalRequiredValidator = /** @class */ (function () {
    function ConditionalRequiredValidator() {
    }
    ConditionalRequiredValidator.prototype.validate = function (model) {
        // convert helper functions to string
        return function (control) {
            var value = control.value;
            var relationValue = null;
            var referenceQuestionId = model.referenceQuestionId;
            var referenceQuestionAnswers = model.referenceQuestionAnswers;
            var isRequired;
            if (control && control.controlRelations && control.controlRelations.relations) {
                control.controlRelations.relations.forEach(function (relation) {
                    var relatedAsControl = relation.relatedTo;
                    if (relatedAsControl.uuid === referenceQuestionId) {
                        if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                            relationValue = relation.relatedTo.value;
                        }
                        else {
                            relationValue = relation.relatedTo.value && relation.relatedTo.value.value ?
                                relation.relatedTo.value.value : relation.relatedTo.value;
                        }
                    }
                });
            }
            if (typeof referenceQuestionAnswers === 'object' && referenceQuestionAnswers.indexOf(relationValue) !== -1) {
                isRequired = true;
            }
            if (isRequired && !value) {
                return { 'conditional_required': { message: model.message } };
            }
            return null;
        };
    };
    return ConditionalRequiredValidator;
}());
export { ConditionalRequiredValidator };
//# sourceMappingURL=conditional-required.validator.js.map