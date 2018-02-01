import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AbstractControl } from '@angular/forms';
export declare class FormErrorsService {
    static control: AbstractControl;
    static tab: number;
    announceErrorFieldSource: Subject<string>;
    announceErrorField$: Observable<any>;
    announceErrorField(error: string): void;
}
