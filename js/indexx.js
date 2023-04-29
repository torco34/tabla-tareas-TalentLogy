const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const input2 = document.querySelector("#input2");
const botones = document.querySelector("#botones");
const check = "fa-check-circle";
const uncheck = "bi-circle";
const line = "linea-tralaght";
let LIST;
let id;

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

function agregarTarea(tarea, title, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }
  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? line : "";

  const element = `
  
<li id="elemento">
  <i id="botones" class="${REALIZADO} ${LINE}" data="realizado" id="${id}" ></i>
  <span class="text-center">
   <p class="text ${LINE}" >TITULO: ${title}</p>
   <p class="text2 ${LINE} " >TAREA:  ${tarea}</p>
  </span>
  <i class="bi bi-trash3-fill" data="eliminado" id="${id}"></i>
</li>`;
  lista.insertAdjacentHTML("beforeend", element);
  console.log(lista);
}

// tarea realizada
function tareaRealizado(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(line);
  element.parentNode.querySelector(".text2").classList.toggle(line);
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}
// tarea eliminada
function tareaEliminad(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].eliminado = true;
}
botones.addEventListener("click", (e) => {
  console.log("hola como estas");
  e.preventDefault();
  const title = input2.value;
  const tarea = input.value;

  if (tarea) {
    // agregarTarea(title);
    agregarTarea(title, tarea, id, false, false);
    LIST.push({
      title: title,
      tarea: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
  input.value = "";
  input2.value = "";
  id++;
});
// agregarTarea();

document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const title = input2.value;
    const tarea = input.value;
    if (tarea && title) {
      agregarTarea(tarea, title, id, false, false);
      LIST.push({
        title: title,
        tarea: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
    input.value = "";
    input2.value = "";
    id++;
    console.log(LIST);
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
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}

function cargarLista(DATA) {
  DATA.forEach(function (i) {
    agregarTarea(i.tarea, i.id, i.realizado, i.eliminado);
  });
}
