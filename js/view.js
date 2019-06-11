const api_key ='2db0c43524a948edd34445269d54997d';
const id = localStorage.getItem('movie_id');
const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`;
fetch(url)
.then(res => res.json())
.then(json =>{
    document.title = json.title;
    const title = document.querySelector('.titlepr');
    const type = document.querySelector('.typepr');
    const over = document.querySelector('.description-pr');
    const poster = document.querySelector('#poster');
    const background = json.backdrop_path;
    const url = `http://image.tmdb.org/t/p/original//${background}`;
    $('section.main').css('background-image' , `linear-gradient(rgba(0, 0, 0, 0.700),rgba(0, 0, 0, 0.700)) , url(${url})`)
    title.innerHTML = json.title;
    type.innerHTML = json.genres[0].name;
    over.innerHTML = json.overview;
    poster.setAttribute('src' , `http://image.tmdb.org/t/p/w500//${json.poster_path}`);
  
    $('#trailer').click(()=>{
        fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`)
        .then(res => res.json())
        .then(json=>{
            const rs= json.results[0];
            const link = `https://www.youtube.com/embed/${rs.key}`
            document.getElementById('if').setAttribute('src' , link);
        })
        $(".trailer").css("display" , "flex");
    })
    $("#close i").click(()=>{
        $('.trailer').css('display' , "none")
        const iframe = document.getElementById("if");
        iframe.setAttribute('src' , ' ')
    })
}).catch(err => console.log(err))