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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChild, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { animationFrame as animationScheduler } from 'rxjs/scheduler/animationFrame';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/partition';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/withLatestFrom';
import { CmdOption, CreateItemCmd, CreateRowCmd, NoopCmd, RemoveItemCmd, RemoveRowCmd, ShiftRowCmd, UpdateItemCmd } from './cmd';
import { forColumnsIn, forColumnsInWithPrev, forRowsIn } from './enumerate';
import { calcMeasure, calcScrollWindow, getMaxIndex } from './measurement';
import { ScrollItem } from './scrollItem';
import { ScrollObservableService } from './service';
import { difference, intersection, isEmpty } from './set';
import { SetScrollTopCmd, UserCmdOption } from './userCmd';
import { VirtualRowComponent } from './virtualRow.component';
var VirtualScrollComponent = (function () {
    /**
     * @param {?} _elem
     * @param {?} _cdr
     * @param {?} _componentFactoryResolver
     * @param {?} _obsService
     */
    function VirtualScrollComponent(_elem, _cdr, _componentFactoryResolver, _obsService) {
        this._elem = _elem;
        this._cdr = _cdr;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._obsService = _obsService;
        this.vsData = Observable.empty();
        this.vsOptions = Observable.empty();
        this.vsResize = Observable.empty();
        this.vsUserCmd = Observable.empty();
        this.vsDebounceTime = 0;
        this.vsEqualsFunc = function (prevIndex, curIndex) { return prevIndex === curIndex; };
        this.height = 0;
        this.width = '0px';
        this._rowFactory = this._componentFactoryResolver.resolveComponentFactory(VirtualRowComponent);
        this._subs = [];
    }
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ getContainerRect = function () { return _this._elem.nativeElement.getBoundingClientRect(); };
        var /** @type {?} */ getScrollTop = function () { return _this._elem.nativeElement.scrollTop; };
        var /** @type {?} */ setScrollTop = function (scrollTop) { _this._elem.nativeElement.scrollTop = scrollTop; };
        var /** @type {?} */ initData = [];
        var /** @type {?} */ data$ = this.vsData.startWith(initData).publish();
        var /** @type {?} */ defaultOptions = { itemWidth: 100, itemHeight: 100, numAdditionalRows: 1 };
        var /** @type {?} */ options$ = this.vsOptions.startWith(defaultOptions).publish();
        var /** @type {?} */ rect$ = Observable.merge(Observable.fromEvent(window, 'resize'), this.vsResize)
            .debounceTime(this.vsDebounceTime, animationScheduler)
            .map(function () { return getContainerRect(); })
            .startWith(getContainerRect())
            .map(function (_a) {
            var width = _a.width, height = _a.height;
            return ({ width: width, height: height });
        });
        var /** @type {?} */ scrollTop$ = Observable.fromEvent(this._elem.nativeElement, 'scroll')
            .debounceTime(this.vsDebounceTime, animationScheduler)
            .map(function () { return getScrollTop(); })
            .startWith(0);
        var /** @type {?} */ measure$ = Observable.combineLatest(data$, rect$, options$)
            .mergeMap(function (_a) {
            var data = _a[0], rect = _a[1], options = _a[2];
            return __awaiter(_this, void 0, void 0, function () {
                var measurement;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, calcMeasure(data, rect, options)];
                        case 1:
                            measurement = _a.sent();
                            return [2 /*return*/, {
                                    dataTimestamp: (new Date()).getTime(),
                                    dataLength: data.length,
                                    measurement: measurement
                                }];
                    }
                });
            });
        })
            .publish();
        var /** @type {?} */ scrollWin$ = Observable.combineLatest(scrollTop$, measure$, options$)
            .map(function (_a) {
            var scrollTop = _a[0], _b = _a[1], measurement = _b.measurement, dataTimestamp = _b.dataTimestamp, dataLength = _b.dataLength, options = _a[2];
            return calcScrollWindow(scrollTop, measurement, dataLength, dataTimestamp, options);
        })
            .distinctUntilChanged(function (prevWin, curWin) {
            return prevWin.visibleStartRow === curWin.visibleStartRow &&
                prevWin.visibleEndRow === curWin.visibleEndRow &&
                prevWin.numActualColumns === curWin.numActualColumns &&
                prevWin.numVirtualItems === curWin.numVirtualItems &&
                prevWin.dataTimestamp === curWin.dataTimestamp;
        })
            .publish();
        var /** @type {?} */ dScrollWin$ = scrollWin$.pairwise();
        var /** @type {?} */ renderCmd$ = dScrollWin$.concatMap(function (_a) {
            var prevWin = _a[0], curWin = _a[1];
            var /** @type {?} */ rowsDiffCmd$ = Observable.of(new NoopCmd());
            var /** @type {?} */ rowsUpdateCmd$ = Observable.of(new NoopCmd());
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
                    _loop_1(/** @type {?} */ key);
                }
                rowsDiffCmd$ = Observable.concat(Observable.from(removeItemCmds_1.reverse()), Observable.from(removeRowCmds));
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
                    _loop_2(/** @type {?} */ key);
                }
                rowsDiffCmd$ = Observable.concat(Observable.from(createRowCmds), Observable.from(createItemCmds_1));
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
                    _loop_3(/** @type {?} */ key);
                }
                rowsUpdateCmd$ = Observable.concat(Observable.merge(Observable.from(removeItemCmds_2.reverse()), Observable.from(createItemCmds_2), Observable.from(updateItemCmds_1), Observable.from(shiftRowCmds)), Observable.merge(Observable.from(columnDiffRemoveItemCmds_1.reverse()), Observable.from(columnDiffCreateItemCmds_1)));
            }
            return Observable.merge(rowsDiffCmd$, rowsUpdateCmd$);
        }).publish();
        var /** @type {?} */ updateScrollWinFunc$ = scrollWin$.map(function (scrollWindow) { return function (state) {
            state.scrollWindow = scrollWindow;
            _this._obsService.emitScrollWin([scrollWindow]);
            state.needsCheck = true;
            return state;
        }; });
        var /** @type {?} */ createRowFunc$ = renderCmd$
            .filter(function (cmd) { return cmd.cmdType === CmdOption.CreateRow; })
            .map(function (cmd) { return function (state) {
            var /** @type {?} */ newRow = _this._viewContainer.createComponent(_this._rowFactory);
            newRow.instance.setTransform(cmd.initShift);
            state.rows[cmd.actualIndex] = newRow;
            _this._obsService.emitCreateRow([cmd, newRow]);
            state.needsCheck = false;
            return state;
        }; });
        var /** @type {?} */ removeRowFunc$ = renderCmd$
            .filter(function (cmd) { return cmd.cmdType === CmdOption.RemoveRow; })
            .map(function (cmd) { return function (state) {
            var /** @type {?} */ rowComp = state.rows[cmd.actualIndex];
            rowComp.destroy();
            delete state.rows[cmd.actualIndex];
            _this._obsService.emitRemoveRow([cmd, rowComp]);
            state.needsCheck = false;
            return state;
        }; });
        var /** @type {?} */ shiftRowFunc$ = renderCmd$
            .filter(function (cmd) { return cmd.cmdType === CmdOption.ShiftRow; })
            .map(function (cmd) { return function (state) {
            var /** @type {?} */ shift = (cmd);
            var /** @type {?} */ row = state.rows[shift.actualIndex];
            row.instance.updateRow(shift.virtualIndex);
            row.instance.setTransform(shift.shift);
            _this._obsService.emitShiftRow([shift, row]);
            state.needsCheck = false;
            return state;
        }; });
        var /** @type {?} */ createItemFunc$ = renderCmd$
            .filter(function (cmd) { return cmd.cmdType === CmdOption.CreateItem; })
            .withLatestFrom(data$)
            .map(function (_a) {
            var cmd = _a[0], data = _a[1];
            return function (state) {
                var /** @type {?} */ createItem = (cmd);
                var /** @type {?} */ item = new ScrollItem(data[createItem.dataIndex], createItem.virtualIndex, createItem.columnIndex);
                var /** @type {?} */ viewRef = state.rows[createItem.actualIndex].instance.addItem(_this._templateRef, item);
                _this._obsService.emitCreateItem([createItem, item, viewRef]);
                state.needsCheck = false;
                return state;
            };
        });
        var /** @type {?} */ updateItemFunc$ = renderCmd$
            .filter(function (cmd) { return cmd.cmdType === CmdOption.UpdateItem; })
            .withLatestFrom(data$)
            .map(function (_a) {
            var cmd = _a[0], data = _a[1];
            return function (state) {
                var /** @type {?} */ update = (cmd);
                var /** @type {?} */ item = data[update.dataIndex];
                var /** @type {?} */ viewRef = state.rows[update.actualIndex].instance.updateItem(update.columnIndex, item);
                _this._obsService.emitUpdateItem([update, item, viewRef]);
                state.needsCheck = false;
                return state;
            };
        });
        var /** @type {?} */ removeItemFunc$ = renderCmd$
            .filter(function (cmd) { return cmd.cmdType === CmdOption.RemoveItem; })
            .map(function (cmd) { return function (state) {
            var /** @type {?} */ comp = state.rows[cmd.actualIndex];
            comp.instance.removeItem(cmd.columnIndex);
            _this._obsService.emitRemoveItem([cmd]);
            state.needsCheck = false;
            return state;
        }; });
        var /** @type {?} */ userCmd$ = this.vsUserCmd.publish();
        var /** @type {?} */ userSetScrollTop$ = userCmd$.filter(function (cmd) { return cmd.cmdType === UserCmdOption.SetScrollTop; });
        var /** @type {?} */ focusRowSetScrollTop$ = userCmd$
            .filter(function (cmd) { return cmd.cmdType === UserCmdOption.FocusRow; })
            .withLatestFrom(scrollWin$)
            .map(function (_a) {
            var cmd = _a[0], scrollWin = _a[1];
            var /** @type {?} */ focusRow = (cmd);
            return new SetScrollTopCmd(scrollWin.rowShifts !== undefined ? scrollWin.rowShifts[focusRow.rowIndex] : typeof scrollWin.itemHeight === 'number' ? (focusRow.rowIndex * scrollWin.itemHeight) : 0);
        });
        var /** @type {?} */ focusItemSetScrollTop$ = userCmd$
            .filter(function (cmd) { return cmd.cmdType === UserCmdOption.FocusItem; })
            .withLatestFrom(scrollWin$)
            .map(function (_a) {
            var cmd = _a[0], scrollWin = _a[1];
            var /** @type {?} */ focusItem = (cmd);
            return new SetScrollTopCmd(scrollWin.rowShifts !== undefined ? scrollWin.rowShifts[focusItem.itemIndex] : typeof scrollWin.itemHeight === 'number' ? (Math.floor(focusItem.itemIndex / scrollWin.numActualColumns) * scrollWin.itemHeight) : 0);
        });
        var /** @type {?} */ setScrollTopFunc$ = Observable.merge(userSetScrollTop$, focusRowSetScrollTop$, focusItemSetScrollTop$)
            .map(function (cmd) { return function (state) {
            setScrollTop(cmd.value);
            state.needsCheck = false;
            return state;
        }; });
        var /** @type {?} */ scanFunc = function (state, changeFn) { return changeFn(state); };
        // Update store
        var /** @type {?} */ main$ = Observable.merge(createRowFunc$, removeRowFunc$, shiftRowFunc$, createItemFunc$, removeItemFunc$, updateItemFunc$, updateScrollWinFunc$, setScrollTopFunc$)
            .scan(scanFunc, { measurement: null, scrollWindow: null, rows: {}, needsCheck: false });
        this._subs.push(main$.filter(function (state) { return state.needsCheck && state.scrollWindow !== null; }).subscribe(function (state) {
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
    VirtualScrollComponent.prototype.ngOnDestroy = function () {
        this._subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    return VirtualScrollComponent;
}());
export { VirtualScrollComponent };
VirtualScrollComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'od-virtualscroll',
                styles: ["\n    :host {\n      display: block;\n      height: 100%;\n      overflow-y: scroll;\n    }\n\n    .od-scroll-container {\n      position: relative;\n      width: 100%;\n    }\n  "],
                template: "\n    <div class=\"od-scroll-container\" [style.width]=\"width\" [style.height.px]=\"height\">\n      <div #viewRef><div>\n    </div>",
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: ComponentFactoryResolver, },
    { type: ScrollObservableService, },
]; };
VirtualScrollComponent.propDecorators = {
    '_templateRef': [{ type: ContentChild, args: [TemplateRef,] },],
    '_viewContainer': [{ type: ViewChild, args: ['viewRef', { read: ViewContainerRef },] },],
    'vsData': [{ type: Input },],
    'vsOptions': [{ type: Input },],
    'vsResize': [{ type: Input },],
    'vsUserCmd': [{ type: Input },],
    'vsDebounceTime': [{ type: Input },],
    'vsEqualsFunc': [{ type: Input },],
};
function VirtualScrollComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    VirtualScrollComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    VirtualScrollComponent.ctorParameters;
    /** @type {?} */
    VirtualScrollComponent.propDecorators;
    /** @type {?} */
    VirtualScrollComponent.prototype._templateRef;
    /** @type {?} */
    VirtualScrollComponent.prototype._viewContainer;
    /** @type {?} */
    VirtualScrollComponent.prototype.vsData;
    /** @type {?} */
    VirtualScrollComponent.prototype.vsOptions;
    /** @type {?} */
    VirtualScrollComponent.prototype.vsResize;
    /** @type {?} */
    VirtualScrollComponent.prototype.vsUserCmd;
    /** @type {?} */
    VirtualScrollComponent.prototype.vsDebounceTime;
    /** @type {?} */
    VirtualScrollComponent.prototype.vsEqualsFunc;
    /** @type {?} */
    VirtualScrollComponent.prototype.height;
    /** @type {?} */
    VirtualScrollComponent.prototype.width;
    /** @type {?} */
    VirtualScrollComponent.prototype._rowFactory;
    /** @type {?} */
    VirtualScrollComponent.prototype._subs;
    /** @type {?} */
    VirtualScrollComponent.prototype._elem;
    /** @type {?} */
    VirtualScrollComponent.prototype._cdr;
    /** @type {?} */
    VirtualScrollComponent.prototype._componentFactoryResolver;
    /** @type {?} */
    VirtualScrollComponent.prototype._obsService;
}
//# sourceMappingURL=virtualScroll.component.js.map