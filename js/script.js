// Importar datos
import { duboisData } from './duboisArray.js';

// Funciones auxiliares
const rango = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const filtrarPor = (propiedad) => (array) => duboisData.filter(elemento => array.some(arrayItem => elemento[propiedad] === arrayItem));
const palabrasDeEchelon = filtrarPor('echelon');
const organizarNiveles = array => Array.from({ length: Math.ceil(array.length / 20) }, (_, i) => array.slice(i * 20, i * 20 + 20));

// Elementos del DOM
const primaryButton = document.getElementById('primaire-button');
const secondaryButton = document.getElementById('secondaire-button');
const primaryMenu = document.getElementById('primary-menu');
const secondaryMenu = document.getElementById('secondary-menu');
const sectionTitle = document.getElementById('sub-section-title');
const navContainer = Array.from(document.getElementsByClassName('menu-container'));
const mainMenuLinks = Array.from(document.getElementsByClassName('main__menu-link'));
const listSection = document.getElementById('word-list');
const mainSection = document.querySelector('#main-section')
const welcomeSection = document.querySelector('#welcome-section')
const titleLink = document.querySelector('#site-title-link')
// Generar arrays a utilizar
const arrayPrimaire = palabrasDeEchelon(rango(1, 11));
const arrayCe2 = palabrasDeEchelon(rango(12, 15));
const arrayCm1 = palabrasDeEchelon(rango(16, 19));
const arrayCm2 = palabrasDeEchelon(rango(20, 23));
const array6eme = palabrasDeEchelon(rango(24, 27));
const array5eme = palabrasDeEchelon(rango(28, 35));
const arrayLycee = palabrasDeEchelon(rango(36, 43));

// Objeto que guarda ids, apuntando a un array
const menuIdToArrays = {
    'menu-item-cpce1': arrayPrimaire,
    'menu-item-ce2': arrayCe2,
    'menu-item-cm1': arrayCm1,
    'menu-item-cm2': arrayCm2,
    'menu-item-6eme': array6eme,
    'menu-item-54eme': array5eme,
    'menu-item-3eme-lycee': arrayLycee,
};

// Manejadores de eventos al cargar el DOM
document.addEventListener('DOMContentLoaded', function () {
    primaryButton.addEventListener('click', toggleMenu.bind(null, primaryMenu, navContainer[1]));
    secondaryButton.addEventListener('click', toggleMenu.bind(null, secondaryMenu, navContainer[0]));

    mainMenuLinks.forEach(element => {
        element.addEventListener('click', handleMenuLinkClick);
    });
    titleLink.addEventListener('click', backToMainPage);
});

// Funciones de manejo de eventos
const toggleMenu = (menu, container) => {
    menu.classList.toggle('hidden');
    container.classList.toggle('hidden');
    welcomeSection.classList.add('hidden');
};

const handleMenuLinkClick = (event) => {
    sectionTitle.textContent = event.target.textContent;
    const nivelArray = menuIdToArrays[event.target.id];
    mainSection.classList.remove('hidden');
    if (nivelArray) {
        const organizedLevels = organizarNiveles(nivelArray);
        generarSecciones(organizedLevels);
        addToggleEventListeners();
    }
};

const addToggleEventListeners = () => {
    h3Elements.forEach(element => {
        element.addEventListener('click', toggleVisibility);
    });
    
    divTitles.forEach((element) => {
        element.addEventListener('click',toggleVisibility);
    });
    
};




const toggleVisibility = (event) => {
    const ulElement = event.target.nextElementSibling;
    ulElement.classList.toggle('hidden');
};

const backToMainPage = () => {
    mainSection.classList = "hidden"
    welcomeSection.classList.remove("hidden")
    primaryMenu.classList.add("hidden") ;
    secondaryMenu.classList.add("hidden");
    navContainer.forEach(element => element.classList.remove("hidden"));
}


// Elementos compartidos
var h3Elements = [];
var divTitles = [];

// Función principal para generar secciones
function generarSecciones(arrayNiveles) {
    listSection.innerHTML = '';
    
    // Divide el array en grupos de 10
    const grupos = [];
    while (arrayNiveles.length > 0) {
        grupos.push(arrayNiveles.splice(0, 5));
    }
    
    // Itera sobre cada grupo y crea un div para cada uno
    grupos.forEach((grupo, index) => {
        const nuevoDiv = document.createElement('div');
        const divTitle = document.createElement('h3');
        const sectionContainerChild = document.createElement("section");
        sectionContainerChild.classList.add('hidden')
        divTitle.classList.add('levels')
        divTitle.innerHTML = `Nivel ${index + 1}`
        nuevoDiv.appendChild(divTitle)
        nuevoDiv.appendChild(sectionContainerChild)
        nuevoDiv.classList.add('grupo-secciones');
        
        grupo.forEach((section, sectionIndex) => {
            const nuevaSeccion = createSectionElement();
            const container = createListContainerElement();
            const titulo = createTitleElement();
            titulo.innerHTML = `Section ${sectionIndex + 1}`;
            
            nuevaSeccion.appendChild(titulo);
            nuevaSeccion.appendChild(container);
            
            section.forEach(palabra => {
                const nuevoParrafo = createListItemElement(palabra.nom);
                container.appendChild(nuevoParrafo);
            });
            
            sectionContainerChild.appendChild(nuevaSeccion);
        });
        
        listSection.appendChild(nuevoDiv);
    });
    h3Elements = Array.from(document.getElementsByClassName('toggle'));
    divTitles = Array.from(document.getElementsByClassName('levels'));
}

// Funciones auxiliares para la creación de elementos
function createSectionElement() {
    const nuevaSeccion = document.createElement('section');
    nuevaSeccion.classList.add('miNuevaSeccion');
    return nuevaSeccion;
}

function createListContainerElement() {
    const container = document.createElement('ul');
    container.classList = 'list-section-container hidden';
    return container;
}

function createTitleElement() {
    const titulo = document.createElement('h4');
    titulo.classList.add('toggle');
    return titulo;
}

function createListItemElement(textContent) {
    const nuevoParrafo = document.createElement('li');
    nuevoParrafo.classList.add('list-section-item');
    nuevoParrafo.textContent = textContent;
    return nuevoParrafo;
}