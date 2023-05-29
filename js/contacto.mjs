$(document).ready(function () {
  //Inputs ref
  let inputNombre = $("#inputNombre")[0];
  let inputCorreo = $("#inputCorreo")[0];
  let inputTelefono = $("#inputTelefono")[0];
  let inputMensaje = $("#inputMensaje")[0];

  //Query string
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  //variables
  const nombre = urlParams.get("nombre");
  const correo = urlParams.get("correo");
  const telefono = urlParams.get("telefono");
  const mensaje = urlParams.get("mensaje");

  //set values
  inputNombre.value = nombre;
  inputCorreo.value = correo;
  inputTelefono.value = telefono;
  inputMensaje.value = mensaje;
});
