export declare class JsExpressionHelper {
    calcBMI(height: any, weight: any): number;
    isEmpty(val: any): boolean;
    arrayContains(array: any, members: any): boolean;
    formatDate(value: any, format: any, offset: any): any;
    arrayContainsAny(array: any, members: any): boolean;
    readonly helperFunctions: {
        arrayContainsAny: (array: any, members: any) => boolean;
        calcBMI: (height: any, weight: any) => number;
        isEmpty: (val: any) => boolean;
        arrayContains: (array: any, members: any) => boolean;
    };
}
