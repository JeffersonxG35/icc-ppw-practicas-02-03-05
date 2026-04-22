'use strict';

/* =========================
   FORMULARIO
========================= */

const formulario = document.querySelector('#formulario');
const inputNombre = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const selectAsunto = document.querySelector('#asunto');
const textMensaje = document.querySelector('#mensaje');
const charCount = document.querySelector('#chars');
const resultado = document.querySelector('#resultado');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarCampo(input, esValido, errorId) {
  const errorMsg = document.getElementById(errorId);

  if (esValido) {
    input.classList.remove('error');
    errorMsg.classList.remove('visible');
  } else {
    input.classList.add('error');
    errorMsg.classList.add('visible');
  }

  return esValido;
}

function validarNombre() {
  return validarCampo(
    inputNombre,
    inputNombre.value.trim().length >= 3,
    'error-nombre'
  );
}

function validarEmail() {
  return validarCampo(
    inputEmail,
    EMAIL_REGEX.test(inputEmail.value.trim()),
    'error-email'
  );
}

function validarAsunto() {
  return validarCampo(
    selectAsunto,
    selectAsunto.value.trim() !== '',
    'error-asunto'
  );
}

function validarMensaje() {
  return validarCampo(
    textMensaje,
    textMensaje.value.trim().length >= 10,
    'error-mensaje'
  );
}

function actualizarContador(e) {
    // TODO 4.4.1: Crear una constante 'longitud'
    const longitud = e.target.value.length;

    // TODO 4.4.2: Actualizar el texto del contador
    charCount.textContent = longitud;

    // TODO 4.4.3: Cambiar el color del contador usando un operador ternario
    charCount.style.color = longitud > 270 ? '#e74c3c' : '#999';
}

// TODO 4.4.4: Conectar el evento 'input'
textMensaje.addEventListener('input', actualizarContador);

// TODO 4.5.1: Evento blur para el nombre
inputNombre.addEventListener('blur', validarNombre);

// TODO 4.5.2: Evento blur para el email
inputEmail.addEventListener('blur', validarEmail);

// TODO 4.5.3: Evento blur para el asunto
selectAsunto.addEventListener('blur', validarAsunto);

// TODO 4.5.4: Evento blur para el mensaje
textMensaje.addEventListener('blur', validarMensaje);

function limpiarError(input, errorId) {
  input.classList.remove('error');
  document.getElementById(errorId).classList.remove('visible');
}

// TODO 5.2.1: Agregar evento 'input' a inputNombre para limpiar su error
inputNombre.addEventListener('input', () => limpiarError(inputNombre, 'error-nombre'));

// TODO 5.2.2: Agregar evento 'input' a inputEmail para limpiar su error
inputEmail.addEventListener('input', () => limpiarError(inputEmail, 'error-email'));

// TODO 5.2.3: Agregar evento 'change' a selectAsunto para limpiar su error
// Nota: Usamos 'change' porque es un desplegable (select)
selectAsunto.addEventListener('change', () => limpiarError(selectAsunto, 'error-asunto'));

// TODO 5.2.4: Agregar evento 'input' a textMensaje para limpiar su error
textMensaje.addEventListener('input', () => limpiarError(textMensaje, 'error-mensaje'));

function mostrarResultado() {
  resultado.innerHTML = '';

  const titulo = document.createElement('strong');
  titulo.textContent = 'Datos recibidos:';

  const pNombre = document.createElement('p');
  pNombre.textContent = `Nombre: ${inputNombre.value.trim()}`;

  const pEmail = document.createElement('p');
  pEmail.textContent = `Email: ${inputEmail.value.trim()}`;

  const pAsunto = document.createElement('p');
  pAsunto.textContent = `Asunto: ${selectAsunto.options[selectAsunto.selectedIndex].text}`;

  const pMensaje = document.createElement('p');
  pMensaje.textContent = `Mensaje: ${textMensaje.value.trim()}`;

  resultado.appendChild(titulo);
  resultado.appendChild(pNombre);
  resultado.appendChild(pEmail);
  resultado.appendChild(pAsunto);
  resultado.appendChild(pMensaje);

  resultado.classList.add('visible');
}

function resetearFormulario() {
  formulario.reset();
  charCount.textContent = '0';
  charCount.style.color = '#999';

  [inputNombre, inputEmail, selectAsunto, textMensaje].forEach((campo) => {
    campo.classList.remove('error');
  });

  document.querySelectorAll('.error-msg').forEach((msg) => {
    msg.classList.remove('visible');
  });
}


formulario.addEventListener('submit', (e) => {
    // Evita que la página se recargue (comportamiento por defecto del submit)
    e.preventDefault();

    // TODO 5.5.1: Llamar a las 4 funciones validadoras y guardar los resultados
    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const asuntoValido = validarAsunto();
    const mensajeValido = validarMensaje();

    // TODO 5.5.2: Si TODOS son válidos, procesar el formulario
    if (nombreValido && emailValido && asuntoValido && mensajeValido) {
        mostrarResultado();
        resetearFormulario();
        return; // Importante: Salir de la función aquí si todo tuvo éxito
    }

    // TODO 5.5.3: Si hay errores, hacer focus en el PRIMER campo inválido
    // El orden de los 'if' importa para que el cursor vaya al primer error de arriba a abajo
    if (!nombreValido) {
        inputNombre.focus();
        return;
    }

    if (!emailValido) {
        inputEmail.focus();
        return;
    }

    if (!asuntoValido) {
        selectAsunto.focus();
        return;
    }

    // Si llegamos aquí, significa que los anteriores estaban bien pero el mensaje no
    textMensaje.focus(); 
});

