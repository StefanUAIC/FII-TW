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


const studentHomeworkSelectBtn = document.getElementById("homework-selector-student");
if (studentHomeworkSelectBtn != null) {
    studentHomeworkSelectBtn.addEventListener("change", () => {
        const homeworkId = parseInt(studentHomeworkSelectBtn.value);
        const problemId = parseInt(studentHomeworkSelectBtn.dataset.problemId);
        if (homeworkId === 0) {
            window.location.href = `/problem/${problemId}`;
            return;
        }
        window.location.href = `/problem/${problemId}?homework=${homeworkId}`;
    });
}