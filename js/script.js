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
        const res = json.results[0];
        $('header.top').css("background-image" ,`linear-gradient(rgba(0, 0, 0, 0.287),rgba(0, 0, 0, 0.287)) , url('http://image.tmdb.org/t/p/original//${res.backdrop_path}')`)
        const best= json.results[0].genre_ids[0];
        $('.box .title').text(res.title)
        $('.box .description').text(res.overview)
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
        <li>
        <div class="boxart">
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
function get_crime(){
    fetch(url_crime)
    .then(rs => rs.json())
    .then(json => {
        const results = json.items;
    results.forEach(movie => {
        const date =movie.release_date;
        const tr = date.replace('-' , " ");
        const year = tr.split(' ')[0];
        const container = document.querySelector('#crime');
        const output = `
        <li>
        <div class="boxart">
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
function get_action(){
    fetch(url_action)
    .then(rs => rs.json())
    .then(json => {
        const results = json.items;
    results.forEach(movie => {
        const date =movie.release_date;
        const tr = date.replace('-' , " ");
        const year = tr.split(' ')[0];
        const container = document.querySelector('#action');
        const output = `
        <li>
        <div class="boxart">
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
window.onload = get_trend() , get_crime() , get_action() , set_head_mv();