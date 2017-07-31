/**
 * modal.component
 */
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
// const myDpStyles: string = require('./modal.component.css');
// const myDpTpl: string = require('./modal.component.html');
// webpack2_
var ModalComponent = (function () {
    function ModalComponent() {
        this.onOverlayClick = new EventEmitter();
    }
    ModalComponent.prototype.ngOnInit = function () {
    };
    ModalComponent.prototype.closeModal = function () {
        this.onOverlayClick.emit(false);
    };
    return ModalComponent;
}());
export { ModalComponent };
ModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'picker-modal',
                template: "\n      <section class=\"x-modal\">\n          <section class=\"modal-overlay\" (click)=\"closeModal()\"></section>\n          <section class=\"modal-main\" id=\"section-modal-main\">\n              <ng-content></ng-content>\n          </section>\n      </section>\n    ",
                styles: ['./modal.component.css'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [],
            },] },
];
/** @nocollapse */
ModalComponent.ctorParameters = function () { return []; };
ModalComponent.propDecorators = {
    'onOverlayClick': [{ type: Output },],
};
//# sourceMappingURL=modal.component.js.map