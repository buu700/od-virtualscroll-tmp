import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChild, ElementRef, HostBinding, Injectable, Input, NgModule, NgZone, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Observable';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { concat } from 'rxjs/observable/concat';
import { empty } from 'rxjs/observable/empty';
import { from } from 'rxjs/observable/from';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import { concatMap } from 'rxjs/operators/concatMap';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { pairwise } from 'rxjs/operators/pairwise';
import { publish } from 'rxjs/operators/publish';
import { scan } from 'rxjs/operators/scan';
import { startWith } from 'rxjs/operators/startWith';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ScrollObservableService {
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
/** @nocollapse */
ScrollObservableService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class VirtualRowComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const CmdOption = {
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

class NoopCmd {
    constructor() {
        this.cmdType = CmdOption.Noop;
    }
}
class CreateRowCmd {
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} initShift
     */
    constructor(virtualIndex, actualIndex, initShift) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.initShift = initShift;
        this.cmdType = CmdOption.CreateRow;
    }
}
class RemoveRowCmd {
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     */
    constructor(virtualIndex, actualIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.cmdType = CmdOption.RemoveRow;
    }
}
class ShiftRowCmd {
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} shift
     */
    constructor(virtualIndex, actualIndex, shift) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.shift = shift;
        this.cmdType = CmdOption.ShiftRow;
    }
}
class CreateItemCmd {
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} columnIndex
     * @param {?} dataIndex
     */
    constructor(virtualIndex, actualIndex, columnIndex, dataIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.columnIndex = columnIndex;
        this.dataIndex = dataIndex;
        this.cmdType = CmdOption.CreateItem;
    }
}
class UpdateItemCmd {
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} columnIndex
     * @param {?} dataIndex
     */
    constructor(virtualIndex, actualIndex, columnIndex, dataIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.columnIndex = columnIndex;
        this.dataIndex = dataIndex;
        this.cmdType = CmdOption.UpdateItem;
    }
}
class RemoveItemCmd {
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} columnIndex
     * @param {?} dataIndex
     */
    constructor(virtualIndex, actualIndex, columnIndex, dataIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.columnIndex = columnIndex;
        this.dataIndex = dataIndex;
        this.cmdType = CmdOption.RemoveItem;
    }
}

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
    for (let /** @type {?} */ r = start; r <= end; r++) {
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
    const /** @type {?} */ getDataIndex = (c) => row * numColumns + c;
    for (let /** @type {?} */ c = start, /** @type {?} */ dataIndx = getDataIndex(c); c <= end && dataIndx < numTotalItems; c++, dataIndx = getDataIndex(c)) {
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
    for (let /** @type {?} */ c = start; c <= end; c++) {
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
    return __awaiter$1(this, void 0, void 0, function* () {
        if (typeof options.itemHeight === 'function' && options.numLimitColumns !== 1) {
            throw new Error('numLimitColumns must equal 1 when using variable item height.');
        }
        const /** @type {?} */ itemHeight = typeof options.itemHeight === 'number' ? options.itemHeight : yield (typeof options.itemHeight !== 'function' ? options.itemHeight : Promise.all(data.map((item, i) => __awaiter$1(this, void 0, void 0, function* () { return (/** @type {?} */ (options.itemHeight))(item, i); }))));
        const /** @type {?} */ minItemHeight = typeof itemHeight === 'number' ? itemHeight : itemHeight.length === 0 ? 0 : itemHeight.reduce((a, b) => Math.min(a, b));
        const /** @type {?} */ numPossibleRows = Math.ceil(rect.height / minItemHeight);
        const /** @type {?} */ numPossibleColumns = options.itemWidth !== undefined ? Math.floor(rect.width / options.itemWidth) : 0;
        return {
            containerHeight: rect.height,
            containerWidth: rect.width,
            itemHeight,
            itemWidth: options.itemWidth,
            minItemHeight,
            numPossibleColumns,
            numPossibleItems: numPossibleRows * numPossibleColumns,
            numPossibleRows,
        };
    });
}
const clamp = (min, max, value) => Math.min(max, Math.max(min, value));
/**
 * @param {?} scrollTop
 * @param {?} measure
 * @param {?} numItems
 * @param {?} dataTimestamp
 * @param {?} options
 * @return {?}
 */
function calcScrollWindow(scrollTop, measure, numItems, dataTimestamp, options) {
    const /** @type {?} */ numVirtualItems = numItems;
    const /** @type {?} */ requestedColumns = options.numLimitColumns !== undefined ? options.numLimitColumns : measure.numPossibleColumns;
    const /** @type {?} */ numActualColumns = Math.min(numVirtualItems, requestedColumns);
    const /** @type {?} */ numVirtualRows = Math.ceil(numVirtualItems / Math.max(1, numActualColumns));
    const /** @type {?} */ virtualHeight = typeof measure.itemHeight === 'number' ? numVirtualRows * measure.itemHeight : measure.itemHeight.reduce((a, b) => a + b, 0);
    const /** @type {?} */ numAdditionalRows = options.numAdditionalRows !== undefined ? options.numAdditionalRows : 1;
    const /** @type {?} */ requestedRows = measure.numPossibleRows + numAdditionalRows;
    const /** @type {?} */ numActualRows = numActualColumns > 0 ? Math.min(requestedRows, numVirtualRows) : 0;
    const /** @type {?} */ visibleStartRow = typeof measure.itemHeight === 'number' ? undefined : Math.max(0, measure.itemHeight.reduce((a, b, i) => {
        if (a >= 0) {
            return a;
        }
        const /** @type {?} */ sum = a + b;
        return sum >= 0 ? i : sum;
    }, -scrollTop));
    const /** @type {?} */ actualHeight = typeof measure.itemHeight === 'number' ? numActualRows * measure.itemHeight : typeof visibleStartRow === 'number' ? measure.itemHeight.slice(visibleStartRow).reduce((a, b) => a + b, 0) : 0;
    const /** @type {?} */ visibleEndRow = typeof measure.itemHeight === 'number' ? (numActualColumns > 0 && numActualRows > 0 ? clamp(0, numVirtualRows - 1, Math.floor((scrollTop + actualHeight) / measure.minItemHeight) - 1) : -1) : typeof visibleStartRow === 'number' ? (visibleStartRow + numActualRows - 1) : 0;
    const /** @type {?} */ rowShifts = typeof measure.itemHeight === 'number' ? undefined : measure.itemHeight.reduce((arr, n) => arr.concat(arr[arr.length - 1] + n), [0]).slice(0, -1);
    return {
        actualHeight,
        containerHeight: measure.containerHeight,
        containerWidth: measure.containerWidth,
        dataTimestamp,
        itemHeight: measure.itemHeight,
        itemWidth: measure.itemWidth,
        numActualColumns,
        numActualItems: Math.min(numActualRows * numActualColumns, numVirtualItems),
        numActualRows,
        numAdditionalRows,
        numVirtualItems,
        numVirtualRows,
        rowShifts,
        scrollPercentage: clamp(0, 100, scrollTop / (virtualHeight - measure.containerHeight)),
        scrollTop,
        virtualHeight,
        visibleEndRow,
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
class ScrollItem {
    /**
     * @param {?} $implicit
     * @param {?} row
     * @param {?} column
     */
    constructor($implicit, row, column) {
        this.$implicit = $implicit;
        this.row = row;
        this.column = column;
    }
}

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
    const /** @type {?} */ result = {};
    for (const /** @type {?} */ key in a) {
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
    const /** @type {?} */ result = {};
    for (const /** @type {?} */ key in a) {
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
const UserCmdOption = {
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

class SetScrollTopCmd {
    /**
     * @param {?} value
     */
    constructor(value) {
        this.value = value;
        this.cmdType = UserCmdOption.SetScrollTop;
    }
}
class FocusRowCmd {
    /**
     * @param {?} rowIndex
     */
    constructor(rowIndex) {
        this.rowIndex = rowIndex;
        this.cmdType = UserCmdOption.FocusRow;
    }
}
class FocusItemCmd {
    /**
     * @param {?} itemIndex
     */
    constructor(itemIndex) {
        this.itemIndex = itemIndex;
        this.cmdType = UserCmdOption.FocusItem;
    }
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class VirtualScrollComponent {
    /**
     * @param {?} _elem
     * @param {?} _cdr
     * @param {?} _componentFactoryResolver
     * @param {?} _obsService
     * @param {?} _zone
     */
    constructor(_elem, _cdr, _componentFactoryResolver, _obsService, _zone) {
        this._elem = _elem;
        this._cdr = _cdr;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._obsService = _obsService;
        this._zone = _zone;
        this.vsData = empty();
        this.vsOptions = empty();
        this.vsResize = empty();
        this.vsUserCmd = empty();
        this.vsDebounceTime = 0;
        this.vsEqualsFunc = (prevIndex, curIndex) => prevIndex === curIndex;
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
    publish(source) {
        return publish()(source);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ getContainerRect = () => this._elem.nativeElement.getBoundingClientRect();
        const /** @type {?} */ getScrollTop = () => this._elem.nativeElement.scrollTop;
        const /** @type {?} */ setScrollTop = (scrollTop) => { this._elem.nativeElement.scrollTop = scrollTop; };
        const /** @type {?} */ initData = [];
        const /** @type {?} */ data$ = this.publish(this.vsData.pipe(startWith(initData)));
        const /** @type {?} */ defaultOptions = { itemWidth: 100, itemHeight: 100, numAdditionalRows: 1 };
        const /** @type {?} */ options$ = this.publish(this.vsOptions.pipe(startWith(defaultOptions)));
        const /** @type {?} */ rect$ = merge(fromEvent(window, 'resize'), this.vsResize).pipe(debounceTime(this.vsDebounceTime, animationFrame), map(() => getContainerRect()), startWith(getContainerRect()), map(({ width, height }) => ({ width, height })));
        const /** @type {?} */ scroll$ = new Subject();
        this._zone.runOutsideAngular(() => {
            this._subs.push(fromEvent(this._elem.nativeElement, 'scroll').pipe(debounceTime(this.vsDebounceTime, animationFrame)).subscribe(() => {
                this._zone.run(() => scroll$.next());
            }));
        });
        const /** @type {?} */ scrollTop$ = scroll$.pipe(map(() => getScrollTop()), startWith(0));
        const /** @type {?} */ measure$ = this.publish(combineLatest(data$, rect$, options$).pipe(mergeMap(([data, rect, options]) => __awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ measurement = yield calcMeasure(data, rect, options);
            return {
                dataLength: data.length,
                dataTimestamp: (new Date()).getTime(),
                measurement
            };
        }))));
        const /** @type {?} */ scrollWin$ = this.publish(combineLatest(scrollTop$, measure$, options$).pipe(map(([scrollTop, { dataLength, dataTimestamp, measurement }, options]) => calcScrollWindow(scrollTop, measurement, dataLength, dataTimestamp, options)), distinctUntilChanged((prevWin, curWin) => {
            return prevWin.visibleStartRow === curWin.visibleStartRow &&
                prevWin.visibleEndRow === curWin.visibleEndRow &&
                prevWin.numActualColumns === curWin.numActualColumns &&
                prevWin.numVirtualItems === curWin.numVirtualItems &&
                prevWin.dataTimestamp === curWin.dataTimestamp;
        })));
        const /** @type {?} */ dScrollWin$ = scrollWin$.pipe(pairwise());
        const /** @type {?} */ renderCmd$ = this.publish(dScrollWin$.pipe(concatMap(([prevWin, curWin]) => {
            let /** @type {?} */ rowsDiffCmd$ = of(new NoopCmd());
            let /** @type {?} */ rowsUpdateCmd$ = of(new NoopCmd());
            const /** @type {?} */ prevIndexMap = {};
            const /** @type {?} */ curIndexMap = {};
            // abs: prevent iterating when prevWin has -1 -> -1
            forRowsIn(Math.abs(prevWin.visibleStartRow), prevWin.visibleEndRow, prevWin.numActualRows, (row, index) => {
                prevIndexMap[index] = row;
            });
            // abs: prevent iterating when curWin has -1 -> -1
            forRowsIn(Math.abs(curWin.visibleStartRow), curWin.visibleEndRow, curWin.numActualRows, (row, index) => {
                curIndexMap[index] = row;
            });
            const /** @type {?} */ removeRowsMap = difference(prevIndexMap, curIndexMap);
            const /** @type {?} */ createRowsMap = difference(curIndexMap, prevIndexMap);
            if (!isEmpty(removeRowsMap)) {
                const /** @type {?} */ removeRowCmds = [];
                const /** @type {?} */ removeItemCmds = [];
                for (const /** @type {?} */ key in removeRowsMap) {
                    const /** @type {?} */ rowIndex = parseInt(key, 10);
                    const /** @type {?} */ row = removeRowsMap[key];
                    removeRowCmds.push(new RemoveRowCmd(row, rowIndex));
                    forColumnsIn(0, prevWin.numActualColumns - 1, row, prevWin.numActualColumns, prevWin.numVirtualItems, (c, dataIndex) => {
                        removeItemCmds.push(new RemoveItemCmd(row, rowIndex, c, dataIndex));
                    });
                }
                rowsDiffCmd$ = concat(from(removeItemCmds.reverse()), from(removeRowCmds));
            }
            else if (!isEmpty(createRowsMap)) {
                const /** @type {?} */ createRowCmds = [];
                const /** @type {?} */ createItemCmds = [];
                for (const /** @type {?} */ key in createRowsMap) {
                    const /** @type {?} */ rowIndex = parseInt(key, 10);
                    const /** @type {?} */ row = createRowsMap[key];
                    createRowCmds.push(new CreateRowCmd(row, rowIndex, curWin.rowShifts !== undefined ? curWin.rowShifts[row] : typeof curWin.itemHeight === 'number' ? row * curWin.itemHeight : 0));
                    forColumnsIn(0, curWin.numActualColumns - 1, row, curWin.numActualColumns, curWin.numVirtualItems, (c, dataIndex) => {
                        createItemCmds.push(new CreateItemCmd(row, rowIndex, c, dataIndex));
                    });
                }
                rowsDiffCmd$ = concat(from(createRowCmds), from(createItemCmds));
            }
            const /** @type {?} */ existingRows = intersection(prevIndexMap, curIndexMap);
            if (!isEmpty(existingRows)) {
                const /** @type {?} */ shiftRowCmds = [];
                const /** @type {?} */ createItemCmds = [];
                const /** @type {?} */ removeItemCmds = [];
                const /** @type {?} */ updateItemCmds = [];
                const /** @type {?} */ columnDiffCreateItemCmds = [];
                const /** @type {?} */ columnDiffRemoveItemCmds = [];
                const /** @type {?} */ columnsDiffStart = Math.min(prevWin.numActualColumns, curWin.numActualColumns);
                const /** @type {?} */ numColumns = curWin.numActualColumns - prevWin.numActualColumns;
                for (const /** @type {?} */ key in existingRows) {
                    const /** @type {?} */ rowIndex = parseInt(key, 10);
                    const /** @type {?} */ prevRow = existingRows[key].left;
                    const /** @type {?} */ row = existingRows[key].right;
                    if (row !== prevRow) {
                        shiftRowCmds.push(new ShiftRowCmd(row, rowIndex, curWin.rowShifts !== undefined ? curWin.rowShifts[row] : typeof curWin.itemHeight === 'number' ? row * curWin.itemHeight : 0));
                    }
                    if (row !== prevRow || numColumns !== 0 || prevWin.numVirtualItems <= getMaxIndex(prevWin) || curWin.numVirtualItems <= getMaxIndex(curWin) || prevWin.dataTimestamp !== curWin.dataTimestamp) {
                        forColumnsInWithPrev(0, columnsDiffStart - 1, row, curWin.numActualColumns, prevRow, prevWin.numActualColumns, (c, dataIndex, prevDataIndex) => {
                            if (dataIndex >= curWin.numVirtualItems && prevDataIndex < prevWin.numVirtualItems) {
                                removeItemCmds.push(new RemoveItemCmd(row, rowIndex, c, prevDataIndex));
                            }
                            else if (dataIndex < curWin.numVirtualItems && prevDataIndex >= prevWin.numVirtualItems) {
                                createItemCmds.push(new CreateItemCmd(row, rowIndex, c, dataIndex));
                            }
                            else if (dataIndex < curWin.numVirtualItems && prevDataIndex < prevWin.numVirtualItems && !this.vsEqualsFunc(prevDataIndex, dataIndex)) {
                                updateItemCmds.push(new UpdateItemCmd(row, rowIndex, c, dataIndex));
                            }
                        });
                    }
                    if (numColumns > 0) {
                        forColumnsIn(columnsDiffStart, curWin.numActualColumns - 1, row, curWin.numActualColumns, curWin.numVirtualItems, (c, dataIndex) => {
                            columnDiffCreateItemCmds.push(new CreateItemCmd(row, rowIndex, c, dataIndex));
                        });
                    }
                    else if (numColumns < 0) {
                        forColumnsIn(columnsDiffStart, prevWin.numActualColumns - 1, prevRow, prevWin.numActualColumns, prevWin.numVirtualItems, (c, dataIndex) => {
                            columnDiffRemoveItemCmds.push(new RemoveItemCmd(prevRow, rowIndex, c, dataIndex));
                        });
                    }
                }
                rowsUpdateCmd$ = concat(merge(from(removeItemCmds.reverse()), from(createItemCmds), from(updateItemCmds), from(shiftRowCmds)), merge(from(columnDiffRemoveItemCmds.reverse()), from(columnDiffCreateItemCmds)));
            }
            return merge(rowsDiffCmd$, rowsUpdateCmd$);
        })));
        const /** @type {?} */ updateScrollWinFunc$ = scrollWin$.pipe(map(scrollWindow => (state) => {
            state.scrollWindow = scrollWindow;
            this._obsService.emitScrollWin([scrollWindow]);
            state.needsCheck = true;
            return state;
        }));
        const /** @type {?} */ createRowFunc$ = renderCmd$.pipe(filter(cmd => cmd.cmdType === CmdOption.CreateRow), map((cmd) => (state) => {
            const /** @type {?} */ newRow = this._viewContainer.createComponent(this._rowFactory);
            newRow.instance.setTransform(cmd.initShift);
            state.rows[cmd.actualIndex] = newRow;
            this._obsService.emitCreateRow([cmd, newRow]);
            state.needsCheck = false;
            return state;
        }));
        const /** @type {?} */ removeRowFunc$ = renderCmd$.pipe(filter(cmd => cmd.cmdType === CmdOption.RemoveRow), map((cmd) => (state) => {
            const /** @type {?} */ rowComp = state.rows[cmd.actualIndex];
            rowComp.destroy();
            delete state.rows[cmd.actualIndex];
            this._obsService.emitRemoveRow([cmd, rowComp]);
            state.needsCheck = false;
            return state;
        }));
        const /** @type {?} */ shiftRowFunc$ = renderCmd$.pipe(filter(cmd => cmd.cmdType === CmdOption.ShiftRow), map(cmd => (state) => {
            const /** @type {?} */ shift = /** @type {?} */ (cmd);
            const /** @type {?} */ row = state.rows[shift.actualIndex];
            row.instance.updateRow(shift.virtualIndex);
            row.instance.setTransform(shift.shift);
            this._obsService.emitShiftRow([shift, row]);
            state.needsCheck = false;
            return state;
        }));
        const /** @type {?} */ createItemFunc$ = renderCmd$.pipe(filter(cmd => cmd.cmdType === CmdOption.CreateItem), withLatestFrom(data$), map(([cmd, data]) => (state) => {
            const /** @type {?} */ createItem = /** @type {?} */ (cmd);
            const /** @type {?} */ item = new ScrollItem(data[createItem.dataIndex], createItem.virtualIndex, createItem.columnIndex);
            const /** @type {?} */ viewRef = state.rows[createItem.actualIndex].instance.addItem(this._templateRef, item);
            this._obsService.emitCreateItem([createItem, item, viewRef]);
            state.needsCheck = false;
            return state;
        }));
        const /** @type {?} */ updateItemFunc$ = renderCmd$.pipe(filter(cmd => cmd.cmdType === CmdOption.UpdateItem), withLatestFrom(data$), map(([cmd, data]) => (state) => {
            const /** @type {?} */ update = /** @type {?} */ (cmd);
            const /** @type {?} */ item = data[update.dataIndex];
            const /** @type {?} */ viewRef = state.rows[update.actualIndex].instance.updateItem(update.columnIndex, item);
            this._obsService.emitUpdateItem([update, item, viewRef]);
            state.needsCheck = false;
            return state;
        }));
        const /** @type {?} */ removeItemFunc$ = renderCmd$.pipe(filter(cmd => cmd.cmdType === CmdOption.RemoveItem), map((cmd) => (state) => {
            const /** @type {?} */ comp = state.rows[cmd.actualIndex];
            comp.instance.removeItem(cmd.columnIndex);
            this._obsService.emitRemoveItem([cmd]);
            state.needsCheck = false;
            return state;
        }));
        const /** @type {?} */ userCmd$ = this.publish(this.vsUserCmd);
        const /** @type {?} */ userSetScrollTop$ = userCmd$.pipe(filter(cmd => cmd.cmdType === UserCmdOption.SetScrollTop));
        const /** @type {?} */ focusRowSetScrollTop$ = userCmd$.pipe(filter(cmd => cmd.cmdType === UserCmdOption.FocusRow), withLatestFrom(scrollWin$), map(([cmd, scrollWin]) => {
            const /** @type {?} */ focusRow = /** @type {?} */ (cmd);
            return new SetScrollTopCmd(scrollWin.rowShifts !== undefined ? scrollWin.rowShifts[focusRow.rowIndex] : typeof scrollWin.itemHeight === 'number' ? (focusRow.rowIndex * scrollWin.itemHeight) : 0);
        }));
        const /** @type {?} */ focusItemSetScrollTop$ = userCmd$.pipe(filter(cmd => cmd.cmdType === UserCmdOption.FocusItem), withLatestFrom(scrollWin$), map(([cmd, scrollWin]) => {
            const /** @type {?} */ focusItem = /** @type {?} */ (cmd);
            return new SetScrollTopCmd(scrollWin.rowShifts !== undefined ? scrollWin.rowShifts[focusItem.itemIndex] : typeof scrollWin.itemHeight === 'number' ? (Math.floor(focusItem.itemIndex / scrollWin.numActualColumns) * scrollWin.itemHeight) : 0);
        }));
        const /** @type {?} */ setScrollTopFunc$ = merge(userSetScrollTop$, focusRowSetScrollTop$, focusItemSetScrollTop$).pipe(map((cmd) => (state) => {
            setScrollTop(cmd.value);
            state.needsCheck = false;
            return state;
        }));
        const /** @type {?} */ scanFunc = (state, changeFn) => changeFn(state);
        // Update store
        const /** @type {?} */ main$ = merge(createRowFunc$, removeRowFunc$, shiftRowFunc$, createItemFunc$, removeItemFunc$, updateItemFunc$, updateScrollWinFunc$, setScrollTopFunc$)
            .pipe(scan(scanFunc, { measurement: null, scrollWindow: null, rows: {}, needsCheck: false }));
        this._subs.push(main$.pipe(filter(state => state.needsCheck && state.scrollWindow !== null)).subscribe(state => {
            this.height = state.scrollWindow.virtualHeight;
            if (state.scrollWindow.itemWidth === undefined) {
                this.width = '100%';
            }
            else {
                this.width = `${state.scrollWindow.itemWidth * state.scrollWindow.numActualColumns}px`;
            }
            this._cdr.markForCheck();
        }));
        // Order is important
        this._subs.push(userCmd$.connect());
        this._subs.push(renderCmd$.connect());
        this._subs.push(scrollWin$.connect());
        this._subs.push(measure$.connect());
        this._subs.push(options$.connect());
        this._subs.push(data$.connect());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subs.forEach(sub => sub.unsubscribe());
    }
}
VirtualScrollComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'od-virtualscroll',
                styles: [`
    :host {
      display: block;
      height: 100%;
      overflow-y: scroll;
    }

    .od-scroll-container {
      position: relative;
      width: 100%;
    }
  `],
                template: `
    <div class="od-scroll-container" [style.width]="width" [style.height.px]="height">
      <div #viewRef><div>
    </div>`,
            },] },
];
/** @nocollapse */
VirtualScrollComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: ComponentFactoryResolver, },
    { type: ScrollObservableService, },
    { type: NgZone, },
];
VirtualScrollComponent.propDecorators = {
    "_templateRef": [{ type: ContentChild, args: [TemplateRef,] },],
    "_viewContainer": [{ type: ViewChild, args: ['viewRef', { read: ViewContainerRef },] },],
    "vsData": [{ type: Input },],
    "vsOptions": [{ type: Input },],
    "vsResize": [{ type: Input },],
    "vsUserCmd": [{ type: Input },],
    "vsDebounceTime": [{ type: Input },],
    "vsEqualsFunc": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class VirtualScrollModule {
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
/** @nocollapse */
VirtualScrollModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { VirtualScrollModule, ScrollObservableService, VirtualRowComponent, ScrollItem, CreateRowCmd, RemoveRowCmd, ShiftRowCmd, CreateItemCmd, UpdateItemCmd, RemoveItemCmd, CmdOption, FocusItemCmd, FocusRowCmd, SetScrollTopCmd, UserCmdOption, VirtualScrollComponent as ɵa };
