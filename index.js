const searchBtn = document.getElementById("search-btn")
const moviesResult = document.getElementById("movies-result")

let searchedWord = "hor"


const displayMovies = async () => {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchedWord}`) 
    const data = await res.json()
    console.log(data)
    const returnedmovies = data.Search.map(oneMovie => {
       return `
        <div>
        <h2>${oneMovie.Title}</h2>
        
        </div>
        `
    }).join("")
    moviesResult.innerHTML = returnedmovies
}
searchBtn.addEventListener("click", displayMovies)

