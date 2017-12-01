import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewChild, ViewContainerRef } from '@angular/core';
var VirtualRowComponent = (function () {
    /**
     * @param {?} _cdr
     */
    function VirtualRowComponent(_cdr) {
        this._cdr = _cdr;
        this._translateY = 0;
    }
    Object.defineProperty(VirtualRowComponent.prototype, "getTransform", {
        /**
         * @return {?}
         */
        get: function () {
            return "translateY(" + this._translateY + "px)";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} template
     * @param {?} context
     * @param {?=} index
     * @return {?}
     */
    VirtualRowComponent.prototype.addItem = function (template, context, index) {
        this._cdr.markForCheck();
        return this._viewContainer.createEmbeddedView(template, context, index);
    };
    /**
     * @param {?} translateY
     * @return {?}
     */
    VirtualRowComponent.prototype.setTransform = function (translateY) {
        this._translateY = translateY;
    };
    /**
     * @param {?} column
     * @param {?} context
     * @return {?}
     */
    VirtualRowComponent.prototype.updateItem = function (column, context) {
        this._cdr.markForCheck();
        var /** @type {?} */ viewRef = (this._viewContainer.get(column));
        viewRef.context.$implicit = context;
        return viewRef;
    };
    /**
     * @param {?} column
     * @return {?}
     */
    VirtualRowComponent.prototype.removeItem = function (column) {
        this._cdr.markForCheck();
        this._viewContainer.remove(column);
    };
    /**
     * @param {?} row
     * @return {?}
     */
    VirtualRowComponent.prototype.updateRow = function (row) {
        for (var /** @type {?} */ c = 0; c < this._viewContainer.length; c++) {
            var /** @type {?} */ viewRef = (this._viewContainer.get(c));
            viewRef.context.row = row;
        }
        this._cdr.markForCheck();
    };
    return VirtualRowComponent;
}());
export { VirtualRowComponent };
VirtualRowComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'od-virtualrow',
                styles: [":host { display: block; position: absolute; }"],
                template: "<div #viewRef></div>"
            },] },
];
/**
 * @nocollapse
 */
VirtualRowComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
VirtualRowComponent.propDecorators = {
    '_viewContainer': [{ type: ViewChild, args: ['viewRef', { read: ViewContainerRef },] },],
    'getTransform': [{ type: HostBinding, args: ['style.transform',] },],
};
function VirtualRowComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    VirtualRowComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    VirtualRowComponent.ctorParameters;
    /** @type {?} */
    VirtualRowComponent.propDecorators;
    /** @type {?} */
    VirtualRowComponent.prototype._viewContainer;
    /** @type {?} */
    VirtualRowComponent.prototype._translateY;
    /** @type {?} */
    VirtualRowComponent.prototype._cdr;
}
//# sourceMappingURL=virtualRow.component.js.map