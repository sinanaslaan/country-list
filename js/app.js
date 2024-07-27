const loadCountryApi = () => {
  const apiUrl = "https://restcountries.com/v3.1/all";

  fetch(apiUrl)
  .then(res => res.json())
  .then(data => displayCountries(data))
};

const displayCountries = countries => {
  const countriesHTML = countries.map(countryItems => getCountry(countryItems))
  const container = document.getElementById('country-item');
  container.innerHTML = countriesHTML.join('');
};

const getCountry = (country) => {
  return`
    <div class="country__item">
      <img src="${country.flags.png}" alt="${country.name.common}">
      <div class="country__info">
        <div class="country__info-item">
          <h2>${country.name.common}</h2>
        </div>
        <div class="country__info-item">
          <h3>Population:</h3>
          <span>${country.population}</span>
        </div>
        <div class="country__info-item">
          <h3>Region:</h3>
          <span>${country.region}</span>
        </div>
        <div class="country__info-item">
          <h3>Capital:</h3>
          <span>${country.capital}</span>
        </div>
      </div>
    </div>
  `;
};


loadCountryApi();