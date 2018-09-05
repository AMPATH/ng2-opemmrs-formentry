export declare class FormSchemaCompiler {
    constructor();
    /**
     *
     *
     * @param {Object} formSchema
     * @param {Array<any>} referencedComponents
     * @returns {Object} formSchema
     *
     * @memberOf FormSchemaCompiler
     */
    compileFormSchema(formSchema: Object, referencedComponents: Array<any>): Object;
    private findSchemaByName;
    private getPageInSchemaByLabel;
    private getSectionInSchemaByPageLabelBySectionLabel;
    private getQuestionByIdInSchema;
    private getQuestionsArrayByQuestionIdInSchema;
    private getQuestionsArrayByQuestionId;
    private isSchemaSubObjectExpandable;
    private isQuestionObjectWithId;
    private getAllPlaceholderObjects;
    private extractPlaceholderObjects;
    private fillPlaceholderObject;
    private replaceAllPlaceholdersWithActualObjects;
    private removeObjectFromArray;
    private removeExcludedQuestionsFromPlaceholder;
    private getReferencedObject;
    private getReferencedForms;
}
