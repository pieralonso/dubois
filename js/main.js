import { duboisData } from "./duboisArray.js";
const gradesLinks = Array.from(document.getElementsByClassName("grades-item"));
const nivelesLink = Array.from(document.getElementsByClassName("niveaux-item"));
const sectionList = document.getElementById("sectionList");
const navOptions = Array.from(document.getElementsByClassName("nav-item"));
const contentHeading = document.getElementById("contentSectionHeading");
const mainContentP = document.getElementById("mainContentP");
const mainContentDiv = document.getElementById("mainContentPopUp");
const startButton = document.getElementById("startButton");
const rango = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const filtrarPor = (propiedad) => (array) => duboisData.filter((elemento) => array.some((arrayItem) => elemento[propiedad] === arrayItem));
const palabrasEchelon = filtrarPor("echelon");
const [home, mainMenu, mainContent] = Array.from(document.getElementsByClassName("section"));
const [back] = Array.from(document.getElementsByClassName("main-icon"));
const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon-svg-d" fill="white"viewBox="0 -960 960 960"><path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>`

// Mapeo de cadenas de ID a rangos
const idToRango = {
  a1: [1, 15],
  a2: [16, 19],
  b1: [20, 23],
  b2: [24, 43],
};

function selectedGradeTitle() {
  const selectedGrade = gradesLinks.find((grade) =>
    grade.className.includes("clicked"),
  );
  return selectedGrade ? selectedGrade.innerHTML : null;
}

function toggleInfo() {
  [...document.getElementsByClassName("list-item")].forEach(item => {
    item.addEventListener("click", function () {
      mainContentP.innerHTML = "";
      fadeIn(mainContentP, 1);
      mainContentP.innerHTML = item.innerHTML;
      mainContentDiv.style.display = "flex";
      [...document.getElementsByClassName("item-type")].forEach(type => {
        type.style.display = "block";
      },
      );
    });
  },
  );
}

function fadeIn(htmlElement) {
  htmlElement.classList.remove("fadeIn");
  void htmlElement.offsetWidth;
  htmlElement.classList.add("fadeIn");
}

function toggleElement(elementToShow) {
  [home, mainMenu, mainContent].forEach( element => {
    element.classList.add("hidden")
  });

  elementToShow.classList.remove("hidden");
  fadeIn(elementToShow, 2);
}

function toggleElements(element1, element2) {
  [home, mainMenu, mainContent].forEach(function (element) {
    element.classList.add("hidden");
  });
  element1.classList.remove("hidden");
  element2.classList.remove("hidden");

  fadeIn(element1, 2);
  fadeIn(element2, 2);
}

function distribuirPalabrasEnArrays(arrayPalabras) {
  const arraysVacios = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [`nivel${i + 1}`, []]),
  );

  const palabrasPorArray = Math.ceil(arrayPalabras.length / 10);
  let palabraIndex = 0;

  return Object.entries(arraysVacios).reduce((resultado, [nombreArray, _]) => {
    const palabrasASubArray = arrayPalabras.slice(
      palabraIndex,
      palabraIndex + palabrasPorArray,
    );
    palabraIndex += palabrasASubArray.length;

    const subArraysDePalabras = palabrasASubArray.reduce(
      (result, palabra, i) => {
        const sectionName = `section${Math.ceil((i + 1) / 20)}`;
        if (!result[sectionName]) {
          result[sectionName] = [];
        }
        result[sectionName].push(palabra);
        return result;
      },
      {},
    );

    resultado[nombreArray] = subArraysDePalabras;
    return resultado;
  }, {});
}

function crearListaDeRango(a, b, nivel, section) {
  sectionList.innerHTML = "";

  return distribuirPalabrasEnArrays(palabrasEchelon(rango(a, b)))[nivel][section]
    .map(element => {
      sectionList.insertAdjacentHTML('beforeend', `<li class="list-item">${element.nom}<span class="item-type">${element.type}</span></li>`);
      return element;
    });
}


