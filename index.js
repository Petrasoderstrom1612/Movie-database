// https://www.omdbapi.com/ documentation
// http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchedWord} all movies with the key word (not much data about each film)
// https://www.omdbapi.com/?apikey=${API_KEY}&t=ahoj specific movie by title
// https://www.omdbapi.com/?apikey=${API_KEY}&i=tt12968102 specific movie by imdbID

import { API_KEY } from "./config.js";
const searchBtn = document.getElementById("search-btn")
const moviesResult = document.getElementById("movies-result")
const searchInput = document.getElementById("search-input")

let searchedWord = ""
let searchedMoviesArrShort = []

let watchlistMovies = JSON.parse(localStorage.getItem("watchlistMovies")) || [] //you need to introduce local storage with or empty array to avoid errors, it wants to load a state so either declare empty array of the array with data
let searchedMoviesArrAllData = JSON.parse(localStorage.getItem("searchedMoviesArrAllData")) || []

document.addEventListener("DOMContentLoaded", () => {
    if (searchedMoviesArrAllData.length > 0){
        renderMovies(searchedMoviesArrAllData,watchlistMovies)
    }
})

searchBtn.addEventListener("click",() =>{
    assignSearchWord()
    if (searchInput.value){
        if (searchedWord){
        displayMovies()
        searchInput.value = ""
        }
    }
})

const assignSearchWord = () => {
    searchedWord = searchInput.value
}

document.addEventListener("DOMContentLoaded", () => {
    if(searchedMoviesArrAllData.length > 0){
        renderMovies(searchedMoviesArrAllData, watchlistMovies)
    }
})

const renderMovies = (searchedMoviesArrAllData, watchlistMovies) =>{
    //create html with the new array with movies that include all data
    const searchedMoviesHTML = searchedMoviesArrAllData.map((oneSearchedMovie) =>{
        let addToWishList = `<button class="watchlist-btn to-be-added" data-watchlist-addition="${oneSearchedMovie.imdbID}"><span class="plus-icon" data-watchlist-addition="${oneSearchedMovie.imdbID}">+</span>Watchlist</button>`
        let removeFromWishList = `<button class="watchlist-btn to-be-added" data-watchlist-addition="${oneSearchedMovie.imdbID}"><span class="minus-icon" data-watchlist-addition="${oneSearchedMovie.imdbID}">-</span>Remove</button>`

        let watchlistBtn = Array.isArray(watchlistMovies) && watchlistMovies.some(watchlistMovie => watchlistMovie.imdbID === oneSearchedMovie.imdbID) ?  removeFromWishList : addToWishList

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
                    ${watchlistBtn}
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

const displayMovies = async () => {
    try {
    //extract the imdbID from each movie as this api anrop include very little data about each movie
    const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchedWord}`) 
    const data = await res.json()
    console.log(data)
    let moviesArr = data.Search
    searchedMoviesArrShort = moviesArr.map(oneMovie => oneMovie.imdbID);
    moviesResult.innerHTML = searchedMoviesArrShort
    console.log("array of searched movies with little data",searchedMoviesArrShort)

    //use the extracted imbdID to create a new array with movies that include all data
    searchedMoviesArrAllData = []; //clear the previous search first

    for (let i=0; i< searchedMoviesArrShort.length; i++){
        console.log(searchedMoviesArrShort[i])

        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${searchedMoviesArrShort[i]}`);
        const data = await res.json();
            console.log("one movie full data", data)
            searchedMoviesArrAllData.push(data) 
    }

    localStorage.setItem("searchedMoviesArrAllData",JSON.stringify(searchedMoviesArrAllData))
    console.log("final array with searched movies with all data", searchedMoviesArrAllData)
    renderMovies(searchedMoviesArrAllData, watchlistMovies)
    } catch (error){
        console.error("error fetching movies", error)
    }
}


document.addEventListener("click",(e) => { // LISTENERS ON ICON CLICKS VIA DATASET
    for (let wishedMoviefromArrAllData of searchedMoviesArrAllData){
        if(e.target.dataset.watchlistAddition === wishedMoviefromArrAllData.imdbID){
            console.log(wishedMoviefromArrAllData.imdbID)
            if(!watchlistMovies.some(oneMovie => oneMovie.imdbID === wishedMoviefromArrAllData.imdbID)){
                watchlistMovies.unshift(wishedMoviefromArrAllData)
                localStorage.setItem("watchlistMovies", JSON.stringify(watchlistMovies));
                console.log("Updated watchlist:", watchlistMovies);
                // renderMovies(searchedMoviesArrAllData, watchlistMovies)
            } 
        }
    }
})        

// make the minus button change to plus directly after clicking on it on homepage, not that you need to go to watchlist and back
//change the numbers to looking for a movie that includes "bla bla"
//change to await Promise.all(moviePromises)
// add a link from the wishlist as a default to go to home and add movies if list is empty again
