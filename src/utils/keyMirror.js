/**
 * Same as a regular keyMirror, but it has a map method.
 * @param {...Strings} keys The constant values
 * @returns {void}
 */
function Constant(...keys) {
    let vals;

    const isIE =
        window.navigator.userAgent.indexOf('MSIE ') < 0 ||
        !!navigator.userAgent.match(/Trident.*rv\:11\./);
    if (!isIE) {
        o = new Proxy(
            {},
            {
                get: function(target, key) {
                    if (target[key]) {
                        return target[key];
                    }

                    // The immutable js formatter chrome extension hits these
                    // keys for every object you attempt to print. Making this
                    // proxy unusable. Skip those.
                    if (!key.startsWith('@@__IMMUTABLE') && key !== '_defaultValues') {
                        console.error(
                            `Trying to fetch unknown constant ${key}. ` +
                                'There is a good chance that there is a typo in your keyMirror ' +
                                'constant usage. Put a break point on this line and check the ' +
                                'call stack to see where.'
                        );
                    }
                },
            }
        );
    } else {
        vals = {};
    }

    keys.forEach(d => (vals[d] = d));
    this.vals = vals;
}

Constant.prototype.map = function forEach(fn) {
    let newArray = [],
        idx = 0;
    for (let key in this.vals) {
        if (this.vals.hasOwnProperty(key)) {
            newArray[idx++] = fn(key);
        }
    }
    return newArray;
};

/**
 * Key mirror implemetation that creates a constants object. Different signature
 * from npm(keyMirror).
 * example: keymirror('CONSTANT1', 'CONSTANT2')
 * @param  {...String} keys n number of strings used to create constants object.
 * @return {Object}         Object where { arg1: arg1, arg2: arg2 }, etc. which
 *                          can be used as constant values.
 */
export default function keyMirror(...keys) {
    return new Constant(...keys);
}
