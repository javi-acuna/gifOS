function changeClassToHidden(elementId) {
    let element = document.getElementById(elementId);
    element.className = "hidden";
}

function changeClassToDisplay(elementId) {
    let element = document.getElementById(elementId);
    element.className = "display";
}

var elementIsClicked = true;
function clickHandler() {
    if (elementIsClicked == false) {
        return elementIsClicked = true;
    } else if (elementIsClicked == true) {
        return elementIsClicked = false;
    }
}