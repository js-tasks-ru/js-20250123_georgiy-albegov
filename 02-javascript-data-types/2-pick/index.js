/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    const resultObj = {};

    fields.forEach(field => {
        if (field in obj) {
          resultObj[field] = obj[field];
        }
    });

    return resultObj;
};
