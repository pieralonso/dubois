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
const apiKey = "Aj3N07DBkIyWUshzWGltlEL9I40rT2pAHFXCbIYJHLrmkZPRFXL26ohR"
const filtrarPor = (propiedad) => (array) => duboisData.filter((elemento) => array.some((arrayItem) => elemento[propiedad] === arrayItem));
const palabrasEchelon = filtrarPor("echelon");
const [home, mainMenu, mainContent] = Array.from(document.getElementsByClassName("section"));
const [back] = Array.from(document.getElementsByClassName("main-icon"));
const popupImage = document.querySelector(".popup-image");


const fetchImages = async (apiURL) => {
  try {
    const response = await fetch(apiURL, {
      headers: { Authorization: apiKey },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! status=${response.status}`);
    }
    const data = await response.json();
    return data ;
  } catch (error) {
    console.error("Fetch error", error);
  }
};




// Mapeo de cadenas de ID a rangos
const idToRango = {
  a1: [1, 15],
  a2: [16, 19],
  b1: [20, 23],
  b2: [24, 43],
};
// mapeo funciones para ir hacia atras
const backActions = {
    'backToHome': () => {
        toggleElement(home);
        document.getElementById('headerIcon').classList.add("hidden");
    },
    'backToMenu': () => {
        toggleElement(mainMenu);
        back.id = 'backToHome'
    },
    'backToMots' : () => {
      endTimeout();
      back.id = 'backToMenu'
      mainContentDiv.classList.add("hidden");
      document.getElementById("mainContentWrapper").classList.remove("hidden");
      Array.from(document.getElementsByClassName("item-type")).forEach(
        function (item) {
          item.classList.add("hidden");
        },
      );
    },
};

function selectedGradeTitle() {
  const selectedGrade = gradesLinks.find((grade) =>
    grade.className.includes("clicked"),
  );
  return selectedGrade && selectedGrade.innerHTML;
}

let timeoutID = null;
const endTimeout = () => {
    clearTimeout(timeoutID);
    timeoutID = null;
}

function toggleInfo() {
  [...document.getElementsByClassName("list-item")].forEach(item => {
    // Elimina el event listener existente
    item.removeEventListener("click", item.clickHandler);


    // Define el event listener
    item.clickHandler = function () {
      back.id = 'backToMots';
      mainContentP.innerHTML = "";
      popupImage.src = "";
      fadeIn(mainContentP);
      item.children[0].classList.remove("hidden");
      let query = item.innerHTML.split("-")[2];
      console.log(query);
      let apiURL = `https://api.pexels.com/v1/search?query=${query}&orientation=portrait&size=medium&locale=en-US&page=1&per_page=10&`; 
      (async () => {
        const r =   await fetchImages(apiURL)
        for(let i of r.photos) {
            let result = i.src.medium;
            popupImage.src = result;
            await new Promise(r => {timeoutID = setTimeout(r, 2000)});
        }
      })();
      


    //   fetchImages(apiURL).then((data) => {
    //     let result = data.photos[0].src.medium;
    //     popupImage.src = result;
    //    });
      mainContentP.innerHTML = item.innerHTML;
      mainContentDiv.classList.remove("hidden");
      document.getElementById("mainContentWrapper").classList.add("hidden")
    };

    // Añade el event listener
    item.addEventListener("click", item.clickHandler);
  });
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
      sectionList.insertAdjacentHTML('beforeend', `<li class="list-item"> ${element.nom} <span class="item-type hidden" id="itemType">${element.type}</span><span id="translation" class="traduction hidden">-${element.translation}-</li>`);
      return element;
    });
}


window.onload = function () {
  // Limpiar el hash al cargar la página
  history.replaceState({}, document.title, ".");
};

document.addEventListener("DOMContentLoaded", function () {

  // updateHeight();
  // window.addEventListener('resize', updateHeight);
  // getWidth();
  // window.addEventListener('resize', getWidth);

  toggleElement(home);

  mainContentDiv.addEventListener("click", function (event) {
    const itemType = document.getElementById("itemType").id;
    if (event.target.id !== popupImage.id && event.target.id !== mainContentP.id && event.target.id !== itemType) {
      endTimeout();
      back.id = 'backToMenu';
      mainContentDiv.classList.add("hidden");
      document.getElementById("mainContentWrapper").classList.remove("hidden");
      Array.from(document.getElementsByClassName("item-type")).forEach(
        function (item) {
          item.classList.add("hidden");
        },
      );
    }
  });

  startButton.addEventListener("click", function () {
    toggleElement(mainMenu);
    document.getElementById('headerIcon').classList.remove("hidden");
    gradesLinks.forEach(element => element.classList.remove("clicked"));
    gradesLinks[0].classList.add("clicked");

  });

  back.addEventListener("click", () => {
      const action = backActions[back.id];
      action();

  });

  nivelesLink.forEach((element) =>
    element.addEventListener("click", function() {
      toggleElement(mainContent);
      back.id = "backToMenu";
        }
    ),
  );

  gradesLinks.forEach((element) => {

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
      let nivel = index + 1;

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
              fadeIn(b);
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
