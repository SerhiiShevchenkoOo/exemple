'use strict'
import './style/style.scss'
import './script/swiper'
import createPages from './script/createPages'
import Game from './script/game'
// import createField from './script/utils/createField'
// import gameField from './script/gameField'
// import Puzzle from './script/puzzle.js'
// import fieldSize from './script/layouts/feildsItems'
// createField()
// new Puzzle().go()
// new Puzzle().startGame()
createPages()


const goToContent = () => {
	setTimeout(() => {
		document.querySelector('.stage-wrapper').style.display = 'none'
		document.querySelector('.container').style.opacity = '1'
		document.querySelector('.wrapper').style.opacity = '1'
		document.querySelector('.toggleWrapper').style.opacity = '1'

	}, 0)
}
document.addEventListener("DOMContentLoaded", goToContent)

let f = () => {
	let x = 0
	for (let i = 0; i < document.querySelectorAll('.page').length; i++) {
		if (document.querySelectorAll('.swiper-slide-active')[1] == document.querySelectorAll('.page')[i]) {
			x = document.querySelectorAll('.page')[i].querySelectorAll('.page__cards')[i]
			console.log(x)

		}

	}
	console.log(x)

}
f()