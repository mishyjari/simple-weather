console.log('Public JS Script loaded');

// Send search query to /weather using url query, populat DOM with response
const search = query => {
    fetch(`/weather?address=${query}`)
    .then( res => res.json() )
    .then( json => {
        const el = document.getElementById('forecast');
        el.innerText = json.error ? json.error : json.forecast;
    });
};

// Submit Event Listener for Search form
const searchForm = document.getElementById('search');
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    search(e.target.query.value)
});

// Default to user's current location if location services is enabled.
navigator.geolocation.getCurrentPosition(({ coords }={}) => {
    const { latitude, longitude } = coords;
    search(`${longitude},${latitude}`)
})
