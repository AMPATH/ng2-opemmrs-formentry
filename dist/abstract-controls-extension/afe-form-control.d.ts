import { FormControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { ValueChangeListener } from './value-change.listener';
import { CanHide, Hider } from '../form-entry/control-hiders-disablers/can-hide';
import { CanDisable, Disabler } from '../form-entry/control-hiders-disablers/can-disable';
import { CanCalculate } from '../form-entry/control-calculators/can-calculate';
export declare class AfeFormControl extends FormControl implements CanHide, CanDisable, CanCalculate, ValueChangeListener {
    private _controlRelations;
    private _valueChangeListener;
    private _previousValue;
    uuid: string;
    pathFromRoot: string;
    hidden: boolean;
    hiders: Hider[];
    calculator: Function;
    disablers: Disabler[];
    private hiderHelper;
    private disablerHelper;
    constructor(formState?: any, validator?: ValidatorFn | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]);
    readonly controlRelations: ControlRelations;
    disable(param?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    hide(): void;
    show(): void;
    setHidingFn(newHider: Hider): void;
    setCalculatorFn(newCalculator: Function): void;
    updateCalculatedValue(): void;
    clearHidingFns(): void;
    updateHiddenState(): void;
    setDisablingFn(newDisabler: Disabler): void;
    clearDisablingFns(): void;
    updateDisabledState(): void;
    addValueChangeListener(func: any): void;
    fireValueChangeListener(value: any): void;
}
