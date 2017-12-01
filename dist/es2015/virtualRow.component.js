/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewChild, ViewContainerRef } from "@angular/core";
export class VirtualRowComponent {
    /**
     * @param {?} _cdr
     */
    constructor(_cdr) {
        this._cdr = _cdr;
        this._translateY = 0;
    }
    /**
     * @return {?}
     */
    get getTransform() {
        return `translateY(${this._translateY}px)`;
    }
    /**
     * @param {?} template
     * @param {?} context
     * @param {?=} index
     * @return {?}
     */
    addItem(template, context, index) {
        this._cdr.markForCheck();
        return this._viewContainer.createEmbeddedView(template, context, index);
    }
    /**
     * @param {?} translateY
     * @return {?}
     */
    setTransform(translateY) {
        this._translateY = translateY;
    }
    /**
     * @param {?} column
     * @param {?} context
     * @return {?}
     */
    updateItem(column, context) {
        this._cdr.markForCheck();
        const /** @type {?} */ viewRef = /** @type {?} */ (this._viewContainer.get(column));
        viewRef.context.$implicit = context;
        return viewRef;
    }
    /**
     * @param {?} column
     * @return {?}
     */
    removeItem(column) {
        this._cdr.markForCheck();
        this._viewContainer.remove(column);
    }
    /**
     * @param {?} row
     * @return {?}
     */
    updateRow(row) {
        for (let /** @type {?} */ c = 0; c < this._viewContainer.length; c++) {
            const /** @type {?} */ viewRef = /** @type {?} */ (this._viewContainer.get(c));
            viewRef.context.row = row;
        }
        this._cdr.markForCheck();
    }
}
VirtualRowComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'od-virtualrow',
                styles: [`:host { display: block; position: absolute; }`],
                template: `<div #viewRef></div>`
            },] },
];
/** @nocollapse */
VirtualRowComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
];
VirtualRowComponent.propDecorators = {
    "_viewContainer": [{ type: ViewChild, args: ['viewRef', { read: ViewContainerRef },] },],
    "getTransform": [{ type: HostBinding, args: ['style.transform',] },],
};
function VirtualRowComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    VirtualRowComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    VirtualRowComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    VirtualRowComponent.propDecorators;
    /** @type {?} */
    VirtualRowComponent.prototype._viewContainer;
    /** @type {?} */
    VirtualRowComponent.prototype._translateY;
    /** @type {?} */
    VirtualRowComponent.prototype._cdr;
}
//# sourceMappingURL=virtualRow.component.js.map