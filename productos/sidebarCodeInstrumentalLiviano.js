$(document).ready(function () {
	$(".push_menu").click(function () {
		$(".wrapper").toggleClass("active");
	});

	//Carga primer elemento
	let primerElemento = $(".menu li a").first();
	primerElemento.addClass("active");
	$(".contentContainer .title").html(`${primerElemento.text()}`);
	let firstElement = primerElemento.text().trim();
	let firstCategory = categoriasInstrumentalLiviano.filter((element) => {
		return element.categoria == firstElement;
	});
	$(".marcasContainer").html("");
	firstCategory[0].logos.map((logo) => {
		let brand = logo.split('/').pop().split('.')[0];
		let message = `Me gustaría obtener información de productos de instrumental liviano de tipo: ${firstElement}, específicamente de la marca ${brand}`

		$(".marcasContainer").append(
			`<a href="javascript:enviarContact('${message}');" class="logo col-12 col-md-3"><img class="removeBackground" src="${logo}" alt="Logo" /></a>`
		);
	});

	$(".menu li a").click(function (e) {
		// Remove active class from all menu items
		$(".menu li a").removeClass("active");

		// Add active class to the clicked menu item
		$(this).addClass("active");

		$(".contentContainer .title").html(`${$(this).text()}`);

		let currentElement = $(this).text().trim();
		let currentCategory = categoriasInstrumentalLiviano.filter((element) => {
			return element.categoria == currentElement;
		});

		$(".marcasContainer").html("");

		currentCategory[0].logos.map((logo) => {
			let brand = logo.split('/').pop().split('.')[0];
			let message = `Me gustaría obtener información de productos de instrumental liviano de tipo: ${currentElement}, específicamente de la marca ${brand}`

			$(".marcasContainer").append(
				`<a href="javascript:enviarContact('${message}');" class="logo col-12 col-md-3"><img class="removeBackground" src="${logo}" alt="Logo" /></a>`
			);
		});
	});
});
