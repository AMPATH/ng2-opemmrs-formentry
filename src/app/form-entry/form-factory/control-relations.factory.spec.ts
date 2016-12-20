import { TestBed } from '@angular/core/testing';
import { ControlRelationsFactory } from './control-relations.factory';
import { FormFactory } from './form.factory';
import { NodeBase } from './form-node';
import { AfeFormControl, AfeFormArray } from '../../abstract-controls-extension/control-extensions';
import { FormControlService } from './form-control.service';
import { SampleSchema } from './sample-schema';

import { QuestionFactory } from './question.factory';
import { ValidationFactory } from './validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';


describe('Control Relations Factory:', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ControlRelationsFactory,
                FormFactory,
                FormControlService,
                QuestionFactory,
                ValidationFactory,
                HidersDisablersFactory,
                ExpressionRunner,
                JsExpressionHelper
            ]
        });
    });

    it('should be defined', () => {
        let factory: ControlRelationsFactory = TestBed.get(ControlRelationsFactory);
        expect(factory).toBeTruthy();
    });

    it('should add relations to control', () => {

      let factory: ControlRelationsFactory = TestBed.get(ControlRelationsFactory);

      let control = new AfeFormControl();
      let related = new AfeFormControl();

      expect(control.controlRelations.relations.length).toBe(0);
      factory.addRelationToControl(control, related);
      expect(control.controlRelations.relations.length).toBe(1);

    });

    it('should build control relations', () => {

      let factory: ControlRelationsFactory = TestBed.get(ControlRelationsFactory);

      let testSchema = new SampleSchema().getSchema();

      let formFactory: FormFactory = TestBed.get(FormFactory);

      let createdForm = formFactory.createForm(testSchema);

      factory.buildRelations(createdForm.rootNode);

      expect(Object.keys(factory.controlsStore ).length > 0).toBe(true);

      let hasRelations = false;

      let keys = Object.keys(factory.controlsStore);
       keys.forEach(key => {
         let nodeBase: NodeBase = factory.controlsStore[key];
         if ( (nodeBase.control as AfeFormControl | AfeFormArray).controlRelations.relations.length > 0 ) {
           hasRelations = true;
         }
       });
      expect(hasRelations).toBe(true);
    });
});
