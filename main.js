const elForm = document.querySelector(".js-countries-form"),
  elInput = elForm.querySelector(".js-countries-inp"),
  elSelect = elForm.querySelector(".js-countries-select");
const elNoPage = document.querySelector(".js-no-page");
const elCountrRenderList = document.querySelector(".js-countries-render-list");
const elTemplate = document.querySelector(".js-template").content;

const toggleBtn = document.querySelector(".js-dartlightmode-btn");
const header = document.querySelector(".js-header");

const savedTheme = window.localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  header.classList.add("bg-mode");
  elInput.classList.add("bg-mode");
  elSelect.classList.add("bg-mode");
} else if (savedTheme === "light") {
  document.body.classList.remove("dark-mode");
  header.classList.remove("bg-mode");
  elInput.classList.remove("bg-mode");
  elSelect.classList.remove("bg-mode");
}

toggleBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  document.body.classList.toggle("dark-mode");
  header.classList.toggle("bg-mode");
  elInput.classList.toggle("bg-mode");
  elSelect.classList.toggle("bg-mode");
  sun.classList.toggle("open-block");
  moon.classList.toggle("open-none");

  if (document.body.classList.contains("dark-mode")) {
    window.localStorage.setItem("theme", "dark");
  } else {
    window.localStorage.setItem("theme", "light");
  }
});

let COUNTR_URL = "https://restcountries.com/v3.1/all";

function renderList(arr, node) {
  node.innerHTML = null;
  const docFrg = document.createDocumentFragment();
  arr.forEach((item) => {
    const templateClone = elTemplate.cloneNode(true);
    templateClone.querySelector(".js-countr-img").src = item.flags.png;
    templateClone.querySelector(".js-countr-img").alt = item.flags.alt;
    templateClone.querySelector(".js-common").textContent = item.name.common;
    templateClone.querySelector(".js-population").textContent = item.population;
    templateClone.querySelector(".js-region").textContent = item.region;
    templateClone.querySelector(".js-capital").textContent = item.capital;
    templateClone.querySelector(".js-country-item").dataset.id =
      item.population;
    docFrg.appendChild(templateClone);
  });
  node.appendChild(docFrg);
}

function dataAllInfo(countries) {
  elCountrRenderList.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (evt.target.closest(".js-country-item")) {
      let dataId = evt.target.closest(".js-country-item").dataset.id;
      let countrFind = countries.find((item) => {
        if (item.population == dataId) {
          return item;
        }
      });
      console.log(countrFind);
      if (countrFind) {
        window.localStorage.setItem("countr", JSON.stringify(countrFind));
        window.location.pathname = "./countries.html";
      }
    }
  });
}

async function getData(url, isSearch = false) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    if (!isSearch) {
      data = data.slice(0, 20);
    }
    renderList(data, elCountrRenderList);
    dataAllInfo(data);
    elNoPage.style.display = "none";
  } catch (error) {
    console.log(error);
    elNoPage.style.display = "block";
  }
}
getData(COUNTR_URL);

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let searchValue = elInput.value.trim();
  if (searchValue) {
    let SEARCH_URL = `https://restcountries.com/v3.1/name/${searchValue}`;
    getData(SEARCH_URL, true);
  } else {
    getData(COUNTR_URL);
  }
});

elSelect.addEventListener("change", (evt) => {
  evt.preventDefault();
  let selectVal = elSelect.value;
  getData(COUNTR_URL);
  let FILTER_URL =
    selectVal === "all"
      ? COUNTR_URL
      : `https://restcountries.com/v3.1/region/${selectVal}`;
  getData(FILTER_URL);
});
