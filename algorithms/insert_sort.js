
module.exports = function insertionSort(array, stepCallback) {

    const length = array.length;
    let i = 1
    let j = 1

    function next() {

        if (i > length) {
            return
        }

        let prevJ = j;
        let changed = false;

        if (array[j] > array[j - 1]) {

            // swap can be simplified
            [array[j], array[j - 1]] = [array[j - 1], array[j]]

            changed = true

            if (--j < 1) {
                j = ++i
            }

        } else {

            j = ++i
        }

        setTimeout(stepCallback ? stepCallback.bind(null, next, prevJ, prevJ - 1, changed): next)
    }

    next()
}
