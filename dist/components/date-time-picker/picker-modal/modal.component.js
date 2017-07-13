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
    ModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'picker-modal',
                    template: './modal.component.html',
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
    return ModalComponent;
}());
export { ModalComponent };
//# sourceMappingURL=modal.component.js.map