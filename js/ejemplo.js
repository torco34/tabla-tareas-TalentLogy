const formulario = document.querySelector('form');
const contenedorNotas = document.querySelector('#notas');

// Obtener notas del localStorage
let notas = JSON.parse(localStorage.getItem('notas')) || [];

// Mostrar notas en la página
notas.forEach(nota => {
  const notaDiv = crearNotaDiv(nota.titulo, nota.cuerpo);
  contenedorNotas.appendChild(notaDiv);
});

// Agregar evento al formulario para agregar nota
formulario.addEventListener('submit', e => {
  e.preventDefault();
  const titulo = formulario.titulo.value;
  const cuerpo = formulario.cuerpo.value;
  const nota = { titulo, cuerpo };
  notas.push(nota);
  localStorage.setItem('notas', JSON.stringify(notas));
  const notaDiv = crearNotaDiv(titulo, cuerpo);
  contenedorNotas.appendChild(notaDiv);
  formulario.reset();
});

// Función para crear el div de una nota
function crearNotaDiv(titulo, cuerpo) {
  const notaDiv = document.createElement('div');
  notaDiv.classList.add('nota');
  const tituloH3 = document.createElement('h3');
  tituloH3.textContent = titulo;
  const cuerpoP = document.createElement('p');
  cuerpoP.textContent = cuerpo;
  notaDiv.appendChild(tituloH3);
  notaDiv.appendChild(cuerpoP);
  const eliminarBtn = document.createElement('button');
  eliminarBtn.textContent = 'Eliminar';
  eliminarBtn.addEventListener('click', () => {
    const notaIndex = notas.findIndex(nota => nota.titulo === titulo && nota.cuerpo === cuerpo);
    notas.splice(notaIndex, 1);
    localStorage.setItem('notas', JSON.stringify(notas));
    notaDiv.remove();
  });
  notaDiv.appendChild(eliminarBtn);
  const editarBtn = document.createElement('button');
  editarBtn.textContent = 'Editar';
  editarBtn.addEventListener('click', () => {
    const nuevoTitulo = prompt('Ingrese el nuevo título
