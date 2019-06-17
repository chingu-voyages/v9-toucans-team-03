document.getElementById('menu').addEventListener(click, toggleNav);

function toggleNav(){

  let width = document.getElementsByClassName('.sideNav').style.width;

  if (width == "7em") {
      return document.getElementsByClassName('.sideNav').style.width = "25em";
  } else {
      return document.getElementsByClassName('.sideNav').style.width = "7em";
  }

}



