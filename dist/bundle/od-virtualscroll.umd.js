(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('rxjs/ReplaySubject'), require('rxjs/Subject'), require('rxjs/Observable'), require('rxjs/scheduler/animationFrame'), require('rxjs/observable/combineLatest'), require('rxjs/observable/concat'), require('rxjs/observable/empty'), require('rxjs/observable/from'), require('rxjs/observable/fromEvent'), require('rxjs/observable/merge'), require('rxjs/observable/of'), require('rxjs/operators/concatMap'), require('rxjs/operators/debounceTime'), require('rxjs/operators/distinctUntilChanged'), require('rxjs/operators/filter'), require('rxjs/operators/map'), require('rxjs/operators/mergeMap'), require('rxjs/operators/pairwise'), require('rxjs/operators/publish'), require('rxjs/operators/scan'), require('rxjs/operators/startWith'), require('rxjs/operators/withLatestFrom')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/common', '@angular/core', 'rxjs/ReplaySubject', 'rxjs/Subject', 'rxjs/Observable', 'rxjs/scheduler/animationFrame', 'rxjs/observable/combineLatest', 'rxjs/observable/concat', 'rxjs/observable/empty', 'rxjs/observable/from', 'rxjs/observable/fromEvent', 'rxjs/observable/merge', 'rxjs/observable/of', 'rxjs/operators/concatMap', 'rxjs/operators/debounceTime', 'rxjs/operators/distinctUntilChanged', 'rxjs/operators/filter', 'rxjs/operators/map', 'rxjs/operators/mergeMap', 'rxjs/operators/pairwise', 'rxjs/operators/publish', 'rxjs/operators/scan', 'rxjs/operators/startWith', 'rxjs/operators/withLatestFrom'], factory) :
	(factory((global.od = global.od || {}, global.od.virtualscroll = global.od.virtualscroll || {}),global.ng.common,global.ng.core,global.rxjs_ReplaySubject,global.rxjs_Subject,global.rxjs_Observable,global.rxjs_scheduler_animationFrame,global.rxjs_observable_combineLatest,global.rxjs_observable_concat,global.rxjs_observable_empty,global.rxjs_observable_from,global.rxjs_observable_fromEvent,global.rxjs_observable_merge,global.rxjs_observable_of,global.rxjs_operators_concatMap,global.rxjs_operators_debounceTime,global.rxjs_operators_distinctUntilChanged,global.rxjs_operators_filter,global.rxjs_operators_map,global.rxjs_operators_mergeMap,global.rxjs_operators_pairwise,global.rxjs_operators_publish,global.rxjs_operators_scan,global.rxjs_operators_startWith,global.rxjs_operators_withLatestFrom));
}(this, (function (exports,_angular_common,_angular_core,rxjs_ReplaySubject,rxjs_Subject,rxjs_Observable,rxjs_scheduler_animationFrame,rxjs_observable_combineLatest,rxjs_observable_concat,rxjs_observable_empty,rxjs_observable_from,rxjs_observable_fromEvent,rxjs_observable_merge,rxjs_observable_of,rxjs_operators_concatMap,rxjs_operators_debounceTime,rxjs_operators_distinctUntilChanged,rxjs_operators_filter,rxjs_operators_map,rxjs_operators_mergeMap,rxjs_operators_pairwise,rxjs_operators_publish,rxjs_operators_scan,rxjs_operators_startWith,rxjs_operators_withLatestFrom) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ScrollObservableService = (function () {
    function ScrollObservableService() {
        var _this = this;
        this._scrollWin = new rxjs_ReplaySubject.ReplaySubject(1);
        this.scrollWin$ = this._scrollWin.asObservable();
        this.emitScrollWin = function (e) { return _this._scrollWin.next(e); };
        this._createRow = new rxjs_Subject.Subject();
        this.createRow$ = this._createRow.asObservable();
        this.emitCreateRow = function (e) { return _this._createRow.next(e); };
        this._removeRow = new rxjs_Subject.Subject();
        this.removeRow$ = this._removeRow.asObservable();
        this.emitRemoveRow = function (e) { return _this._removeRow.next(e); };
        this._shiftRow = new rxjs_Subject.Subject();
        this.shiftRow$ = this._shiftRow.asObservable();
        this.emitShiftRow = function (e) { return _this._shiftRow.next(e); };
        this._createItem = new rxjs_Subject.Subject();
        this.createItem$ = this._createItem.asObservable();
        this.emitCreateItem = function (e) { return _this._createItem.next(e); };
        this._updateItem = new rxjs_Subject.Subject();
        this.updateItem$ = this._updateItem.asObservable();
        this.emitUpdateItem = function (e) { return _this._updateItem.next(e); };
        this._removeItem = new rxjs_Subject.Subject();
        this.removeItem$ = this._removeItem.asObservable();
        this.emitRemoveItem = function (e) { return _this._removeItem.next(e); };
    }
    ScrollObservableService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    ScrollObservableService.ctorParameters = function () { return []; };
    return ScrollObservableService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
        { type: _angular_core.Component, args: [{
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    selector: 'od-virtualrow',
                    styles: [":host { display: block; position: absolute; }"],
                    template: "<div #viewRef></div>"
                },] },
    ];
    /** @nocollapse */
    VirtualRowComponent.ctorParameters = function () { return [
        { type: _angular_core.ChangeDetectorRef, },
    ]; };
    VirtualRowComponent.propDecorators = {
        "_viewContainer": [{ type: _angular_core.ViewChild, args: ['viewRef', { read: _angular_core.ViewContainerRef },] },],
        "getTransform": [{ type: _angular_core.HostBinding, args: ['style.transform',] },],
    };
    return VirtualRowComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var CmdOption = {
    Noop: 0,
    CreateRow: 1,
    ShiftRow: 2,
    RemoveRow: 3,
    CreateItem: 4,
    UpdateItem: 5,
    RemoveItem: 6,
};
CmdOption[CmdOption.Noop] = "Noop";
CmdOption[CmdOption.CreateRow] = "CreateRow";
CmdOption[CmdOption.ShiftRow] = "ShiftRow";
CmdOption[CmdOption.RemoveRow] = "RemoveRow";
CmdOption[CmdOption.CreateItem] = "CreateItem";
CmdOption[CmdOption.UpdateItem] = "UpdateItem";
CmdOption[CmdOption.RemoveItem] = "RemoveItem";
/**
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

var NoopCmd = (function () {
    function NoopCmd() {
        this.cmdType = CmdOption.Noop;
    }
    return NoopCmd;
}());
var CreateRowCmd = (function () {
    function CreateRowCmd(virtualIndex, actualIndex, initShift) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.initShift = initShift;
        this.cmdType = CmdOption.CreateRow;
    }
    return CreateRowCmd;
}());
var RemoveRowCmd = (function () {
    function RemoveRowCmd(virtualIndex, actualIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.cmdType = CmdOption.RemoveRow;
    }
    return RemoveRowCmd;
}());
var ShiftRowCmd = (function () {
    function ShiftRowCmd(virtualIndex, actualIndex, shift) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.shift = shift;
        this.cmdType = CmdOption.ShiftRow;
    }
    return ShiftRowCmd;
}());
var CreateItemCmd = (function () {
    function CreateItemCmd(virtualIndex, actualIndex, columnIndex, dataIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.columnIndex = columnIndex;
        this.dataIndex = dataIndex;
        this.cmdType = CmdOption.CreateItem;
    }
    return CreateItemCmd;
}());
var UpdateItemCmd = (function () {
    function UpdateItemCmd(virtualIndex, actualIndex, columnIndex, dataIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.columnIndex = columnIndex;
        this.dataIndex = dataIndex;
        this.cmdType = CmdOption.UpdateItem;
    }
    return UpdateItemCmd;
}());
var RemoveItemCmd = (function () {
    function RemoveItemCmd(virtualIndex, actualIndex, columnIndex, dataIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.columnIndex = columnIndex;
        this.dataIndex = dataIndex;
        this.cmdType = CmdOption.RemoveItem;
    }
    return RemoveItemCmd;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} start
 * @param {?} end
 * @param {?} numActualRows
 * @param {?} iteratee
 * @return {?}
 */
function forRowsIn(start, end, numActualRows, iteratee) {
    for (var /** @type {?} */ r = start; r <= end; r++) {
        iteratee(r, r % numActualRows);
    }
}
/**
 * @param {?} start
 * @param {?} end
 * @param {?} row
 * @param {?} numColumns
 * @param {?} numTotalItems
 * @param {?} iteratee
 * @return {?}
 */
function forColumnsIn(start, end, row, numColumns, numTotalItems, iteratee) {
    var /** @type {?} */ getDataIndex = function (c) { return row * numColumns + c; };
    for (var /** @type {?} */ c = start, /** @type {?} */ dataIndx = getDataIndex(c); c <= end && dataIndx < numTotalItems; c++, dataIndx = getDataIndex(c)) {
        iteratee(c, dataIndx);
    }
}
/**
 * @param {?} start
 * @param {?} end
 * @param {?} row
 * @param {?} numColumns
 * @param {?} prevRow
 * @param {?} numPrevColumns
 * @param {?} iteratee
 * @return {?}
 */
function forColumnsInWithPrev(start, end, row, numColumns, prevRow, numPrevColumns, iteratee) {
    for (var /** @type {?} */ c = start; c <= end; c++) {
        iteratee(c, row * numColumns + c, prevRow * numPrevColumns + c);
    }
}

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} data
 * @param {?} rect
 * @param {?} options
 * @return {?}
 */
function calcMeasure(data, rect, options) {
    return __awaiter$1(this, void 0, void 0, function () {
        var _this = this;
        var itemHeight, _a, minItemHeight, numPossibleRows, numPossibleColumns;
        return __generator$1(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (typeof options.itemHeight === 'function' && options.numLimitColumns !== 1) {
                        throw new Error('numLimitColumns must equal 1 when using variable item height.');
                    }
                    if (!(typeof options.itemHeight === 'number')) return [3 /*break*/, 1];
                    _a = options.itemHeight;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, (typeof options.itemHeight !== 'function' ? options.itemHeight : Promise.all(data.map(function (item, i) { return __awaiter$1(_this, void 0, void 0, function () { return __generator$1(this, function (_a) {
                        return [2 /*return*/, (/** @type {?} */ (options.itemHeight))(item, i)];
                    }); }); })))];
                case 2:
                    _a = _b.sent();
                    _b.label = 3;
                case 3:
                    itemHeight = _a;
                    minItemHeight = typeof itemHeight === 'number' ? itemHeight : itemHeight.length === 0 ? 0 : itemHeight.reduce(function (a, b) { return Math.min(a, b); });
                    numPossibleRows = Math.ceil(rect.height / minItemHeight);
                    numPossibleColumns = options.itemWidth !== undefined ? Math.floor(rect.width / options.itemWidth) : 0;
                    return [2 /*return*/, {
                            containerHeight: rect.height,
                            containerWidth: rect.width,
                            itemHeight: itemHeight,
                            itemWidth: options.itemWidth,
                            minItemHeight: minItemHeight,
                            numPossibleColumns: numPossibleColumns,
                            numPossibleItems: numPossibleRows * numPossibleColumns,
                            numPossibleRows: numPossibleRows,
                        }];
            }
        });
    });
}
var clamp = function (min, max, value) { return Math.min(max, Math.max(min, value)); };
/**
 * @param {?} scrollTop
 * @param {?} measure
 * @param {?} numItems
 * @param {?} dataTimestamp
 * @param {?} options
 * @return {?}
 */
