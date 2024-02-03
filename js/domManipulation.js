export function createSectionElement() {
    const nuevaSeccion = document.createElement('section');
    nuevaSeccion.classList.add('miNuevaSeccion');
    return nuevaSeccion;
}

export function createListContainerElement() {
    const container = document.createElement('ul');
    container.classList = 'list-section-container hidden';
    return container;
}

export function createTitleElement() {
    const titulo = document.createElement('h4');
    titulo.classList.add('toggle');
    return titulo;
}

export function createListItemElement(textContent) {
    const nuevoParrafo = document.createElement('li');
    nuevoParrafo.classList.add('list-section-item');
    nuevoParrafo.textContent = textContent;
    return nuevoParrafo;
}