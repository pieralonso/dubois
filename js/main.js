import { duboisData } from './duboisArray.js';

const arraysVacios = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`array${i + 1}`, []]));
const rango = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const filtrarPor = (propiedad) => (array) => duboisData.filter(elemento => array.some(arrayItem => elemento[propiedad] === arrayItem));
const palabrasEchelon = filtrarPor('echelon');
const startButton = document.getElementById("startButton");
const [home, mainMenu, mainContent] = Array.from(document.getElementsByClassName("section"));
const [backToHome, backToNav] = Array.from(document.getElementsByClassName('main-icon'));
const sections = Array.from(document.getElementsByClassName('nav-grades'));
const etapesItems = Array.from(document.getElementsByClassName('etapes-item'));
const gradesLinks = Array.from(document.getElementsByClassName('grades-item'));
const nivelesLink = Array.from(document.getElementsByClassName('niveaux-item'));
const sectionList = document.getElementById('sectionList');
const contentNav = document.getElementById('contentNav');
const navOptions = Array.from(document.getElementsByClassName('nav-item'));



// Mapeo de cadenas de ID a rangos
const idToRango = {
    'a1': [1, 15],
    'a2': [16, 19],
    'b1': [20, 23],
    'b2': [24, 43],
};


function toggleElements(elementToShow, elementToHide) {
    elementToShow.classList.toggle("hidden");
    elementToHide.classList.toggle("hidden");
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

function crearListaDeRango(a, b, nivel, section) {
    sectionList.innerHTML = ''
    distribuirPalabrasEnArrays(palabrasEchelon(rango(a, b)))[`${nivel}`][`${section}`].forEach(function (element) {
        const listItem = document.createElement('li')
        listItem.classList.add("list-item");
        listItem.innerHTML = element.nom;
        sectionList.appendChild(listItem);
    })
}


console.log(Object.entries(distribuirPalabrasEnArrays(palabrasEchelon(rango(24, 43)))))


document.addEventListener('DOMContentLoaded', function() {
    toggleElements(mainMenu, mainContent);

    startButton.addEventListener('click', () => toggleElements(mainMenu, home));
    backToHome.addEventListener('click', () => toggleElements(mainMenu, home));
    backToNav.addEventListener('click', () => toggleElements(mainContent, mainMenu));

    Array.from(document.getElementsByClassName('niveaux-item')).forEach(element =>
        element.addEventListener('click', () => toggleElements(mainContent, mainMenu))
    );
    
    
    gradesLinks.forEach((element, index) => {
        element.addEventListener('click', function () {
            gradesLinks.forEach(item => item.classList.remove('clicked'));
            element.classList.add('clicked');
        });
    });
    
    gradesLinks.forEach(function (element) {
        nivelesLink.forEach(function (elemento, posicion) {
            elemento.id = `a1Nivel${posicion + 1}`
        })
        
        element.addEventListener('click', function () {
            nivelesLink.forEach(function(item, index) {
                item.id = `${element.id}Nivel${index + 1}`
            })
        })
    })
    
    nivelesLink.forEach(function (element, index) {
        element.addEventListener('click', function () {
            const nivel = index + 1; 
            
            // Iterar sobre el objeto idToRango
            Object.entries(idToRango).forEach(([cadena, rango]) => {
                if (element.id.includes(cadena)) {
                    crearListaDeRango(rango[0], rango[1], `nivel${nivel}`, 'section1');
                }
            });
            navOptions.forEach(function(elemento, indice) {
                elemento.addEventListener('click', function () {
                    const section = indice + 1;
                    Object.entries(idToRango).forEach(([cadena, rango]) => {
                        if (element.id.includes(cadena)) {
                            crearListaDeRango(rango[0], rango[1], `nivel${nivel}`, `section${section}`);
                        }
                    });
                }, )
            })
        });
    });
    
    navOptions.forEach(function (element) {
        element.addEventListener('click', function () {
            navOptions.forEach(item => item.classList.remove('selected'));
            element.classList.add('selected');
        })
        
    })
});

