// GET COVID INFO

const getCovidInfo = async() => {
    const url = `https://api.covid19api.com/summary`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    displayCovidData(data);
}
getCovidInfo();

// DOM ELEMENTS

const newConfirmed = document.getElementById('new-confirm');
const newDeath = document.getElementById('new-death');
const totalConfirmed = document.getElementById('total-confirm');
const totalDeath = document.getElementById('total-death');

const countrySelector = document.getElementById('country-selector');

// DISPLAY COVID DATA

const displayCovidData = async(data) => {
    try {
        const global = await data.Global;
        const countries = await data.Countries;

        // Global Data Implement
        
        newConfirmed.innerText = global.NewConfirmed;
        newDeath.innerText = global.NewDeaths;
        totalConfirmed.innerText = global.TotalConfirmed;
        totalDeath.innerText = global.TotalDeaths;
        // console.log(global);
        console.log(countries);
        // Country Data Implement
        // for ( country of countries) {
        //     const option = document.get
        // }
        for ( country of countries ) {
            const option = document.createElement('option');
            option.setAttribute('value', country.Slug);
            option.innerText = country.Country;
            
            countrySelector.appendChild(option);
        };
    }catch (err) {
        console.log(err);
    }
}