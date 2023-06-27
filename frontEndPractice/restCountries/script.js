const BASE_URL = "https://restcountries.com/v3.1/";

//GETTERS
const countryContainerDiv = document.querySelector(".country-container");
const regionbutton = document.querySelector(".dropdown-btn");
const regiondropDown = document.querySelector("#dropdown-list");
const searchInput = document.querySelector(".main-search");

//SETTERS
regionbutton.addEventListener("click", () => {
  regiondropDown.classList.toggle("hide");
});

regiondropDown.addEventListener("click", (e) => {
  let region = e.target.innerText;

  let regionurl = BASE_URL + `region/${region}`;

  clearCountryDiv();

  getCountries(regionurl)
    .then((data) => {
      addCountries(data);
    })
    .catch((err) => console.log(err));
  regiondropDown.classList.toggle("hide");
});

searchInput.addEventListener("change", () => {
  clearCountryDiv();
  let search = searchInput.value;
  let searchurl = BASE_URL + `name/${search}`;

  getCountries(searchurl)
    .then((data) => {
      addCountries(data);
    })
    .catch((err) => console.log(err));
});

//FUNCTIONS
const getCountries = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

/* Takes x amount of countries and calls createCountry on each */
const addCountries = (countries) => {
  countries.forEach((country) => {
    if (country.name.common !== undefined) {
      createCountry(country);
    }
  });
};

/* Takes a country object
  appends the country div onto page
*/
const createCountry = (country) => {
  let div = document.createElement("div");
  div.classList.add("country");
  let img = document.createElement("img");
  img.src = country.flags.png;
  div.append(img);
  countryContainerDiv.append(div);
  let h1 = document.createElement("h1");
  h1.innerText = `${country.name.common}`;
  div.append(h1);

  let popText = document.createElement("p");
  let popSpan = document.createElement("span");
  popSpan.classList.add("country-bold");
  popSpan.innerText = "Population:";
  popText.append(popSpan);
  popText.append(country.population);
  div.append(popText);

  let regText = document.createElement("p");
  let regSpan = document.createElement("span");
  regSpan.classList.add("country-bold");
  regSpan.innerText = "Region:";
  regText.append(regSpan);
  regText.append(country.region);
  div.append(regText);

  let capText = document.createElement("p");
  let capSpan = document.createElement("span");
  capSpan.classList.add("country-bold");
  capSpan.innerText = "Capital:";
  capText.append(capSpan);
  capText.append(country.capital);
  div.append(capText);
};

const clearCountryDiv = () => {
  while (countryContainerDiv.firstChild) {
    countryContainerDiv.removeChild(countryContainerDiv.firstChild);
  }
};

//CALLS
/* Initial Load calling getCountries */
getCountries(BASE_URL + "all?fields=name,population,capital,region,flags")
  .then((data) => {
    addCountries(data);
  })
  .catch((err) => {
    console.log(err);
  });
