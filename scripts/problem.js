//pentru code editor
let editor = document.querySelector("#editor");

ace.edit(editor, {
    theme: "ace/theme/cobalt",
    selectionStyle: "text",
    behavioursEnabled: false,
    fontSize: "16px",
    enableLiveAutocompletion: true,
    enableBasicAutocompletion: true,
});


//pop-up pentru profesorul corector din pagina de probleme
var modal = document.getElementsByClassName("modal-container")[0];
var assignBtn = document.getElementById("assign-homework");
var closeBtn = document.getElementsByClassName("close")[0];

assignBtn.onclick = function() {
  modal.style.display = "block";
}

closeBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}