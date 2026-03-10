const API_KEY = "5b9d1da62aec1f44e95dd54353578dc0"

const API_URL =
"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" + API_KEY

const IMG_PATH = "https://image.tmdb.org/t/p/w500"

const container = document.getElementById("movie-container")

getMovies(API_URL)

function getMovies(url){

fetch(url)
.then(res => res.json())
.then(data => {

showMovies(data.results)

})

}

function showMovies(movies){

container.innerHTML = ""

movies.forEach(movie => {

const {title, poster_path, vote_average} = movie

const div = document.createElement("div")
div.classList.add("movie")

div.innerHTML = `
<img src="${IMG_PATH + poster_path}">
<div class="movie-info">
<h3>${title}</h3>
<span>⭐${vote_average}</span>
</div>

<button onclick="watchTrailer('${title}')">▶ Watch Trailer</button>
`

container.appendChild(div)

})

}
const SEARCH_URL =
"https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query="

const search = document.getElementById("search")

search.addEventListener("keyup", function(e){

const movie = e.target.value

if(movie){
    getMovies(SEARCH_URL + movie)
}
else{
    getMovies(API_URL)
}

})
function watchTrailer(title){

let url = "https://www.youtube.com/results?search_query=" + title + " trailer"

window.open(url)

}