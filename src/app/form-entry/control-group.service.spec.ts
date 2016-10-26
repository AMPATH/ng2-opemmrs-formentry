import { Injector } from '@angular/core';
import { ControlGroupService } from './control-group.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

import { TextInputQuestion } from './models/text-input-question';
import { QuestionGroup } from './models/question-group';
import { RepeatingQuestion } from './models/repeating-question'
import { MockForm } from '../mock/mock-form'

describe('Control Group Service Tests', () => {
    let injector: Injector;
    let controlGroupService: ControlGroupService;
    let data = new MockForm().getMockForm();
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            providers: [
                FormBuilder,
                ControlGroupService
            ]
        });
        injector = getTestBed();
        controlGroupService = injector.get(ControlGroupService);

    });

    afterEach(() => {
        injector = undefined;
        controlGroupService = undefined;
    });

    it('is defined', () => {
        expect(ControlGroupService).toBeDefined();
        expect(controlGroupService instanceof ControlGroupService).toBeTruthy();
    });

    it('Should have a controls array', () => {
        controlGroupService.create(data.questions, 'fbGroup');
        let controls = controlGroupService.controls;
        expect(controls.length).toEqual(10);
    });

    it('Should have a create function that returns a form group', () => {
        let formGroup = controlGroupService.create([new TextInputQuestion({
            type: 'text',
            key: 'Drugi',
            label: 'I Reference',
            value: '',
            placeholder: 'I Reference'
        })], 'fbGroup');
        formGroup.fbGroup.controls.Drugi.updateValueAndValidity();
        expect(formGroup.fbGroup.valid).toBe(true);
        expect(formGroup.fbGroup.value).toEqual({ 'Drugi': '' });
    });
});
