export declare enum CmdOption {
    Noop = 0,
    CreateRow = 1,
    ShiftRow = 2,
    RemoveRow = 3,
    CreateItem = 4,
    UpdateItem = 5,
    RemoveItem = 6,
}
export interface ICmd {
    cmdType: CmdOption;
}
export interface IRowRenderCmd extends ICmd {
    virtualIndex: number;
    actualIndex: number;
}
export interface ItemRenderCmd extends IRowRenderCmd {
    columnIndex: number;
    dataIndex: number;
}
export declare class NoopCmd implements ICmd {
    cmdType: CmdOption;
}
export declare class CreateRowCmd implements IRowRenderCmd {
    virtualIndex: number;
    actualIndex: number;
    initShift: number;
    cmdType: CmdOption;
    constructor(virtualIndex: number, actualIndex: number, initShift: number);
}
export declare class RemoveRowCmd implements IRowRenderCmd {
    virtualIndex: number;
    actualIndex: number;
    cmdType: CmdOption;
    constructor(virtualIndex: number, actualIndex: number);
}
export declare class ShiftRowCmd implements IRowRenderCmd {
    virtualIndex: number;
    actualIndex: number;
    shift: number;
    cmdType: CmdOption;
    constructor(virtualIndex: number, actualIndex: number, shift: number);
}
export declare class CreateItemCmd implements ItemRenderCmd {
    virtualIndex: number;
    actualIndex: number;
    columnIndex: number;
    dataIndex: number;
    cmdType: CmdOption;
    constructor(virtualIndex: number, actualIndex: number, columnIndex: number, dataIndex: number);
}
export declare class UpdateItemCmd implements ItemRenderCmd {
    virtualIndex: number;
    actualIndex: number;
    columnIndex: number;
    dataIndex: number;
    cmdType: CmdOption;
    constructor(virtualIndex: number, actualIndex: number, columnIndex: number, dataIndex: number);
}
export declare class RemoveItemCmd implements ItemRenderCmd {
    virtualIndex: number;
    actualIndex: number;
    columnIndex: number;
    dataIndex: number;
    cmdType: CmdOption;
    constructor(virtualIndex: number, actualIndex: number, columnIndex: number, dataIndex: number);
}
