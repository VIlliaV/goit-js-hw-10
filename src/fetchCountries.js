const ENDPOINT = `https://restcountries.com/v3.1/name/`;
const findParameters = `name,population,flags,languages,capital`;

function fetchCountries(nameCountry) {
  return fetch(`${ENDPOINT}${nameCountry}?fields=${findParameters}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

export { fetchCountries };
