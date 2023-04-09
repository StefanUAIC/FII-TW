var modal = document.getElementsByClassName("modal-container")[0];
var assignBtn = document.getElementById("create-class"); //pentru profesor
var closeBtn = document.getElementsByClassName("close")[0];

if (assignBtn != null){
    assignBtn.onclick = function() {
        modal.style.display = "block";
    }
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//pentru slider-ul cu nota
var value = document.querySelector("#grade-value")
var input = document.querySelector("#grade-range")

if (value != null) {
    value.textContent = input.value;
}

if (input != null) {
    input.addEventListener("input", (event) => {
        value.textContent = event.target.value;
    })
}