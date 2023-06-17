//pentru code editor
let editor = document.querySelector("#editor");

ace.edit(editor, {
    theme: "ace/theme/cobalt",
    selectionStyle: "text",
    behavioursEnabled: false,
    fontSize: "16px",
});

//pop-up pentru profesorul corector/elev in pagina de probleme
const modal = document.getElementsByClassName("modal-container")[0];
const assignBtn = document.getElementById("assign-homework"); //pentru profesor
const viewGradeBtn = document.getElementById("grade-details"); //pentru elev
const closeBtn = document.getElementsByClassName("close")[0];

if (assignBtn != null) {
    assignBtn.onclick = function () {
        modal.style.display = "block";
    }
}

closeBtn.onclick = function () {
    modal.style.display = "none";
}

if (viewGradeBtn != null) {
    viewGradeBtn.onclick = function () {
        modal.style.display = "block";
    }
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

//pentru slider-ul cu nota
const value = document.querySelector("#grade-value");
const input = document.querySelector("#grade-range");

if (value != null) {
    value.textContent = input.value;
}

if (input != null) {
    input.addEventListener("input", (event) => {
        value.textContent = event.target.value;
    })
}

function getNoStars() {
    return 6-document.querySelector('input[name="star"]:checked').value;
}

const buttonPost = document.getElementById("comment-post-btn");
buttonPost.onclick = function() {
    let urlSplit = window.location.href.split("/");
    let problemId = urlSplit[urlSplit.length-1];

    const date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

    let data = {content: {username: document.getElementById("comment-username-id").innerText, date: currentDate, content: document.getElementById("comment").value}, problemId: problemId};

    fetch('/api/comment', {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(data),
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data) {
                alert(data.message);
                location.reload();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(error.message);
        });
}

const buttons = document.getElementsByClassName("radio-input");
for(let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.onclick = function() {
        let noStars = getNoStars();
        let urlSplit = window.location.href.split("/");
        let problemId = urlSplit[urlSplit.length-1];

        let data = {content: {rating: noStars}, problemId: problemId};

        fetch('/api/rating', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(data),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data) {
                    alert(data.message);
                    location.reload();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    }
}
