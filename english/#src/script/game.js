import { once } from 'process'
import noise from './../assets/songs/song'
import * as swipers from './swiper'
import create from './utils/create'
import * as storage from './storage'
import item from './layouts/cardsItem'
export default class game {
	constructor() {
		this.history = []
		this.pages = document.querySelectorAll('.page')
		this.cards = document.querySelectorAll('.card')
		this.noise = noise
		this.activePage = document.querySelectorAll('.swiper-slide-active')[1].querySelectorAll('.swiper-slide-active')
		this.gameButton = document.querySelector('.toggle__handler')
		this.settingInfo = document.querySelectorAll('.nav__item')
		this.startGameButton = document.querySelector('.play-game')
		this.hart = document.querySelector('.hart')

	}
	goToPlay(i = swipers.mySwiper.activeIndex) {
		document.querySelector('.hart').innerHTML = ''
		if (i == 0) {
			this.gameButton.classList.remove('game')
			return
		}
		this.openPage = this.pages[i]
		this.gameImages = this.openPage.querySelectorAll('.flip__ready-to-start')
		if (this.gameButton.classList.contains('game')) {
			this.settingInfo.forEach(el => el.classList.remove('nav__item--active'))
			this.settingInfo[1].classList.add('nav__item--active')
			this.gameImages.forEach(card => card.classList.add('ready'))
			this.gameButton.classList.add('toggle__handler--active')
		} else {
			this.settingInfo.forEach(el => el.classList.remove('nav__item--active'))
			this.settingInfo[0].classList.add('nav__item--active')
			this.gameImages.forEach(card => card.classList.remove('ready'))
			this.gameButton.classList.remove('toggle__handler--active')
		}



	}

