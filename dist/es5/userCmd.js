export var UserCmdOption = {};
UserCmdOption.SetScrollTop = 0;
UserCmdOption.FocusRow = 1;
UserCmdOption.FocusItem = 2;
UserCmdOption[UserCmdOption.SetScrollTop] = "SetScrollTop";
UserCmdOption[UserCmdOption.FocusRow] = "FocusRow";
UserCmdOption[UserCmdOption.FocusItem] = "FocusItem";
var SetScrollTopCmd = (function () {
    /**
     * @param {?} value
     */
    function SetScrollTopCmd(value) {
        this.value = value;
        this.cmdType = UserCmdOption.SetScrollTop;
    }
    return SetScrollTopCmd;
}());
export { SetScrollTopCmd };
function SetScrollTopCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    SetScrollTopCmd.prototype.cmdType;
    /** @type {?} */
    SetScrollTopCmd.prototype.value;
}
var FocusRowCmd = (function () {
    /**
     * @param {?} rowIndex
     */
    function FocusRowCmd(rowIndex) {
        this.rowIndex = rowIndex;
        this.cmdType = UserCmdOption.FocusRow;
    }
    return FocusRowCmd;
}());
export { FocusRowCmd };
function FocusRowCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusRowCmd.prototype.cmdType;
    /** @type {?} */
    FocusRowCmd.prototype.rowIndex;
}
var FocusItemCmd = (function () {
    /**
     * @param {?} itemIndex
     */
    function FocusItemCmd(itemIndex) {
        this.itemIndex = itemIndex;
        this.cmdType = UserCmdOption.FocusItem;
    }
    return FocusItemCmd;
}());
export { FocusItemCmd };
function FocusItemCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusItemCmd.prototype.cmdType;
    /** @type {?} */
    FocusItemCmd.prototype.itemIndex;
}
//# sourceMappingURL=userCmd.js.map