const menu = document.querySelector('#menu');

const sideNav = document.querySelector('#sideNav');


menu.addEventListener('click', event => {
  if (sideNav.style.width == '7em' ) {
    return sideNav.style.width = '25em';
  } else {
    return sideNav.style.width = '7em';
  }
})

const menu_mb = document.querySelector('#col-menu');
const lists = document.querySelector('.mb-navbar')
menu_mb.addEventListener('click' , ()=>{
  const ths = document.querySelector('#col-menu');
  lists.classList.toggle("nav-open");
  ths.classList.toggle('fixed')

})

const settings = document.querySelector('.settings');

const settingsPanel = document.querySelector('#settingsPanel')

settings.addEventListener('click', event => {
  if (settingsPanel.style.display == 'none'  ) {

    settingsPanel.style.display = 'flex';
    
  } else {

    settingsPanel.style.display = 'none';

  }
}
  )

