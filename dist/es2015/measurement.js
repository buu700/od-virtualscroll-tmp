var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @param {?} data
 * @param {?} rect
 * @param {?} options
 * @return {?}
 */
export function calcMeasure(data, rect, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof options.itemHeight === 'function' && options.numLimitColumns !== 1) {
            throw new Error('numLimitColumns must equal 1 when using variable item height.');
        }
        const /** @type {?} */ itemHeight = typeof options.itemHeight === 'number' ? options.itemHeight : yield (typeof options.itemHeight !== 'function' ? options.itemHeight : Promise.all(data.map((item, i) => __awaiter(this, void 0, void 0, function* () { return ((options.itemHeight))(item, i); }))));
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
const /** @type {?} */ clamp = (min, max, value) => Math.min(max, Math.max(min, value));
/**
 * @param {?} scrollTop
 * @param {?} measure
 * @param {?} numItems
 * @param {?} dataTimestamp
 * @param {?} options
 * @return {?}
 */
export function calcScrollWindow(scrollTop, measure, numItems, dataTimestamp, options) {
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
export function getMaxIndex(scrollWin) {
    return scrollWin.visibleEndRow * scrollWin.numActualColumns + scrollWin.numActualColumns - 1;
}
//# sourceMappingURL=measurement.js.map