import { NodeBase } from '../form-entry/form-factory/form-node';
export declare class EncounterViewerService {
    constructor();
    traverse(node: any, schema: any, initialValue?: any): any;
    hasAnswer(node: NodeBase): boolean;
    questionsAnswered(node: any, answered?: boolean[]): boolean;
    private getAnswers(initialValue, separator, schema);
    private isConcept(value);
    private isDate(val);
    private convertTime(unixTimestamp);
    private findFormAnswerLabel(questionUuid, answerUuid, schema);
}
