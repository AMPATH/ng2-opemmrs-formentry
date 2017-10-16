import { BaseOptions } from './interfaces/base-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { ValidationModel } from './validation.model';
export declare class QuestionBase {
    key: string;
    alert?: any;
    label?: string;
    renderingType: string;
    defaultValue?: any;
    originalValue?: any;
    enableHistoricalValue?: boolean;
    showHistoricalValueDate?: boolean;
    historicalDataValue?: any;
    extras?: any;
    dataSource?: string;
    dataSourceOptions?: any;
    controlType?: AfeControlType;
    validators?: Array<ValidationModel>;
    required?: boolean;
    hide?: string | boolean;
    disable?: string | boolean;
    calculateExpression?: string;
    options?: any;
    constructor(options: BaseOptions);
    setHistoricalValue?(v: boolean): void;
    showHistoricalEncounterDate?(v?: boolean): void;
}
