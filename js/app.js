      // API Server //

      let allCountries = [];
      let totalPages = 0;
      let currentPage = 1;
      let itemsPerPage = 12;
      let selectedRegion = 'all';
      let searchValue = '';

        const loadCountryApi = async () => {
            const apiUrl = "https://restcountries.com/v3.1/all";

            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                allCountries = data;
                totalPages = Math.ceil(allCountries.length / itemsPerPage);
                displayCountries();
                filter();
            } catch (error) {
                console.log("Veriler Alınırken Hata Oluştu:", error);
            }
        };

            const displayCountries = (countries = allCountries) => {
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = Math.min(startIndex + itemsPerPage, countries.length);
            
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
                const classNames = ["body"];
                const currentTheme = localStorage.getItem('theme');

                if (currentTheme) {
                    document.body.className = currentTheme;
                    toggleButton.checked = (currentTheme === 'light-mode');
                }
                else {
                    toggleButton.checked = false;
                }
                
                toggleButton.addEventListener("click", () => {

                    if (document.body.classList.contains('dark-mode')) {
                        document.body.className = 'light-mode';
                        localStorage.setItem('theme', 'light-mode');
                    } else {
                        document.body.className = 'dark-mode';
                        localStorage.setItem('theme', 'dark-mode');
                    }
                
                classNames.forEach((className) => {
                    const addSelect = document.querySelectorAll(`.${className}`);
                    addSelect.forEach((classMode) => {  
                    classMode.classList.toggle("light-mode");
                    });
                });

                });

            };

// Light Mode //

// Filter //

        const filter = () => {
            const searchInput = document.getElementById("search");
            const regionSelect = document.getElementById("region");

            const updateFilters = () => {
                searchValue = searchInput.value.toLowerCase();
                selectedRegion = regionSelect.value.toLowerCase();
                currentPage = 1;
                applyFilters();
            };

            searchInput.addEventListener('input', updateFilters);
            regionSelect.addEventListener('change', updateFilters);

        
            displayCountries();
            pagination(allCountries);
        };

        const applyFilters = () => {
            const filteredCountries = allCountries.filter(country => {
                const countryName = country.name.common.toLowerCase();
                const countryRegion = country.region.toLowerCase();
        
                const matchesSearch = countryName.includes(searchValue);
                const matchesRegion = selectedRegion === 'all' || countryRegion === selectedRegion;
        
                return matchesSearch && matchesRegion;
            });

            if (filteredCountries.length === 0) {
                document.getElementById('itemResults').style.display = 'block';
                document.getElementById('pagination').style.display = 'none';
            } else {
                document.getElementById('itemResults').style.display = 'none';
                document.getElementById('pagination').style.display = 'block';
            };

            totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
            currentPage = Math.min(currentPage, totalPages);
            
            displayCountries(filteredCountries);
        };


// Filter //

// Pagination //
            const pagination = (filteredCountries = allCountries) => {
                const prevButton = document.getElementById('previous');
                const nextButton = document.getElementById('next');
                const pageCountElement = document.getElementById('page-numbers');
                const visibledPages = 5;
                const selectBox = document.getElementById('region');
                const inputArea = document.getElementById('search');
                
                totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
                currentPage = Math.min(currentPage, totalPages);

                const buttonClickUpdate = () => {
                    prevButton.disabled = currentPage === 1;
                    nextButton.disabled = currentPage === totalPages;
                }

                const countReset = () => {
                    currentPage = Math.min(currentPage, totalPages);
                    paginationCount();
                    buttonClickUpdate();
                };

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
                            applyFilters();
                            paginationCount();
                            buttonClickUpdate();
                        });

                        pageCountElement.appendChild(pageItem);
                    }
                };

                prevButton.addEventListener('click', () => {
                    if (currentPage > 1) {
                        currentPage--;
                        applyFilters();
                        paginationCount();
                        buttonClickUpdate();
                    }
                });

                nextButton.addEventListener('click', () => {
                    if (currentPage < totalPages) {
                        currentPage++;
                        applyFilters();
                        paginationCount();
                        buttonClickUpdate();
                    }
                });

                inputArea.addEventListener('input', () => {
                    applyFilters();
                    countReset();
                })
                
                selectBox.addEventListener('change', () => {
                    applyFilters();
                    countReset();
                });

                paginationCount();
            };



// Pagination //
loadCountryApi();
lightMode();