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

document.getElementById("problemForm").addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("submit");
    const formData = new FormData(this);
    console.log(formData)
    const objectToSend = {};
    formData.forEach(function(value, key){
        objectToSend[key] = value;
    });
    console.log(objectToSend)
    fetch('http://localhost:8081/api/problems/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objectToSend)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

