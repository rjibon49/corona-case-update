// GET COVID INFO

const getCovidInfo = async() => {
    const url = `https://api.covid19api.com/summary`;
    const res = await fetch(url);
    const data = await res.json();
     console.log(data);
    displayCovidData(data);
}
getCovidInfo();

// DOM ELEMENTS

const newConfirmed = document.getElementById('new-confirm');
const newDeath = document.getElementById('new-death');
const totalConfirmed = document.getElementById('total-confirm');
const totalDeath = document.getElementById('total-death');
const countryContainer = document.getElementById('country-container');
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

            // SET SINGLE COUNTRY DATA

            const countryDiv = document.createElement('div');
            const classes = ['col-md-10', 'col-md-8', 'col-lg-3'];
            countryDiv.classList.add(...classes);
            countryDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${country.Country}</h5>
                    <p class="card-text m-0 fw-bold"> Total Case: ${country.TotalConfirmed}</p>
                    <p class="card-text m-0 fw-bold"> Total Death: ${country.TotalDeaths}</p>
                    
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary btn-sm mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    More Details
                    </button>

                    <!-- Modal -->
                    <div class="modal  fade" id="exampleModal" tabindex="-1"        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title" id="exampleModalLabel">Name: ${country.Country}</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p class="card-text m-0 fw-bold"> New Case: ${country.NewConfirmed}</p>
                                    <p class="card-text m-0 fw-bold"> New Death: ${country.NewDeaths}</p>
                                    <p class="card-text m-0 fw-bold"> Total Case: ${country.TotalConfirmed}</p>
                                    <p class="card-text m-0 fw-bold"> Total Death: ${country.TotalDeaths}</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            countryContainer.appendChild(countryDiv);
        };
    }catch (err) {
        console.log(err);
    }
}

// COUNTRY SELECT EVENT HANDLER



/**
 * country select event handler
 */
 $('#country-selector').on('select2:select', async(event) => {
    const url = 'https://api.covid19api.com/summary';
    try {
        const res = await fetch(url);
        const resData = await res.json();
        const searchedCountry = event.params.data.id;
        console.log(searchedCountry);
        if ('all-countries' !== searchedCountry) {
            countryContainer.innerHTML = '';
            const countrySingleDiv = document.createElement('div');
            const classes = ['col-sm-10', 'col-md-8', 'col-lg-8'];
            countrySingleDiv.classList.add(...classes);
            const selectedCountry = [];
            for (const country of resData.Countries) {
                if (country.Slug.indexOf(searchedCountry) != -1) {
                    selectedCountry.push(country);
                }
            }
            countrySingleDiv.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${selectedCountry[0].Country}</h5>
                        <p class="card-text m-0"> New Case: ${selectedCountry[0].NewConfirmed}</p>
                        <p class="card-text m-0"> New Death: ${selectedCountry[0].NewDeaths}</p>
                        <p class="card-text m-0"> Total Case: ${selectedCountry[0].TotalConfirmed}</p>
                        <p class="card-text m-0"> Total Death: ${selectedCountry[0].TotalDeaths}</p>
                    </div>
                </div>
        `;
            countryContainer.appendChild(countrySingleDiv);
        } else {
            countryContainer.innerHTML = '';
            getCovidInfo();
        }
        // console.log(selectedCountry[0]);
    } catch (err) {
        console.log(err);
    }
});


                    // <p class="card-text m-0"> New Case: ${country.NewConfirmed}</p>
                    // <p class="card-text m-0"> New Death: ${country.NewDeaths}</p>