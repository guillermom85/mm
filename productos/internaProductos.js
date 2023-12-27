
$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const currentId = urlParams.get("id");
  let containerProducto = document.getElementsByClassName("productoContainer");
  let containerEspecificaciones = document.getElementsByClassName(
    "productoEspecificaciones"
  );

  let producto = productos.filter((producto) => producto.id == currentId);
  producto = producto[0];

  containerProducto[0].innerHTML += ` <div class="col-5 d-flex justify-content-center align-items-center">
          <img style="max-width: 100%" src="${producto.imgUrl}" alt="${producto.title}" />
        </div>
        <div class="d-flex flex-column col-7 mt-5">
          <h2>${producto.title}</h2>
          <h3>${producto.categoria}</h3>          
        </div>`;
  containerEspecificaciones[0].innerHTML += ` <h2>Especificaciones</h2>
      <h3 class="mt-3">Caracteristicas:</h3>
      <p>
        ${producto.caracteristicas}
      </p>
      <h3 class="mt-3">Dimensiones:</h3>
      <p>${producto.dimensiones}</p>`;
});
