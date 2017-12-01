import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollObservableService } from './service';
import { VirtualRowComponent } from './virtualRow.component';
import { VirtualScrollComponent } from './virtualScroll.component';
export class VirtualScrollModule {
}
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
VirtualScrollModule.ctorParameters = () => [];
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