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
    url: "https://clientes-api.mediomedico.com.ar/api/Security/Contact",
    type: "POST",
    crossDomain: true,
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

function goToWhatsapp() {

  var number = '+543412798316';
  var url = (isMobileDevice() ? 'whatsapp://send?phone=' : 'https://web.whatsapp.com/send?phone=') + number;
  window.open(url, '_blank').focus();

};

function isMobileDevice() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};