var ConditionalAnsweredValidator = /** @class */ (function () {
    function ConditionalAnsweredValidator() {
    }
    ConditionalAnsweredValidator.prototype.validate = function (model) {
        return function (control) {
            var value = control.value;
            var relationValue = null;
            var referenceQuestionId = model.referenceQuestionId;
            var referenceQuestionAnswers = model.referenceQuestionAnswers;
            var successCondition = true;
            if (value) {
                if (control && control.controlRelations && control.controlRelations.relations) {
                    control.controlRelations.relations.forEach(function (relation) {
                        var relatedAsControl = relation.relatedTo;
                        if (relatedAsControl.uuid === referenceQuestionId) {
                            if (Array.isArray(relatedAsControl.value)) {
                                relationValue = relatedAsControl.value;
                            }
                            else {
                                relationValue = relatedAsControl.value && typeof relatedAsControl.value === 'object' && relatedAsControl.value.value ?
                                    relatedAsControl.value.value : relatedAsControl.value;
                            }
                        }
                        if (!relationValue) {
                            successCondition = false;
                        }
                        else if (typeof referenceQuestionAnswers === 'object' && referenceQuestionAnswers.indexOf(relationValue) === -1) {
                            successCondition = false;
                        }
                    });
                }
            }
            if (!successCondition) {
                return { 'conditional_answered': { message: model.message } };
            }
            return null;
        };
    };
    return ConditionalAnsweredValidator;
}());
export { ConditionalAnsweredValidator };
//# sourceMappingURL=conditional-answered.validator.js.map