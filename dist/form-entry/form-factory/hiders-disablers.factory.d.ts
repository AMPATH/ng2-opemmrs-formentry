import { Disabler } from '../control-hiders-disablers/can-disable';
import { Hider } from '../control-hiders-disablers/can-hide';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
import { QuestionBase } from '../question-models/question-base';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { Form } from './form';
export declare class HidersDisablersFactory {
    private expressionRunner;
    private expressionHelper;
    constructor(expressionRunner: ExpressionRunner, expressionHelper: JsExpressionHelper);
    getJsExpressionDisabler(question: QuestionBase, control: AfeFormControl | AfeFormArray | AfeFormGroup, form?: Form): Disabler;
    getJsExpressionHider(question: QuestionBase, control: AfeFormControl | AfeFormArray | AfeFormGroup, form?: Form): Hider;
    convertHideObjectToString(hide: any): string;
}
