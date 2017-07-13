import { FormGroup, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { CanHide, Hider } from '../form-entry/control-hiders-disablers/can-hide';
import { CanDisable, Disabler } from '../form-entry/control-hiders-disablers/can-disable';
export declare class AfeFormGroup extends FormGroup implements CanHide, CanDisable {
    private _controlRelations;
    uuid: string;
    pathFromRoot: string;
    hidden: false;
    hiders: Hider[];
    disablers: Disabler[];
    private hiderHelper;
    private disablerHelper;
    constructor(controls: {
        [key: string]: AbstractControl;
    }, validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn);
    readonly controlRelations: ControlRelations;
    hide(): void;
    show(): void;
    disable(param?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    setHidingFn(newHider: Hider): void;
    clearHidingFns(): void;
    updateHiddenState(): void;
    setDisablingFn(newDisabler: Disabler): void;
    clearDisablingFns(): void;
    updateDisabledState(): void;
}
