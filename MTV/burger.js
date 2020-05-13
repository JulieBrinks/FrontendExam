//funktionen "menuFunction lader x være "myLinks" som er de forskellige elementer i menuen.
//hvis myLinks' visning ikke er 'table' dvs. de ikke er vist i en table element,
// så skal de ikke vises (none). ellers bliver myLinks vist i tableelementer

function menuFunction() {
    let x = document.getElementById("myLinks");
    if (x.style.display === "table") {
        x.style.display = "none";
    } else {
        x.style.display = "table";
    }
}