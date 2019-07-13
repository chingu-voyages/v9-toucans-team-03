$(window).on('load' , ()=>{
    
    $('.container_load').fadeOut('slow')
})

const Api = '2db0c43524a948edd34445269d54997d';
const menu = document.querySelector('#menu');
const sideNav = document.querySelector('.sideNav');
let clicks = 0;
const menu_mb = document.querySelector('#col-menu');
const lists = document.querySelector('.mb-navbar')
menu_mb.addEventListener('click' , ()=>{
  const ths = document.querySelector('#col-menu');
  lists.classList.toggle("nav-open");
  ths.classList.toggle('fixed')

})
let tv_shows = [
    {
        url:`https://api.themoviedb.org/3/tv/popular?api_key=${Api}&language=en-US&page=1`,
        name:'popular tv shows'
    },
    {
        url:`https://api.themoviedb.org/3/discover/tv?api_key=${Api}&sort_by=popularity.desc&with_genres=80`,
        name:'crime' 
    },
    {
        url:`https://api.themoviedb.org/3/discover/tv?api_key=${Api}&sort_by=popularity.desc&with_genres=28`,
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
        $('.box .description_hd').text(res.overview)
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
setTimeout(function(){
    const description = document.querySelector('.description_hd').textContent;
    if(description.length > 100 ){
    const shorten = description.substring(0 , 200)
    document.querySelector('.description_hd').textContent = shorten + '...';
    }
    }, 1500)

    function value() {
        let Item = document.querySelector('#search_field').value;
    
        return Item.length;
    }
    
    const result = document.querySelector('#search');
    
    let Item = document.querySelector('#search_field').value;
    
    const searchField =  document.querySelector('#search_field');
    
    const searchIcon = document.querySelector('#searchIcon');
    
    searchIcon.addEventListener('click', event => {
        if (searchField.style.width == '0em') {
    
          searchField.style.width = '12em'  ;
          searchField.style.paddingLeft = '4px' ;
          searchField.style.borderRadius = '8px';
           
             searchIcon.addEventListener('click', event => {
    
            function get(){
            let searchItem = document.querySelector('#search_field').value;
    
         let settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://api.themoviedb.org/3/search/multi?include_adult=false&page=1&query=${searchItem}&language=en-US&api_key=2db0c43524a948edd34445269d54997d`,
            "method": "GET",
            "headers": {},
            "data": "{}"
          }
          
          $.ajax(settings).done(function (response) {
            let results = response.results;
            results.forEach( results => {
                const search = document.querySelector('#search');
                
                if(results.media_type == "tv") {
                    let date = results.first_air_date;
                    let year = date.toString();
                    let makefine = year.slice(0,4);

                    
        
                    const output = `
                    
                    <div id="wrapper"  >
        
                    <div id="poster" 
                
                    ><img class='pic'  src="http://image.tmdb.org/t/p/w500//${results.poster_path}">
                    </div>
                    <span class='idj' style="display:none">${results.id}</span>
                    <div id="details" 
                    ><ul>
                    <li id='title'>Title: ${results.original_name}</li>
                    <li>First aired: ${makefine}</li>
                    
    
                    <li>Rating: ${results.vote_average}</li>
                    
                    </ul>
                    </div>
            
                    <div id="descrip"
                    ><p> Description:<br/>${results.overview}</p>
                    
                    </div>
            
                    </div>
            
                        
                        
                        `
                    
                    $(search).append(output)
                    
                   
                    
        
                } else {
                    return
                }
        
                
                
            })
          });
    
    }
   

    $(result).empty();
     const heading = `<h2> Search Results <h2>`;
    $(search).append(heading);
    return get();
    }
    )
    
    
            
        } else if (value() == 0 ) {
        searchField.style.borderRadius = '0px';
          searchField.style.width = '0em';
          searchField.style.paddingLeft = '0px' ;
        }
      });
    
      searchField.addEventListener('keypress', function (e) {
        let key = e.which || e.keyCode;
        if (key === 13) { 
            function get(){
                let searchItem = document.querySelector('#search_field').value;
                let settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": `https://api.themoviedb.org/3/search/multi?include_adult=false&page=1&query=${searchItem}&language=en-US&api_key=2db0c43524a948edd34445269d54997d`,
                    "method": "GET",
                    "headers": {},
                    "data": "{}"
                  }
                  
                  $.ajax(settings).done(function (response) {
                    let results = response.results;
                    results.forEach( results => {
                        const search = document.querySelector('#search');
                        if(results.media_type == "tv") {
                            let date = results.first_air_date;
                            let year = date.toString();
                            let makefine = year.slice(0,4);
                            
                           
                
                            const output = `
                            
                            <div id="wrapper" onclick="button();" > 
                
                        <div id="poster" 
                        
                        ><img  class='pic' src="http://image.tmdb.org/t/p/w500//${results.poster_path}">
                        </div>
                        <span class='idj' style="display:none">${results.id}</span>
                        <div id="details" 
                        ><ul>
                        <li class='title'>Title: ${results.original_name}</li>
                        <li>First aired: ${makefine}</li>
                        
    
                        <li>Rating: ${results.vote_average}</li>
                        
                        </ul>
                        </div>
                
                        <div id="descrip"
                        ><p> Description:<br/>${results.overview}</p>
                        
                        </div>
                
                         </div>
                
                            `
                            
                            $(search).append(output)
                
                        } else {
                            return
                        }
                
                        
                        
                    })
                  });
            
            }
           
            $(result).empty();
             
            return get();
        }
    
    
    });

    

    
        
        
    
        function button() {
            const id = document.querySelector('.idj').innerText;
            const id_b = id;
            localStorage.setItem('movie_id', id_b)
            localStorage.setItem('type', 'tv-show')
            window.location.href = 'view.html'
    
        

        }
    
