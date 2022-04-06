const API_KEY = 'api_key=6aa6341dcf5f1253aaac1f6457fb9e09';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
    console.log(data.results);
    showMovies(data.results);    
    })
}

function showMovies(data) {
    main.innerHTML = "";

    data.forEach(movie => {
        const {title, poster_path, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        
        <img class="movie-img" src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
        </div>

        <div class="overview">
            <h3>Overview</h3> 
            ${overview}  
        </div>
        
        `
        main.appendChild(movieEl);
    })
        

}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(searchURL + "&query=" + searchTerm)
    } else{
        getMovies(API_URL);
    }
})