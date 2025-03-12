const searchBtn = document.getElementById("search-btn")


const displayMovies = async () => {
    const res = await fetch(`http://www.omdbapi.com/?apikey=217fbd44&t=titanic`) 
    const data = await res.json()
    console.log(data)
}
searchBtn.addEventListener("click", displayMovies)