const menu = document.querySelector('#menu');

const sideNav = document.querySelector('#sideNav');

menu.addEventListener('click', event => {
  if (sideNav.style.width == '7em' ) {
    return sideNav.style.width = '25em';
  } else {
    return sideNav.style.width = '7em';
  }
})
