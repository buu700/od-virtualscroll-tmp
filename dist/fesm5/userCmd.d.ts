export declare enum UserCmdOption {
    SetScrollTop = 0,
    FocusRow = 1,
    FocusItem = 2,
}
export interface IUserCmd {
    cmdType: UserCmdOption;
}
export declare class SetScrollTopCmd implements IUserCmd {
    value: number;
    cmdType: UserCmdOption;
    constructor(value: number);
}
export declare class FocusRowCmd implements IUserCmd {
    rowIndex: number;
    cmdType: UserCmdOption;
    constructor(rowIndex: number);
}
export declare class FocusItemCmd implements IUserCmd {
    itemIndex: number;
    cmdType: UserCmdOption;
    constructor(itemIndex: number);
}
