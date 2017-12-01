import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
export class ScrollObservableService {
    constructor() {
        this._scrollWin = new ReplaySubject(1);
        this.scrollWin$ = this._scrollWin.asObservable();
        this.emitScrollWin = (e) => this._scrollWin.next(e);
        this._createRow = new Subject();
        this.createRow$ = this._createRow.asObservable();
        this.emitCreateRow = (e) => this._createRow.next(e);
        this._removeRow = new Subject();
        this.removeRow$ = this._removeRow.asObservable();
        this.emitRemoveRow = (e) => this._removeRow.next(e);
        this._shiftRow = new Subject();
        this.shiftRow$ = this._shiftRow.asObservable();
        this.emitShiftRow = (e) => this._shiftRow.next(e);
        this._createItem = new Subject();
        this.createItem$ = this._createItem.asObservable();
        this.emitCreateItem = (e) => this._createItem.next(e);
        this._updateItem = new Subject();
        this.updateItem$ = this._updateItem.asObservable();
        this.emitUpdateItem = (e) => this._updateItem.next(e);
        this._removeItem = new Subject();
        this.removeItem$ = this._removeItem.asObservable();
        this.emitRemoveItem = (e) => this._removeItem.next(e);
    }
}
ScrollObservableService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ScrollObservableService.ctorParameters = () => [];
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