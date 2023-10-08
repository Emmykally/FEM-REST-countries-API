'use strict';

const searchEl = document.querySelector('#search-country');
const countryContainer = document.querySelector('#country-container');
// const backButton = document.querySelector('#back-button');
const countryDetailsSection = document.querySelector('#country-details');
const flagDisplaySection = document.querySelector('#flag-display');
const filterRegion = document.querySelector('#filter');
const darkBtn = document.querySelector('#dark-mode');
const headerText = document.querySelector('#header-text');
const detailsContainer = document.querySelector('#country-details');

// COUNTRY HTML
const renderHtml = function (country) {
  const html = `<div class=" shadow-xl w-full md:w-64 pb-8 bg-dmtlme" data-country-name="${
    country.name.common
  }">
  <div class="w-full h-3/5">
    <img src="${country.flags.png}" alt="country flag" class="w-full h-full" />
  </div>

  <h3 class="country py-3 text-xl font-extrabold pl-4">${
    country.name.common
  }</h3>
  <p class="font-bold pl-4">
    Population: <span class="font-normal">${country.population.toLocaleString()}</span>
  </p>
  <p class="font-bold pl-4">
    Region: <span class="font-normal">${country.region}</span>
  </p>
  <p class="font-bold pl-4">
    Capital: <span class="font-normal">${country.capital}</span>
  </p>
</div>`;
  countryContainer.insertAdjacentHTML('beforeend', html);

  const countryBox = countryContainer.querySelector(
    `[data-country-name="${country.name.common}"]`
  );
  countryBox.addEventListener('click', function (e) {
    const clickedCountryName = countryBox.getAttribute('data-country-name');
    console.log(clickedCountryName);
    clickedCountryBox(clickedCountryName);
  });
};

const clickedCountryBox = async function (countryName) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const [data] = await response.json();

    //  function to dynamically get the native name
    function getOfficialNativeName(native) {
      const langCodes = Object.keys(native.nativeName);
      const langCode = langCodes[0]; // Get the first language code

      return langCode ? native.nativeName[langCode].official : null;
    }
    // function getOfficialNativeName(native) {
    //   for (const langCode in native.nativeName) {
    //     if (native.nativeName.hasOwnProperty(langCode)) {
    //       return native.nativeName[langCode].official;
    //     }
    //   }
    //   return null; // Return null if no official name is found
    // }

    //GET COUNTRIES CURRENCY
    const officialNativeName = getOfficialNativeName(data.name);
    function getCurrency(money) {
      const currency = Object.keys(money.currencies);
      const countryCurrency = currency;
      return countryCurrency ? money.currencies[countryCurrency].name : null;
    }
    const officialCurrencyName = getCurrency(data);

    //GET COUNTRY LANGUAGES
    function getLanguage(lang) {
      const language = Object.keys(lang.languages);
      const countryLanguage = language[0];
      return countryLanguage ? lang.languages[countryLanguage] : null;
    }
    const officialLanguage = getLanguage(data);
    const html = `
    <div>
          <button class="px-8 py-1 bg-lmi mb-4" id="back-button" data-back-btn>Back</button>

          <div class="flex md:flex-row flex-col items-center">
            <div class="w-full md:w-1/2">
              <img
                src="${data.flags.png}"
                alt="country flag"
                class="w-full h-2/3"
              />
            </div>
            <div class="h-1/2">
              <h3 class="py-3 text-4xl font-extrabold md:pl-4">${
                data.name.common
              }</h3>

              <div class="flex md:flex-row flex-col justify-center">
                <div>
                  <p class="font-bold md:pl-4 py-2 md:py-1">
                    Native Name: <span class="font-normal">${officialNativeName}</span>
                  </p>
                  <p class="font-bold md:pl-4 py-2 md:py-1">
                    Population: <span class="font-normal">${data.population.toLocaleString()}</span>
                  </p>
                  <p class="font-bold md:pl-4 py-2 md:py-1">
                    Region: <span class="font-normal">${data.region}</span>
                  </p>
                  <p class="font-bold md:pl-4 py-2 md:py-1">
                    Sub Region: <span class="font-normal">${
                      data.subregion
                    }</span>
                  </p>
                  <p class="font-bold md:pl-4 py-2 md:py-1">
                    Capital: <span class="font-normal">${data.capital}</span>
                  </p>
                </div>
                <div class="mt-8 md:mt-0">
                  <p class="font-bold md:pl-4 py-2 md:py-1">
                    Top Level Domain: <span class="font-normal">${
                      data.tld
                    }</span>
                  </p>
                  <p class="font-bold md:pl-4 py-2 md:py-1">
                    Currencies: <span class="font-normal">${officialCurrencyName}</span>
                  </p>
                  <p class="font-bold md:pl-4 py-2 md:py-1">
                    Languages:
                    <span class="font-normal">${officialLanguage}</span>
                  </p>
                </div>
              </div>
              <div class="flex md:flex-row flex-col mt-8 md:mt-16">
                <div>
                  <p class="font-bold md:pl-4">Border Countries:</p>
                </div>

                <div class="flex">
                  <p class="font-normal px-4 py-1 shadow-lg cursor-pointer">
                    ${data.borders[0]}
                  </p>
                  <p class="font-normal px-4 py-1 shadow-lg cursor-pointer">
                  ${data.borders[1]}
                  </p>
                  <p class="font-normal px-4 py-1 shadow-lg cursor-pointer">
                  ${data.borders[2]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
    countryContainer.innerHTML = '';
    flagDisplaySection.classList.add('hidden');
    detailsContainer.classList.remove('hidden');
    detailsContainer.insertAdjacentHTML('beforeend', html);
    console.log(html);
    console.log(data);

    const backButton = detailsContainer.querySelector(`[data-back-btn]`);
    const goBack = document.querySelector('#back-button');
    backButton.addEventListener('click', function (e) {
      // if (flagDisplaySection.classList.contains('hidden')) {

      // }
      detailsContainer.classList.add('hidden');
      flagDisplaySection.classList.remove('hidden');
      renderAllCountries();
      detailsContainer.innerHTML = '';
    });
  } catch (err) {
    console.error(err);
  }
};

//rendering all the countries
const renderAllCountries = async function () {
  try {
    const country = await fetch(`https://restcountries.com/v3.1/all`);
    if (!country.ok) throw new error('Country not Found');

    const countryData = await country.json();
    // sorting the countries alphabetically
    const sortedCountries = countryData
      .slice()
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
    // console.log(sortedCountries);

    sortedCountries.forEach(eachCountry => {
      // render all countries HTML
      renderHtml(eachCountry);
    });
  } catch (err) {
    console.error(err);
  }
};
renderAllCountries();

