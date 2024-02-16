import { duboisData } from './duboisArray.js';

const arraysVacios = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`array${i + 1}`, []]));
const rango = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const filtrarPor = (propiedad) => (array) => duboisData.filter(elemento => array.some(arrayItem => elemento[propiedad] === arrayItem));
const palabrasEchelon = filtrarPor('echelon');
const startButton = document.getElementById("startButton");
const [home, mainMenu, mainContent] = Array.from(document.getElementsByClassName("section"));
const [backToHome, backToNav] = Array.from(document.getElementsByClassName('main-icon'));
const sections = Array.from(document.getElementsByClassName('nav-grades'))
const etapesItems = Array.from(document.getElementsByClassName('etapes-item'));
const gradesLinks = Array.from(document.getElementsByClassName('grades-item'));
const nivelesLink = Array.from(document.getElementsByClassName('niveaux-item'));
const sectionList = document.getElementById('sectionList')


function toggleElements(elementToShow, elementToHide) {
    elementToShow.classList.toggle("hidden");
    elementToHide.classList.toggle("hidden");
}

function toggleNavSection(navToShow, navToHide) {
    navToShow.style.display = "flex"
    navToHide.style.display = "none"
}

function distribuirPalabrasEnArrays(arrayPalabras) {
    const arraysVacios = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`nivel${i + 1}`, []]));
    
    const palabrasPorArray = Math.ceil(arrayPalabras.length / 10);
    let palabraIndex = 0;
    
    return Object.entries(arraysVacios).reduce((resultado, [nombreArray, _], indice) => {
        const palabrasASubArray = arrayPalabras.slice(palabraIndex, palabraIndex + palabrasPorArray);
        palabraIndex += palabrasASubArray.length;
        
        const subArraysDePalabras = palabrasASubArray.reduce((result, palabra, i) => {
            const sectionName = `section${Math.ceil((i + 1) / 20)}`;
            if (!result[sectionName]) {
                result[sectionName] = [];
            }
            result[sectionName].push(palabra);
            return result;
        }, {});
        
        resultado[nombreArray] = subArraysDePalabras;
        return resultado;
    }, {});
}

// Ejemplo de uso
const arraysDistribuidos = distribuirPalabrasEnArrays(palabrasEchelon(rango(1, 11)));
console.log(distribuirPalabrasEnArrays(palabrasEchelon(rango(1, 11))).nivel1.section1);

document.addEventListener('DOMContentLoaded', function() {
    toggleElements(mainMenu, mainContent);

    startButton.addEventListener('click', () => toggleElements(mainMenu, home));
    backToHome.addEventListener('click', () => toggleElements(mainMenu, home));
    backToNav.addEventListener('click', () => toggleElements(mainContent, mainMenu));

    Array.from(document.getElementsByClassName('niveaux-item')).forEach(element =>
        element.addEventListener('click', () => toggleElements(mainContent, mainMenu))
    );
    
    etapesItems.forEach((element, index) => {
        element.addEventListener('click', function () {
            toggleNavSection(sections[index], sections[1 - index]);
            etapesItems.forEach(item => item.classList.remove('clicked'));
            element.classList.add('clicked');
        });
    });
    
    gradesLinks.forEach(function (element) {
        nivelesLink.forEach(function (elemento, posicion) {
            elemento.id = `cpNivel${posicion + 1}`
        })
        
        element.addEventListener('click', function () {
            nivelesLink.forEach(function(item, index) {
                item.id = `${element.id}Nivel${index + 1}`
            })
        })
    })
    
    nivelesLink.forEach(function (element) {
        element.addEventListener('click', function () {
            if (element.id === 'cpNivel1') {
                crearListaDeRango(1, 11);
            } else if (element.id === 'ce2Nivel1') {
                crearListaDeRango(12, 15)
            }
            
        }, )
    }, )
    
    
});

function crearListaDeRango(a, b) {
    sectionList.innerHTML = ''
    distribuirPalabrasEnArrays(palabrasEchelon(rango(a, b))).nivel1.section1.forEach(function (element) {
        const listItem = document.createElement('li')
        listItem.classList.add("list-item");
        listItem.innerHTML = element.nom;
        sectionList.appendChild(listItem);
    })
}

