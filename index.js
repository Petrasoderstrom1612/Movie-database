// https://www.omdbapi.com/ documentation
// http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchedWord} all movies with the key word (not much data about each film)
// https://www.omdbapi.com/?apikey=${API_KEY}&t=ahoj specific movie by title
// https://www.omdbapi.com/?apikey=${API_KEY}&i=tt12968102 specific movie by imdbID

import { API_KEY } from "./config.js";
const searchBtn = document.getElementById("search-btn")
const moviesResult = document.getElementById("movies-result")

let searchedWord = "ahoj"
let arrOfSearchedMovies = []
let searchedMoviesHTML = ""


const displayMovies = async () => {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchedWord}`) 
    const data = await res.json()
    console.log(data)
    let moviesArr = data.Search
    arrOfSearchedMovies = moviesArr.map(oneMovie => oneMovie.imdbID);
    moviesResult.innerHTML = arrOfSearchedMovies
    console.log(arrOfSearchedMovies)

    for (let i=0; i< arrOfSearchedMovies.length; i++){
        console.log(arrOfSearchedMovies[i])

        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${arrOfSearchedMovies[i]}`);
        const data = await res.json();
            console.log("the individual movie", data)
            console.log(data.Title, data.imdbRating)

            searchedMoviesHTML += `
            <div>
            <p>${data.Title}</p>
            <p>${data.imdbRating}</p>
            <img src=${data.Poster} alt=${data.Title}/>
            </div>
            `
        console.log(searchedMoviesHTML)    
        
    }
    moviesResult.innerHTML = searchedMoviesHTML
     



}
searchBtn.addEventListener("click", displayMovies)

