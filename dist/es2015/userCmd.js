export let UserCmdOption = {};
UserCmdOption.SetScrollTop = 0;
UserCmdOption.FocusRow = 1;
UserCmdOption.FocusItem = 2;
UserCmdOption[UserCmdOption.SetScrollTop] = "SetScrollTop";
UserCmdOption[UserCmdOption.FocusRow] = "FocusRow";
UserCmdOption[UserCmdOption.FocusItem] = "FocusItem";
export class SetScrollTopCmd {
    /**
     * @param {?} value
     */
    constructor(value) {
        this.value = value;
        this.cmdType = UserCmdOption.SetScrollTop;
    }
}
function SetScrollTopCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    SetScrollTopCmd.prototype.cmdType;
    /** @type {?} */
    SetScrollTopCmd.prototype.value;
}
export class FocusRowCmd {
    /**
     * @param {?} rowIndex
     */
    constructor(rowIndex) {
        this.rowIndex = rowIndex;
        this.cmdType = UserCmdOption.FocusRow;
    }
}
function FocusRowCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusRowCmd.prototype.cmdType;
    /** @type {?} */
    FocusRowCmd.prototype.rowIndex;
}
export class FocusItemCmd {
    /**
     * @param {?} itemIndex
     */
    constructor(itemIndex) {
        this.itemIndex = itemIndex;
        this.cmdType = UserCmdOption.FocusItem;
    }
}
function FocusItemCmd_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusItemCmd.prototype.cmdType;
    /** @type {?} */
    FocusItemCmd.prototype.itemIndex;
}
//# sourceMappingURL=userCmd.js.map