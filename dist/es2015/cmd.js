/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const CmdOption = {
    Noop: 0,
    CreateRow: 1,
    ShiftRow: 2,
    RemoveRow: 3,
    CreateItem: 4,
    UpdateItem: 5,
    RemoveItem: 6,
};
export { CmdOption };
CmdOption[CmdOption.Noop] = "Noop";
CmdOption[CmdOption.CreateRow] = "CreateRow";
CmdOption[CmdOption.ShiftRow] = "ShiftRow";
CmdOption[CmdOption.RemoveRow] = "RemoveRow";
CmdOption[CmdOption.CreateItem] = "CreateItem";
CmdOption[CmdOption.UpdateItem] = "UpdateItem";
CmdOption[CmdOption.RemoveItem] = "RemoveItem";
/**
 * @record
 */
export function ICmd() { }
function ICmd_tsickle_Closure_declarations() {
    /** @type {?} */
    ICmd.prototype.cmdType;
}
/**
 * @record
 */
export function IRowRenderCmd() { }
function IRowRenderCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    IRowRenderCmd.prototype.virtualIndex;
    /** @type {?} */
    IRowRenderCmd.prototype.actualIndex;
}
/**
 * @record
 */
export function ItemRenderCmd() { }
function ItemRenderCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    ItemRenderCmd.prototype.columnIndex;
    /** @type {?} */
    ItemRenderCmd.prototype.dataIndex;
}
export class NoopCmd {
    constructor() {
        this.cmdType = CmdOption.Noop;
    }
}
function NoopCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    NoopCmd.prototype.cmdType;
}
export class CreateRowCmd {
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} initShift
     */
    constructor(virtualIndex, actualIndex, initShift) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.initShift = initShift;
        this.cmdType = CmdOption.CreateRow;
    }
}
function CreateRowCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    CreateRowCmd.prototype.cmdType;
    /** @type {?} */
    CreateRowCmd.prototype.virtualIndex;
    /** @type {?} */
    CreateRowCmd.prototype.actualIndex;
    /** @type {?} */
    CreateRowCmd.prototype.initShift;
}
export class RemoveRowCmd {
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     */
    constructor(virtualIndex, actualIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.cmdType = CmdOption.RemoveRow;
    }
}
function RemoveRowCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    RemoveRowCmd.prototype.cmdType;
    /** @type {?} */
    RemoveRowCmd.prototype.virtualIndex;
    /** @type {?} */
    RemoveRowCmd.prototype.actualIndex;
}
export class ShiftRowCmd {
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} shift
     */
    constructor(virtualIndex, actualIndex, shift) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.shift = shift;
        this.cmdType = CmdOption.ShiftRow;
    }
}
function ShiftRowCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    ShiftRowCmd.prototype.cmdType;
    /** @type {?} */
    ShiftRowCmd.prototype.virtualIndex;
    /** @type {?} */
    ShiftRowCmd.prototype.actualIndex;
    /** @type {?} */
    ShiftRowCmd.prototype.shift;
}
export class CreateItemCmd {
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} columnIndex
     * @param {?} dataIndex
     */
    constructor(virtualIndex, actualIndex, columnIndex, dataIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.columnIndex = columnIndex;
        this.dataIndex = dataIndex;
        this.cmdType = CmdOption.CreateItem;
    }
}
function CreateItemCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    CreateItemCmd.prototype.cmdType;
    /** @type {?} */
    CreateItemCmd.prototype.virtualIndex;
    /** @type {?} */
    CreateItemCmd.prototype.actualIndex;
    /** @type {?} */
    CreateItemCmd.prototype.columnIndex;
    /** @type {?} */
    CreateItemCmd.prototype.dataIndex;
}
export class UpdateItemCmd {
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} columnIndex
     * @param {?} dataIndex
     */
    constructor(virtualIndex, actualIndex, columnIndex, dataIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.columnIndex = columnIndex;
        this.dataIndex = dataIndex;
        this.cmdType = CmdOption.UpdateItem;
    }
}
function UpdateItemCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    UpdateItemCmd.prototype.cmdType;
    /** @type {?} */
    UpdateItemCmd.prototype.virtualIndex;
    /** @type {?} */
    UpdateItemCmd.prototype.actualIndex;
    /** @type {?} */
    UpdateItemCmd.prototype.columnIndex;
    /** @type {?} */
    UpdateItemCmd.prototype.dataIndex;
}
export class RemoveItemCmd {
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} columnIndex
     * @param {?} dataIndex
     */
    constructor(virtualIndex, actualIndex, columnIndex, dataIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.columnIndex = columnIndex;
        this.dataIndex = dataIndex;
        this.cmdType = CmdOption.RemoveItem;
    }
}
function RemoveItemCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    RemoveItemCmd.prototype.cmdType;
    /** @type {?} */
    RemoveItemCmd.prototype.virtualIndex;
    /** @type {?} */
    RemoveItemCmd.prototype.actualIndex;
    /** @type {?} */
    RemoveItemCmd.prototype.columnIndex;
    /** @type {?} */
    RemoveItemCmd.prototype.dataIndex;
}
//# sourceMappingURL=cmd.js.map