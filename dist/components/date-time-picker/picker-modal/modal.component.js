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
                    template: "\n      <section class=\"x-modal\">\n          <section class=\"modal-overlay\" (click)=\"closeModal()\"></section>\n          <section class=\"modal-main\" id=\"section-modal-main\">\n              <ng-content></ng-content>\n          </section>\n      </section>\n    ",
                    styles: ["\n      :host{z-index:9999999999}*,*::before,*::after{box-sizing:border-box}.modal-main{position:absolute;left:19.6%;right:auto;top:auto;z-index:111;background-color:#fff;border:1px solid #d7dad7;border-radius:6px;transform:translate(-50%, 0);box-shadow:0 5px 15px rgba(0,0,0,0.3)}\n    "],
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