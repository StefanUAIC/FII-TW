const modal = document.getElementsByClassName("modal-container")[0];

const addProblemButton = document.getElementById("addProblemButton");

const closeButton = document.getElementsByClassName("close")[0];

addProblemButton.onclick = function () {
    modal.style.display = "block";
}

closeButton.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

document.getElementById("problemForm").onsubmit = function (event) {
    event.preventDefault();
};
