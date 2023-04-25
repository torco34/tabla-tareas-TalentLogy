const form = document.querySelector("form");
const notesContainer = document.querySelector(".notes-container");
let notes = JSON.parse(localStorage.getItem("notes")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const noteTitle = document.querySelector("#title").value;
  const textBody = document.querySelector("#textBody").value;
  const nota = {
    title: noteTitle,
    body: textBody,
  };
  notes.push(nota);
  localStorage.setItem("notes", JSON.stringify(notes));
  console.log(nota);
  form.reset();
});

function addPages() {
  //crea un div
  const noteCard = document.createElement("div");
  //agregando class css
  noteCard.classList.add("note-card");
  // se crea h2 del titulo
  const noteTitle = document.createElement("h2");
  // agrega lo que se escribe titulo
  noteTitle.textContent = title;
  // se crea el parrafo
  const noteBody = document.createElement("p");
  // 
  noteBody.textContent = textBody;
  // se esta creando un boton
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  
  deleteButton.addEventListener('click', () => {
    deleteNoteFromPage(noteCard, note);
  });
  console.log(noteCard, noteTitle);
  console.log(deleteButton);
}
addPages();
