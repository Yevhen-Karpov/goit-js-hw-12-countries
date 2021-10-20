// let endPoint = `name/`;

export default {
  searchCountry(value) {
    const base_url = `https://restcountries.com/v2/name/`;
    let params = `${value}`;
    let url = base_url + params;
    fetch(url).then((result) => {
      console.log(result);
      return result.json();
    });
  },
};
