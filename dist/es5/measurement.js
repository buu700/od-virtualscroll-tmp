var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
export function calcMeasure(data, rect, options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var itemHeight, _a, minItemHeight, numPossibleRows, numPossibleColumns;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (typeof options.itemHeight === 'function' && options.numLimitColumns !== 1) {
                        throw new Error('numLimitColumns must equal 1 when using variable item height.');
                    }
                    if (!(typeof options.itemHeight === 'number')) return [3 /*break*/, 1];
                    _a = options.itemHeight;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, (typeof options.itemHeight !== 'function' ? options.itemHeight : Promise.all(data.map(function (item, i) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
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
var /** @type {?} */ clamp = function (min, max, value) { return Math.min(max, Math.max(min, value)); };
var ɵ0 = clamp;
/**
 * @param {?} scrollTop
 * @param {?} measure
 * @param {?} numItems
 * @param {?} dataTimestamp
 * @param {?} options
 * @return {?}
 */
export function calcScrollWindow(scrollTop, measure, numItems, dataTimestamp, options) {
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
export function getMaxIndex(scrollWin) {
    return scrollWin.visibleEndRow * scrollWin.numActualColumns + scrollWin.numActualColumns - 1;
}
export { ɵ0 };
//# sourceMappingURL=measurement.js.map