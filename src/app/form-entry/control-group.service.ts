import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { QuestionBase } from './models/question-base';
import { QuestionGroup } from './models/question-group';
@Injectable()
export class ControlGroupService {
    controls = [];
    constructor(private formBuilder: FormBuilder) { }
    create(questions: QuestionBase[], formKey?): any {
        let temp = {},
            toReturn = {};
        for (let question of questions) {
            let value = question.value || '';
            if (question.type === 'group') {
                let questionGroup = question as QuestionGroup;
                let formGroup = this.create(questionGroup.questions, question.key);
                let group = formGroup[question.key];
                let controlMap = {
                    id: question.key,
                    type: 'group',
                    control: group
                };
                this.controls.push(controlMap);
                temp[question.key] = group;
            } else if (question.type === 'repeating') {
                let formArray = new FormArray([]);
                let controlMap = {
                    id: question.key,
                    type: 'repeating',
                    control: formArray
                };
                this.controls.push(controlMap);
                temp[question.key] = formArray;
            } else {
                let control = new FormControl(value);
                temp[question.key] = control;
                let controlMap = {
                    id: question.key,
                    type: 'control',
                    control: control
                };
                this.controls.push(controlMap);
            }
        }

        toReturn[formKey] = new FormGroup(temp);
        return toReturn;
    }
}
