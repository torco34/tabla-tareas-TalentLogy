const formulario = document.querySelector("form");
const element = document.getElementById("element");
let notas = JSON.parse(localStorage.getItem("notas")) || [];

notas.forEach((nota) => {
  const notaDiv = creandoCard(nota.titulo, nota.cuerpo);
  //   element.appendChild(notaDiv);
  //   console.log(contenedorNotas.appendChild(notaDiv));
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = formulario.titulo.value;
  const cuerpo = formulario.body.value;
  console.log(titulo);
  console.log(cuerpo);
  const nota = { titulo, cuerpo };
  notas.push(nota);
  localStorage.setItem("notas", JSON.stringify(notas));
  const notaDiv = creandoCard(titulo, cuerpo);
  console.log(notaDiv, "nota dis");
  formulario.reset();
});
// creando nota
function creandoCard(titulo, cuerpo) {
  console.log(element, "elemento");
  const elementCreado = ` 
  <div class=" row container-card border" >
   <div class="col-6 border p-2">
    <div class="border">
     <h3 class="border text-center" >Titulo:</h3>
     <h5 class="card-title text-center">${titulo}</h5>
     </div>
     <h3 class="text-center border">Cuerpo</h3>
     <p class="card-text border">${cuerpo}</p>
      <div class="botones" >
     <button id="btnEliminar"class="btn btn-danger"><i class="bi bi-trash-fill"></i></button>
    <button class="btn btn-dark">Editar</button>
    </div>
 </div>
</div> 
  `;
  element.innerHTML += elementCreado;
  console.log(element, "este es que hay aqui");
  console.log(btnEliminar, "boton eliminar");

  element.addEventListener("click", () => {
    console.log("hola")
  });
}