function calcScrollWindow(scrollTop, measure, numItems, dataTimestamp, options) {
    var /** @type {?} */ numVirtualItems = numItems;
    var /** @type {?} */ requestedColumns = options.numLimitColumns !== undefined ? options.numLimitColumns : measure.numPossibleColumns;
    var /** @type {?} */ numActualColumns = Math.min(numVirtualItems, requestedColumns);
    var /** @type {?} */ numVirtualRows = Math.ceil(numVirtualItems / Math.max(1, numActualColumns));
    var /** @type {?} */ virtualHeight = typeof measure.itemHeight === 'number' ? numVirtualRows * measure.itemHeight : measure.itemHeight.reduce(function (a, b) { return a + b; }, 0);
    var /** @type {?} */ numAdditionalRows = options.numAdditionalRows !== undefined ? options.numAdditionalRows : 1;
    var /** @type {?} */ requestedRows = measure.numPossibleRows + numAdditionalRows;
    var /** @type {?} */ numActualRows = numActualColumns > 0 ? Math.min(requestedRows, numVirtualRows) : 0;
    var /** @type {?} */ visibleStartRow = typeof measure.itemHeight === 'number' ? undefined : Math.max(0, measure.itemHeight.reduce(function (a, b, i) {
        if (a >= 0) {
            return a;
        }
        var /** @type {?} */ sum = a + b;
        return sum >= 0 ? i : sum;
    }, -scrollTop));
    var /** @type {?} */ actualHeight = typeof measure.itemHeight === 'number' ? numActualRows * measure.itemHeight : typeof visibleStartRow === 'number' ? measure.itemHeight.slice(visibleStartRow).reduce(function (a, b) { return a + b; }, 0) : 0;
    var /** @type {?} */ visibleEndRow = typeof measure.itemHeight === 'number' ? (numActualColumns > 0 && numActualRows > 0 ? clamp(0, numVirtualRows - 1, Math.floor((scrollTop + actualHeight) / measure.minItemHeight) - 1) : -1) : typeof visibleStartRow === 'number' ? (visibleStartRow + numActualRows - 1) : 0;
    var /** @type {?} */ rowShifts = typeof measure.itemHeight === 'number' ? undefined : measure.itemHeight.reduce(function (arr, n) { return arr.concat(arr[arr.length - 1] + n); }, [0]).slice(0, -1);
    return {
        actualHeight: actualHeight,
        containerHeight: measure.containerHeight,
        containerWidth: measure.containerWidth,
        dataTimestamp: dataTimestamp,
        itemHeight: measure.itemHeight,
        itemWidth: measure.itemWidth,
        numActualColumns: numActualColumns,
        numActualItems: Math.min(numActualRows * numActualColumns, numVirtualItems),
        numActualRows: numActualRows,
        numAdditionalRows: numAdditionalRows,
        numVirtualItems: numVirtualItems,
        numVirtualRows: numVirtualRows,
        rowShifts: rowShifts,
        scrollPercentage: clamp(0, 100, scrollTop / (virtualHeight - measure.containerHeight)),
        scrollTop: scrollTop,
        virtualHeight: virtualHeight,
        visibleEndRow: visibleEndRow,
        visibleStartRow: typeof visibleStartRow === 'number' ? visibleStartRow : visibleEndRow !== -1 ? Math.max(0, visibleEndRow - numActualRows + 1) : -1
    };
}
/**
 * @param {?} scrollWin
 * @return {?}
 */
