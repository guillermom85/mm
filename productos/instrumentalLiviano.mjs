import { tiposDeInstrumentales, productos } from "../db/productos.js";

$(document).ready(function () {
  let iterador = 1;
  let filterContainer = document.getElementById("productsFilter");
  let productsContainer = document.getElementsByClassName("containerProductos");

  tiposDeInstrumentales.forEach((instrumental) => {
    filterContainer.innerHTML += `<button
        class="filterButton nav-link d-flex align-items-center text-start py-3 ps-4"
        data-bs-toggle="pill"
        data-bs-target="#tab-pane-1"
        type="button"
        id="button-${iterador}"
      >
        <h3 class="m-0">${instrumental}</h3>
      </button>`;
    iterador += 1;
  });

  let filterButton = $(".filterButton");
  let selectedButton = "";

  filterButton.click((e) => {
    selectedButton = `${e.target.innerText}`;
    console.log(selectedButton);
  });

  productos.map((producto) => {
    productsContainer[0].innerHTML += `<div class="col-4 d-flex flex-column producto" id="producto-${producto.id}">
          <div class="top">&nbsp;</div>
          <div class="bottom p-3">
            <p class="my-1 py-1">${producto.marca}</p>
            <p class="fw-normal my-2" style="font-size: 26px">
              ${producto.title}
            </p>
            <p class="my-1 py-1">${producto.title}</p>
            <p class="my-1 py-1">Categoría: ${producto.categoria}</p>
            <p class="my-1 py-1">Garantía: ${producto.garantia}</p>
            <a>Ver</a>
          </div>
        </div>`;
  });
});
