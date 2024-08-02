      // API Server //

      const loadCountryApi = () => {
        const apiUrl = "https://restcountries.com/v3.1/all";

        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => displayCountries(data));
          
      };
      

      const displayCountries = (countries) => {
        const countriesHTML = countries.map((countryItems) =>
          getCountry(countryItems)
        );
        const container = document.getElementById("country-item");
        container.innerHTML = countriesHTML.join("");
        filter();
      };

      const getCountry = (country) => {
        return `
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

      // API Server //

      // Light Mode //


      const lightMode = () => {

        const toggleButton = document.getElementById("mode-toggle");
        const classNames = ["header", "filter", "body", "country__info"];
        const noClassTag = ["img", "form", "i", "input", "select", "button"];
        
        toggleButton.addEventListener("click", () => {
          
          classNames.forEach((className) => {
            const addSelect = document.querySelectorAll(`.${className}`);
            addSelect.forEach((classMode) => {  
              classMode.classList.toggle("light-mode");
            });
          });

          noClassTag.forEach((tags) => {
            const addTags = document.querySelectorAll(tags);
            addTags.forEach((tagsMode) => {
              tagsMode.classList.toggle("light-mode");
            });
          });

        });

      };

// Light Mode //

// Filter //

      const filter = () => {

        const searchInput = document.getElementById("search");
        const searchResults = document.querySelectorAll('.country__item');
        
          searchInput.addEventListener('input', (event) => {
            const filters = event.target.value.toLowerCase();
            
            searchResults.forEach(item => {
              const countryName = item.querySelector('h2').textContent.toLowerCase();

              if (countryName.includes(filters)) {
                item.style.display = 'block';
              }
              else {
                item.style.display = 'none';
              }
        
            });
          });
      };

// Filter //

lightMode();
loadCountryApi();
