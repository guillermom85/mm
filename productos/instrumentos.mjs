import { categorias } from "../db/categoriasProductos.js";

function generateCategory(data) {
	return `
    <div class="d-flex flex-row align-items-center justify-content-start col-12 col-md-4 mt-4">
      <img src="${data.imgUrl}" alt="" style="width: 40px; height: 40px; background-color: ${data.hexColor};">
      <p class="ms-2 categoryTitle pb-0 mb-0">${data.title}</p>
    </div>
  `;
}

function replaceURLParameter(url, paramName, newValue) {
	// Parse the URL to get the current parameters
	var urlParts = url.split("?");
	var baseURL = urlParts[0];
	var params = urlParts[1] ? urlParts[1].split("&") : [];

	// Create a new set of parameters with the updated value
	var updatedParams = params.map(function (param) {
		var parts = param.split("=");
		var name = parts[0];
		var value = parts[1];
		if (name === paramName) {
			return paramName + "=" + newValue;
		} else {
			return param;
		}
	});

	// Reconstruct the URL
	var updatedURL = baseURL + "?" + updatedParams.join("&");

	return updatedURL;
}

function generateProduct(data) {
	return `
  <div class="col-12 col-md-3">
    <div class="d-flex flex-row containerProducto p-2 m-2">
      <img src="${data.imgUrl}" alt="" />
      <div class="d-flex flex-column detailsContainer">
        <p class="productName my-0 pe-3">${data.title}</p>
        <p class="productBrand my-0">${data.brand}</p>
        <p class="productCategory my-0">${data.category}</p>
        <p class="productType my-0">${data.type}</p>
        <a class="pdfButton mb-0 py-1 px-4 mt-2" href="${data.pdfUrl}">VER PDF</a>
      </div>
    </div>
  </div> 
`;
}

// Loop through the array and append the HTML code to the container
$(document).ready(function () {
	const searchParams = new URLSearchParams(window.location.search);

	var container = $(".productosSection");
	var parent = $(".parentContainer"); // Get the container element

	//Chequea si existe una categoria prefiltrada
	if (searchParams.get("category")?.length > 0) {
		let currentCategory = categorias.filter(
			(category) => category.title == searchParams.get("category")
		);

		parent.prepend(`<div class="search mx-auto mt-3">
    <input
      type="text"
      class="searchTerm ps-2"
      placeholder="¿Que estabas buscando?"
    />
    <button type="submit" class="searchButton">
      <i class="fa fa-search"></i>
    </button>
  </div> <div
  class="d-flex flex-row productsMainTitle align-items-center justify-content-center my-4 mx-5 pb-4"
>
  <img
    style="background-color: ${currentCategory[0].hexColor}; width: 40px"
    src="${currentCategory[0].imgUrl}"
    alt=""
  />
  <p class="ms-3 my-0">${currentCategory[0].title}</p>
</div>`);
		parent.prepend(`<a class="d-flex flex-row align-items-center ms-5 mt-5" href="./instrumentalLiviano.html">
<img style="width: 20px; height: 20px;" src="../img/backArrow.png" alt="Back arrow" class="me-2" />
<p class="py-0 my-0" style="font-weight: 500;">Atrás</p>
</a>`);

		parent.append(``);

		let categoriasIniciales = categorias.filter(
			(category) => category.title == searchParams.get("category")
		)[0];
		let categoriaFiltradas;

		if (searchParams.get("filterParam")?.length > 0) {
			// Define the substring you want to filter by
			let targetSubstring = searchParams.get("filterParam");
			// Use the Array.prototype.filter() method to filter products by title containing the target substring
			let filteredProducts = categoriasIniciales.productos.filter(function (
				product
			) {
				return product.title
					.toLowerCase()
					.includes(targetSubstring.toLowerCase());
			});

			console.log(filteredProducts);
			categoriasIniciales.productos = filteredProducts;
			categoriaFiltradas = categoriasIniciales;
		} else {
			categoriaFiltradas = categoriasIniciales;
		}

		categoriaFiltradas.productos.forEach((product) => {
			let productHTML = generateProduct(product);
			container.append(productHTML);
		});
	} else {
		categorias.forEach(function (data) {
			var html = generateCategory(data); // Create HTML code for the current data
			container.append(html); // Append it to the container
		});
		parent.prepend(`<div
    class="d-flex flex-row productsMainTitle align-items-center justify-content-center my-4 mx-5 pb-4"
  >
    <img
      style="width: 40px"
      src="../img/iconosNuevos/Instrumentos.png"
      alt=""
    />
    <p class="ms-3 my-0">Productos</p>
  </div>`);
	}

	$(".categoryTitle").click((event) => {
		var selectedElement = event.currentTarget.innerHTML;
		var filterQueryString = `?category=${selectedElement}`;

		var currentURL = window.location.href;
		// Check if the URL already contains a query string
		if (currentURL.indexOf("?") !== -1) {
			// If it does, remove the existing query string
			currentURL = currentURL.split("?")[0];
		}

		// Combine the current URL and the new query string
		var newURL = currentURL + filterQueryString;

		// Redirect the page to the new URL with the query string
		window.location.href = newURL;
	});

	//Evento de clickeo de botón de busqueda
	$(".searchButton").click((event) => {
		let newURL;
		if (window.location.href.indexOf("filterParam") > 0) {
			newURL = replaceURLParameter(
				window.location.href,
				"filterParam",
				$(".searchTerm").val()
			);

			window.location.href = newURL;
		} else {
			window.location.href =
				window.location.href + "&filterParam=" + $(".searchTerm").val();
		}
	});
});

/* $(document).ready(function () {
	let iterador = 1;

	//referencias
	let filterContainer = document.getElementById("productsFilter");
	var categoriesContainer = $(".productosSection");
	let buscador = document.getElementsByClassName("searchTerm");

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

	//renderizado de categorias
	categorias.map((producto) => {
		categoriesContainer.append(`<div class="d-flex flex-row align-items-center justify-content-center col-4 mt-4">
    <img src="${producto.imgUrl}" alt="" style="width: 40px; height: 40px; background-color: ${producto.hexColor};">
    <p class="ms-2 categoryTitle pb-0 mb-0">${producto.title}</p>
  </div>`);
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
}); */
