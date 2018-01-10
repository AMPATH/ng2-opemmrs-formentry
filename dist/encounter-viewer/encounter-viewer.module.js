import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncounterViewerComponent } from './encounter-view/encounter-viewer.component';
import { EncounterDetailsComponent } from './encounter-details-view/encounter-details.component';
import { EncounterContainerComponent } from './encounter-container/encounter-container.component';
import { EncounterViewerService } from './encounter-viewer.service';
var EncounterViewerModule = (function () {
    function EncounterViewerModule() {
    }
    return EncounterViewerModule;
}());
export { EncounterViewerModule };
EncounterViewerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    EncounterViewerComponent,
                    EncounterDetailsComponent,
                    EncounterContainerComponent,
                ],
                imports: [
                    CommonModule
                ],
                providers: [
                    EncounterViewerService
                ],
                exports: [
                    EncounterContainerComponent
                ],
            },] },
];
/** @nocollapse */
EncounterViewerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=encounter-viewer.module.js.map