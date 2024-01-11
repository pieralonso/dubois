import { duboisArray } from './duboisArray.js'
// manejo del array 
function echelons(a, b) {
	var result = [];
	for(var i = a; i <= b ; i++ ) {
		result.push(`|${i}|`)
	}
	return result
}
function filtrarDuboisArrayConCriterio(array) {
	let result = [];
	for(var item of duboisArray) {
		for(var element of array) {
			if(item.includes(element)) {
				result.push(item)
			}
			
		}
	}

	return result
}


// barra de navegacion 
document.addEventListener('DOMContentLoaded', function () {
	const primaryButton = document.getElementById('primary-button');
	const secondaryButton = document.getElementById('secondary-button');
	const primaryMenu = document.getElementById('primary-menu');
	const secondaryMenu = document.getElementById('secondary-menu');
	const sectionTitle = document.getElementById('sub-section-title');
	const navContainer = Array.from(document.getElementsByClassName('menu-container'));
	const mainMenuLinks = Array.from(document.getElementsByClassName('main__menu-link'));
	
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
