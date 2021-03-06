/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var bubbleSort = __webpack_require__(2);
	var insertionSort = __webpack_require__(3);

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

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	
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


/***/ }
/******/ ]);