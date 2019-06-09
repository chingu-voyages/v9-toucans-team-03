const menu = document.querySelector('#menu');
let clicks = 0;
const sideNav = document.querySelector('.sideNav');
menu.onclick = ()=>{
    if(clicks == 0){
        sideNav.style.width = '25em'
        clicks = 1
    }
    else{
        sideNav.style.width = '7em'
        clicks = 0
    }
}
window.addEventListener('click', function(e){   
    if (document.querySelector('.sideNav').contains(e.target)){
        return
    } else{
        sideNav.style.width = '7em'

    }
  });