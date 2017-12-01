/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var UserCmdOption = {
    SetScrollTop: 0,
    FocusRow: 1,
    FocusItem: 2,
};
export { UserCmdOption };
UserCmdOption[UserCmdOption.SetScrollTop] = "SetScrollTop";
UserCmdOption[UserCmdOption.FocusRow] = "FocusRow";
UserCmdOption[UserCmdOption.FocusItem] = "FocusItem";
/**
 * @record
 */
export function IUserCmd() { }
function IUserCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    IUserCmd.prototype.cmdType;
}
var SetScrollTopCmd = (function () {
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