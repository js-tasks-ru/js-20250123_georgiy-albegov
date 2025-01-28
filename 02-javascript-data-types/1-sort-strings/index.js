/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const sortedArray = arr.slice().sort((a, b) => {
        return a.localeCompare(b.toUpperCase(), { sensitivity: 'variant' });
    });
  
    return param === 'desc' ? sortedArray.reverse() : sortedArray;
}
