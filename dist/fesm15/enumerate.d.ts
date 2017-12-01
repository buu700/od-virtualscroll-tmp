export declare function forRowsIn(start: number, end: number, numActualRows: number, iteratee: (virtualRowIndex: number, actualRowIndex: number) => void): void;
export declare function forColumnsIn(start: number, end: number, row: number, numColumns: number, numTotalItems: number, iteratee: (columnIndex: number, dataIndex: number) => void): void;
export declare function forColumnsInWithPrev(start: number, end: number, row: number, numColumns: number, prevRow: number, numPrevColumns: number, iteratee: (columnIndex: number, dataIndex: number, prevDataIndex: number) => void): void;