function getMaxIndex(scrollWin) {
    return scrollWin.visibleEndRow * scrollWin.numActualColumns + scrollWin.numActualColumns - 1;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ScrollItem = (function () {
    function ScrollItem($implicit, row, column) {
        this.$implicit = $implicit;
        this.row = row;
        this.column = column;
    }
    return ScrollItem;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} obj
 * @return {?}
 */
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function intersection(a, b) {
    var /** @type {?} */ result = {};
    for (var /** @type {?} */ key in a) {
        if (b[key] !== undefined) {
            result[key] = { left: a[key], right: b[key] };
        }
    }
    return result;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function difference(a, b) {
    var /** @type {?} */ result = {};
    for (var /** @type {?} */ key in a) {
        if (b[key] === undefined) {
            result[key] = a[key];
        }
    }
    return result;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var UserCmdOption = {
    SetScrollTop: 0,
    FocusRow: 1,
    FocusItem: 2,
};
UserCmdOption[UserCmdOption.SetScrollTop] = "SetScrollTop";
UserCmdOption[UserCmdOption.FocusRow] = "FocusRow";
UserCmdOption[UserCmdOption.FocusItem] = "FocusItem";
/**
 * @record
 */

var SetScrollTopCmd = (function () {
    function SetScrollTopCmd(value) {
        this.value = value;
        this.cmdType = UserCmdOption.SetScrollTop;
    }
    return SetScrollTopCmd;
}());
var FocusRowCmd = (function () {
    function FocusRowCmd(rowIndex) {
        this.rowIndex = rowIndex;
        this.cmdType = UserCmdOption.FocusRow;
    }
    return FocusRowCmd;
}());
var FocusItemCmd = (function () {
    function FocusItemCmd(itemIndex) {
        this.itemIndex = itemIndex;
        this.cmdType = UserCmdOption.FocusItem;
    }
    return FocusItemCmd;
}());

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VirtualScrollComponent = (function () {
    function VirtualScrollComponent(_elem, _cdr, _componentFactoryResolver, _obsService, _zone) {
        this._elem = _elem;
        this._cdr = _cdr;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._obsService = _obsService;
        this._zone = _zone;
        this.vsData = rxjs_observable_empty.empty();
        this.vsOptions = rxjs_observable_empty.empty();
        this.vsResize = rxjs_observable_empty.empty();
        this.vsUserCmd = rxjs_observable_empty.empty();
        this.vsDebounceTime = 0;
        this.vsEqualsFunc = function (prevIndex, curIndex) { return prevIndex === curIndex; };
        this.height = 0;
        this.width = '0px';
        this._rowFactory = this._componentFactoryResolver.resolveComponentFactory(VirtualRowComponent);
        this._subs = [];
    }
    /**
     * @template T
     * @param {?} source
     * @return {?}
     */
    VirtualScrollComponent.prototype.publish = /**
     * @template T
     * @param {?} source
     * @return {?}
     */
    function (source) {
        return rxjs_operators_publish.publish()(source);
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ getContainerRect = function () { return _this._elem.nativeElement.getBoundingClientRect(); };
        var /** @type {?} */ getScrollTop = function () { return _this._elem.nativeElement.scrollTop; };
        var /** @type {?} */ setScrollTop = function (scrollTop) { _this._elem.nativeElement.scrollTop = scrollTop; };
        var /** @type {?} */ initData = [];
        var /** @type {?} */ data$ = this.publish(this.vsData.pipe(rxjs_operators_startWith.startWith(initData)));
        var /** @type {?} */ defaultOptions = { itemWidth: 100, itemHeight: 100, numAdditionalRows: 1 };
        var /** @type {?} */ options$ = this.publish(this.vsOptions.pipe(rxjs_operators_startWith.startWith(defaultOptions)));
        var /** @type {?} */ rect$ = rxjs_observable_merge.merge(rxjs_observable_fromEvent.fromEvent(window, 'resize'), this.vsResize).pipe(rxjs_operators_debounceTime.debounceTime(this.vsDebounceTime, rxjs_scheduler_animationFrame.animationFrame), rxjs_operators_map.map(function () { return getContainerRect(); }), rxjs_operators_startWith.startWith(getContainerRect()), rxjs_operators_map.map(function (_a) {
            var width = _a.width, height = _a.height;
            return ({ width: width, height: height });
        }));
        var /** @type {?} */ scroll$ = new rxjs_Subject.Subject();
        this._zone.runOutsideAngular(function () {
            _this._subs.push(rxjs_observable_fromEvent.fromEvent(_this._elem.nativeElement, 'scroll').pipe(rxjs_operators_debounceTime.debounceTime(_this.vsDebounceTime, rxjs_scheduler_animationFrame.animationFrame)).subscribe(function () {
                _this._zone.run(function () { return scroll$.next(); });
            }));
        });
        var /** @type {?} */ scrollTop$ = scroll$.pipe(rxjs_operators_map.map(function () { return getScrollTop(); }), rxjs_operators_startWith.startWith(0));
        var /** @type {?} */ measure$ = this.publish(rxjs_observable_combineLatest.combineLatest(data$, rect$, options$).pipe(rxjs_operators_mergeMap.mergeMap(function (_a) {
            var data = _a[0], rect = _a[1], options = _a[2];
            return __awaiter(_this, void 0, void 0, function () {
                var measurement;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, calcMeasure(data, rect, options)];
                        case 1:
                            measurement = _a.sent();
                            return [2 /*return*/, {
                                    dataLength: data.length,
                                    dataTimestamp: (new Date()).getTime(),
                                    measurement: measurement
                                }];
                    }
                });
            });
        })));
        var /** @type {?} */ scrollWin$ = this.publish(rxjs_observable_combineLatest.combineLatest(scrollTop$, measure$, options$).pipe(rxjs_operators_map.map(function (_a) {
            var scrollTop = _a[0], _b = _a[1], dataLength = _b.dataLength, dataTimestamp = _b.dataTimestamp, measurement = _b.measurement, options = _a[2];
            return calcScrollWindow(scrollTop, measurement, dataLength, dataTimestamp, options);
        }), rxjs_operators_distinctUntilChanged.distinctUntilChanged(function (prevWin, curWin) {
            return prevWin.visibleStartRow === curWin.visibleStartRow &&
                prevWin.visibleEndRow === curWin.visibleEndRow &&
                prevWin.numActualColumns === curWin.numActualColumns &&
                prevWin.numVirtualItems === curWin.numVirtualItems &&
                prevWin.dataTimestamp === curWin.dataTimestamp;
        })));
        var /** @type {?} */ dScrollWin$ = scrollWin$.pipe(rxjs_operators_pairwise.pairwise());
        var /** @type {?} */ renderCmd$ = this.publish(dScrollWin$.pipe(rxjs_operators_concatMap.concatMap(function (_a) {
            var prevWin = _a[0], curWin = _a[1];
            var /** @type {?} */ rowsDiffCmd$ = rxjs_observable_of.of(new NoopCmd());
            var /** @type {?} */ rowsUpdateCmd$ = rxjs_observable_of.of(new NoopCmd());
            var /** @type {?} */ prevIndexMap = {};
            var /** @type {?} */ curIndexMap = {};
            // abs: prevent iterating when prevWin has -1 -> -1
            forRowsIn(Math.abs(prevWin.visibleStartRow), prevWin.visibleEndRow, prevWin.numActualRows, function (row, index) {
                prevIndexMap[index] = row;
            });
            // abs: prevent iterating when curWin has -1 -> -1
            forRowsIn(Math.abs(curWin.visibleStartRow), curWin.visibleEndRow, curWin.numActualRows, function (row, index) {
                curIndexMap[index] = row;
            });
            var /** @type {?} */ removeRowsMap = difference(prevIndexMap, curIndexMap);
            var /** @type {?} */ createRowsMap = difference(curIndexMap, prevIndexMap);
            if (!isEmpty(removeRowsMap)) {
                var /** @type {?} */ removeRowCmds = [];
                var /** @type {?} */ removeItemCmds_1 = [];
                var _loop_1 = function (key) {
                    var /** @type {?} */ rowIndex = parseInt(key, 10);
                    var /** @type {?} */ row = removeRowsMap[key];
                    removeRowCmds.push(new RemoveRowCmd(row, rowIndex));
                    forColumnsIn(0, prevWin.numActualColumns - 1, row, prevWin.numActualColumns, prevWin.numVirtualItems, function (c, dataIndex) {
                        removeItemCmds_1.push(new RemoveItemCmd(row, rowIndex, c, dataIndex));
                    });
                };
                for (var /** @type {?} */ key in removeRowsMap) {
                    _loop_1(key);
                }
                rowsDiffCmd$ = rxjs_observable_concat.concat(rxjs_observable_from.from(removeItemCmds_1.reverse()), rxjs_observable_from.from(removeRowCmds));
            }
            else if (!isEmpty(createRowsMap)) {
                var /** @type {?} */ createRowCmds = [];
                var /** @type {?} */ createItemCmds_1 = [];
                var _loop_2 = function (key) {
                    var /** @type {?} */ rowIndex = parseInt(key, 10);
                    var /** @type {?} */ row = createRowsMap[key];
                    createRowCmds.push(new CreateRowCmd(row, rowIndex, curWin.rowShifts !== undefined ? curWin.rowShifts[row] : typeof curWin.itemHeight === 'number' ? row * curWin.itemHeight : 0));
                    forColumnsIn(0, curWin.numActualColumns - 1, row, curWin.numActualColumns, curWin.numVirtualItems, function (c, dataIndex) {
                        createItemCmds_1.push(new CreateItemCmd(row, rowIndex, c, dataIndex));
                    });
                };
                for (var /** @type {?} */ key in createRowsMap) {
                    _loop_2(key);
                }
                rowsDiffCmd$ = rxjs_observable_concat.concat(rxjs_observable_from.from(createRowCmds), rxjs_observable_from.from(createItemCmds_1));
            }
            var /** @type {?} */ existingRows = intersection(prevIndexMap, curIndexMap);
            if (!isEmpty(existingRows)) {
                var /** @type {?} */ shiftRowCmds = [];
                var /** @type {?} */ createItemCmds_2 = [];
                var /** @type {?} */ removeItemCmds_2 = [];
                var /** @type {?} */ updateItemCmds_1 = [];
                var /** @type {?} */ columnDiffCreateItemCmds_1 = [];
                var /** @type {?} */ columnDiffRemoveItemCmds_1 = [];
                var /** @type {?} */ columnsDiffStart = Math.min(prevWin.numActualColumns, curWin.numActualColumns);
                var /** @type {?} */ numColumns = curWin.numActualColumns - prevWin.numActualColumns;
                var _loop_3 = function (key) {
                    var /** @type {?} */ rowIndex = parseInt(key, 10);
                    var /** @type {?} */ prevRow = existingRows[key].left;
                    var /** @type {?} */ row = existingRows[key].right;
                    if (row !== prevRow) {
                        shiftRowCmds.push(new ShiftRowCmd(row, rowIndex, curWin.rowShifts !== undefined ? curWin.rowShifts[row] : typeof curWin.itemHeight === 'number' ? row * curWin.itemHeight : 0));
                    }
                    if (row !== prevRow || numColumns !== 0 || prevWin.numVirtualItems <= getMaxIndex(prevWin) || curWin.numVirtualItems <= getMaxIndex(curWin) || prevWin.dataTimestamp !== curWin.dataTimestamp) {
                        forColumnsInWithPrev(0, columnsDiffStart - 1, row, curWin.numActualColumns, prevRow, prevWin.numActualColumns, function (c, dataIndex, prevDataIndex) {
                            if (dataIndex >= curWin.numVirtualItems && prevDataIndex < prevWin.numVirtualItems) {
                                removeItemCmds_2.push(new RemoveItemCmd(row, rowIndex, c, prevDataIndex));
                            }
                            else if (dataIndex < curWin.numVirtualItems && prevDataIndex >= prevWin.numVirtualItems) {
                                createItemCmds_2.push(new CreateItemCmd(row, rowIndex, c, dataIndex));
                            }
                            else if (dataIndex < curWin.numVirtualItems && prevDataIndex < prevWin.numVirtualItems && !_this.vsEqualsFunc(prevDataIndex, dataIndex)) {
                                updateItemCmds_1.push(new UpdateItemCmd(row, rowIndex, c, dataIndex));
                            }
                        });
                    }
                    if (numColumns > 0) {
                        forColumnsIn(columnsDiffStart, curWin.numActualColumns - 1, row, curWin.numActualColumns, curWin.numVirtualItems, function (c, dataIndex) {
                            columnDiffCreateItemCmds_1.push(new CreateItemCmd(row, rowIndex, c, dataIndex));
                        });
                    }
                    else if (numColumns < 0) {
                        forColumnsIn(columnsDiffStart, prevWin.numActualColumns - 1, prevRow, prevWin.numActualColumns, prevWin.numVirtualItems, function (c, dataIndex) {
                            columnDiffRemoveItemCmds_1.push(new RemoveItemCmd(prevRow, rowIndex, c, dataIndex));
                        });
                    }
                };
                for (var /** @type {?} */ key in existingRows) {
                    _loop_3(key);
                }
                rowsUpdateCmd$ = rxjs_observable_concat.concat(rxjs_observable_merge.merge(rxjs_observable_from.from(removeItemCmds_2.reverse()), rxjs_observable_from.from(createItemCmds_2), rxjs_observable_from.from(updateItemCmds_1), rxjs_observable_from.from(shiftRowCmds)), rxjs_observable_merge.merge(rxjs_observable_from.from(columnDiffRemoveItemCmds_1.reverse()), rxjs_observable_from.from(columnDiffCreateItemCmds_1)));
            }
            return rxjs_observable_merge.merge(rowsDiffCmd$, rowsUpdateCmd$);
        })));
        var /** @type {?} */ updateScrollWinFunc$ = scrollWin$.pipe(rxjs_operators_map.map(function (scrollWindow) {
            return function (state) {
                state.scrollWindow = scrollWindow;
                _this._obsService.emitScrollWin([scrollWindow]);
                state.needsCheck = true;
                return state;
            };
        }));
        var /** @type {?} */ createRowFunc$ = renderCmd$.pipe(rxjs_operators_filter.filter(function (cmd) { return cmd.cmdType === CmdOption.CreateRow; }), rxjs_operators_map.map(function (cmd) {
            return function (state) {
                var /** @type {?} */ newRow = _this._viewContainer.createComponent(_this._rowFactory);
                newRow.instance.setTransform(cmd.initShift);
                state.rows[cmd.actualIndex] = newRow;
                _this._obsService.emitCreateRow([cmd, newRow]);
                state.needsCheck = false;
                return state;
            };
        }));
        var /** @type {?} */ removeRowFunc$ = renderCmd$.pipe(rxjs_operators_filter.filter(function (cmd) { return cmd.cmdType === CmdOption.RemoveRow; }), rxjs_operators_map.map(function (cmd) {
            return function (state) {
                var /** @type {?} */ rowComp = state.rows[cmd.actualIndex];
                rowComp.destroy();
                delete state.rows[cmd.actualIndex];
                _this._obsService.emitRemoveRow([cmd, rowComp]);
                state.needsCheck = false;
                return state;
            };
        }));
        var /** @type {?} */ shiftRowFunc$ = renderCmd$.pipe(rxjs_operators_filter.filter(function (cmd) { return cmd.cmdType === CmdOption.ShiftRow; }), rxjs_operators_map.map(function (cmd) {
            return function (state) {
                var /** @type {?} */ shift = /** @type {?} */ (cmd);
                var /** @type {?} */ row = state.rows[shift.actualIndex];
                row.instance.updateRow(shift.virtualIndex);
                row.instance.setTransform(shift.shift);
                _this._obsService.emitShiftRow([shift, row]);
                state.needsCheck = false;
                return state;
            };
        }));
        var /** @type {?} */ createItemFunc$ = renderCmd$.pipe(rxjs_operators_filter.filter(function (cmd) { return cmd.cmdType === CmdOption.CreateItem; }), rxjs_operators_withLatestFrom.withLatestFrom(data$), rxjs_operators_map.map(function (_a) {
            var cmd = _a[0], data = _a[1];
            return function (state) {
                var /** @type {?} */ createItem = /** @type {?} */ (cmd);
                var /** @type {?} */ item = new ScrollItem(data[createItem.dataIndex], createItem.virtualIndex, createItem.columnIndex);
                var /** @type {?} */ viewRef = state.rows[createItem.actualIndex].instance.addItem(_this._templateRef, item);
                _this._obsService.emitCreateItem([createItem, item, viewRef]);
                state.needsCheck = false;
                return state;
            };
        }));
        var /** @type {?} */ updateItemFunc$ = renderCmd$.pipe(rxjs_operators_filter.filter(function (cmd) { return cmd.cmdType === CmdOption.UpdateItem; }), rxjs_operators_withLatestFrom.withLatestFrom(data$), rxjs_operators_map.map(function (_a) {
            var cmd = _a[0], data = _a[1];
            return function (state) {
                var /** @type {?} */ update = /** @type {?} */ (cmd);
                var /** @type {?} */ item = data[update.dataIndex];
                var /** @type {?} */ viewRef = state.rows[update.actualIndex].instance.updateItem(update.columnIndex, item);
                _this._obsService.emitUpdateItem([update, item, viewRef]);
                state.needsCheck = false;
                return state;
            };
        }));
        var /** @type {?} */ removeItemFunc$ = renderCmd$.pipe(rxjs_operators_filter.filter(function (cmd) { return cmd.cmdType === CmdOption.RemoveItem; }), rxjs_operators_map.map(function (cmd) {
            return function (state) {
                var /** @type {?} */ comp = state.rows[cmd.actualIndex];
                comp.instance.removeItem(cmd.columnIndex);
                _this._obsService.emitRemoveItem([cmd]);
                state.needsCheck = false;
                return state;
            };
        }));
        var /** @type {?} */ userCmd$ = this.publish(this.vsUserCmd);
        var /** @type {?} */ userSetScrollTop$ = userCmd$.pipe(rxjs_operators_filter.filter(function (cmd) { return cmd.cmdType === UserCmdOption.SetScrollTop; }));
        var /** @type {?} */ focusRowSetScrollTop$ = userCmd$.pipe(rxjs_operators_filter.filter(function (cmd) { return cmd.cmdType === UserCmdOption.FocusRow; }), rxjs_operators_withLatestFrom.withLatestFrom(scrollWin$), rxjs_operators_map.map(function (_a) {
            var cmd = _a[0], scrollWin = _a[1];
            var /** @type {?} */ focusRow = /** @type {?} */ (cmd);
            return new SetScrollTopCmd(scrollWin.rowShifts !== undefined ? scrollWin.rowShifts[focusRow.rowIndex] : typeof scrollWin.itemHeight === 'number' ? (focusRow.rowIndex * scrollWin.itemHeight) : 0);
        }));
        var /** @type {?} */ focusItemSetScrollTop$ = userCmd$.pipe(rxjs_operators_filter.filter(function (cmd) { return cmd.cmdType === UserCmdOption.FocusItem; }), rxjs_operators_withLatestFrom.withLatestFrom(scrollWin$), rxjs_operators_map.map(function (_a) {
            var cmd = _a[0], scrollWin = _a[1];
            var /** @type {?} */ focusItem = /** @type {?} */ (cmd);
            return new SetScrollTopCmd(scrollWin.rowShifts !== undefined ? scrollWin.rowShifts[focusItem.itemIndex] : typeof scrollWin.itemHeight === 'number' ? (Math.floor(focusItem.itemIndex / scrollWin.numActualColumns) * scrollWin.itemHeight) : 0);
        }));
        var /** @type {?} */ setScrollTopFunc$ = rxjs_observable_merge.merge(userSetScrollTop$, focusRowSetScrollTop$, focusItemSetScrollTop$).pipe(rxjs_operators_map.map(function (cmd) {
            return function (state) {
                setScrollTop(cmd.value);
                state.needsCheck = false;
                return state;
            };
        }));
        var /** @type {?} */ scanFunc = function (state, changeFn) { return changeFn(state); };
        // Update store
        var /** @type {?} */ main$ = rxjs_observable_merge.merge(createRowFunc$, removeRowFunc$, shiftRowFunc$, createItemFunc$, removeItemFunc$, updateItemFunc$, updateScrollWinFunc$, setScrollTopFunc$)
            .pipe(rxjs_operators_scan.scan(scanFunc, { measurement: null, scrollWindow: null, rows: {}, needsCheck: false }));
        this._subs.push(main$.pipe(rxjs_operators_filter.filter(function (state) { return state.needsCheck && state.scrollWindow !== null; })).subscribe(function (state) {
            _this.height = state.scrollWindow.virtualHeight;
            if (state.scrollWindow.itemWidth === undefined) {
                _this.width = '100%';
            }
            else {
                _this.width = state.scrollWindow.itemWidth * state.scrollWindow.numActualColumns + "px";
            }
            _this._cdr.markForCheck();
        }));
        // Order is important
        this._subs.push(userCmd$.connect());
        this._subs.push(renderCmd$.connect());
        this._subs.push(scrollWin$.connect());
        this._subs.push(measure$.connect());
        this._subs.push(options$.connect());
        this._subs.push(data$.connect());
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    VirtualScrollComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    selector: 'od-virtualscroll',
                    styles: ["\n    :host {\n      display: block;\n      height: 100%;\n      overflow-y: scroll;\n    }\n\n    .od-scroll-container {\n      position: relative;\n      width: 100%;\n    }\n  "],
                    template: "\n    <div class=\"od-scroll-container\" [style.width]=\"width\" [style.height.px]=\"height\">\n      <div #viewRef><div>\n    </div>",
                },] },
    ];
    /** @nocollapse */
    VirtualScrollComponent.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: _angular_core.ChangeDetectorRef, },
        { type: _angular_core.ComponentFactoryResolver, },
        { type: ScrollObservableService, },
        { type: _angular_core.NgZone, },
    ]; };
    VirtualScrollComponent.propDecorators = {
        "_templateRef": [{ type: _angular_core.ContentChild, args: [_angular_core.TemplateRef,] },],
        "_viewContainer": [{ type: _angular_core.ViewChild, args: ['viewRef', { read: _angular_core.ViewContainerRef },] },],
        "vsData": [{ type: _angular_core.Input },],
        "vsOptions": [{ type: _angular_core.Input },],
        "vsResize": [{ type: _angular_core.Input },],
        "vsUserCmd": [{ type: _angular_core.Input },],
        "vsDebounceTime": [{ type: _angular_core.Input },],
        "vsEqualsFunc": [{ type: _angular_core.Input },],
    };
    return VirtualScrollComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VirtualScrollModule = (function () {
    function VirtualScrollModule() {
    }
    VirtualScrollModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    declarations: [VirtualRowComponent, VirtualScrollComponent],
                    entryComponents: [VirtualRowComponent],
                    exports: [VirtualScrollComponent],
                    imports: [_angular_common.CommonModule],
                    providers: [ScrollObservableService],
                },] },
    ];
    /** @nocollapse */
    VirtualScrollModule.ctorParameters = function () { return []; };
    return VirtualScrollModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

exports.VirtualScrollModule = VirtualScrollModule;
exports.ScrollObservableService = ScrollObservableService;
exports.VirtualRowComponent = VirtualRowComponent;
exports.ScrollItem = ScrollItem;
exports.CreateRowCmd = CreateRowCmd;
exports.RemoveRowCmd = RemoveRowCmd;
exports.ShiftRowCmd = ShiftRowCmd;
exports.CreateItemCmd = CreateItemCmd;
exports.UpdateItemCmd = UpdateItemCmd;
exports.RemoveItemCmd = RemoveItemCmd;
exports.CmdOption = CmdOption;
exports.FocusItemCmd = FocusItemCmd;
exports.FocusRowCmd = FocusRowCmd;
exports.SetScrollTopCmd = SetScrollTopCmd;
exports.UserCmdOption = UserCmdOption;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=od-virtualscroll.umd.js.map
