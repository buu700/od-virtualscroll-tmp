/* tslint:disable:max-classes-per-file */
export var CmdOption = {};
CmdOption.Noop = 0;
CmdOption.CreateRow = 1;
CmdOption.ShiftRow = 2;
CmdOption.RemoveRow = 3;
CmdOption.CreateItem = 4;
CmdOption.UpdateItem = 5;
CmdOption.RemoveItem = 6;
CmdOption[CmdOption.Noop] = "Noop";
CmdOption[CmdOption.CreateRow] = "CreateRow";
CmdOption[CmdOption.ShiftRow] = "ShiftRow";
CmdOption[CmdOption.RemoveRow] = "RemoveRow";
CmdOption[CmdOption.CreateItem] = "CreateItem";
CmdOption[CmdOption.UpdateItem] = "UpdateItem";
CmdOption[CmdOption.RemoveItem] = "RemoveItem";
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
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} initShift
     */
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
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     */
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
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} shift
     */
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
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} columnIndex
     * @param {?} dataIndex
     */
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
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} columnIndex
     * @param {?} dataIndex
     */
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
    /**
     * @param {?} virtualIndex
     * @param {?} actualIndex
     * @param {?} columnIndex
     * @param {?} dataIndex
     */
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