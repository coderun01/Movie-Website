const API_KEY = "5b9d1da62aec1f44e95dd54353578dc0";

const API_URL =
"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key="+API_KEY;

const IMG_PATH =
"https://image.tmdb.org/t/p/w500";

const SEARCH_URL =
"https://api.themoviedb.org/3/search/movie?api_key="+API_KEY+"&query=";

const TRENDING_API =
"https://api.themoviedb.org/3/trending/movie/week?api_key="+API_KEY;

const main = document.getElementById("movie-container");
const trending = document.getElementById("trending");
const search = document.getElementById("search");

/* trailer popup */

const popup = document.getElementById("trailer-popup");
const video = document.getElementById("trailer-video");
const closeBtn = document.getElementById("close");

/* get movies */

async function getMovies(url){

const res = await fetch(url);
const data = await res.json();

showMovies(data.results);

}

function showMovies(movies){

main.innerHTML="";

movies.forEach(movie=>{

const {title,poster_path,vote_average} = movie;

const div = document.createElement("div");
div.classList.add("movie");

div.innerHTML = `
<img src="${IMG_PATH+poster_path}">
<div class="movie-info">
<h3>${title}</h3>
<span>⭐${vote_average}</span>
</div>

<button class="trailer-btn" onclick="watchTrailer('${title}')">
▶ Watch Trailer
</button>
`;

main.appendChild(div);

});

}

/* search */

search.addEventListener("keyup", e =>{

const movie = e.target.value;

if(movie){
getMovies(SEARCH_URL+movie);
}else{
getMovies(API_URL);
}

});

/* trailer popup */

function watchTrailer(title){

const query = title + " official trailer";

video.src =
"https://www.youtube.com/embed?listType=search&list="+query;

popup.style.visibility = "visible";

}

closeBtn.onclick = () => {

popup.style.visibility = "hidden";
video.src="";

};

/* trending */

async function getTrending(){

const res = await fetch(TRENDING_API);
const data = await res.json();

data.results.forEach(movie=>{

const img = document.createElement("img");
img.src = IMG_PATH + movie.poster_path;

trending.appendChild(img);

});

}

/* banner */

const banner = document.getElementById("banner");
const bannerTitle = document.getElementById("banner-title");
const bannerOverview = document.getElementById("banner-overview");
const bannerBtn = document.getElementById("banner-btn");

async function setBanner(){

const res = await fetch(TRENDING_API);
const data = await res.json();

const movie =
data.results[Math.floor(Math.random()*data.results.length)];

banner.style.backgroundImage =
"linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.2)), url(" +
IMG_PATH.replace("w500","original") + movie.backdrop_path + ")";

bannerTitle.innerText = movie.title;
bannerOverview.innerText = movie.overview;

bannerBtn.onclick = () => watchTrailer(movie.title);

}

/* start */

getMovies(API_URL);
getTrending();
setBanner();
