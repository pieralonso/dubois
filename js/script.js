// Importar datos
import { primaryButton, secondaryButton, primaryMenu, secondaryMenu, navContainer, mainMenuLinks, titleLink } from './domElements.js'
import { rango, filtrarPor, palabrasDeEchelon, organizarNiveles } from './utils.js';
import { menuIdToArrays } from './menuData.js';
import { createSectionElement, createListContainerElement, createTitleElement, createListItemElement} from './domManipulation.js';
import { toggleMenu, handleMenuLinkClick, h3Elements, divTitles, backToMainPage } from './clickEvents.js'


document.addEventListener('DOMContentLoaded', function () {
    primaryButton.addEventListener('click', toggleMenu.bind(null, primaryMenu, navContainer[1]));
    secondaryButton.addEventListener('click', toggleMenu.bind(null, secondaryMenu, navContainer[0]));
    
    mainMenuLinks.forEach(element => {
        element.addEventListener('click', handleMenuLinkClick);
    });
    titleLink.addEventListener('click', backToMainPage);
});
