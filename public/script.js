'use script';

const searchEl = document.querySelector('#search-country');
const countryContainer = document.querySelector('#country-container');
const backButton = document.querySelector('#back-button');

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
      const html = `<div class="shadow-xl w-full md:w-64 pb-8 bg-dmtlme">
    <div class="w-full h-3/5">
      <img src="${
        eachCountry.flags.png
      }" alt="country flag" class="w-full h-full" />
    </div>

    <h3 class="py-3 text-xl font-extrabold pl-4">${eachCountry.name.common}</h3>
    <p class="font-bold pl-4">
      Population: <span class="font-normal">${eachCountry.population.toLocaleString()}</span>
    </p>
    <p class="font-bold pl-4">
      Region: <span class="font-normal">${eachCountry.region}</span>
    </p>
    <p class="font-bold pl-4">
      Capital: <span class="font-normal">${eachCountry.capital}</span>
    </p>
  </div>`;
      countryContainer.insertAdjacentHTML('beforeend', html);
    });
  } catch (err) {
    console.error(err);
  }
};
renderAllCountries();

// testing data by rendering a single country first
const renderSingleCountry = async function (country) {
  try {
    const myCountry = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    if (!myCountry.ok) throw new error('Country not Found');

    const [myCountryData] = await myCountry.json();
    // console.log(myCountryData);
    const html = `<div class="shadow-xl w-full md:w-64 pb-8 bg-dmtlme">
    <div class="w-full h-3/5">
      <img src="${
        myCountryData.flags.png
      }" alt="mexico flag" class="w-full h-full" />
    </div>

    <h3 class="py-3 text-xl font-extrabold pl-4">${
      myCountryData.name.common
    }</h3>
    <p class="font-bold pl-4">
      Population: <span class="font-normal">${myCountryData.population.toLocaleString()}</span>
    </p>
    <p class="font-bold pl-4">
      Region: <span class="font-normal">${myCountryData.region}</span>
    </p>
    <p class="font-bold pl-4">
      Capital: <span class="font-normal">${myCountryData.capital}</span>
    </p>
  </div>`;

    countryContainer.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    console.error(err);
  }
};
// renderSingleCountry('nigeria');
