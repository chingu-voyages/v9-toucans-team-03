const menu = document.querySelector('#menu');
let clicks = 0;
const sideNav = document.querySelector('.sideNav');
const movies_api = '2db0c43524a948edd34445269d54997d';
let url_trending = `https://api.themoviedb.org/3/trending/movie/day?api_key=${movies_api}`
let url_crime = `https://api.themoviedb.org/3/list/80?api_key=${movies_api}&language=en-US`
let url_action = `https://api.themoviedb.org/3/list/28?api_key=${movies_api}&language=en-US`
menu.onclick = () => {
    if (clicks == 0) {
        sideNav.style.width = '25em'
        clicks = 1
    }
    else {
        sideNav.style.width = '7em'
        clicks = 0
    }
}
window.addEventListener('click', function (e) {
    if (document.querySelector('.sideNav').contains(e.target)) {
        return
    } else {
        sideNav.style.width = '7em'

    }
});

function set_head_mv(){
    fetch(url_trending)
    .then(res => res.json())
    .then(json =>{
        const random = Math.floor(Math.random() * json.results.length);
        const res = json.results[random];
        $('header.top').css("background-image" ,`linear-gradient(rgba(0, 0, 0, 0.500),rgba(0, 0, 0, 0.500)) , url('http://image.tmdb.org/t/p/original//${res.backdrop_path}')`)
        const best= json.results[random].genre_ids[0];
        $('.box .title').text(res.title)
        $('.box .description').text(res.overview)
        $('.box .idm').text(res.id)
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=2db0c43524a948edd34445269d54997d&language=en-US')
        .then(res => res.json())
        .then(gn =>{
            const arr = gn.genres;
            for(let i = 0 ; i < arr.length ; i++){
                if(arr[i].id == best){
                    $('.box .type').text(arr[i].name)
                }
            }
        })
    })
}
function get_trend(){
    fetch(url_trending)
    .then(rs => rs.json())
    .then(json => {
        const results = json.results;
    results.forEach(movie => {
        const date =movie.release_date;
        const tr = date.replace('-' , " ");
        const year = tr.split(' ')[0];
        const container = document.querySelector('#trending');
        const output = `
        <li >
        <div class="boxart">
        <span class='id' style="display:none">${movie.id}</span>
        <img src="http://image.tmdb.org/t/p/w500//${movie.poster_path}" alt="">
        </div>
        <span class="name">${movie.title}</span>
        <span class="year">${year}</span>
        </li>
        `
        $(container).append(output)
    });
    })
}
async function get_action() {
	const response = await fetch(url_action);
	const data = await response.json();
	return data;
}

const result = get_action();
result.then(data =>{
    const results = data.items;
    results.forEach(movie => {
        const date =movie.release_date;
        const tr = date.replace('-' , " ");
        const year = tr.split(' ')[0];
        const container = document.querySelector('#action');
        const output = `
        <li>
        <div class="boxart">
        <img src="http://image.tmdb.org/t/p/w500//${movie.poster_path}" alt="">
        <span class='id' style="display:none">${movie.id}</span>
        </div>
        <span class="name">${movie.title}</span>
        <span class="year">${year}</span>
        </li>
        `
        $(container).append(output)
    });
});

async function get_crime() {
	const response = await fetch(url_crime);
	const data = await response.json();
	return data;
}

const results_s = get_crime();
results_s.then(data =>{
    const results = data.items;
    results.forEach(movie => {
        const date =movie.release_date;
        const tr = date.replace('-' , " ");
        const year = tr.split(' ')[0];
        const container = document.querySelector('#crime');
        const output = `
        <li>
        <div class="boxart">
        <img src="http://image.tmdb.org/t/p/w500//${movie.poster_path}" alt="">
        <span class='id' style="display:none">${movie.id}</span>
        </div>
        <span class="name">${movie.title}</span>
        <span class="year">${year}</span>
        </li>
        `
        $(container).append(output)
    });
});

function view(){
    const movie = document.querySelectorAll('.id');
    const br = document.getElementsByClassName('boxart')
    for(let i = 0 ; i < movie.length ; i++){
       const sd = br[i];
       sd.onclick = ()=>{
           const id = sd.getElementsByClassName('id');
           const id_b = id[0].innerText;
           localStorage.setItem('movie_id', id_b)
           window.location.href= 'view.html'

       }

    }

}

function trailer() {
    const movie = document.querySelector('.content.title');
    const br = document.querySelector('hearder .top.style.background-image');
    const trailerButton = document.querySelector('.box .trailer ');

    trailerButton.onclick = () => {
        const id = document.querySelector('.idm').innerText;
        console.log(id);
        const id_b = id;
        localStorage.setItem('movie_id', id_b)
        window.location.href = 'view.html'

    }


}



const menu_mb = document.querySelector('#col-menu');
const lists = document.querySelector('.mb-navbar')
menu_mb.addEventListener('click' , ()=>{
  const ths = document.querySelector('#col-menu');
  lists.classList.toggle("nav-open");
  ths.classList.toggle('fixed')

})
window.onload = get_trend()  , set_head_mv() ;
setTimeout(()=>{
    view() ;
    trailer()
}, 4000)

let searchItem = "game thrones";

let settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.themoviedb.org/3/search/multi?include_adult=false&page=1&query=${searchItem}&language=en-US&api_key=2db0c43524a948edd34445269d54997d`,
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    let results = response.results;
    console.log(results);
    results.forEach( results => {
        const search = document.querySelector('#search');
        
        if(results.media_type == "movie") {
            let date = results.release_date;
            console.log(date);
            let year = date.toString();
            console.log(year);
            let makefine = year.slice(0,4);

            const output = `
            <div id="mother">

            <span class='id' style="display:none">${results.id}</span>
            <img src="http://image.tmdb.org/t/p/w500//${results.poster_path}">
            <ul>
            <li>Title:${results.title}</li>
            <li>Release:${makefine}</li>
            <li>Rating: ${results.vote_average}</li>
            </ul>
            <span id="dismobile">Description</span>

            <div id="p"> 
            <p> 
            <span id="dis">Description:${results.overview}</span>  
            </p> 
             </div>

             </div>
            `
            $(search).append(output)

        } else {
            let date = results.first_air_date;
            let year = date.toString();
            let makefine = year.slice(0,4);

            const output = `
            <div id="mother">
            <span class='id' style="display:none">${results.id}</span>
            <img id="image" src="http://image.tmdb.org/t/p/w500//${results.poster_path}">
            <ul>
            <li>Title: ${results.name}</li>
            <li>Release: ${makefine}</li>
            <li> Rating: ${results.vote_average}</li>
            </ul>
            <span id="dismobile">Description</span>

            <div id="p"> 
            <p> 
            <span id="dis">Description:${results.overview}</span>  
            </p> 
             </div>

            </div>
            
            `
            
            $(search).append(output)
        }

        
        
    })
  });

 
