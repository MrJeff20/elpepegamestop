/* funciones.js — Validaciones + DataTables (versión colorida, mismas reglas) */
function mostrarAlerta(selector, mensaje, tipo = "danger") {
  const alerta = document.querySelector(selector);
  if (!alerta) return;
  alerta.className = `alert alert-${tipo}`;
  alerta.textContent = mensaje;
  alerta.classList.remove("d-none");
}
function ocultarAlerta(selector) {
  const alerta = document.querySelector(selector);
  if (!alerta) return;
  alerta.classList.add("d-none");
  alerta.textContent = "";
}
function marcarCampoInvalido(campo, invalido = true) {
  if (!campo) return;
  campo.classList.toggle("is-invalid", Boolean(invalido));
}

function validarFormularioContacto(evento){
  if (evento) evento.preventDefault();
  const formulario = document.getElementById("formularioContacto");
  if (!formulario) return false;

  ocultarAlerta("#alertaFormulario");
  const camposObligatorios = formulario.querySelectorAll("[data-obligatorio='true']");
  const faltantes = [];

  camposObligatorios.forEach(campo => {
    const vacio = (campo.value || '').trim() === '';
    marcarCampoInvalido(campo, vacio);
    if (vacio) faltantes.push(campo.getAttribute('data-nombre') || campo.name);
  });

  if (faltantes.length){
    mostrarAlerta("#alertaFormulario","Debes completar: " + faltantes.join(", "),"warning");
    return false;
  }

  const campoCorreo = formulario.querySelector("#correo");
  if (campoCorreo){
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valido = patron.test(campoCorreo.value.trim());
    marcarCampoInvalido(campoCorreo, !valido);
    if (!valido){
      mostrarAlerta("#alertaFormulario","El correo no tiene un formato válido.","warning");
      return false;
    }
  }

  mostrarAlerta("#alertaFormulario","Formulario válido. ¡Procesando envío!","success");
  return true;
}

function inicializarTablaEstadisticas(){
  const tabla = document.getElementById("tablaEstadisticas");
  const tieneJQ = typeof window.jQuery !== "undefined";
  const tieneDT = tieneJQ && typeof window.jQuery.fn.DataTable !== "undefined";
  if (!tabla || !tieneDT) return;

  window.jQuery(tabla).DataTable({
    pageLength: 10,
    lengthMenu: [5,10,25,50],
    language: { url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json" }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formularioContacto");
  if (formulario){
    document.getElementById("btnProcesar")?.addEventListener("click", validarFormularioContacto);
    formulario.addEventListener("submit", validarFormularioContacto);
  }
  inicializarTablaEstadisticas();
});
