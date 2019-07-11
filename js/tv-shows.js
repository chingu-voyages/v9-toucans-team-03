const Api = '2db0c43524a948edd34445269d54997d';
const menu = document.querySelector('#menu');
const sideNav = document.querySelector('.sideNav');
let clicks = 0;
let tv_shows = [
    {
        url:`https://api.themoviedb.org/3/tv/popular?api_key=${Api}&language=en-US&page=1`,
        name:'popular tv shows'
    },
    {
        url:`http://api.themoviedb.org/3/discover/tv?api_key=${Api}&sort_by=popularity.desc&with_genres=80`,
        name:'crime' 
    },
    {
        url:`http://api.themoviedb.org/3/discover/tv?api_key=${Api}&sort_by=popularity.desc&with_genres=28`,
        name:'action' 
    }
]
function get_trendering_tvShows(url){
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        const results = data.results;
        results.forEach(tv_show => {
            const date =tv_show.first_air_date;
            const tr = date.replace('-' , " ");
            const year = tr.split(' ')[0];
            const container = document.querySelector('#trending');
            const output = `
            <li class='movies' >
            <div class="boxart">
            <span class='id' style="display:none">${tv_show.id}</span>
            <img src="http://image.tmdb.org/t/p/w500//${tv_show.poster_path}" alt="">
            </div>
            <span class="name">${tv_show.name}</span>
            <span class='year'>${year}</span>
            </li>
            `
            $(container).append(output)
        });
    })
}
function get_crime(url){
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        const results = data.results;
        results.forEach(tv_show => {
            
            const date =tv_show.first_air_date;
            const tr = date.replace('-' , " ");
            const year = tr.split(' ')[0];
            const container = document.querySelector('#crime');
            const output = `
            <li class='movies' >
            <div class="boxart">
            <span class='id' style="display:none">${tv_show.id}</span>
            <img src="http://image.tmdb.org/t/p/w500//${tv_show.poster_path}" alt="">
            </div>
            <span class="name">${tv_show.name}</span>
            <span class='year'>${year}</span>
            </li>
            `
            $(container).append(output)
        });
    })
}
function get_action(url){
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        const results = data.results;
        results.forEach(tv_show => {
            const date =tv_show.first_air_date;
            const tr = date.replace('-' , " ");
            const year = tr.split(' ')[0];
            const container = document.querySelector('#action');
            const output = `
            <li class='movies' >
            <div class="boxart">
            <span class='id' style="display:none">${tv_show.id}</span>
            <img src="http://image.tmdb.org/t/p/w500//${tv_show.poster_path}" alt="">
            </div>
            <span class="name">${tv_show.name}</span>
            <span class='year'>${year}</span>
            </li>
            `
            $(container).append(output)
        });
    })
}

function set_header_tv(url){
    let header_tvShow_id = 0;
    fetch(url)
    .then(res => res.json())
    .then(json =>{
        const random = Math.floor(Math.random() * json.results.length);
        const res = json.results[random];
        header_tvShow_id = res.id;
        $('header.top').css("background-image" ,`linear-gradient(rgba(0, 0, 0, 0.500),rgba(0, 0, 0, 0.500)) , url('http://image.tmdb.org/t/p/original//${res.backdrop_path}')`)
        const best= json.results[random].genre_ids[0];
        $('.box .title').text(res.name)
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
    const button= document.querySelector('#trailer_hd_b');
    button.onclick = ()=>{
        localStorage.setItem('type' ,'tv-show')   
     localStorage.setItem('movie_id' , header_tvShow_id)   
     window.location.href = 'view.html'
    }
}
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

function view(){
    localStorage.setItem('type' , 'tv-show')
    const tv_show = document.querySelectorAll('.id');
    const br = document.getElementsByClassName('boxart')
    for(let i = 0 ; i < tv_show.length ; i++){
       const sd = br[i];
       sd.onclick = ()=>{
           console.log(sd)
           const id = sd.getElementsByClassName('id');
           const id_b = id[0].innerText;
           localStorage.setItem('movie_id', id_b)
           window.location.href= 'view.html'
       }

    }

}
setTimeout(()=>{
    view()
}, 4000)

window.onload =  get_trendering_tvShows(tv_shows[0].url),
get_crime(tv_shows[1].url),
get_action(tv_shows[2].url),
set_header_tv(tv_shows[0].url);