const refs = {
  targetInput: document.getElementById("name-input"),
  fetchContainer: document.getElementById("fetch-container"),
};
import templateOne from "./template/templateByOneCountry.hbs";
import templateList from "./template/templateByListCountry.hbs";
import "./styles.css";
import "@pnotify/core/dist/BrightTheme.css";
import CountriesApiService from "./fetchCountries";
const { error } = require("@pnotify/core");
const debounce = require("lodash.debounce");
const countriesApiService = new CountriesApiService();
refs.targetInput.addEventListener("input", debounce(onInputChange, 500));

function onInputChange(event) {
  console.log(event.target.value);
  countriesApiService.query = event.target.value;
  refs.fetchContainer.innerHTML = "";

  countriesApiService
    .fetchCountries()
    .then((data) => {
      if (data.status === 404) {
        throw error({
          text: "No country has been found. Please enter a more specific query!",
        });
      } else if (data.length > 10) {
        error({
          text: "Too many matches found. Please enter a more specific query!",
        });
      } else if (data.length >= 2 && data.length <= 10) {
        const markup = templateList(data);
        refs.fetchContainer.insertAdjacentHTML("afterbegin", markup);
      } else if (event.target.value === "") {
        refs.fetchContainer.innerHTML = "";
      } else {
        const markup = templateOne(data);
        refs.fetchContainer.insertAdjacentHTML("afterbegin", markup);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
