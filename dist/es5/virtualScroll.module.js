import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollObservableService } from './service';
import { VirtualRowComponent } from './virtualRow.component';
import { VirtualScrollComponent } from './virtualScroll.component';
var VirtualScrollModule = (function () {
    function VirtualScrollModule() {
    }
    return VirtualScrollModule;
}());
export { VirtualScrollModule };
VirtualScrollModule.decorators = [
    { type: NgModule, args: [{
                declarations: [VirtualRowComponent, VirtualScrollComponent],
                entryComponents: [VirtualRowComponent],
                exports: [VirtualScrollComponent],
                imports: [CommonModule],
                providers: [ScrollObservableService],
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollModule.ctorParameters = function () { return []; };
function VirtualScrollModule_tsickle_Closure_declarations() {
    /** @type {?} */
    VirtualScrollModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    VirtualScrollModule.ctorParameters;
}
//# sourceMappingURL=virtualScroll.module.js.map