// DISPLAYING COUNTRIES BY REGIONS
filterRegion.addEventListener('change', async function (e) {
  // Extract the selected value from the event
  const selectedValue = e.target.value;

  // clear the previous data from the container before making the next fetch
  countryContainer.innerHTML = '';
  // Call your API function with the selected value as a parameter
  try {
    const data = await fetchData(selectedValue);
  } catch (error) {
    console.error('my error', error);
  }
});

// Async function to make the API call with a parameter
async function fetchData(selectedValue) {
  const url = `https://restcountries.com/v3.1/region/${selectedValue}`;
  const regionCountry = await fetch(url);
  if (!regionCountry.ok) throw new Error('API request failed');

  const regionData = await regionCountry.json();

  const sortedRegions = regionData
    .slice()
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  sortedRegions.forEach(eachRegion => {
    // render the regions
    renderHtml(eachRegion);
  });
  console.log(sortedRegions);
  // return sortedRegions;
}

// DARK MODE THEME
darkBtn.addEventListener('click', function () {
  console.log('i am batman');
});

//FILTERING COUNTRY BY SEARCH
const searchCountry = async function (search) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${search}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const displayResults = function (results) {
  countryContainer.innerHTML = '';

  if (results === '') {
    countryContainer.innerHTML = 'No results found.';
  } else {
    renderHtml(results);
    //   const html = `<div class="shadow-xl w-full md:w-64 pb-8 bg-dmtlme">
    //   <div class="w-full h-3/5">
    //     <img src="${
    //       results.flags.png
    //     }" alt="country flag" class="w-full h-full" />
    //   </div>

    //   <h3 class="py-3 text-xl font-extrabold pl-4">${results.name.common}</h3>
    //   <p class="font-bold pl-4">
    //     Population: <span class="font-normal">${results.population.toLocaleString()}</span>
    //   </p>
    //   <p class="font-bold pl-4">
    //     Region: <span class="font-normal">${results.region}</span>
    //   </p>
    //   <p class="font-bold pl-4">
    //     Capital: <span class="font-normal">${results.capital}</span>
    //   </p>
    // </div>`;
    //   countryContainer.insertAdjacentHTML('beforeend', html);
  }
};

searchEl.addEventListener('keydown', async function (e) {
  if (e.key === 'Enter') {
    const searchTerm = searchEl.value;
    if (searchTerm) {
      const [apiData] = await searchCountry(searchTerm);
      displayResults(apiData);
    }
  }
});
