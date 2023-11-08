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


function sendMessage() {

  let errorMessage = isInvalidMessage();
  if (errorMessage) {
    $('#formResult').css('color', 'red');
    $('#formResult').html(errorMessage)
    return;
  }

  var formData = {
    "Nombre": $('#inputNombre').val(),
    "Email": $('#inputCorreo').val(),
    "Telefono": $('#inputTelefono').val(),
    "Mensaje": $('#inputMensaje').val(),
  };

  $.ajax({
    url: "http://181.13.244.114:8065/api/Security/Contact",
    type: "POST",
    data: JSON.stringify({
      "Json": JSON.stringify(formData),
      "Message": "La siguiente información ha sida enviada desde el sitio web.",
      "Subject": `Contacto - Sitio Web (${$('#inputNombre').val()} ${new Intl.DateTimeFormat('es-ES').format(new Date())})`,
      "Token": "fOf/ws?0BafNc/0iy0Fm=I0q3DS6YIwOsih19CjMrcf2arybPerW1KPjn9-mF8jD"
    }),
    contentType: "application/json; charset=utf-8",
    success: function () {
      $('#inputNombre').val('');
      $('#inputCorreo').val('');
      $('#inputTelefono').val('');
      $('#inputMensaje').val('');
      $('#formResult').css('color', 'green');
      $('#formResult').html('Gracias por contactarse con nosotros.');
    }
  });
}

function isInvalidMessage() {
  let result = '';

  if (!$('#inputNombre').val()) {
    result += 'El nombre es requerido<br>';
    $('#inputNombre').css('border', '1px solid red');
  } else {
    $('#inputNombre').css('border', '');
  }

  const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  if (!$('#inputCorreo').val()) {
    result += 'El correo electrónico es requerido<br>';
    $('#inputCorreo').css('border', '1px solid red');
  } else if (!regex.test($('#inputCorreo').val())) {
    result += 'El correo electrónico no es válido<br>';
    $('#inputCorreo').css('border', '1px solid red');
  } else {
    $('#inputCorreo').css('border', '');
  }

  if (!$('#inputTelefono').val()) {
    result += 'El teléfono es requerido<br>';
    $('#inputTelefono').css('border', '1px solid red');
  } else if (isNaN($('#inputTelefono').val())) {
    result += 'El teléfono no es válido (ingresar solo dígitos)<br>';
    $('#inputTelefono').css('border', '1px solid red');
  } else {
    $('#inputTelefono').css('border', '');
  }

  

  if (!$('#inputMensaje').val()) {
    result += 'El mensaje es requerido<br>';
    $('#inputMensaje').css('border', '1px solid red');
  } else {
    $('#inputMensaje').css('border', '');
  }

  return result;
}