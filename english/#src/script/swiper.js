
import Swiper from 'swiper/bundle'
import './bg'
import Game from './game'
import storage from './storage'

const menuButton = document.querySelector('.menu-button');
const openMenu = function () {
	swiper.slidePrev();
};
export const swiper = new Swiper('.main', {
	slidesPerView: 'auto',
	allowTouchMove: false,
	speed: 1000,
	initialSlide: 1,
	effect: 'slide',


	on: {
		slideChangeTransitionStart: function () {
			var slider = this;
			if (slider.activeIndex === 0) {
				menuButton.classList.add('cross');
				// required because of slideToClickedSlide
				menuButton.removeEventListener('click', openMenu, true);
			} else {
				menuButton.classList.remove('cross');
			}
		}
		, slideChangeTransitionEnd: function () {
			var slider = this;
			if (slider.activeIndex === 1) {
				menuButton.addEventListener('click', openMenu, true);
			}
		},
	}
});

const menu = ['Main page', 'Animals', 'Colors', 'Family', 'Food', 'Works', 'Body', 'Emotion', 'Clothes', 'Statistics']
export const mySwiper = new Swiper('.page-container', {
	// If we need pagination

	speed: 1000,
	allowTouchMove: false,
	direction: 'vertical',
	pagination: {
		el: '.swiper-pagination',

		clickable: true,
		renderBullet: function (i, className) {

			return '<span class="' + className + '">' + menu[i] + '</span>';
		},
	},

})

const mainPageCards = document.querySelectorAll('.page__cards--main')
for (let i = 0; i < mainPageCards.length; i++) {
	let card = mainPageCards[i]
	card.addEventListener('click', function () {

		mySwiper.slideTo(i + 1)
		advancePoint()

	});
}

const specifiedElement = document.querySelector('.menu');

//I'm using "click" but it works with any event
document.addEventListener('click', function (event) {
	let isClickInside = specifiedElement.contains(event.target);

	if (!isClickInside && !menuButton.contains(event.target)
	) {
		if (swiper.activeIndex === 0) swiper.slideTo(1)
	}
});
const bullets = document.querySelectorAll('.swiper-pagination-bullet')

for (let i = 0; i < bullets.length; i++) {
	const bullet = bullets[i]
	bullet.addEventListener('click', () => {

		swiper.slideTo(1)
		advancePoint()
	})
}
const advancePoint = () => {
	if (mySwiper.activeIndex != 9) {
		document.querySelectorAll('.flip').forEach(card => card.classList.remove('open'))
		document.querySelector('.toggle__handler').classList.remove('game')
		document.querySelector('.hart').innerHTML = ''
		new Game().goToPlay()
	}

}

var canvas = document.querySelector('.menu__canvas');
canvas.width = document.querySelector('.menu__canvas').clientWidth;
canvas.height = document.querySelector('.menu__canvas').clientHeight;
var ctx = canvas.getContext('2d');
var count = canvas.height;
var bubbles = [];
var bubbleCount = 20;
var bubbleSpeed = 1;
var popLines = 6;
var popDistance = 40;
var mouseOffset = {
	x: 0,
	y: 0
}



// --------------
// Animation Loop
// --------------

function animate() {



	// ------------
	// Clear Canvas
	// ------------

	ctx.clearRect(0, 0, canvas.width, canvas.height);



	// ------------
	// Draw Bubbles
	// ------------

	ctx.beginPath();
	for (var i = 0; i < bubbles.length; i++) {
		// first num = distance between waves
		// second num = wave height
		// third num = move the center of the wave away from the edge
		bubbles[i].position.x = Math.sin(bubbles[i].count / bubbles[i].distanceBetweenWaves) * 50 + bubbles[i].xOff;
		bubbles[i].position.y = bubbles[i].count;
		bubbles[i].render();

		if (bubbles[i].count < 0 - bubbles[i].radius) {
			bubbles[i].count = canvas.height + bubbles[i].yOff;
		} else {
			bubbles[i].count -= bubbleSpeed;
		}
	}

	// ---------------
	// On Bubble Hover
	// ---------------

	for (var i = 0; i < bubbles.length; i++) {
		if (mouseOffset.x > bubbles[i].position.x - bubbles[i].radius && mouseOffset.x < bubbles[i].position.x + bubbles[i].radius) {
			if (mouseOffset.y > bubbles[i].position.y - bubbles[i].radius && mouseOffset.y < bubbles[i].position.y + bubbles[i].radius) {
				for (var a = 0; a < bubbles[i].lines.length; a++) {
					popDistance = bubbles[i].radius * 0.5;
					bubbles[i].lines[a].popping = true;
					bubbles[i].popping = true;
				}
			}
		}
	}

	window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);



// ------------------
// Bubble Constructor
// ------------------

