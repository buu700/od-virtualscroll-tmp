var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChild, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { animationFrame as animationScheduler } from "rxjs/scheduler/animationFrame";
import { combineLatest } from "rxjs/observable/combineLatest";
import { concat } from "rxjs/observable/concat";
import { empty } from "rxjs/observable/empty";
import { from } from "rxjs/observable/from";
import { fromEvent } from "rxjs/observable/fromEvent";
import { merge } from "rxjs/observable/merge";
import { of } from "rxjs/observable/of";
import { concatMap } from "rxjs/operators/concatMap";
import { debounceTime } from "rxjs/operators/debounceTime";
import { distinctUntilChanged } from "rxjs/operators/distinctUntilChanged";
import { filter } from "rxjs/operators/filter";
import { map } from "rxjs/operators/map";
import { mergeMap } from "rxjs/operators/mergeMap";
import { pairwise } from "rxjs/operators/pairwise";
import { publish } from "rxjs/operators/publish";
import { scan } from "rxjs/operators/scan";
import { startWith } from "rxjs/operators/startWith";
import { withLatestFrom } from "rxjs/operators/withLatestFrom";
import { CmdOption, CreateItemCmd, CreateRowCmd, NoopCmd, RemoveItemCmd, RemoveRowCmd, ShiftRowCmd, UpdateItemCmd } from "./cmd";
import { forColumnsIn, forColumnsInWithPrev, forRowsIn } from "./enumerate";
import { calcMeasure, calcScrollWindow, getMaxIndex } from "./measurement";
import { ScrollItem } from "./scrollItem";
import { ScrollObservableService } from "./service";
import { difference, intersection, isEmpty } from "./set";
import { SetScrollTopCmd, UserCmdOption } from "./userCmd";
import { VirtualRowComponent } from "./virtualRow.component";
export class VirtualScrollComponent {
    /**
     * @param {?} _elem
     * @param {?} _cdr
     * @param {?} _componentFactoryResolver
     * @param {?} _obsService
     */
    constructor(_elem, _cdr, _componentFactoryResolver, _obsService) {
        this._elem = _elem;
        this._cdr = _cdr;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._obsService = _obsService;
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
        const /** @type {?} */ rect$ = merge(fromEvent(window, 'resize'), this.vsResize).pipe(debounceTime(this.vsDebounceTime, animationScheduler), map(() => getContainerRect()), startWith(getContainerRect()), map(({ width, height }) => ({ width, height })));
        const /** @type {?} */ scrollTop$ = fromEvent(this._elem.nativeElement, 'scroll').pipe(debounceTime(this.vsDebounceTime, animationScheduler), map(() => getScrollTop()), startWith(0));
        const /** @type {?} */ measure$ = this.publish(combineLatest(data$, rect$, options$).pipe(mergeMap(([data, rect, options]) => __awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ measurement = yield calcMeasure(data, rect, options);
            return {
                dataTimestamp: (new Date()).getTime(),
                dataLength: data.length,
                measurement
            };
        }))));
        const /** @type {?} */ scrollWin$ = this.publish(combineLatest(scrollTop$, measure$, options$).pipe(map(([scrollTop, { measurement, dataTimestamp, dataLength }, options]) => calcScrollWindow(scrollTop, measurement, dataLength, dataTimestamp, options)), distinctUntilChanged((prevWin, curWin) => {
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
function VirtualScrollComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    VirtualScrollComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    VirtualScrollComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
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