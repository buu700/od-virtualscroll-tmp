import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
var ScrollObservableService = (function () {
    function ScrollObservableService() {
        var _this = this;
        this._scrollWin = new ReplaySubject(1);
        this.scrollWin$ = this._scrollWin.asObservable();
        this.emitScrollWin = function (e) { return _this._scrollWin.next(e); };
        this._createRow = new Subject();
        this.createRow$ = this._createRow.asObservable();
        this.emitCreateRow = function (e) { return _this._createRow.next(e); };
        this._removeRow = new Subject();
        this.removeRow$ = this._removeRow.asObservable();
        this.emitRemoveRow = function (e) { return _this._removeRow.next(e); };
        this._shiftRow = new Subject();
        this.shiftRow$ = this._shiftRow.asObservable();
        this.emitShiftRow = function (e) { return _this._shiftRow.next(e); };
        this._createItem = new Subject();
        this.createItem$ = this._createItem.asObservable();
        this.emitCreateItem = function (e) { return _this._createItem.next(e); };
        this._updateItem = new Subject();
        this.updateItem$ = this._updateItem.asObservable();
        this.emitUpdateItem = function (e) { return _this._updateItem.next(e); };
        this._removeItem = new Subject();
        this.removeItem$ = this._removeItem.asObservable();
        this.emitRemoveItem = function (e) { return _this._removeItem.next(e); };
    }
    return ScrollObservableService;
}());
export { ScrollObservableService };
ScrollObservableService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ScrollObservableService.ctorParameters = function () { return []; };
function ScrollObservableService_tsickle_Closure_declarations() {
    /** @type {?} */
    ScrollObservableService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ScrollObservableService.ctorParameters;
    /** @type {?} */
    ScrollObservableService.prototype._scrollWin;
    /** @type {?} */
    ScrollObservableService.prototype.scrollWin$;
    /** @type {?} */
    ScrollObservableService.prototype.emitScrollWin;
    /** @type {?} */
    ScrollObservableService.prototype._createRow;
    /** @type {?} */
    ScrollObservableService.prototype.createRow$;
    /** @type {?} */
    ScrollObservableService.prototype.emitCreateRow;
    /** @type {?} */
    ScrollObservableService.prototype._removeRow;
    /** @type {?} */
    ScrollObservableService.prototype.removeRow$;
    /** @type {?} */
    ScrollObservableService.prototype.emitRemoveRow;
    /** @type {?} */
    ScrollObservableService.prototype._shiftRow;
    /** @type {?} */
    ScrollObservableService.prototype.shiftRow$;
    /** @type {?} */
    ScrollObservableService.prototype.emitShiftRow;
    /** @type {?} */
    ScrollObservableService.prototype._createItem;
    /** @type {?} */
    ScrollObservableService.prototype.createItem$;
    /** @type {?} */
    ScrollObservableService.prototype.emitCreateItem;
    /** @type {?} */
    ScrollObservableService.prototype._updateItem;
    /** @type {?} */
    ScrollObservableService.prototype.updateItem$;
    /** @type {?} */
    ScrollObservableService.prototype.emitUpdateItem;
    /** @type {?} */
    ScrollObservableService.prototype._removeItem;
    /** @type {?} */
    ScrollObservableService.prototype.removeItem$;
    /** @type {?} */
    ScrollObservableService.prototype.emitRemoveItem;
}
//# sourceMappingURL=service.js.map