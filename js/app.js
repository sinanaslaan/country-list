      // API Server //

      let allCountries = [];
      let totalPages = 0;
      let currentPage = 1;
      let itemsPerPage = 12;

        const loadCountryApi = async () => {
            const apiUrl = "https://restcountries.com/v3.1/all";

            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                allCountries = data;
                totalPages = Math.ceil(allCountries.length / itemsPerPage);
                displayCountries();
                filter();
                pagination();
            } catch (error) {
                console.log("Veriler Alınırken Hata Oluştu:", error);
            }
        };

            const displayCountries = (countries = allCountries) => {
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = Math.min(startIndex + itemsPerPage, allCountries.length);
                
                const countriesToShow = countries.slice(startIndex, endIndex);  
                   
                const countriesHTML = countriesToShow.map((country) => getCountry(country)).join("");

                const container = document.getElementById("country-item");
                container.innerHTML = countriesHTML;
                
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
                            <span id="region">${country.region}</span>
                        </div>
                        <div class="country__info-item">
                            <h3>Capital:</h3>
                            <span>${country.capital}</span>
                        </div>
                    </div>
                </div>
            `;
        };

        const debounce = (func, wait) => {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
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
          const regionSelect = document.getElementById("region");

          const applyFilters = () => {
              const searchValue = searchInput.value.toLowerCase();
              const selectedRegion = regionSelect.value.toLowerCase();

              const filteredCountries = allCountries.filter(country => {
                  const countryName = country.name.common.toLowerCase();
                  const countryRegion = country.region.toLowerCase();

                  const matchesSearch = countryName.includes(searchValue);
                  const matchesRegion = selectedRegion === 'all' || countryRegion === selectedRegion;

                  return matchesSearch && matchesRegion;
              });

              searchInput.addEventListener('input', () => {
                if (searchInput.value === '') {
                    currentPage = 1; 
                    displayCountries();
                    pagination();
                }
            });
              
              currentPage = 1;

              displayCountries(filteredCountries);
          };

          searchInput.addEventListener('input', applyFilters);
          regionSelect.addEventListener('change', applyFilters);
        };


// Filter //

// Pagination //
              const pagination = () => {
                const prevButton = document.getElementById('previous');
                const nextButton = document.getElementById('next');
                const pageCountElement = document.getElementById('page-numbers');

                const visibledPages = 5;

                const paginationCount = () => {
                    pageCountElement.innerHTML = ''; 

                    const startPage = Math.max(1, currentPage - Math.floor(visibledPages / 2));
                    const endPage = Math.min(totalPages, startPage + visibledPages - 1);

                    for (let i = startPage; i <= endPage; i++) {
                        const pageItem = document.createElement('li');
                        pageItem.textContent = i;
                        pageItem.className = i === currentPage ? 'active' : '';

                        pageItem.addEventListener('click', () => {
                            currentPage = i;
                            displayCountries();
                            paginationCount();
                        });

                        pageCountElement.appendChild(pageItem);
                    }
                };

                prevButton.addEventListener('click', () => {
                    if (currentPage > 1) {
                        currentPage--;
                        displayCountries();
                        paginationCount();
                    }
                });

                nextButton.addEventListener('click', () => {
                    if (currentPage < totalPages) {
                        currentPage++;
                        displayCountries();
                        paginationCount();
                    }
                });

                paginationCount();
              };


// Pagination //
loadCountryApi();
lightMode();

