import create from './utils/create'

import cardsItem from './layouts/cardsItem'
import * as swipers from './swiper'
import Game from './game'
import noise from './../assets/songs/song'
export default function () {
	const pages = document.querySelectorAll('.page')
	for (let index = 0; index < pages.length - 1; index++) {
		const page = pages[index + 1];



		for (let i = 0; i < cardsItem[index].length; i++) {
			create('figure', 'flip', null, page)
			create('div', 'card', null, page.querySelectorAll('.flip')[i])
			create('img', 'flip__ready-to-start', null, page.querySelectorAll('.flip')[i])
			create('div', 'card-face front', null, page.querySelectorAll('.card')[i])
			create('img', 'front__img', null, page.querySelectorAll('.front')[i])
			create('div', 'front__content', null, page.querySelectorAll('.front')[i])
			create('p', 'front__text', cardsItem[index][i].front.text, page.querySelectorAll('.front__content')[i])
			create('div', 'front__button', null, page.querySelectorAll('.front__content')[i])
			create('figcaption', 'card-face back', null, page.querySelectorAll('.card')[i])
			create('img', 'back__img', null, page.querySelectorAll('.back')[i])
			create('p', 'back__text', cardsItem[index][i].back.text, page.querySelectorAll('.back')[i])


			page.querySelectorAll('.flip__ready-to-start')[i].src = `./assets/image/${index}/${i}.` + 'jpg'
			page.querySelectorAll('.front__img')[i].src = `./assets/image/${index}/${i}.` + 'jpg'
			page.querySelectorAll('.back__img')[i].src = `./assets/image/${index}/${i}.` + `jpg`


		}

	}
	new Game().initGame()

}
