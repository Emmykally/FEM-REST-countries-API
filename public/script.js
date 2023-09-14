'use script';

const searchEl = document.querySelector('#search-country');
const countryContainer = document.querySelector('#country-container');
const backButton = document.querySelector('#back-button');
const countryDetailsSection = document.querySelector('#country-details');
const flagDisplaySection = document.querySelector('#flag-display');
const filterRegion = document.querySelector('#filter');
const darkBtn = document.querySelector('#dark-mode');
const headerText = document.querySelector('#header-text');

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
// const renderSingleCountry = async function (country) {
//   try {
//     const myCountry = await fetch(
//       `https://restcountries.com/v3.1/name/${country}`
//     );
//     if (!myCountry.ok) throw new error('Country not Found');

//     const [myCountryData] = await myCountry.json();
//     // console.log(myCountryData);
//     const html = `<div class="shadow-xl w-full md:w-64 pb-8 bg-dmtlme">
//     <div class="w-full h-3/5 object-cover">
//       <img src="${
//         myCountryData.flags.png
//       }" alt="mexico flag" class="w-full h-full object-cover" />
//     </div>

//     <h3 class="py-3 text-xl font-extrabold pl-4">${
//       myCountryData.name.common
//     }</h3>
//     <p class="font-bold pl-4">
//       Population: <span class="font-normal">${myCountryData.population.toLocaleString()}</span>
//     </p>
//     <p class="font-bold pl-4">
//       Region: <span class="font-normal">${myCountryData.region}</span>
//     </p>
//     <p class="font-bold pl-4">
//       Capital: <span class="font-normal">${myCountryData.capital}</span>
//     </p>
//   </div>`;

//     countryContainer.insertAdjacentHTML('beforeend', html);
//   } catch (err) {
//     console.error(err);
//   }
// };
// renderSingleCountry(searchEl.value);

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
    const html = `<div class="shadow-xl w-full md:w-64 pb-8 bg-dmtlme">
      <div class="w-full h-3/5">
        <img src="${
          eachRegion.flags.png
        }" alt="country flag" class="w-full h-full" />
      </div>
  
      <h3 class="py-3 text-xl font-extrabold pl-4">${
        eachRegion.name.common
      }</h3>
      <p class="font-bold pl-4">
        Population: <span class="font-normal">${eachRegion.population.toLocaleString()}</span>
      </p>
      <p class="font-bold pl-4">
        Region: <span class="font-normal">${eachRegion.region}</span>
      </p>
      <p class="font-bold pl-4">
        Capital: <span class="font-normal">${eachRegion.capital}</span>
      </p>
    </div>`;

    countryContainer.insertAdjacentHTML('beforeend', html);
  });
  console.log(sortedRegions);
  // return sortedRegions;
}

// DARK MODE THEME
darkBtn.addEventListener('click', function () {
  console.log('i am batman');
});

// filterRegion.addEventListener('change', async event => {
//   // Extract the selected value from the event
//   const selectedValue = event.target.value;

//   // Call your API function with the selected value as a parameter
//   try {
//     const data = await fetchData(selectedValue);
//     // console.log('API Response:', data);
//   } catch (error) {
//     console.error('API Error:', error);
//   }
// });

// Async function to make the API call with a parameter
// async function fetchData(selectedValue) {
//   const url = `https:restcountries.com/v3.1/region/${selectedValue}`;

//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error('API request failed');
//   }

//   const data = await response.json();
//   return data;
// }
