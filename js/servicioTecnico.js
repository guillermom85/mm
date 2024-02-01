$(document).ready(function () {
  //Inputs ref
  let inputFechaEnvio = $("#inputFechaEnvio")[0];
  let inputInstrumento = $("#inputInstrumento")[0];
  let inputNroSerie = $("#inputNroSerie")[0];
  let inputMotivo = $("#inputMotivo")[0];
  let inputCables = $("#inputCables")[0];
  let inputTuberias = $("#inputTuberias")[0];
  let inputReactivos = $("#inputReactivos")[0];
  let inputOtros = $("#inputOtros")[0];

  //Query string
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  //variables
  const fechaEnvio = urlParams.get("fechaEnvio");
  const instrumento = urlParams.get("instrumento");
  const nroSerie = urlParams.get("nroSerie");
  const motivo = urlParams.get("motivo");
  const cables = urlParams.get("cables");
  const tuberias = urlParams.get("tuberias");
  const reactivos = urlParams.get("reactivos");
  const otros = urlParams.get("otros");

  //set values
  inputFechaEnvio.value = fechaEnvio;
  inputInstrumento.value = instrumento;
  inputNroSerie.value = nroSerie;
  inputMotivo.value = motivo;
  inputCables.value = cables;
  inputTuberias.value = tuberias;
  inputReactivos.value = reactivos;
  inputOtros.value = otros;
});


function sendMessage() {

  let errorMessage = isInvalidMessage();
  if (errorMessage) {
    $('#formResult').css('color', 'red');
    $('#formResult').html(errorMessage)
    return;
  }

  var formData = {
    "Fecha Envío": $('#inputFechaEnvio').val(),
    "Instrumento": $('#inputInstrumento').val(),
    "Nro. Serie": $('#inputNroSerie').val(),
    "Motivo": $('#inputMotivo').val(),
    "Cables": $('#inputCables').val(),
    "Tuberías": $('#inputTuberias').val(),
    "Reactivos/Consumibles": $('#inputReactivos').val(),
    "Otros": $('#inputOtros').val(),
  };

  $.ajax({
    url: "https://clientes-api.mediomedico.com.ar/api/Security/Contact",
    type: "POST",
    crossDomain: true,
    data: JSON.stringify({
      "Json": JSON.stringify(formData),
      "Message": "La siguiente información ha sida enviada desde el sitio web.",
      "Subject": `Contacto - Sitio Web (Reparación de equipos ${new Intl.DateTimeFormat('es-ES').format(new Date())})`,
      "Token": "fOf/ws?0BafNc/0iy0Fm=I0q3DS6YIwOsih19CjMrcf2arybPerW1KPjn9-mF8jD"
    }),
    contentType: "application/json; charset=utf-8",
    success: function () {
      $('#inputFechaEnvio').val('');
      $('#inputInstrumento').val('');
      $('#inputNroSerie').val('');
      $('#inputMotivo').val('');
      $('#inputCables').val('');
      $('#inputTuberias').val('');
      $('#inputReactivos').val('');
      $('#inputOtros').val('');
      $('#formResult').css('color', 'green');
      $('#formResult').html('Gracias por contactarse con nosotros.');
    }
  });
}

function isInvalidMessage() {
  let result = '';

  //Valida fecha envio
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var fechaEnvio = new Date($("#inputFechaEnvio").val());
  if (fechaEnvio.getTime() < today.getTime()) {
    result += 'La fecha de envío debe ser igual o posterior a hoy.<br>';
    $('#inputFechaEnvio').css('border', '1px solid red');
  } else {
    $('#inputFechaEnvio').css('border', '');
  }

  if (!$('#inputFechaEnvio').val()) {
    result += 'La fecha de envío es requerida.<br>';
    $('#inputFechaEnvio').css('border', '1px solid red');
  } else {
    $('#inputFechaEnvio').css('border', '');
  }

  //Valida instrumento
  if (!$('#inputInstrumento').val()) {
    result += 'El instrumento es requerido.<br>';
    $('#inputInstrumento').css('border', '1px solid red');
  } else {
    $('#inputInstrumento').css('border', '');
  }

  //Valida Nro de serie
  if (!$('#inputNroSerie').val()) {
    result += 'El nro. de serie es requerido.<br>';
    $('#inputNroSerie').css('border', '1px solid red');
  } else {
    $('#inputNroSerie').css('border', '');
  }

  //Valida Motivo
  if (!$('#inputMotivo').val()) {
    result += 'El motivo es requerido.<br>';
    $('#inputMotivo').css('border', '1px solid red');
  } else {
    $('#inputMotivo').css('border', '');
  }
  
  return result;
}