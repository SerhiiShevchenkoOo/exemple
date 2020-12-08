import create from './create'
export default function createFields() {
	//create DOM

	create('div', 'wrapper', null, document.querySelector('body'))
	create('main', 'main', null, document.querySelector('.wrapper'))
	create('div', 'main__monitor monitor', null, document.querySelector('main'))
	create('div', 'main__menu-ico menu-ico', null, document.querySelector('main'))
	create('div', 'background', null, document.querySelector('main'))
	create('img', 'menu-ico__img', null, document.querySelector('.menu-ico'))
	document.querySelector('.menu-ico__img').src = './assets/image/settings.svg'
	create('nav', 'monitor__nav nav', null, document.querySelector('.monitor'))
	create('ul', 'nav__list', null, document.querySelector('nav'))
	let navItems = ['New_game', 'Saved_game', 'Best_scores', 'Rules', 'Setting']
	//create pages
	navItems.forEach(string => {
		create('li', 'nav__item', string, document.querySelector('.nav__list'))
		create('div', `${string} pages deactive`, null, document.querySelector('.monitor'))

	})
	for (let i = 0; i < document.querySelectorAll('.pages').length; i++) {
		create('div', `pages__back-arrow arr${[i]}`, null, document.querySelectorAll('.pages')[i])
	} create('div', 'New_game__message', null, document.querySelector('.New_game'))
	create('div', 'pages__ok', null, document.querySelector('.New_game'))

	document.querySelector('.New_game__message').setAttribute('contenteditable', 'true');
	document.querySelector('.New_game__message').textContent = '[Enter yor name]'
	create('div', 'game game-paused', null, document.querySelector('.monitor'))
	create('div', 'game__info info', null, document.querySelector('.game'))
	create('div', 'game__field', null, document.querySelector('.game'))
	create('div', 'info__time', null, document.querySelector('.info'))
	create('div', 'info__score', null, document.querySelector('.info'))
	create('p', 'saved', 'game saved', document.querySelector('.Saved_game'))
	create('p', 'gamesize', 'field size:3x3', document.querySelector('.Setting'))
	create('p', 'gamesize', 'field size:4x4', document.querySelector('.Setting'))
	create('p', 'gamesize', 'field size:5x5', document.querySelector('.Setting'))
	create('p', 'gamesize', 'field size:6x6', document.querySelector('.Setting'))
	create('p', 'gamesize', 'field size:7x7', document.querySelector('.Setting'))
	create('p', 'gamesize', 'field size:8x8', document.querySelector('.Setting'))

}
