const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const input2 = document.querySelector("#input2");
const botones = document.querySelector("#botones");
const check = "fa-check-circle";
const uncheck = "bi-circle";
const line = "linea-tralaght";
let id = 0;

let notas = JSON.parse(localStorage.getItem("notas")) || [];

notas.forEach((nota) => {
  const addTarea = agregarTarea(nota.tarea, nota.title);
});

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

function agregarTarea(title, tarea, id, realizado, eliminado) {
  console.log(realizado);
  if (eliminado) {
    // return;
  }
  // const REALIZADO = realizado ? check : uncheck;
  // const LINE = realizado ? line : "";

  const element = `
  
<li id="elemento">
  <i id="botones" class="" data="realizado" id="${id}" ></i>
  <span class="text-center">
   <p class="text " >TITULO:  ${title}</p>
   <p class="text2  " >TAREA: 
   ${tarea}</p>
  </span>
  <i class="bi bi-trash3-fill" data="eliminado" id="${id}"></i>
</li>`;
  lista.insertAdjacentHTML("beforeend", element);
}

// tarea realizada
function tareaRealizado(element) {
  console.log(element, "hola numdo");
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(line);
  element.parentNode.querySelector(".text2").classList.toggle(line);
}
// tarea eliminada
function tareaEliminad(element, tarea, title) {
  const notaIndex = notas.findIndex(
    (nota) => nota.title === title && nota.tarea === tarea
  );
  notas.splice(notaIndex, 1);
  localStorage.setItem("notas", JSON.stringify(notas));
  element.parentNode.parentNode.removeChild(element.parentNode);
}
botones.addEventListener("click", (e) => {
  e.preventDefault();
  const title = input2.value;
  const tarea = input.value;
  const nota = { title, tarea };
  notas.push(nota);
  localStorage.setItem("notas", JSON.stringify(notas));
  if (tarea) {
    agregarTarea(title, tarea, id, false, false);
  }

  input.value = "";
  input2.value = "";
  id++;
});
// agregarTarea();

document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const title = input2.value;
    const tarea = input.value;
    const nota = { title, tarea };
    notas.push(nota);
    localStorage.setItem("notas", JSON.stringify(notas));

    if (tarea) {
      agregarTarea(tarea, title, id, false, false);
    }
    input.value = "";
    input2.value = "";
    id++;
  }
});
lista.addEventListener("click", function (event) {
  const element = event.target;
  const elementoData = element.attributes.data.value;

  if (elementoData === "realizado") {
    tareaRealizado(element);
  } else if (elementoData === "eliminado") {
    tareaEliminad(element);
  }
});
