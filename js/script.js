const menu = document.querySelector('#menu');
let clicks = 0;
const sideNav = document.querySelector('.sideNav');
const movies_api = '2db0c43524a948edd34445269d54997d';
let url_trending = `https://api.themoviedb.org/3/trending/movie/day?api_key=${movies_api}`
let url_crime = `https://api.themoviedb.org/3/list/80?api_key=${movies_api}&language=en-US`
let url_action = `https://api.themoviedb.org/3/list/28?api_key=${movies_api}&language=en-US`
let tv_shows = [
    {
        url:`https://api.themoviedb.org/3/tv/popular?api_key=${movies_api}&language=en-US&page=1`,
        name:'popular tv shows'
    },
    {
        url:`http://api.themoviedb.org/3/discover/tv?api_key=${movies_api}&sort_by=popularity.desc&with_genres=80`,
        name:'crime' 
    },
    {
        url:`http://api.themoviedb.org/3/discover/tv?api_key=${movies_api}&sort_by=popularity.desc&with_genres=28`,
        name:'action' 
    }
]
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
        <li class='movies' >
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
function get_action(){
    fetch(url_action)
    .then(res => res.json())
    .then(data =>{
        const results = data.items;
        results.forEach(movie => {
            const date =movie.release_date;
            const tr = date.replace('-' , " ");
            const year = tr.split(' ')[0];
            const container = document.querySelector('#action');
            const output = `
            <li class='movies'>
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
    })
}
function get_crime(){
    fetch(url_crime)
    .then(res => res.json())
    .then(data =>{
        const results = data.items;
        results.forEach(movie => {
            const date =movie.release_date;
            const tr = date.replace('-' , " ");
            const year = tr.split(' ')[0];
            const container = document.querySelector('#crime');
            const output = `
            <li class='movies'>
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
    })
} 

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
window.onload = get_trend()  , set_head_mv() ,get_crime()  , get_action();
setTimeout(()=>{
    view() ;
    trailer(); 
}, 4000)


//search below
 
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
      searchField.style.width = '15em'  ;
      searchField.style.paddingLeft = '4px' ;
      searchField.style.borderRadius = '8px';
       
         searchIcon.addEventListener('click', event => {

        function get(){
        let searchItem = document.querySelector('#search_field').value;
        console.log(searchItem.length);

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
                
                <div id="wrapper"  >
    
                <div id="poster" 
                
                ><img  class='pic' src="http://image.tmdb.org/t/p/w500//${results.poster_path}">
                </div>
                <span class='idj' style="display:none">${results.id}</span>
                <div id="details" 
                ><ul>
                <li id='title'>Title: ${results.title}</li>
                <li>Release: ${makefine}</li>
                
                

                <li>Rating: ${results.vote_average}</li>
                
                </ul>
                </div>
        
                <div id="descrip"
                >
                <p> Description:  <br/>${results.overview}</p>
                
                </div>
        
                </div>
                    
                    `
                
                $(search).append(output)
                
    
            } else {
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
            }
    
            
            
        })
      });

}

$(result).empty();
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
            console.log(searchItem.length);
        
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
                        
                        <div id="wrapper"  >
            
                    <div id="poster" 
                    
                    ><img  class='pic' src="http://image.tmdb.org/t/p/w500//${results.poster_path}">
                    </div>
                    <span class='idj' style="display:none">${results.id}</span>
                    <div id="details" 
                    ><ul>
                    <li class='title'>Title: ${results.title}</li>
                    <li>Release: ${makefine}</li>
                  

                    <li>Rating: ${results.vote_average}</li>
                    
                    </ul>
                    </div>
            
                    <div id="descrip"
                    >
                    <p> Description:  <br/>${results.overview}</p>
                    
                    </div>
            
                     </div>
            
                        
                        
                        `
                        
                        $(search).append(output)
            
                    } else {
                        let date = results.first_air_date;
                        let year = date.toString();
                        let makefine = year.slice(0,4);
            
                        const output = `
                        
                        <div id="wrapper"  >
            
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
                    }
            
                    
                    
                })
              });
        
        }

        $(result).empty();
        return get();
    }


});

function sview(){
    const movie = document.querySelectorAll('.title');
    const br = document.querySelectorAll('.pic')
    for(let i = 0 ; i < results.length ; i++){
       const sd = br[i];
       sd.onclick = ()=>{
           const id = sd.getElementsByClass('idj');
           const id_b = id[0].innerText;
           localStorage.setItem('movie_id', id_b)
           window.location.href= 'view.html'

       }

    }

    

}




// search above


const tv_show_btn=  document.querySelector('#tv-shows');
const movies_btn=  document.querySelector('#movies');
movies_btn.onclick =  ()=>{
    $(movies_btn).removeClass('disabled')
    $(tv_show_btn).addClass('disabled')
    $(movies_btn).addClass('active')
    const trend = $('#trending')
    const crime = $('#crime')
    const action = $('#action')
    $(trend).find(".series").fadeOut();
    $(trend).find(".series").remove();
    $(crime).find(".series").fadeOut();
    $(crime).find(".series").remove();
    $(action).find(".series").fadeOut();
    $(action).find(".series").remove();
    get_crime()
    get_trend() 
    get_action()
}
tv_show_btn.onclick = ()=>{
    $(tv_show_btn).removeClass('disabled')
    $(tv_show_btn).addClass('active')
    $(movies_btn).addClass('disabled')
    fetch(tv_shows[0].url)
    .then(res => res.json())
    .then(json =>{
        $('#trending').find(".movies").fadeOut();
        $('#crime').find(".movies").fadeOut();
        $('#crime').find(".movies").remove();
        $('#action').find(".movies").fadeOut();
        $('#action').find(".movies").remove();
        $('#trending').find(".series").remove();
        const results = json.results;
        results.forEach(movie => {
            const date =movie.first_air_date;
            const tr = date.replace('-' , " ");
            const year = tr.split(' ')[0];
            const container = document.querySelector('#trending');
            const output = `
            <li class='series'>
            <div class="boxart">
            <img src="http://image.tmdb.org/t/p/w500//${movie.poster_path}" alt="">
            <span class='id' style="display:none">${movie.id}</span>
            </div>
            <span class="name">${movie.name}</span>
            <span class="year">${year}</span>
            </li>
            `
            $(container).append(output)
        });
    })
    fetch(tv_shows[1].url)
    .then(res => res.json())
    .then(json =>{
        const results = json.results;
        results.forEach(movie => {
            const date =movie.first_air_date;
            const tr = date.replace('-' , " ");
            const year = tr.split(' ')[0];
            const container = document.querySelector('#crime');
            const output = `
            <li class='series'>
            <div class="boxart">
            <img src="http://image.tmdb.org/t/p/w500//${movie.poster_path}" alt="">
            <span class='id' style="display:none">${movie.id}</span>
            </div>
            <span class="name">${movie.name}</span>
            <span class="year">${year}</span>
            </li>
            `
            $(container).append(output)
        });
    })
    fetch(tv_shows[2].url)
    .then(res => res.json())
    .then(json =>{
        const results = json.results;
        results.forEach(movie => {
            const date =movie.first_air_date;
            const tr = date.replace('-' , " ");
            const year = tr.split(' ')[0];
            const container = document.querySelector('#action');
            const output = `
            <li class='series'>
            <div class="boxart">
            <img src="http://image.tmdb.org/t/p/w500//${movie.poster_path}" alt="">
            <span class='id' style="display:none">${movie.id}</span>
            </div>
            <span class="name">${movie.name}</span>
            <span class="year">${year}</span>
            </li>
            `
            $(container).append(output)
        });
    })

}
