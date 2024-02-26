import { duboisData } from './duboisArray.js';

const rango = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const filtrarPor = (propiedad) => (array) => duboisData.filter(elemento => array.some(arrayItem => elemento[propiedad] === arrayItem));
const palabrasEchelon = filtrarPor('echelon');
const startButton = document.getElementById("startButton");
const [home, mainMenu, mainContent] = Array.from(document.getElementsByClassName("section"));
const [back, backToNiveles] = Array.from(document.getElementsByClassName('main-icon'));
const itemsStart = Array.from(document.getElementsByClassName('start-nav-item'));
const gradesLinks = Array.from(document.getElementsByClassName('grades-item'));
const nivelesLink = Array.from(document.getElementsByClassName('niveaux-item'));
const sectionList = document.getElementById('sectionList');
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

function selectedSection() {
    const selectedElement = gradesLinks.find(element => element.className.includes("clicked"));
    return selectedElement ? selectedElement.innerHTML : null;
}

function toggleInfo() {
    Array.from(document.getElementsByClassName('list-item')).forEach(function (item) {
        item.addEventListener('click', function () {
            mainContentP.innerHTML = "";
            fadeIn(mainContentP, 2)
            mainContentP.innerHTML = item.innerHTML;
            mainContentDiv.style.display = 'flex';
            Array.from(document.getElementsByClassName('item-type')).forEach(function (item) {
                item.style.display = 'block'
            })
        });
    })
}


function fadeIn(htmlElement, n) {
    htmlElement.style.animation = `fadeIn ${n}s ease`;
}
function fadeOut(htmlElement, n) {
     htmlElement.style.animation = `fadeOut ${n}s ease`;
}
function toggleElements(elementToShow) {
    Array.from(document.getElementsByClassName("section")).forEach(function (element) {
        element.classList.add('hidden');
    })
    elementToShow.classList.remove("hidden");
    fadeIn(elementToShow, 1.5)
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

window.onload = function() {
    // Limpiar el hash al cargar la página
    history.replaceState({}, document.title, ".");
};

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
    startButton.addEventListener('click', () => toggleElements(mainMenu));
    startButton.addEventListener('click', () => fadeOut(home, 2));

    backToNiveles.addEventListener('click', () => toggleElements(mainMenu));
    back.addEventListener('click', function () {
        if (back.id === 'backToView') {
            gradesLinks.forEach(item => item.classList.remove('clicked'));
            gradesLinks.forEach(item => item.classList.remove("hidden"));
            document.getElementById('navNiveaux').style.display = "none";
            document.getElementById('menuHeader').style.height = '100%';
            document.getElementById('startP').style.display = "flex";
            back.id = 'backToHome'
        } else if (back.id === 'backToHome') {
            toggleElements(home)
        }

    })
    

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
        element.addEventListener('click', function (event) {
            if (!element.classList.contains('clicked')) {
                back.id = 'backToView'
                gradesLinks.forEach(item => item.classList.remove('clicked'));
                element.classList.add('clicked');
                gradesLinks.forEach(item => item.classList.add("hidden"));
                element.classList.remove('hidden')
                document.getElementById('navNiveaux').style.display = "flex";
                document.getElementById('menuHeader').style.height = '10%';
                document.getElementById('startP').style.display = "none";
            } else if (element.classList.contains('clicked')) {
                
                back.id = 'backToHome'
                gradesLinks.forEach(item => item.classList.remove('clicked'));
                gradesLinks.forEach(item => item.classList.remove("hidden"));
                document.getElementById('navNiveaux').style.display = "none";
                document.getElementById('menuHeader').style.height = '100%';
                document.getElementById('startP').style.display = "flex";
            }
            
            fadeIn(document.getElementById('navNiveaux'), 1.5)
            
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
                    Array.from(document.getElementsByClassName('list-item')).forEach(function (b) {
                        fadeIn(b, 1.5)
                    })
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



