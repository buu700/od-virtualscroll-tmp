/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const UserCmdOption = {
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