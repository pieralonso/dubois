import { duboisData} from './duboisArray.js'

// manejo del array 
const rango  = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

const filtrarPor = (propiedad) => (array) => duboisData.filter(elemento => array.some(arrayItem => elemento[propiedad] === arrayItem));

const palabrasDeEchelon = filtrarPor('echelon');

const organizarNiveles = array => Array.from({ length: Math.ceil(array.length / 20) }, (_, i) => array.slice(i * 20, i * 20 + 20));

const primaire = palabrasDeEchelon(rango(1, 11));
const ce2 = palabrasDeEchelon(rango(12, 15));
const cm1 = palabrasDeEchelon(rango(16, 19));
const cm2 = palabrasDeEchelon(rango(20, 23));

function generarSecciones(arrayNiveles) {
	const listSection = document.getElementById('word-list');
	listSection.innerHTML = '';
	
	for (const section of arrayNiveles) {
		const nuevaSeccion = document.createElement('section');
		nuevaSeccion.classList = 'miNuevaSeccion';
		
		for (const palabra of section) {
			const nuevoParrafo = document.createElement('li');
			nuevoParrafo.textContent = palabra.nom;
			nuevaSeccion.appendChild(nuevoParrafo);
		}
		
		listSection.appendChild(nuevaSeccion);
	}
}

// Llamada a la función con el array retornado por organizarNiveles(primaire)


// barra de navegacion 

document.addEventListener('DOMContentLoaded', function () {
	const primaryButton = document.getElementById('primaire-button');
	const secondaryButton = document.getElementById('secondaire-button');
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
			sectionTitle.textContent = event.target.textContent;
			switch (event.target.id) {
				case 'menu-item-cpce1':
					generarSecciones(organizarNiveles(primaire))
					break;
				case 'menu-item-ce2':
					generarSecciones(organizarNiveles(ce2))
					break;
			}
		})
	}
});

