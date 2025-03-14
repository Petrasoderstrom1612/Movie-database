import { watchlistMovies } from './index.js';

// Now you can use watchlistMovies here
console.log("watchlistMovies", watchlistMovies);


const watchlistmoviesHTML = watchlistMovies.map((oneSearchedMovie) =>{
    return `
    <div class="flex one-searched-movie">
        <div class="movie-img-div">
            <img class="movie-img" src="${oneSearchedMovie.Poster}" alt="Poster image for movie ${oneSearchedMovie.Title}"/>
        </div>
        <div class="movie-text-div">
            <div class="flex">
                <h2>${oneSearchedMovie.Title}</h2>
                <h3 class="rading"><span><i class="fa-solid fa-star star"></i></span>${oneSearchedMovie.imdbRating}</h3>
            </div>
            <div class="flex movie-details">
                <p>${oneSearchedMovie.Runtime}</p>
                <p>${oneSearchedMovie.Genre}</p>
                <button class="watchlist-btn" data-watchlist-addition="${oneSearchedMovie.imdbID}"><span class="plus-icon" data-watchlist-addition="${oneSearchedMovie.imdbID}">-</span>Watchlist</button>
            </div>
            <div>
                <p class="movie-plot">${oneSearchedMovie.Plot}</p>
            </div>
        </div>
    </div>
    `
}).join("") 

wishedMoviesList.innerHTML = watchlistmoviesHTML
