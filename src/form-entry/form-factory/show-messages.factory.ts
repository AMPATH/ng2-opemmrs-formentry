import { Injectable } from '@angular/core';

import { Alert } from '../control-alerts/can-generate-alert';

import { ExpressionRunner, Runnable } from '../expression-runner/expression-runner';
import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
import { QuestionBase } from '../question-models/question-base';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { Form} from './form';

@Injectable()
export class AlertsFactory {
    constructor(private expressionRunner: ExpressionRunner, private expressionHelper: JsExpressionHelper) {
    }
    getJsExpressionshowAlert(question: QuestionBase, control: AfeFormControl | AfeFormArray | AfeFormGroup,
        form?: Form): Alert {
        let runnable: Runnable =
            this.expressionRunner.getRunnable(question.alert.alertWhenExpression, control,
                this.expressionHelper.helperFunctions, {}, form);
        let showAlert: Alert = {
            shown: false,
            alertWhenExpression: question.alert.alertWhenExpression,
            alertMessage: question.alert.message,
            reEvaluateAlertExpression: () => {
                let result = runnable.run();
                showAlert.shown = result;
            }
        };
        return showAlert;
    }
}