window.onload = function () {
  // Limpiar el hash al cargar la página
  history.replaceState({}, document.title, ".");
};

document.addEventListener("DOMContentLoaded", function () {
  mainContentDiv.addEventListener("click", function (event) {
    if (event.target.id !== mainContentP.id) {
      mainContentDiv.style.display = "none";
      Array.from(document.getElementsByClassName("item-type")).forEach(
        function (item) {
          item.style.display = "none";
        },
      );
    }
  });
  toggleElement(home);
  startButton.addEventListener("click", function () {
    visualViewport.width > 768 ? toggleElements(mainMenu, mainContent):toggleElement(mainMenu);
    document.getElementById('headerIcon').classList.remove("hidden");
  });

  back.addEventListener("click", () => {
      switch (back.id) {
          case 'backToHome':
              toggleElement(home);
              document.getElementById('headerIcon').classList.add("hidden")
              break;
          case 'id2':
              // Código para manejar el caso 'id2'
              break;
          default:
              // Código para manejar todos los otros casos
              break;
      }
  });

  nivelesLink.forEach((element) =>
    element.addEventListener("click", () =>
      visualViewport.width > 768 ?
        toggleElements(mainMenu, mainContent) : toggleElement(mainContent),
    ),
  );

  gradesLinks.forEach((element) => {
    let currentText = element.children[0].innerHTML
    element.addEventListener('mouseenter', function() {
      element.classList.contains("clicked") && visualViewport.width > 768 ?
      element.children[0].innerHTML = arrowIcon :
      element.children[0].innerHTML = currentText
      });

    element.addEventListener('mouseleave', function() {
      element.classList.contains("clicked") && visualViewport.width > 768 ?
      element.children[0].innerHTML = currentText :
      element.children[0].innerHTML = currentText
      })

    element.addEventListener("click", () => {
      const isClicked = element.classList.contains("clicked");
      if (!isClicked) {
        gradesLinks.forEach((item) => item.classList.remove("clicked"));
        element.classList.add("clicked");
      }
      fadeIn(document.getElementById('navNiveaux'))
    });
  });

  gradesLinks.forEach(function (element) {
    nivelesLink.forEach(function (elemento, posicion) {
      elemento.id = `a1Nivel${posicion + 1}`;
    });

    element.addEventListener("click", function () {
      nivelesLink.forEach(function (item, index) {
        item.id = `${element.id}Nivel${index + 1}`;
      });
    });
  });

  nivelesLink.forEach(function (element, index) {
    element.addEventListener("click", function () {
      nivelesLink.forEach((i) => i.classList.remove("nivel-selected"));
      element.classList.add("nivel-selected");
      const nivel = index + 1;

      // Iterar sobre el objeto idToRango
      Object.entries(idToRango).forEach(([cadena, rango]) => {
        if (element.id.includes(cadena)) {
          crearListaDeRango(rango[0], rango[1], `nivel${nivel}`, "section1");
        }
      });
      navOptions.forEach(function (elemento, indice) {
        elemento.addEventListener("click", function () {
          const section = indice + 1;
          Object.entries(idToRango).forEach(([cadena, rango]) => {
            if (element.id.includes(cadena)) {
              crearListaDeRango(
                rango[0],
                rango[1],
                `nivel${nivel}`,
                `section${section}`,
              );
            }
            toggleInfo();
          });
          Array.from(document.getElementsByClassName("list-item")).forEach(
            function (b) {
              fadeIn(b, 4);
            },
          );
        });
        toggleInfo();
      });
      contentHeading.innerHTML = `${selectedGradeTitle()} - ${element.innerHTML}`;
      navOptions.forEach((item) => item.classList.remove("selected"));
      navOptions[0].classList.add("selected");
    });
  });

  navOptions.forEach(function (element) {
    element.addEventListener("click", function () {
      navOptions.forEach((item) => item.classList.remove("selected"));
      element.classList.add("selected");
    });
  });
});
