import { tiposDeInstrumentales, productos } from "../db/productos.js";

$(document).ready(function () {
  let iterador = 1;

  //referencias
  let filterContainer = document.getElementById("productsFilter");
  let productsContainer = document.getElementsByClassName("containerProductos");
  let buscador = document.getElementsByClassName("searchTerm");

  //renderizado barra de filtros
  tiposDeInstrumentales.forEach((instrumental, index) => {
    filterContainer.innerHTML += `<button
        class="filterButton nav-link d-flex align-items-center text-start py-3 ps-4 borderBottomWhite"
        data-bs-toggle="pill"
        data-bs-target="#tab-pane-1"
        type="button"
        id="button-${iterador}"
      >
        <h3 class="m-0">${instrumental}</h3>
      </button>`;
    iterador += 1;
  });

  //Elementos JQuery
  let filterButton = $(".filterButton");
  let searchButton = $(".searchButton");
  let selectedButton = "";
  let temporalProductos = [];

  //Filtro de produtos con querystring
  //Query string
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  //variables
  let productoActual = urlParams.get("producto");
  if (productoActual?.length > 0) {
    productos.map((producto) => {
      let auxProducto = producto.title.toUpperCase();

      if (auxProducto.includes(productoActual.toUpperCase())) {
        temporalProductos.push(producto);
      }
    });
  } else {
    temporalProductos = productos;
  }

  //renderizado de productos
  temporalProductos.map((producto) => {
    productsContainer[0].innerHTML += `<div class="col-md-4 d-flex flex-column producto" id="producto-${producto.id}" >
          <div class="top" style="background-repeat: no-repeat; background-image: url('${producto.imgUrl}')">&nbsp;</div>
          <div class="bottom p-3">
            <p class="my-1 py-1">${producto.marca}</p>
            <p class="fw-normal my-2" style="font-size: 26px">
              ${producto.title}
            </p>
            <p class="my-1 py-1">${producto.title}</p>
            <p class="my-1 py-1">Categoría: ${producto.categoria}</p>
            <p class="my-1 py-1">Garantía: ${producto.garantia}</p>
            <a href="internaProducto.html?id=${producto.id}">Ver</a>
          </div>
        </div>`;
  });

  //Evento click de filtro
  filterButton.click((e) => {
    selectedButton = `${e.target.innerText.toUpperCase()}`;
    let auxProducts = productos.filter((producto) => {
      if (producto.categoria.toUpperCase() == selectedButton.toUpperCase()) {
        return producto;
      }
    });
    if (selectedButton.toUpperCase() == "TODOS") {
      let htmlToAdd = "";
      productos.map((producto) => {
        htmlToAdd += `<div class="col-md-4 d-flex flex-column producto" id="producto-${producto.id}" >
          <div class="top" style="background-image: url('${producto.imgUrl}')">&nbsp;</div>
          <div class="bottom p-3">
            <p class="my-1 py-1">${producto.marca}</p>
            <p class="fw-normal my-2" style="font-size: 26px">
              ${producto.title}
            </p>
            <p class="my-1 py-1">${producto.title}</p>
            <p class="my-1 py-1">Categoría: ${producto.categoria}</p>
            <p class="my-1 py-1">Garantía: ${producto.garantia}</p>
            <a  href="internaProducto.html?id=${producto.id}">Ver</a>
          </div>
        </div>`;
      });

      productsContainer[0].innerHTML = htmlToAdd;
    } else {
      let htmlToAdd = "";
      auxProducts.map((producto) => {
        htmlToAdd += `<div class="col-md-4 d-flex flex-column producto" id="producto-${producto.id}" >
          <div class="top" style="background-image: url('${producto.imgUrl}')">&nbsp;</div>
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

      productsContainer[0].innerHTML = htmlToAdd;
    }
  });

  //evento click de busqueda
  searchButton.click((e) => {
    window.open(
      `./instrumentalLiviano.html?producto=${buscador[0].value}`,
      "_self"
    );
  });
});
