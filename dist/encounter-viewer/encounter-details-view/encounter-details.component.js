import { Component, Input } from '@angular/core';
var EncounterDetailsComponent = (function () {
    function EncounterDetailsComponent() {
    }
    Object.defineProperty(EncounterDetailsComponent.prototype, "encounter", {
        set: function (encounterObject) {
            this.enc = encounterObject;
        },
        enumerable: true,
        configurable: true
    });
    EncounterDetailsComponent.prototype.ngOnInit = function () { };
    return EncounterDetailsComponent;
}());
export { EncounterDetailsComponent };
EncounterDetailsComponent.decorators = [
    { type: Component, args: [{
                selector: 'encounter-details',
                template: "\n      <div class=\"panel panel-default\">\n        <p class=\"page-label panel-heading text-primary\">Encounter Details</p>\n      </div>\n      <div class=\"detail\">\n  \n        <div class=\"question\" *ngIf=\"enc.provider\">\n          <p>Provider :\n            <span>{{enc.provider.display}}</span>\n          </p>\n          <hr>\n        </div>\n\n\n\n        <div class=\"question\" *ngIf=\"enc.encounterType\">\n          <p>Encounter Type :\n            <span>{{enc.encounterType.display}}</span>\n          </p>\n          <hr>\n        </div>\n\n\n\n        <div class=\"question\" *ngIf=\"enc.visit\">\n          <p>Visit :\n            <span>{{enc.visit.display}}</span>\n          </p>\n          <hr>\n        </div>\n\n\n\n\n        <div class=\"question\" *ngIf=\"enc.location\">\n          <p>Location :\n            <span>{{enc.location.display}}</span>\n          </p>\n          <hr>\n        </div>\n\n\n        <div class=\"question\" *ngIf=\"enc.encounterDatetime\">\n          <p>Date :\n            <span>{{enc.encounterDatetime | date:'short'}}</span>\n          </p>\n          <hr>\n        </div>\n      </div>\n    ",
                styles: ["\n      .page-label{font-size:20px;font-weight:bold}.section-label{font-size:18px;font-weight:bold}.panel-default{border:none !important}.question{font-weight:500;font-size:12px;margin-left:10px}.panel{margin-bottom:5px}.details{margin-left:15px}hr{margin:10px}\n    "]
            },] },
];
/** @nocollapse */
EncounterDetailsComponent.ctorParameters = function () { return []; };
EncounterDetailsComponent.propDecorators = {
    'encounter': [{ type: Input },],
};
//# sourceMappingURL=encounter-details.component.js.map