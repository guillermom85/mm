import { descartables } from "../db/descartables.js";

$(document).ready(function () {
	$(".push_menu").click(function () {
		$(".wrapper").toggleClass("active");
	});

	//Carga primer elemento
	let primerElemento = $(".menu li a").first();
	primerElemento.addClass("active");
	$(".contentContainer .title").html(`${primerElemento.text()}`);
	let firstElement = primerElemento.text().trim();
	let firstCategory = descartables.filter((element) => {
		return element.title == firstElement;
	});
	$(".marcasContainer").html("");
	firstCategory[0].logos.map((logo) => {
		$(".marcasContainer").append(
			`<a href="../index.html?mensaje=Hola! quería consultar sobre un producto de ${firstCategory[0].title}#formContacto" class="logo col-12 col-md-5 mt-0 pt-0"><img class="removeBackground" src="${logo}" alt="Logo" /></a>`
		);
	});
	firstCategory[0].items.map((item) => {
		$(".prenav").append(
			`<li class="col-md-6 col-12">${item}</li>`
		);
	});

	$(".menu li a").click(function (e) {
		e.preventDefault(); // Prevent default behavior (following the link)

		// Remove active class from all menu items
		$(".menu li a").removeClass("active");

		// Add active class to the clicked menu item
		$(this).addClass("active");

		$(".contentContainer .title").html(`${$(this).text()}`);

		let currentElement = $(this).text().trim();
		let currentCategory = descartables.filter((element) => {
			return element.title == currentElement;
		});

		$(".marcasContainer").html("");
		$(".prenav").html("");

		currentCategory[0].logos.map((logo) => {
			$(".marcasContainer").append(
				`<a href="../index.html?mensaje=Hola! quería consultar sobre un producto de ${currentCategory[0].title}#formContacto" class="logo col-12 col-md-5 mt-0 pt-0"><img class="removeBackground" src="${logo}" alt="Logo" /></a>`
			);
		});
		currentCategory[0].items.map((item) => {
			$(".prenav").append(
				`<li class="col-md-6 col-12">${item}</li>`
			);
		});
	});
});
