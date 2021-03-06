var bubbleSort = require('./algorithms/bubble_sort');
var insertionSort = require('./algorithms/insert_sort');

const CANVAS_SIZE = 400;

initSorting('Bubble sort', bubbleSort)
initSorting('Insert sort', insertionSort)

function initSorting(sortingTitle, sortingFunction) {

    const wrapper = document.createElement('div')
    const title = document.createElement('h2')
    const canvas = document.createElement('canvas')

    title.innerHTML = sortingTitle
    canvas.width = canvas.height = CANVAS_SIZE
    canvas.style.padding = '10px'

    wrapper.appendChild(title)
    wrapper.appendChild(canvas)
    document.getElementById('container').appendChild(wrapper)

    if (canvas.getContext) {
        let ctx = canvas.getContext('2d')
        let centerX = canvas.width / 2
        let centerY = canvas.height / 2

        ctx.fillStyle = 'rgb(200, 0, 0)'

        const RADIUS = CANVAS_SIZE / 2 - 1
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

            done()
        })
    }
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