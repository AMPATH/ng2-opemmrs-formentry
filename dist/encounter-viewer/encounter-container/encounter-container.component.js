import { Component, Input } from '@angular/core';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
var EncounterContainerComponent = (function () {
    function EncounterContainerComponent(encAdapter) {
        this.encAdapter = encAdapter;
    }
    Object.defineProperty(EncounterContainerComponent.prototype, "form", {
        set: function (form) {
            this.$form = form;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterContainerComponent.prototype, "encounter", {
        set: function (enc) {
            this.$enc = enc;
        },
        enumerable: true,
        configurable: true
    });
    EncounterContainerComponent.prototype.ngOnInit = function () {
    };
    return EncounterContainerComponent;
}());
export { EncounterContainerComponent };
EncounterContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'encounter-renderer',
                template: "\n      <encounter-viewer class=\"card\" [form]=\"$form\" [encounter]=\"$enc\"></encounter-viewer>\n    ",
                styles: ["\n      .card{box-shadow:0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)}\n    "]
            },] },
];
/** @nocollapse */
EncounterContainerComponent.ctorParameters = function () { return [
    { type: EncounterAdapter, },
]; };
EncounterContainerComponent.propDecorators = {
    'form': [{ type: Input },],
    'encounter': [{ type: Input },],
};
//# sourceMappingURL=encounter-container.component.js.map