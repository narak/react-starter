/**
 * @see http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * @returns {String} Randomized uuid value
 */
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

/**
 * Generates an id.
 * @param  {Boolean} short If truthy, it generates a short id. If falsy,
 *                         generates a uuid.
 * @return {String} A short id or a uuid.
 */
export default function uuid(short) {
    let guid;
    if (short) {
        guid = s4() + s4();
    } else {
        guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    return guid;
}
