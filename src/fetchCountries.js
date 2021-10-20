export default class CountriesApiService {
  constructor() {
    this.searchQuery = "";
  }
  fetchCountries() {
    const url = `https://restcountries.com/v2/name/${this.searchQuery}`;
    return fetch(url).then((result) => {
      console.log(result);

      return result.json();
    });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
