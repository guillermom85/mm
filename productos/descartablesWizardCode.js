/* import { descartables } from "../db/descartables.js";

$(document).ready(function () {
	var navListItems = $("div.setup-panel div a"),
		allWells = $(".setup-content"),
		allNextBtn = $(".nextBtn");

	allWells.hide();

	//Set content

	let reactivosContent = document.getElementById("reactivosContent");
	let marcasContainer = document.getElementById("marcasContainer");
	let tituloMarcas = document.getElementById("tituloMarcas");

	descartables.forEach((descartable) => {
		let items = "";
		let buttonContent = `<button class="reactivosButton m-2 btn btn-primary nextBtn pull-right rounded-pill" type="button" id="${descartable.title}Button">${descartable.title}</button>`;

		descartable.items.forEach((item) => {
			items += `<p class="blueItems text-center ms-4 py-1 my-0">${item}</p>`;
		});
		reactivosContent.innerHTML += `<div class="d-flex flex-column justify-content-center col-12 col-md-3">${buttonContent}<div class="d-flex flex-column align-items-start">${items}</div></div>`;
	});

	let currentElement;

	var reactivosButton = $(".reactivosButton");

	reactivosButton.click((e) => {
		marcasContainer.innerHTML = "";

		e.preventDefault();
		currentElement = e.currentTarget.id;
		currentElement = currentElement.replace("Button", "");
		console.log(currentElement);

		let currentCategory = descartables.filter((element) => {
			return element.title == currentElement;
		});

		tituloMarcas.innerHTML = `Nuestras Marcas para esta categoría: ${currentCategory[0].title}`;

		currentCategory[0].logos.map((logo) => {
			marcasContainer.innerHTML += `<a href="#" class="logo col-3"><img class="removeBackground" src="${logo}" alt="Logo" /></a>`;
		});
	});

	navListItems.click(function (e) {
		e.preventDefault();
		var $target = $($(this).attr("href")),
			$item = $(this);

		if (!$item.hasClass("disabled")) {
			navListItems.removeClass("btn-success").addClass("btn-default");
			$item.addClass("btn-success");
			allWells.hide();
			$target.show();
			$target.find("input:eq(0)").focus();
		}
	});

	reactivosButton.click(function () {
		var curStep = $(this).closest(".setup-content"),
			curStepBtn = curStep.attr("id"),
			nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]')
				.parent()
				.next()
				.children("a"),
			curInputs = curStep.find("input[type='text'],input[type='url']"),
			isValid = true;

		$(".form-group").removeClass("has-error");
		for (var i = 0; i < curInputs.length; i++) {
			if (!curInputs[i].validity.valid) {
				isValid = false;
				$(curInputs[i]).closest(".form-group").addClass("has-error");
			}
		}

		if (isValid) nextStepWizard.removeAttr("disabled").trigger("click");
	});

	$("div.setup-panel div a.btn-success").trigger("click");

	//Content
});
 */