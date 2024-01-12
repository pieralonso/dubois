import { duboisArray } from './duboisArray.js'

// manejo del array 

const dubois = duboisArray.slice().sort((a, b) => parseInt(a.split('|')[1]) - parseInt(b.split('|')[1]));

const generarEchelon = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => `|${a + i}|`);

const filtrarPorEchelon = (echelons) => dubois.filter(item => echelons.some(e => item.includes(e)));

const organizarNiveles = array => Array.from({ length: Math.ceil(array.length / 20) }, (_, i) => array.slice(i * 20, i * 20 + 20));

const cpArray = filtrarPorEchelon(generarEchelon(1, 11));
const ce2Array = filtrarPorEchelon(generarEchelon(12, 15));
const cm1Array = filtrarPorEchelon(generarEchelon(16, 19));
const cm2Array = filtrarPorEchelon(generarEchelon(20, 23));
const s6EmeArray = filtrarPorEchelon(generarEchelon(24, 27));
const c5EmeArray = filtrarPorEchelon(generarEchelon(28, 35));
const t3EmeArray = filtrarPorEchelon(generarEchelon(36, 43));


console.log(dubois.length)
console.log(cpArray, ce2Array, cm1Array, cm2Array, s6EmeArray, c5EmeArray, t3EmeArray)
//filtrarConCriterio
// separaArray



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