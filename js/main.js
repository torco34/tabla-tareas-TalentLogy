const formulario = document.querySelector("form");
const contenedorNotas = document.querySelector("#notas");

let notas = JSON.parse(localStorage.getItem("notas")) || [];

notas.forEach((nota) => {
  const notaDiv = crearNotaDiv(nota.titulo, nota.cuerpo);
  contenedorNotas.appendChild(notaDiv);
  //   console.log(contenedorNotas.appendChild(notaDiv));
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = formulario.titulo.value;
  const cuerpo = formulario.cuerpo.value;
  const nota = { titulo, cuerpo };
  notas.push(nota);
  localStorage.setItem("notas", JSON.stringify(notas));
  const notaDiv = crearNotaDiv(titulo, cuerpo);
  contenedorNotas.appendChild(notaDiv);
  formulario.reset();
});
function crearNotaDiv(titulo, cuerpo) {
  //creando un div
  const notaDiv = document.createElement("div");
  console.log(notaDiv);
  //class de div
  notaDiv.classList.add("nota");
  //creando un h3 para el titulo
  const tituloH3 = document.createElement("h3");
  tituloH3.textContent = titulo;
  //   creando body del p
  const cuerpoP = document.createElement("p");
  //   agregando contenido
  cuerpoP.textContent = cuerpo;
  console.log(cuerpoP.textContent);

  notaDiv.appendChild(tituloH3);
  notaDiv.appendChild(cuerpoP);
  console.log(notaDiv.appendChild(cuerpoP), "hola");
  const eliminarBtn = document.createElement("button");
  eliminarBtn.textContent = "Eliminar";

  eliminarBtn.addEventListener("click", () => {
    const notaIndex = notas.findIndex(
      (nota) => nota.titulo === titulo && nota.cuerpo === cuerpo
    );
    notas.splice(notaIndex, 1);
    localStorage.setItem("notas", JSON.stringify(notas));
    notaDiv.remove();
  });
  notaDiv.appendChild(eliminarBtn);
  const editarBtn = document.createElement("button");
  editarBtn.textContent = "Editar";
  editarBtn.addEventListener("click", () => {
    const nuevoTitulo = prompt("Ingrese el nuevo título:");
    const nuevoCuerpo = prompt("Ingrese el nuevo cuerpo:");
    const notaIndex = notas.findIndex(
      (nota) => nota.titulo === titulo && nota.cuerpo === cuerpo
    );
    notas[notaIndex] = { titulo: nuevoTitulo, cuerpo: nuevoCuerpo };
    localStorage.setItem("notas", JSON.stringify(notas));
    tituloH3.textContent = nuevoTitulo;
    cuerpoP.textContent = nuevoCuerpo;
  });
  notaDiv.appendChild(editarBtn);
  return notaDiv;
}
console.log(formulario);
console.log(contenedorNotas);
console.log(notas);
