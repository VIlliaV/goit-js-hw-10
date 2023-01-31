import "./css/styles.css";
import debounce from "debounce";
import { fetchCountries } from "./fetchCountries.js";
import Notiflix from "notiflix";

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById("search-box");
const divEl = document.querySelector(".country-info");
const ulEl = document.querySelector(".country-list");
const bodyEl = document.querySelector("body");
Notiflix.Notify.init({
  position: "center-center",
  width: "280px",
  cssAnimationStyle: "from-bottom",
  cssAnimationDuration: 1000,
});

inputEl.addEventListener("input", debounce(makeCountryData, DEBOUNCE_DELAY));

function makeCountryData(event) {
  const nameCountry = event.target.value.trim();

  if (!nameCountry) return deleteAll();

  fetchCountries(nameCountry)
    .then((countries) => {
      if (countries.length > 10) {
        deleteAll();
        Notiflix.Notify.info(
          "Too many matches found. Please enter a more specific name."
        );
        return;
      }

      if (countries.length !== 1) return showMoreCountry(countries);

      showOneCountry(countries[0]);
    })
    .catch(() => {
      deleteAll();
      Notiflix.Notify.failure("Oops, there is no country with that name");
    });
}

function showMoreCountry(arrCountries) {
  const coutriesHTML = arrCountries.reduce((acc, { name, flags }) => {
    acc += `<li class='item'>
    <h2><img src="${flags.svg}"
   alt= 'прапор ${name.official} ' width='45' height='30'> ${name.official}</h2>
   </li>`;
    return acc;
  }, ``);
  bodyEl.style.backgroundImage = "none";
  divEl.innerHTML = "";
  ulEl.innerHTML = coutriesHTML;
}

function showOneCountry({ name, capital, population, flags, languages }) {
  bodyEl.style.backgroundImage = `url('${flags.svg}')`;
  bodyEl.style.backgroundSize = "cover";
  bodyEl.style.backgroundRepeat = "no-repeat";
  ulEl.innerHTML = "";
  divEl.innerHTML = ` 
   <h2 class='title'><img src="${flags.svg}"
   alt= 'прапор ${name.official} ' width='180' height='120'> ${
    name.official
  }</h2>
   <p>Capital: <span> ${capital} </span></p>
   <p>population:  <span> ${population} </span></p>
   <p>languages:  <span>${Object.values(languages).join(", ")} </span></p>`;
}

function deleteAll() {
  bodyEl.style.backgroundImage = "none";
  divEl.innerHTML = "";
  ulEl.innerHTML = "";
}
