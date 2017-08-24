import { Injectable } from '@angular/core';

import { Disabler } from '../control-hiders-disablers/can-disable';
import { Hider } from '../control-hiders-disablers/can-hide';

import { ExpressionRunner, Runnable } from '../expression-runner/expression-runner';
import { AfeFormControl, AfeFormArray, AfeFormGroup 
} from '../../abstract-controls-extension/control-extensions';
import { QuestionBase } from '../question-models/question-base';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { Form } from './form';
// Add ability to display all fields for debugging
import { DebugModeService } from './../services/debug-mode.service';

@Injectable()
export class HidersDisablersFactory {

    constructor(private expressionRunner: ExpressionRunner,
     private expressionHelper: JsExpressionHelper,
     private _debugModeService: DebugModeService) {
    }

    getJsExpressionDisabler(question: QuestionBase, control: AfeFormControl | AfeFormArray | AfeFormGroup,
        form?: Form): Disabler {
        let runnable: Runnable =
            this.expressionRunner.getRunnable(question.disable as string, control,
                this.expressionHelper.helperFunctions, {}, form);
        let disabler: Disabler = {
            toDisable: false,
            disableWhenExpression: question.disable as string,
            reEvaluateDisablingExpression: () => {
                let result = runnable.run();
                disabler.toDisable = result;
            }
        };
        return disabler;
    }

    getJsExpressionHider(question: QuestionBase, control: AfeFormControl | AfeFormArray | AfeFormGroup,
        form?: Form): Hider {

        let hide: any = question.hide;
        let value: string = typeof hide === 'object' ? this.convertHideObjectToString(hide) : question.hide as string;

        // check if debugging has been enabled

        let debugEnabled = this._debugModeService.debugEnabled();

        let runnable: Runnable = this.expressionRunner.getRunnable(value, control,
        this.expressionHelper.helperFunctions, {}, form);

        let hider: Hider = {
            toHide: false,
            hideWhenExpression: value,
            reEvaluateHidingExpression: () => {
                 /* if debug is enabled then hiders to be false
                 else run the normal eveluator i.e runnable.run()
                 */
                if (debugEnabled === true) {
                      hider.toHide = false ;
                  }else {
                      hider.toHide =  runnable.run();
                  }
            }
        };
        return hider;
    }

    convertHideObjectToString(hide: any) {

      if (hide.value instanceof Array) {

        let arrayStr: string = "'" + hide.value.join("','") + "'";
        let exp = '!arrayContains([' + arrayStr + '],' + hide.field + ')';
        return exp;
      }

      return '';
    }
}
