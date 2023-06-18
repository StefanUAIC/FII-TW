//pentru code editor
let editor = ace.edit("editor", {
    theme: "ace/theme/cobalt",
    selectionStyle: "text",
    behavioursEnabled: false,
    fontSize: "16px",
    mode: "ace/mode/c_cpp",
    behavioursEnabled: true,
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
    problemId = problemId.split("?")[0];

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
              //  alert(data.message);
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
        problemId = problemId.split("?")[0];

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

const teacherHomeworkSelectBtn = document.getElementById("homework-selector-teacher");
if (teacherHomeworkSelectBtn != null) {
    teacherHomeworkSelectBtn.addEventListener("change", () => {
        const homeworkId = parseInt(teacherHomeworkSelectBtn.value);
        const problemId = parseInt(teacherHomeworkSelectBtn.dataset.problemId);
        const studentId = teacherHomeworkSelectBtn[teacherHomeworkSelectBtn.selectedIndex].dataset.studentId;
        if (homeworkId === 0) {
            window.location.href = `/problem/${problemId}`;
            return;
        }
        window.location.href = `/problem/${problemId}?homework=${homeworkId}&student=${studentId}`;
    });
}

const saveHomeworkBtn = document.getElementById("save-homework-btn");
if (saveHomeworkBtn) {
    saveHomeworkBtn.addEventListener("click", () => {
        const code = editor.getValue();
        const homework = parseInt(saveHomeworkBtn.dataset.homeworkId);
        const student = saveHomeworkBtn.dataset.studentId;
        
        if (!homework || homework == 0) {
            alert("Selectează o temă");
            return;
        }

        const data = {
            sourceCode: code,
            homework: homework,
            student: student
        };

        fetch("/api/homeworks/save", { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert("Cod salvat cu succes");
                window.location.reload();
            }
            else if (response.status === 400) {
                alert("Tema nu mai e in lucru");
            }
            else {
                alert("Eroare la salvarea codului");
            }
        })
        .catch(err => console.log(err));

    });
}

const sendHomeworkBtn = document.getElementById("send-homework-btn");
if (sendHomeworkBtn) {
    sendHomeworkBtn.addEventListener("click", () => {
        const homework = parseInt(sendHomeworkBtn.dataset.homeworkId);
        const student = sendHomeworkBtn.dataset.studentId;
        const status = sendHomeworkBtn.dataset.status;
        if (!homework || homework == 0) {
            alert("Selectează o temă");
            return;
        }

        if (status !== "In lucru") {
            alert("Tema nu mai e in lucru");
            return;
        }

        const data = {
            homework: homework,
            student: student
        }

        fetch("/api/homeworks/send", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert("Tema trimisă cu succes");
                window.location.reload();
            }
            else {
                alert("Eroare la trimiterea temei");
            }
        }
        )
        .catch(err => console.log(err));
    });
}

const gradeHomeworkBtn = document.getElementById("grade-homework-btn");
if (gradeHomeworkBtn) {
    gradeHomeworkBtn.addEventListener("click", () => {
        const homework = parseInt(gradeHomeworkBtn.dataset.homeworkId);
        const student = gradeHomeworkBtn.dataset.studentId;
        if (!homework) {
            alert("Selectează o temă");
            return;
        }
        const grade = parseInt(document.getElementById("grade-range").value);
        const description = document.getElementById("description").value;

        const data = {
            homework: homework,
            student: student,
            grade: grade,
            description: description
        }

        fetch("/api/homeworks/grade", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert("Tema notată cu succes");
                const url = window.location.href;
                const reloadUrl = url.split("?")[0];
                window.location.href = reloadUrl;
            }
            else if (response.status === 400) {
                alert("Tema a fost deja corectată sau nu e trimisă/e inactivă");
            }
            else {
                alert("Eroare la notarea temei");
            }
        }
        )
        .catch(err => console.log(err));
    });
}
