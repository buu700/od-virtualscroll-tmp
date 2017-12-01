import { ChangeDetectorRef, EmbeddedViewRef, TemplateRef } from '@angular/core';
import { ScrollItem } from './scrollItem';
export declare class VirtualRowComponent {
    private _cdr;
    private _viewContainer;
    readonly getTransform: string;
    private _translateY;
    constructor(_cdr: ChangeDetectorRef);
    addItem(template: TemplateRef<ScrollItem>, context: ScrollItem, index?: number): EmbeddedViewRef<ScrollItem>;
    setTransform(translateY: number): void;
    updateItem(column: number, context: ScrollItem): EmbeddedViewRef<ScrollItem>;
    removeItem(column: number): void;
    updateRow(row: number): void;
}
