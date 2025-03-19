const wishedMoviesList = document.getElementById("wished-movies-list")


let watchlistMovies = JSON.parse(localStorage.getItem("watchlistMovies")) || []
console.log("watchlistMovies", watchlistMovies);


document.addEventListener("DOMContentLoaded", () => {
    if (watchlistMovies.length > 0){
        renderWishlist(watchlistMovies)
    }
})


const renderWishlist = (watchlistMovies) => {
    
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
        <button class="watchlist-btn" data-watchlist-removal="${oneSearchedMovie.imdbID}"><span class="plus-icon" data-watchlist-removal="${oneSearchedMovie.imdbID}">-</span>Watchlist</button>
        </div>
        <div>
        <p class="movie-plot">${oneSearchedMovie.Plot}</p>
        </div>
        </div>
        </div>
        `
    }).join("") 
    
    wishedMoviesList.innerHTML = watchlistmoviesHTML    
}

document.addEventListener("click", (e) => { 
    if (e.target.dataset.watchlistRemoval) {  // Check if clicked element has dataset attribute
        const movieToRemove = e.target.dataset.watchlistRemoval;

        watchlistMovies = watchlistMovies.filter((oneMovie) => oneMovie.imdbID !== movieToRemove);

        localStorage.setItem("watchlistMovies", JSON.stringify(watchlistMovies));
        renderWishlist(watchlistMovies);
        console.log("Updated watchlist:", watchlistMovies);
    }
});