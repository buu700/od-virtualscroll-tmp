import { IVirtualScrollContainer, IVirtualScrollMeasurement, IVirtualScrollOptions, IVirtualScrollWindow } from './basic';
export declare function calcMeasure(data: any[], rect: IVirtualScrollContainer, options: IVirtualScrollOptions): Promise<IVirtualScrollMeasurement>;
export declare function calcScrollWindow(scrollTop: number, measure: IVirtualScrollMeasurement, numItems: number, dataTimestamp: number, options: IVirtualScrollOptions): IVirtualScrollWindow;
export declare function getMaxIndex(scrollWin: IVirtualScrollWindow): number;
