
$(document).ready(function () {
	$(".push_menu").click(function () {
		$(".wrapper").toggleClass("active");
	});

	//Carga primer elemento
	let primerElemento = window.location.hash ? decodeURIComponent(window.location.hash.replace('#', '')) : $(".menu li a").first().text();
	setCurrentElement(primerElemento.trim());

	$(".menu li a").click(function (e) {
		e.preventDefault(); // Prevent default behavior (following the link)
		let currentElement = $(this).text().trim();
		setCurrentElement(currentElement);
	});

	function setCurrentElement(currentElement){

		// Remove active class from all menu items
		$(".menu li a").removeClass("active");

		// Add active class to the clicked menu item
		$(this).addClass("active");

		$(".contentContainer .title").html(`${$(this).text()}`);

		let currentCategory = descartables.filter((element) => {
			return element.title == currentElement;
		});

		$(".marcasContainer").html("");
		$(".prenav").html("");

		currentCategory[0].logos.map((logo) => {
			let brand = logo.split('/').pop().split('.')[0];
			let message = `Me gustaría obtener información de productos descartables de tipo: ${currentElement}, específicamente de la marca ${brand}`

			$(".marcasContainer").append(
				`<a href="javascript:enviarContact('${message}');" class="logo col-12 col-md-3"><img class="removeBackground" src="${logo}" alt="Logo" /></a>`
			);
		});
		currentCategory[0].items.map((item) => {
			let message = `Me gustaría obtener información del producto descartables: ${item}`

			$(".prenav").append(
				`<li onclick="enviarContact('${message}');" class="col-md-6 col-12" style="cursor:pointer;">${item}</li>`
			);
		});
	}
});
