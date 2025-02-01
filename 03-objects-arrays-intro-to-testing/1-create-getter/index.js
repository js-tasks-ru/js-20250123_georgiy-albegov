/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const fields = path.split('.');

    return obj => {
        if (Object.keys(obj).length === 0) return undefined;

        fields.forEach(field => {
            const keys = Object.keys(obj);
            obj = keys.includes(field) ? obj[field] : undefined;
        })

        return obj;
    };
}
