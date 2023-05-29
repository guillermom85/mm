$(document).ready(function () {
  let inputNombre = $("#inputNombre")[0];
  let inputCorreo = $("#inputCorreo")[0];
  let inputTelefono = $("#inputTelefono")[0];
  let inputLocalidad = $("#inputLocalidad")[0];
  let inputProvincia = $("#inputProvincia")[0];
  let inputMensaje = $("#inputMensaje")[0];

  let nombre = "";
  let correo = "";
  let telefono = "";
  let localidad = "";
  let provincia = "";
  let mensaje = "";

  $("#inputNombre").on("change", function () {
    nombre = $(this).val();
    console.log(nombre);
  });

  $("#inputCorreo").on("change", function () {
    correo = $(this).val();
    console.log(correo);
  });

  $("#inputTelefono").on("change", function () {
    telefono = $(this).val();
    console.log(telefono);
  });

  $("#inputLocalidad").on("change", function () {
    localidad = $(this).val();
    console.log(localidad);
  });

  $("#inputProvincia").on("change", function () {
    provincia = $(this).val();
    console.log(provincia);
  });

  $("#inputMensaje").on("change", function () {
    mensaje = $(this).val();
    console.log(mensaje);
  });
});
