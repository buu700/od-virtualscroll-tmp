/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} obj
 * @return {?}
 */
export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function intersection(a, b) {
    var /** @type {?} */ result = {};
    for (var /** @type {?} */ key in a) {
        if (b[key] !== undefined) {
            result[key] = { left: a[key], right: b[key] };
        }
    }
    return result;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function difference(a, b) {
    var /** @type {?} */ result = {};
    for (var /** @type {?} */ key in a) {
        if (b[key] === undefined) {
            result[key] = a[key];
        }
    }
    return result;
}
//# sourceMappingURL=set.js.map