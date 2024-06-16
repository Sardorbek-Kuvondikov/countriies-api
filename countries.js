let countries = JSON.parse(window.localStorage.getItem("countr"));

if (!countries) {
  window.location.pathname = "./index.html";
}

const elCountrRenderList = document.querySelector(".js-countr-render-list");
const elCountrTemplate = document.querySelector(".js-countr-template").content;
const elBackBtn = document.querySelector(".js-back-btn");

elBackBtn.addEventListener("click", () => {
  window.localStorage.removeItem("countr");
  window.location.reload();
});

const toggleBtn = document.querySelector(".js-dartlightmode-btn");
const header = document.querySelector(".js-header");

// Avvalgi mavzuni olish
const savedTheme = window.localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  header.classList.add("bg-mode");
} else if (savedTheme === "light") {
  document.body.classList.remove("dark-mode");
  header.classList.remove("bg-mode");
}

toggleBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  document.body.classList.toggle("dark-mode");
  header.classList.toggle("bg-mode");

  // Mavzuni saqlash
  if (document.body.classList.contains("dark-mode")) {
    window.localStorage.setItem("theme", "dark");
  } else {
    window.localStorage.setItem("theme", "light");
  }
});

function countrRenderList(data, node) {
  const nativeName = data.name.nativeName;
  const firstNativeNameKey = Object.keys(nativeName)[0];
  const languages = data.languages;
  const languageKey = Object.keys(languages);
  const languageInfo = languageKey.map((key) => ({
    language: key,
  }));
  const currencies = data.currencies;
  const currencyKeys = Object.keys(currencies);
  const currencyInfo = currencyKeys.map((key) => ({
    code: key,
    name: currencies[key].name,
    symbol: currencies[key].symbol,
  }));
  const docFrg = document.createDocumentFragment();
  const clone = elCountrTemplate.cloneNode(true);
  clone.querySelector(".js-countr-img").src = data.flags.png;
  clone.querySelector(".js-countr-img").alt = data.flags.alt;
  clone.querySelector(".js-countr-name").textContent = data.name.common;
  clone.querySelector(".js-nld-name").textContent =
    nativeName[firstNativeNameKey].common;
  clone.querySelector(".js-countr-poulation").textContent = data.population;
  clone.querySelector(".js-countr-region").textContent = data.region;
  clone.querySelector(".js-countr-subregion").textContent = data.subregion;
  clone.querySelector(".js-countr-capital").textContent = data.capital[0];
  clone.querySelector(".js-countr-tld").textContent = data.tld[0];
  clone.querySelector(".js-countr-currencies").textContent =
    currencyInfo[0].symbol;
  clone.querySelector(".js-countr-languages").textContent =
    languageInfo[0].language;

  docFrg.appendChild(clone);

  node.appendChild(docFrg);
}
countrRenderList(countries, elCountrRenderList);