var createBubble = function () {
	this.position = { x: 0, y: 0 };
	this.radius = 8 + Math.random() * 6;
	this.xOff = Math.random() * canvas.width - this.radius;
	this.yOff = Math.random() * canvas.height;
	this.distanceBetweenWaves = 50 + Math.random() * 40;
	this.count = canvas.height + this.yOff;
	this.color = '#8bc9ee';
	this.lines = [];
	this.popping = false;
	this.maxRotation = 85;
	this.rotation = Math.floor(Math.random() * (this.maxRotation - (this.maxRotation * -1))) + (this.maxRotation * -1);
	this.rotationDirection = 'forward';

	// Populate Lines
	for (var i = 0; i < popLines; i++) {
		var tempLine = new createLine();
		tempLine.bubble = this;
		tempLine.index = i;

		this.lines.push(tempLine);
	}

	this.resetPosition = function () {
		this.position = { x: 0, y: 0 };
		this.radius = 8 + Math.random() * 6;
		this.xOff = Math.random() * canvas.width - this.radius;
		this.yOff = Math.random() * canvas.height;
		this.distanceBetweenWaves = 50 + Math.random() * 40;
		this.count = canvas.height + this.yOff;
		this.popping = false;
	}

	// Render the circles
	this.render = function () {
		if (this.rotationDirection === 'forward') {
			if (this.rotation < this.maxRotation) {
				this.rotation++;
			} else {
				this.rotationDirection = 'backward';
			}
		} else {
			if (this.rotation > this.maxRotation * -1) {
				this.rotation--;
			} else {
				this.rotationDirection = 'forward';
			}
		}

		ctx.save();
		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(this.rotation * Math.PI / 180);

		if (!this.popping) {
			ctx.beginPath();
			ctx.strokeStyle = '#8bc9ee';
			ctx.lineWidth = 1;
			ctx.arc(0, 0, this.radius - 3, 0, Math.PI * 1.5, true);
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
			ctx.stroke();
		}

		ctx.restore();

		// Draw the lines
		for (var a = 0; a < this.lines.length; a++) {
			if (this.lines[a].popping) {
				if (this.lines[a].lineLength < popDistance && !this.lines[a].inversePop) {
					this.lines[a].popDistance += 0.06;
				} else {
					if (this.lines[a].popDistance >= 0) {
						this.lines[a].inversePop = true;
						this.lines[a].popDistanceReturn += 1;
						this.lines[a].popDistance -= 0.03;
					} else {
						this.lines[a].resetValues();
						this.resetPosition();
					}
				}

				this.lines[a].updateValues();
				this.lines[a].render();
			}
		}
	}
}



// ----------------
// Populate Bubbles
// ----------------

for (var i = 0; i < bubbleCount; i++) {
	var tempBubble = new createBubble();

	bubbles.push(tempBubble);
}



// ----------------
// Line Constructor
// ----------------

function createLine() {
	this.lineLength = 0;
	this.popDistance = 0;
	this.popDistanceReturn = 0;
	this.inversePop = false; // When the lines reach full length they need to shrink into the end position
	this.popping = false;

	this.resetValues = function () {
		this.lineLength = 0;
		this.popDistance = 0;
		this.popDistanceReturn = 0;
		this.inversePop = false;
		this.popping = false;

		this.updateValues();
	}

	this.updateValues = function () {
		this.x = this.bubble.position.x + (this.bubble.radius + this.popDistanceReturn) * Math.cos(2 * Math.PI * this.index / this.bubble.lines.length);
		this.y = this.bubble.position.y + (this.bubble.radius + this.popDistanceReturn) * Math.sin(2 * Math.PI * this.index / this.bubble.lines.length);
		this.lineLength = this.bubble.radius * this.popDistance;
		this.endX = this.lineLength;
		this.endY = this.lineLength;
	}

	this.render = function () {
		this.updateValues();

		ctx.beginPath();
		ctx.strokeStyle = '#8bc9ee';
		ctx.lineWidth = 2;
		ctx.moveTo(this.x, this.y);
		if (this.x < this.bubble.position.x) {
			this.endX = this.lineLength * -1;
		}
		if (this.y < this.bubble.position.y) {
			this.endY = this.lineLength * -1;
		}
		if (this.y === this.bubble.position.y) {
			this.endY = 0;
		}
		if (this.x === this.bubble.position.x) {
			this.endX = 0;
		}
		ctx.lineTo(this.x + this.endX, this.y + this.endY);
		ctx.stroke();
	};
}



// ---------------
// Event Listeners
// ---------------

canvas.addEventListener('mousemove', mouseMove);

function mouseMove(e) {
	mouseOffset.x = e.offsetX;
	mouseOffset.y = e.offsetY;
}

window.addEventListener('resize', function () {
	canvas.width = document.querySelector('.menu__canvas').clientWidth;
	canvas.height = document.querySelector('.menu__canvas').clientHeight;
});


  // ---------------
  // Event Listeners
  // --