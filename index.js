// https://www.omdbapi.com/ documentation
// http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchedWord} all movies with the key word (not much data about each film)
// https://www.omdbapi.com/?apikey=${API_KEY}&t=ahoj specific movie by title
// https://www.omdbapi.com/?apikey=${API_KEY}&i=tt12968102 specific movie by imdbID

import { API_KEY } from "./config.js";
const searchBtn = document.getElementById("search-btn")
const moviesResult = document.getElementById("movies-result")

let searchedWord = "love"
let searchedMoviesArrShort = []
let searchedMoviesArrAllData = []
export let watchlistMovies = []


const displayMovies = async () => {
    //extract the imdbID from each movie as this api anrop include very little data about each movie
    const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchedWord}`) 
    const data = await res.json()
    console.log(data)
    let moviesArr = data.Search
    searchedMoviesArrShort = moviesArr.map(oneMovie => oneMovie.imdbID);
    moviesResult.innerHTML = searchedMoviesArrShort
    console.log("array of searched movies with little data",searchedMoviesArrShort)

    //use the extracted imbdID to create a new array with movies that include all data
    for (let i=0; i< searchedMoviesArrShort.length; i++){
        console.log(searchedMoviesArrShort[i])

        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${searchedMoviesArrShort[i]}`);
        const data = await res.json();
            console.log("one movie full data", data)
            searchedMoviesArrAllData.push(data) 
    }
    console.log("final array with searched movies with all data", searchedMoviesArrAllData)

    //create html with the new array with movies that include all data
    const searchedMoviesHTML = searchedMoviesArrAllData.map((oneSearchedMovie) =>{
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
                    <button class="watchlist-btn" data-watchlist-addition="${oneSearchedMovie.imdbID}"><span class="plus-icon" data-watchlist-addition="${oneSearchedMovie.imdbID}">+</span>Watchlist</button>
                </div>
                <div>
                    <p class="movie-plot">${oneSearchedMovie.Plot}</p>
                </div>
            </div>
        </div>
        `
    }) 
  
    moviesResult.innerHTML = searchedMoviesHTML.join("")       
}
searchBtn.addEventListener("click", displayMovies)

document.addEventListener("click",(e) => { // LISTENERS ON ICON CLICKS VIA DATASET
    for (let wishedMoviefromArrAllData of searchedMoviesArrAllData){
        if(e.target.dataset.watchlistAddition === wishedMoviefromArrAllData.imdbID){
            console.log(wishedMoviefromArrAllData.imdbID)
            watchlistMovies.push(wishedMoviefromArrAllData)
            console.log(watchlistMovies)
        }
    }
})        

// local storage so that my watchlist stays across rerendering
// debug if the id is already included in the wishedMoviefromArrAllData do not add it again
// add real input instead of the hardcoded word love