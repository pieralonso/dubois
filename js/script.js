import { duboisData} from './duboisArray.js'

// manejo del array matriz
const rango  = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

const filtrarPor = (propiedad) => (array) => duboisData.filter(elemento => array.some(arrayItem => elemento[propiedad] === arrayItem));

const palabrasDeEchelon = filtrarPor('echelon');

const organizarNiveles = array => Array.from({ length: Math.ceil(array.length / 20) }, (_, i) => array.slice(i * 20, i * 20 + 20));
// puntos de conexion con la pagina
const primaryButton = document.getElementById('primaire-button');
const secondaryButton = document.getElementById('secondaire-button');
const primaryMenu = document.getElementById('primary-menu');
const secondaryMenu = document.getElementById('secondary-menu');
const sectionTitle = document.getElementById('sub-section-title');
const navContainer = Array.from(document.getElementsByClassName('menu-container'));
const mainMenuLinks = Array.from(document.getElementsByClassName('main__menu-link'));

// generando arrays a utilizar
const arrayPrimaire = palabrasDeEchelon(rango(1, 11));
const arrayCe2 = palabrasDeEchelon(rango(12, 15));
const arrayCm1 = palabrasDeEchelon(rango(16, 19));
const arrayCm2 = palabrasDeEchelon(rango(20, 23));
const array6eme = palabrasDeEchelon(rango(24, 27));
const array5eme = palabrasDeEchelon(rango(28, 35));
const arrayLycee = palabrasDeEchelon(rango(36, 43))
// objeto que guarda ids, apuntando a un array
const menuIdToArrays = {
	'menu-item-cpce1': arrayPrimaire,
	'menu-item-ce2': arrayCe2,
	'menu-item-cm1': arrayCm1,
	'menu-item-cm2': arrayCm2,
	'menu-item-6eme': array6eme,
	'menu-item-54eme': array5eme,
	'menu-item-3eme-lycee': arrayLycee,
};


document.addEventListener('DOMContentLoaded', function () {
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
			var nivelArray = menuIdToArrays[event.target.id]; //menuId..[id]; almacena los arrays organizados
			
			nivelArray && generarSecciones(organizarNiveles(nivelArray)); // el operador && se asegura que nivelArray este definido
		});
	}
});

function generarSecciones(arrayNiveles) {
	const listSection = document.getElementById('word-list');
	listSection.innerHTML = '';
	
	//iniciando el loop sobre la cantidad de secciones
	for (const section of arrayNiveles) {
		//por cada seccion se crean los siguientes elementos
		const nuevaSeccion = document.createElement('section');
		const container = document.createElement('ul');
		const titulo = document.createElement('h3');
		//asignando clases
		container.classList = 'list-section-container'
		nuevaSeccion.classList = 'miNuevaSeccion';
		//Agregandolos al html 
		titulo.innerHTML = 'Section'
		listSection.appendChild(nuevaSeccion);
		nuevaSeccion.appendChild(titulo);
		nuevaSeccion.appendChild(container);

		for (const palabra of section) { // iniciando el loop sobre cada palabra de cada seccion
			const nuevoParrafo = document.createElement('li');
			nuevoParrafo.classList = 'list-section-item'
			nuevoParrafo.textContent = palabra.nom;
			container.appendChild(nuevoParrafo);
		}
	}
}



