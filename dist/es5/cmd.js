/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var CmdOption = {
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
var NoopCmd = (function () {
    function NoopCmd() {
        this.cmdType = CmdOption.Noop;
    }
    return NoopCmd;
}());
export { NoopCmd };
function NoopCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    NoopCmd.prototype.cmdType;
}
var CreateRowCmd = (function () {
    function CreateRowCmd(virtualIndex, actualIndex, initShift) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.initShift = initShift;
        this.cmdType = CmdOption.CreateRow;
    }
    return CreateRowCmd;
}());
export { CreateRowCmd };
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
var RemoveRowCmd = (function () {
    function RemoveRowCmd(virtualIndex, actualIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.cmdType = CmdOption.RemoveRow;
    }
    return RemoveRowCmd;
}());
export { RemoveRowCmd };
function RemoveRowCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    RemoveRowCmd.prototype.cmdType;
    /** @type {?} */
    RemoveRowCmd.prototype.virtualIndex;
    /** @type {?} */
    RemoveRowCmd.prototype.actualIndex;
}
var ShiftRowCmd = (function () {
    function ShiftRowCmd(virtualIndex, actualIndex, shift) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.shift = shift;
        this.cmdType = CmdOption.ShiftRow;
    }
    return ShiftRowCmd;
}());
export { ShiftRowCmd };
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
var CreateItemCmd = (function () {
    function CreateItemCmd(virtualIndex, actualIndex, columnIndex, dataIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.columnIndex = columnIndex;
        this.dataIndex = dataIndex;
        this.cmdType = CmdOption.CreateItem;
    }
    return CreateItemCmd;
}());
export { CreateItemCmd };
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
var UpdateItemCmd = (function () {
    function UpdateItemCmd(virtualIndex, actualIndex, columnIndex, dataIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.columnIndex = columnIndex;
        this.dataIndex = dataIndex;
        this.cmdType = CmdOption.UpdateItem;
    }
    return UpdateItemCmd;
}());
export { UpdateItemCmd };
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
var RemoveItemCmd = (function () {
    function RemoveItemCmd(virtualIndex, actualIndex, columnIndex, dataIndex) {
        this.virtualIndex = virtualIndex;
        this.actualIndex = actualIndex;
        this.columnIndex = columnIndex;
        this.dataIndex = dataIndex;
        this.cmdType = CmdOption.RemoveItem;
    }
    return RemoveItemCmd;
}());
export { RemoveItemCmd };
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