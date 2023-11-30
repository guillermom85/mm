import { descartables } from "../db/descartables.js";
import { categorias } from "../db/categoriasProductos.js";

(function ($) {

	$('nav .contactenos').append(`<a id="openModalBtn" href="#"><img src="./img/search.png" alt=""></a>`);
	$('body').append(
`<div id="myModal" class="modal">
	<div class="modal-content">
		<input type="text" id="autocompleteInput" autocomplete="off" placeholder="¿Qué producto estabas buscando?">
		<div id="autocompleteResults" class="autocomplete-results"></div>
	</div>
</div>`);

	//Search on modal
	$('#openModalBtn').on('click', function () {
		$('#myModal').css('display', 'block');
		$('#autocompleteResults').empty();
		$('#autocompleteInput').val('');
		$('#autocompleteInput').focus();
	});

	$('#autocompleteInput').on('input', function () {
		// Aquí iría la lógica para el autocompletado, por ejemplo, obtener resultados y mostrarlos en autocompleteResults
		var inputText = $(this).val();
		
		let itemsDescartables = descartables
			.flatMap(x => x.items.map(item => { return { descartable: x.title, item }; }))
			.filter(x => 
				buscarInsensitive(x.descartable, inputText) ||
				buscarInsensitive(x.item, inputText));

		let productos = categorias.flatMap(x => x.productos.map(producto => { return { category: x.title, producto }; }))
			.filter(x =>
				buscarInsensitive(x.category, inputText) ||
				buscarInsensitive(x.producto.title, inputText) ||
				buscarInsensitive(x.producto.brand, inputText) ||
				buscarInsensitive(x.producto.category, inputText) ||
				buscarInsensitive(x.producto.type, inputText));

		var results = [...new Set([...productos, ...itemsDescartables])];

		var autocompleteResults = $('#autocompleteResults');
		autocompleteResults.empty();

		results.sort((a, b) => {
			const titleA = toFullText(a).toLowerCase(); // Convert to lowercase for case-insensitive sorting
			const titleB = toFullText(b).toLowerCase();

			if (titleA < titleB) {
				return -1;
			}
			if (titleA > titleB) {
				return 1;
			}
			return 0;
		}).forEach(function (result) {
			var link = `
			<div onclick="downloadPdf('${result.producto?.pdfUrl ? result.producto.pdfUrl : 'productos/descartables.html#' + encodeURIComponent(result.descartable) }');">
				<img src='${result.producto?.imgUrl ? result.producto.imgUrl : './img/descartablesBg.png'}' alt='${toFullText(result)}' height='50'>
				<span>${toFullText(result)}</span>
			</div>`;
			autocompleteResults.append(link);
		});
	});

	// Cerrar modal al hacer clic fuera del contenido
	$(window).on('click', function (event) {
		if (event.target == $('#myModal')[0]) {
			$('#myModal').css('display', 'none');
		}
	});

})(jQuery);

function buscarInsensitive(texto, busqueda) {
	const regex = new RegExp(busqueda.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'), 'i');
	return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(regex)?.index > -1;
}

function toFullText(entity) {
	
	if(entity.category)
		return `${entity.category} - ${entity.producto.title} (${entity.producto.brand} | ${entity.producto.category} | ${entity.producto.type})`;
	else 
		return `${entity.descartable} - ${entity.item}`;
}

function downloadPdf(url) {
	if (url)
		window.open(url, '_blank');
	else
		alert('No se ha encontrado el PDF para el producto seleccionado');

	$('#myModal').css('display', 'none');
}