/* ========================
      ATAJO DE TECLADO
======================== */

// TODO 6.1: Agregar evento 'keydown' al document
document.addEventListener('keydown', (e) => {

    // TODO 6.2: Verificar si se presionó Ctrl+Enter
    if (e.ctrlKey && e.key === 'Enter') {
        
        // TODO 6.3: Si la condición es verdadera
        e.preventDefault(); // Evita saltos de línea o comportamientos extraños
        formulario.requestSubmit(); // Dispara el evento submit y ejecuta los validadores
        
    }
});

/* =========================
   TAREAS CON DELEGACIÓN
========================= */

const inputNuevaTarea = document.querySelector('#nueva-tarea');
const btnAgregar = document.querySelector('#btn-agregar');
const listaTareas = document.querySelector('#lista-tareas');
const contadorTareas = document.querySelector('#contador-tareas');

let tareas = [
  { id: 1, texto: 'Estudiar JavaScript', completada: false },
  { id: 2, texto: 'Hacer la práctica', completada: false },
  { id: 3, texto: 'Subir al repositorio', completada: true }
];

function crearBotonEliminar() {
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.textContent = 'Eliminar';
  boton.className = 'btn-eliminar';
  boton.dataset.action = 'eliminar';
  return boton;
}

function crearTextoTarea(tarea) {
  const span = document.createElement('span');
  span.textContent = tarea.texto;
  span.className = 'tarea-texto';
  span.dataset.action = 'toggle';
  return span;
}

function crearItemTarea(tarea) {
  const li = document.createElement('li');
  li.className = `tarea-item${tarea.completada ? ' completada' : ''}`;
  li.dataset.id = tarea.id;

  const texto = crearTextoTarea(tarea);
  const botonEliminar = crearBotonEliminar();

  li.appendChild(texto);
  li.appendChild(botonEliminar);

  return li;
}

function actualizarContadorTareas() {
  const pendientes = tareas.filter((tarea) => !tarea.completada).length;
  contadorTareas.textContent = `${pendientes} pendiente(s)`;
}

function renderizarTareas() {
  listaTareas.innerHTML = '';

  // TODO 7.4.1: Manejar el caso cuando no hay tareas
  if (tareas.length === 0) {
    const itemVacio = document.createElement('li');
    itemVacio.className = 'estado-vacio';
    itemVacio.textContent = 'No hay tareas registradas';
    listaTareas.appendChild(itemVacio);
    contadorTareas.textContent = '0 pendiente(s)';
    return; // Salir de la función
  }

  // TODO 7.4.2: Renderizar cada tarea usando forEach
  tareas.forEach((tarea) => {
    const item = crearItemTarea(tarea);
    listaTareas.appendChild(item);
  });

  // TODO 7.4.3: Actualizar el contador de pendientes
  actualizarContadorTareas();
}

function agregarTarea() {
  // TODO 7.5.1: Obtener el texto del input y quitarle espacios
  const texto = inputNuevaTarea.value.trim();

  // TODO 7.5.2: Validar que no esté vacío
  if (texto === '') {
    inputNuevaTarea.focus(); 
    return; 
  }

  // TODO 7.5.3: Agregar la nueva tarea al array usando push()
  tareas.push({
    id: Date.now(), // ID único basado en el tiempo actual
    texto,          
    completada: false
  });

  // TODO 7.5.4: Limpiar el input
  inputNuevaTarea.value = '';

  // TODO 7.5.5: Re-renderizar la lista
  renderizarTareas();

  // TODO 7.5.6: Volver a hacer focus
  inputNuevaTarea.focus();
}

// TODO 7.6.1: Conectar el botón de agregar
btnAgregar.addEventListener('click', agregarTarea);

// TODO 7.6.2: Permitir agregar con Enter en el input
inputNuevaTarea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); 
    agregarTarea();
  }
});

listaTareas.addEventListener('click', (e) => {
  const action = e.target.dataset.action;

  // TODO 7.7.1: Verificar si el elemento clickeado tiene data-action
  if (!action) {
    return; 
  }

  // TODO 7.7.2: Obtener el <li> más cercano que contiene el id
  const item = e.target.closest('li');
  if (!item || !item.dataset.id) {
    return; 
  }

  // TODO 7.7.3: Convertir el id de string a número
  const id = Number(item.dataset.id);

  // TODO 7.7.4: Manejar acción de eliminar
  if (action === 'eliminar') {
    tareas = tareas.filter((tarea) => tarea.id !== id);
    renderizarTareas();
    return; 
  }

  // TODO 7.7.5: Manejar acción de toggle
  if (action === 'toggle') {
    const tarea = tareas.find((itemTarea) => itemTarea.id === id);
    if (tarea) {
      tarea.completada = !tarea.completada; // Invierte el valor (true/false)
      renderizarTareas();
    }
  }
});

renderizarTareas();