	playGame() {

		this.storage = storage
		this.repeat = document.querySelector('.repeat')
		this.page = document.querySelectorAll('.page')[swipers.mySwiper.activeIndex]
		this.arr = noise[swipers.mySwiper.activeIndex - 1].slice()
		this.checkArr = this.arr.slice().sort(() => Math.random() - 0.5).slice()
		this.gameCards = this.page.querySelectorAll('.flip__ready-to-start')
		this.errors = 0
		this.value = 0
		document.querySelector('.hart').innerHTML = ''
		this.create = create
		this.checkArr[this.value].play()
		this.goNextCard = (card) => {

			this.cardIndex = Array.from(this.gameCards).indexOf(card)
			if (this.cardIndex == -1) return
			if (this.arr[this.cardIndex] != this.checkArr[this.value]) {
				this.history.forEach(el => {
					if (card.parentElement.querySelector('p').textContent == el.front.text) {
						el.click++
						el.errors++
					}
				})

				create('img', 'heart-bad', null, document.querySelector('.hart'))
				document.querySelectorAll('.heart-bad').forEach(heart => { heart.src = './assets/image/like.svg' })
				this.errors++

				new Audio('./assets/songs/focus.mp3').play()

			}

			if (this.arr[this.cardIndex] == this.checkArr[this.value]) {
				this.history.forEach(el => {
					if (card.parentElement.querySelector('p').textContent == el.front.text) {
						el.correct++
						el.click++
					}
				})

				create('img', 'heart', null, document.querySelector('.hart'))
				document.querySelectorAll('.heart').forEach(heart => { heart.src = './assets/image/heart.svg' })
				console.log(this.cardIndex)
				this.checkArr[this.value].pause()

				this.page.querySelectorAll('.flip')[this.cardIndex].classList.add('open')
				this.value++
				if (this.value == this.gameCards.length) {
					setTimeout(() => {
						this.page.querySelectorAll('.flip').forEach(card => card.classList.remove('open'))
						document.querySelector('.hart').innerHTML = ''

					}, 500)
					if (this.errors == 0) {
						new Audio('./assets/songs/win.mp3').play()

						document.querySelector('.win').classList.add('finish')
						setTimeout(() => document.querySelector('.win').classList.remove('finish'), 3000)
						setTimeout(() => swipers.mySwiper.slideTo(0), 1000)

					} else {
						new Audio('./assets/songs/ups.mp3').play()
						document.querySelector('.lose').querySelector('p').textContent = `У вас были замечены ошибки!
						их количество: ${this.errors}`
						document.querySelector('.toggle__handler').classList.remove('game')
						document.querySelector('.lose').classList.add('finish')
						setTimeout(() => document.querySelector('.lose').classList.remove('finish'), 3000)

						setTimeout(() => swipers.mySwiper.slideTo(0), 1000)
					}

					this.settingInfo.forEach(el => el.classList.remove('nav__item--active'))
					this.gameButton.classList.remove('game')
					this.settingInfo[0].classList.add('nav__item--active')
					this.gameImages.forEach(card => card.classList.remove('ready'))
					this.gameButton.classList.remove('toggle__handler--active')
					return
				}
				new Audio('./assets/songs/onclick.mp3').play()
				setTimeout(() => {
					this.checkArr[this.value].play()
					this.goNextCard()
				}, 1000)

				return
			}


		}
		this.repeat.onclick = () => this.checkArr[this.value].play()
		this.gameCards.forEach(card => card.onclick = this.goNextCard.bind(null, card))
		document.querySelectorAll('.nav__item')[1].classList.remove('nav__item--active')
		document.querySelectorAll('.nav__item')[2].classList.add('nav__item--active')
	}
	initGame() {
		for (let j = 0; j < this.pages.length - 1; j++) {
			const page = this.pages[j + 1]
			for (let i = 0; i < page.querySelectorAll('.flip').length; i++) {
				const card = page.querySelectorAll('.flip')[i],
					front = card.querySelector('.front'),
					frontBtn = card.querySelector('.front__button'),
					frontEvent = () => {
						this.history.forEach(el => {
							if (card.querySelector('p').innerHTML == el.front.text) el.click++
						})

						if (frontBtn.contains(event.target)) {
							if (noise[j - 1][i].play) noise[j - 1][i].pause()
							card.querySelector('.card').classList.add('cardBack')
							card.querySelector('.front__button').classList.add('off')
							return
						}
						if (!front.contains(event.target)) noise[j][i].pause()
						for (let i = 0; i < noise[j].length; i++) {
							if (noise[j][i].play) {
								noise[j][i].pause()
							}
						}
						if (noise[j][i].play()) return
						noise[j][i].play()
					}

				front.removeEventListener('click', frontEvent)
				front.addEventListener('click', frontEvent)
				card.addEventListener('touchend', () => {
					setTimeout(() => {
						card.querySelector('.front__button').classList.remove('off')
						card.querySelector('.card').classList.remove('cardBack')
					}, 2000)
				})
				card.addEventListener('mouseleave', () => {
					setTimeout(() => {
						card.querySelector('.front__button').classList.remove('off')
						card.querySelector('.card').classList.remove('cardBack')
					}, 800)
				})
				frontBtn.addEventListener('click', () => {
					card.querySelector('.card').classList.add('cardBack')
					card.querySelector('.front__button').classList.add('off')
				})
			}
			this.setHistory = () => {
				storage.del('statistic')
				storage.set('statistic', this.history)
				document.querySelector('.content-hacker__item').innerHTML = ''
				this.history.forEach(el => {

					create('p', 'items', el.front.text, document.querySelector('.content-hacker__item'))
					create('p', 'items', el.back.text, document.querySelector('.content-hacker__item'))
					create('p', 'items', el.button, document.querySelector('.content-hacker__item'))
					create('p', 'items', `${el.click}`, document.querySelector('.content-hacker__item'))
					create('p', 'items', `${el.correct}`, document.querySelector('.content-hacker__item'))
					create('p', 'items', `${el.errors}`, document.querySelector('.content-hacker__item'))

				})

				document.querySelector('.content-hacker__item').querySelectorAll('p').forEach(p => p.addEventListener('mouseover', () => {
					p.classList.add('end')
					setTimeout(() => p.classList.remove('end'), 4000)
				}))

			}

		}
		document.querySelector('.toggle').addEventListener('click', () => {
			this.gameButton.classList.toggle('game')
			this.goToPlay()
			setTimeout(this.goToPlay(), 0)
			document.querySelectorAll('.flip').forEach(card => card.classList.remove('open'))
			document.querySelector('.hart').innerHTML = ''
		})
		this.startGameButton.addEventListener('click', () => {


			this.playGame()
		})
		document.querySelectorAll('.swiper-pagination-bullets')[document.querySelectorAll('.swiper-pagination-bullets').length - 1].
			addEventListener('click', this.setHistory)

		//!=======================
		this.nav = document.querySelectorAll('.nav__card')
		this.nav.forEach(card => card.addEventListener('click', () => {

			let a = card.querySelector('p').textContent

			switch (a) {
				case 'Word':
					(card.classList.contains('sort-items')) ? this.history.sort((a, b) => a.front.text - b.front.text) : this.history.sort((a, b) => a.front.text - b.front.text).reverse();
					break;
				case 'Translation':
					card.classList.contains('sort-items') ? this.history.sort((a, b) => a.back.text - b.back.text) : this.history.sort((a, b) => a.back.text - b.back.text).reverse()

					break;
				case 'Category':
					card.classList.contains('sort-items') ? this.history.sort((a, b) => a.button - b.button) : this.history.sort((a, b) => a.button - b.button).reverse()

					break;
				case 'Clicks':
					card.classList.contains('sort-items') ? this.history.sort((a, b) => a.click - b.click) : this.history.sort((a, b) => a.click - b.click).reverse()
					break;
				case 'Correct':
					card.classList.contains('sort-items') ? this.history.sort((a, b) => a.correct - b.correct) : this.history.sort((a, b) => a.correct - b.correct).reverse()
					break;
				case 'Wrong':
					card.classList.contains('sort-items') ? this.history.sort((a, b) => a.errors - b.errors) : this.history.sort((a, b) => a.errors - b.errors).reverse()
					break;

			}
			card.classList.toggle('sort-items')
			this.setHistory()
		}))

		//!===============
		document.querySelector('.footer-hacker__errors').onclick = () => {
			swipers.mySwiper.slideTo(['Main page', 'animals', 'colors', 'family', 'food', 'works', 'body', 'emotion', 'clothes', 'statistics'].indexOf(this.history.sort((a, b) => b.errors - a.errors)[0].button)
			)


		}




		document.querySelector('.footer-hacker__reset').onclick = () => {
			storage.del('statistic')
			this.history = []
			item.forEach(arr =>
				arr.forEach(obj => {
					obj.errors = 0
					obj.click = 0
					obj.correct = 0
					this.history.push(obj)
				})
			)

			storage.set('statistic', this.history)
			this.setHistory()
		}



		if (!window.localStorage.statistic) {
			item.forEach(arr =>
				arr.forEach(obj => {
					obj.errors = 0
					obj.click = 0
					obj.correct = 0
					this.history.push(obj)
				})
			)

			storage.set('statistic', this.history)

		} else {
			this.history = storage.get('statistic')

			storage.set('statistic', this.history)

		}


	}
}
