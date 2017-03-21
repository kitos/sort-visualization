
initSorting('bubble', bubbleSort)
initSorting('insert', insertionSort)

function initSorting(canvasId, sortingFunction) {

    let canvas = document.getElementById(canvasId)

    if (canvas.getContext) {
        let ctx = canvas.getContext('2d')
        let centerX = canvas.width / 2
        let centerY = canvas.height / 2

        ctx.fillStyle = 'rgb(200, 0, 0)'

        const RADIUS = 200
        ctx.beginPath()
        ctx.arc(centerX, centerY, RADIUS, 0, 2 * Math.PI, false)
        ctx.stroke()

        const LINES_NUMBER = 500
        let step = 2 * Math.PI / LINES_NUMBER
        let colorStep = Math.round(16777216 / LINES_NUMBER)

        const lines = shuffle(generateArrayOfNumbers(LINES_NUMBER))

        function drawLine(index, color) {
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(centerX + Math.cos(step * index) * RADIUS, centerY + Math.sin(step * index) * RADIUS)

            ctx.strokeStyle = mapNumberToColor(color, LINES_NUMBER)

            ctx.stroke()
        }

        function print() {
            lines.forEach((n, i) => drawLine(i, n))
        }

        print()

        sortingFunction(lines, (done, a, b, changed) => {
            if (changed) {
                drawLine(a, lines[a])
                drawLine(b, lines[b])
            }

            setTimeout(done, 0)
        })
    }
}

function bubbleSort(array, stepCallback) {

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

        stepCallback ? stepCallback(next, prevI, prevI + 1, changed) : setTimeout(next)
    }

    next()
}

function insertionSort(array, stepCallback) {

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

        stepCallback ? stepCallback(next, prevJ, prevJ - 1, changed): setTimeout(next)
    }

    next()
}

function generateArrayOfNumbers(size) {
    const numbers = new Array(size)

    for (let i = 0; i < size; i++) {
        numbers[i] = i
    }

    return numbers
}

function mapNumberToColor(n, maxValue) {
    return `hsl(${n * 360 / maxValue},100%,50%)`
}

function shuffle(array) {
    for (let i = array.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]]
    }

    return array
}