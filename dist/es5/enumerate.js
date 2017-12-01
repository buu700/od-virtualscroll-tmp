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
export function forRowsIn(start, end, numActualRows, iteratee) {
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
export function forColumnsIn(start, end, row, numColumns, numTotalItems, iteratee) {
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
export function forColumnsInWithPrev(start, end, row, numColumns, prevRow, numPrevColumns, iteratee) {
    for (var /** @type {?} */ c = start; c <= end; c++) {
        iteratee(c, row * numColumns + c, prevRow * numPrevColumns + c);
    }
}
//# sourceMappingURL=enumerate.js.map