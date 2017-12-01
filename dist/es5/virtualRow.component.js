/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewChild, ViewContainerRef } from "@angular/core";
var VirtualRowComponent = (function () {
    function VirtualRowComponent(_cdr) {
        this._cdr = _cdr;
        this._translateY = 0;
    }
    Object.defineProperty(VirtualRowComponent.prototype, "getTransform", {
        get: /**
         * @return {?}
         */
        function () {
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
    VirtualRowComponent.prototype.addItem = /**
     * @param {?} template
     * @param {?} context
     * @param {?=} index
     * @return {?}
     */
    function (template, context, index) {
        this._cdr.markForCheck();
        return this._viewContainer.createEmbeddedView(template, context, index);
    };
    /**
     * @param {?} translateY
     * @return {?}
     */
    VirtualRowComponent.prototype.setTransform = /**
     * @param {?} translateY
     * @return {?}
     */
    function (translateY) {
        this._translateY = translateY;
    };
    /**
     * @param {?} column
     * @param {?} context
     * @return {?}
     */
    VirtualRowComponent.prototype.updateItem = /**
     * @param {?} column
     * @param {?} context
     * @return {?}
     */
    function (column, context) {
        this._cdr.markForCheck();
        var /** @type {?} */ viewRef = /** @type {?} */ (this._viewContainer.get(column));
        viewRef.context.$implicit = context;
        return viewRef;
    };
    /**
     * @param {?} column
     * @return {?}
     */
    VirtualRowComponent.prototype.removeItem = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        this._cdr.markForCheck();
        this._viewContainer.remove(column);
    };
    /**
     * @param {?} row
     * @return {?}
     */
    VirtualRowComponent.prototype.updateRow = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        for (var /** @type {?} */ c = 0; c < this._viewContainer.length; c++) {
            var /** @type {?} */ viewRef = /** @type {?} */ (this._viewContainer.get(c));
            viewRef.context.row = row;
        }
        this._cdr.markForCheck();
    };
    VirtualRowComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'od-virtualrow',
                    styles: [":host { display: block; position: absolute; }"],
                    template: "<div #viewRef></div>"
                },] },
    ];
    /** @nocollapse */
    VirtualRowComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
    ]; };
    VirtualRowComponent.propDecorators = {
        "_viewContainer": [{ type: ViewChild, args: ['viewRef', { read: ViewContainerRef },] },],
        "getTransform": [{ type: HostBinding, args: ['style.transform',] },],
    };
    return VirtualRowComponent;
}());
export { VirtualRowComponent };
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