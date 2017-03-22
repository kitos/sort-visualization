
module.exports = function bubbleSort(array, stepCallback) {

    let i = 0
    let length = array.length
    let changed = false

    function next() {

        if (i === length) {
            return
        }

        if (array[i] > array[i + 1]) {

            [array[i], array[i + 1]] = [array[i + 1], array[i]]

            changed = true
        }

        let prevI = i;

        if (++i === length) {

            if (changed) {
                i = 0
                changed = false
                length = length - 1
            }
        }

        setTimeout(stepCallback ? stepCallback.bind(null, next, prevI, prevI + 1, changed) : next)
    }

    next()
}
