const refs = {
  targetInput: document.getElementById("name-input"),
  fetchContainer: document.getElementById("fetch-container"),
};
import templateOne from "./template/templateByOneCountry.hbs";
import templateList from "./template/templateByListCountry.hbs";
import "./styles.css";
import "@pnotify/core/dist/BrightTheme.css";

const { error } = require("@pnotify/core");
const debounce = require("lodash.debounce");

refs.targetInput.addEventListener("input", debounce(onInputChange, 500));

function onInputChange(event) {
  let inputValue = event.target.value;
  refs.fetchContainer.innerHTML = "";
  console.log(inputValue);
  const base_url = `https://restcountries.com/v2/name/`;

  let params = `${inputValue}`;
  let url = base_url + params;
  fetch(url)
    .then((result) => {
      console.log(result);

      return result.json();
    })
    .then((data) => {
      console.log(data);
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
      } else if (inputValue === "") {
        refs.fetchContainer.innerHTML = "";
      } else {
        const markup = templateOne(data);
        refs.fetchContainer.insertAdjacentHTML("afterbegin", markup);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
}
