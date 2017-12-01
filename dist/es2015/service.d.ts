import { ComponentRef, EmbeddedViewRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IVirtualScrollWindow } from './basic';
import { CreateItemCmd, CreateRowCmd, RemoveItemCmd, RemoveRowCmd, ShiftRowCmd, UpdateItemCmd } from './cmd';
import { ScrollItem } from './scrollItem';
import { VirtualRowComponent } from './virtualRow.component';
export declare class ScrollObservableService {
    private _scrollWin;
    scrollWin$: Observable<[IVirtualScrollWindow]>;
    emitScrollWin: (e: [IVirtualScrollWindow]) => void;
    private _createRow;
    createRow$: Observable<[CreateRowCmd, ComponentRef<VirtualRowComponent>]>;
    emitCreateRow: (e: [CreateRowCmd, ComponentRef<VirtualRowComponent>]) => void;
    private _removeRow;
    removeRow$: Observable<[RemoveRowCmd, ComponentRef<VirtualRowComponent>]>;
    emitRemoveRow: (e: [RemoveRowCmd, ComponentRef<VirtualRowComponent>]) => void;
    private _shiftRow;
    shiftRow$: Observable<[ShiftRowCmd, ComponentRef<VirtualRowComponent>]>;
    emitShiftRow: (e: [ShiftRowCmd, ComponentRef<VirtualRowComponent>]) => void;
    private _createItem;
    createItem$: Observable<[CreateItemCmd, ScrollItem, EmbeddedViewRef<ScrollItem>]>;
    emitCreateItem: (e: [CreateItemCmd, ScrollItem, EmbeddedViewRef<ScrollItem>]) => void;
    private _updateItem;
    updateItem$: Observable<[UpdateItemCmd, ScrollItem, EmbeddedViewRef<ScrollItem>]>;
    emitUpdateItem: (e: [UpdateItemCmd, ScrollItem, EmbeddedViewRef<ScrollItem>]) => void;
    private _removeItem;
    removeItem$: Observable<[RemoveItemCmd]>;
    emitRemoveItem: (e: [RemoveItemCmd]) => void;
}
