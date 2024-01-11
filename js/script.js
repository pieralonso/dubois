import { duboisArray } from './duboisArray.js';


// barra de navegacion 
document.addEventListener('DOMContentLoaded', function () {
	var primaryButton = document.getElementById('primary-button');
	var secondaryButton = document.getElementById('secondary-button');
	var primaryMenu = document.getElementById('primary-menu');
	var secondaryMenu = document.getElementById('secondary-menu');
	const sectionTitle = document.getElementById('sub-section-title');
	var navContainer = Array.from(document.getElementsByClassName('menu-container'));
	var mainMenuLinks = Array.from(document.getElementsByClassName('main__menu-link'));
	
	primaryButton.addEventListener('click', function () {
		primaryMenu.classList.toggle('hidden');
		navContainer[1].classList.toggle('hidden');
	});
	
	secondaryButton.addEventListener('click', function () {
		secondaryMenu.classList.toggle('hidden');
		navContainer[0].classList.toggle('hidden');
	});
	
	// generando secciones
	
	for (var element of mainMenuLinks) {
		element.addEventListener('click', function (event) {
			sectionTitle.textContent = event.target.textContent
		})
	}
});
