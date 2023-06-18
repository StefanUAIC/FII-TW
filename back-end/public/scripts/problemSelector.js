const modal = document.getElementById('modal');
const importModal = document.getElementById('importModal');
const exportModal = document.getElementById('exportModal');

const addProblemButton = document.getElementById("addProblemButton");
const importProblemButton = document.getElementById("importProblemButton");
const exportProblemButton = document.getElementById("exportProblemButton");

const closeButton = document.getElementsByClassName("close")[0];
const closeImportButton = document.getElementById('closeImportButton');
const closeExportButton = document.getElementById('closeExportButton');

exportProblemButton.onclick = function () {
    exportModal.style.display = "block";
}

closeExportButton.onclick = function () {
    exportModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === exportModal) {
        exportModal.style.display = "none";
    }
}

addProblemButton.onclick = function () {
    modal.style.display = "block";
}

importProblemButton.onclick = function () {
    importModal.style.display = "block";
}

closeButton.onclick = function () {
    modal.style.display = "none";
}

closeImportButton.onclick = function () {
    importModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
    if (event.target === importModal) {
        importModal.style.display = "none";
    }
}

function validateProblem(problem) {
    const fields = ['title', 'author', 'tags', 'description', 'input', 'output', 'restrictions', 'difficulty', 'chapter', 'grade'];
    const grades = ['IX', 'X', 'XI', 'XII'];
    const chapters = ['Programare dinamica', 'Algoritmi elementari', 'Tablouri unidimensionale', 'Probleme diverse'];
    const difficulties = ['Ușor', 'Mediu', 'Dificil'];
    console.log(problem);
    for (let field of fields) {
        if (!(field in problem)) {
            alert(`Câmp lipsă ${field}`);
            return false;
        }
    }
    for (let field in problem) {
        if (!fields.includes(field)) {
            alert(`Câmp neașteptat ${field}`);
            return false;
        }
    }

    if (!grades.includes(problem['grade'])) {
        console.error(`Clasă invalidă: ${problem['grade']}`);
        return false;
    }

    if (!chapters.includes(problem['chapter'])) {
        console.error(`Capitol invalid: ${problem['chapter']}`);
        return false;
    }

    if (!difficulties.includes(problem['difficulty'])) {
        console.error(`Dificultate invalidă: ${problem['difficulty']}`);
        return false;
    }
    return true;
}


function callAddProblemAPI(problem) {
    fetch('/api/problems/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(problem)
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

document.getElementById("problemForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const objectToSend = {};
    formData.forEach(function (value, key) {
        objectToSend[key] = key === 'tags' ? value.split(',').map(tag => tag.trim()) : value;
    });
    callAddProblemAPI(objectToSend);
});

document.getElementById("importForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const file = document.getElementById("importFile").files[0];
    const reader = new FileReader();
    reader.onload = function () {
        let problem;
        try {
            problem = JSON.parse(reader.result);
        } catch (e) {
            console.error('Invalid JSON format:', e);
            return;
        }
        if (validateProblem(problem)) {
            callAddProblemAPI(problem);
        }
    }
    reader.readAsText(file);
});
