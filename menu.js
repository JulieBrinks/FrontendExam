function menuFunction() {
    let x = document.getElementById("myLinks");

    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }

    x.addEventListener('click', collapseMenu)
}

// collapse menu after click
function collapseMenu(){
  document.getElementById("myLinks").style.display = "none";
}