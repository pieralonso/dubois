import { welcomeSection, sectionTitle, mainSection, listSection, primaryMenu, secondaryMenu, navContainer } from './domElements.js'
import { createSectionElement, createListContainerElement, createTitleElement, createListItemElement } from './domManipulation.js'
import { organizarNiveles} from './utils.js';
import { menuIdToArrays} from './menuData.js'

export const toggleMenu = (menu, container) => {
    menu.classList.toggle('hidden');
    container.classList.toggle('hidden');
    welcomeSection.classList.add('hidden');
};
    
export const handleMenuLinkClick = (event) => {
    sectionTitle.textContent = event.target.textContent;
    const nivelArray = menuIdToArrays[event.target.id];
    mainSection.classList.remove('hidden');
    if (nivelArray) {
        const organizedLevels = organizarNiveles(nivelArray);
        generarSecciones(organizedLevels);
        addToggleEventListeners();
    }
};
export const addToggleEventListeners = () => {
    h3Elements.forEach(element => {
        element.addEventListener('click', toggleVisibility);
    });
    
    divTitles.forEach((element) => {
        element.addEventListener('click',toggleVisibility);
    });
    
};

export const toggleVisibility = (event) => {
    const ulElement = event.target.nextElementSibling;
    ulElement.classList.toggle('hidden');
};

export const backToMainPage = () => {
    mainSection.classList = "hidden"
    welcomeSection.classList.remove("hidden")
    primaryMenu.classList.add("hidden") ;
    secondaryMenu.classList.add("hidden");
    navContainer.forEach(element => element.classList.remove("hidden"));
}

// Elementos compartidos
export var h3Elements = [];
export var divTitles = [];

// Función principal para generar secciones
function generarSecciones(arrayNiveles) {
    listSection.innerHTML = '';
    
    // Divide el array en grupos de 10
    const grupos = Array.from({ length: Math.ceil(arrayNiveles.length / 5) }, (_, index) =>
        arrayNiveles.slice(index * 5, index * 5 + 5)
    );

    
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
    