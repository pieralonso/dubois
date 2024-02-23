import { duboisData } from './duboisArray.js';

const arraysVacios = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`array${i + 1}`, []]));
const rango = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const filtrarPor = (propiedad) => (array) => duboisData.filter(elemento => array.some(arrayItem => elemento[propiedad] === arrayItem));
const palabrasEchelon = filtrarPor('echelon');
const startButton = document.getElementById("startButton");
const [home, start, mainMenu, mainContent] = Array.from(document.getElementsByClassName("section"));
const [back, backToHome, backToNav] = Array.from(document.getElementsByClassName('main-icon'));
const sections = Array.from(document.getElementsByClassName('nav-grades'));
const itemsStart = Array.from(document.getElementsByClassName('start-nav-item'));
const etapesItems = Array.from(document.getElementsByClassName('etapes-item'));
const gradesLinks = Array.from(document.getElementsByClassName('grades-item'));
const nivelesLink = Array.from(document.getElementsByClassName('niveaux-item'));
const sectionList = document.getElementById('sectionList');
const contentNav = document.getElementById('contentNav');
const navOptions = Array.from(document.getElementsByClassName('nav-item'));
const contentHeading = document.getElementById('contentSectionHeading');
const mainContentP = document.getElementById('mainContentP');
const mainContentDiv = document.getElementById('mainContentPopUp');

// Mapeo de cadenas de ID a rangos
const idToRango = {
    'a1': [1, 15],
    'a2': [16, 19],
    'b1': [20, 23],
    'b2': [24, 43],
};

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);


function selectedSection() {
    const selectedElement = gradesLinks.find(element => element.className.includes("clicked"));
    return selectedElement ? selectedElement.innerHTML : null;
}

function toggleInfo() {
    Array.from(document.getElementsByClassName('list-item')).forEach(function (item) {
        item.addEventListener('click', function () {
            mainContentP.innerHTML = item.innerHTML;
            mainContentDiv.style.display = 'flex';
            Array.from(document.getElementsByClassName('item-type')).forEach(function (item) {
                item.style.display = 'block'
            })
        });
    })
}

function toggleElements(elementToShow) {
    Array.from(document.getElementsByClassName("section")).forEach(function (element) {
        element.classList.add('hidden');
    })
    elementToShow.classList.remove("hidden");
    
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

function loader(element, seconds) {
    var time = seconds * 1000;
    element.addEventListener('click', function () {
        document.getElementById("loadingScreen").style.display = "flex";
        setTimeout(function() {
            document.getElementById("loadingScreen").style.display = "none";
        }, time);
    });
}

function crearListaDeRango(a, b, nivel, section) {
    sectionList.innerHTML = ''
    const arrayDePalabras = distribuirPalabrasEnArrays(palabrasEchelon(rango(a, b)))[`${nivel}`][`${section}`]
    arrayDePalabras.forEach(function (element) {
        const listItem = document.createElement('li');
        const spanType = document.createElement('span');
        listItem.classList.add("list-item");
        spanType.classList.add("item-type");
        listItem.innerHTML = element.nom;
        spanType.innerHTML = element.type;
        sectionList.appendChild(listItem);
        listItem.appendChild(spanType)
    })
    
    return arrayDePalabras
}


console.log(Object.entries(distribuirPalabrasEnArrays(palabrasEchelon(rango(24, 43)))))


document.addEventListener('DOMContentLoaded', function() {
    
    mainContentDiv.addEventListener('click', function (event) {
        if(event.target.id !== mainContentP.id) {
            mainContentDiv.style.display = 'none'
            Array.from(document.getElementsByClassName('item-type')).forEach(function (item) {
                item.style.display = 'none'
            })
        }
    },)
    
    toggleElements(home);
    
    gradesLinks.forEach(element => loader(element, 0.3));
    
    nivelesLink.forEach(element => loader(element, 1.6));
    
    loader(startButton, 1.2);
    
    
    startButton.addEventListener('click', () => toggleElements(start));
    backToHome.addEventListener('click', () => toggleElements(home));
    backToNav.addEventListener('click', () => toggleElements(mainMenu));
    back.addEventListener('click', () => toggleElements(home))

    Array.from(document.getElementsByClassName('niveaux-item')).forEach(element =>
        element.addEventListener('click', () => toggleElements(mainContent))
    );
    
    itemsStart.forEach(function (element, index) {
        element.addEventListener('click', function () {
            toggleElements(mainMenu);
            gradesLinks.forEach(item => item.classList.remove('clicked'));
            gradesLinks[index].classList.add('clicked');
            nivelesLink.forEach(function(elemento, posicion) {
                elemento.id = `${gradesLinks[index].id}Nivel${posicion + 1}`
            })
        })
    })
    
    
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
                            crearListaDeRango(rango[0], rango[1], `nivel${nivel}`, `section${section}`)
                        }
                        toggleInfo()
                    });
                }, )
                toggleInfo()
            })
            contentHeading.innerHTML = `${selectedSection()} - ${element.innerHTML}`
            navOptions.forEach(item => item.classList.remove('selected'));
            navOptions[0].classList.add('selected');
        });
    });
    
    navOptions.forEach(function (element) {
        element.addEventListener('click', function () {
            navOptions.forEach(item => item.classList.remove('selected'));
            element.classList.add('selected');
        })
        
    })
});



