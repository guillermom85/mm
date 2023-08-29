import { categoriasReactivos } from "../db/reactivos.js";

$(document).ready(function () {
  var navListItems = $("div.setup-panel div a"),
    allWells = $(".setup-content"),
    allNextBtn = $(".nextBtn");

  allWells.hide();

  //Set content

  let reactivosContent = document.getElementById("reactivosContent");
  let marcasContainer = document.getElementById("marcasContainer");
  let tituloMarcas = document.getElementById("tituloMarcas");

  categoriasReactivos.map((categoria) => {
    reactivosContent.innerHTML += `<button class="reactivosButton m-2 btn btn-primary nextBtn pull-right col-md-3 rounded-pill" type="button" id="${categoria.categoria}Button">${categoria.categoria}</button>`;
  });

  let currentElement;

  var reactivosButton = $(".reactivosButton");

  reactivosButton.click((e) => {
    marcasContainer.innerHTML = "";

    e.preventDefault();
    currentElement = e.currentTarget.id;
    currentElement = currentElement.replace("Button", "");
    console.log(currentElement);

    let currentCategory = categoriasReactivos.filter((element) => {
      return element.categoria == currentElement;
    });

    tituloMarcas.innerHTML = `Nuestras Marcas para esta categoría: ${currentCategory[0].categoria}`;

    currentCategory[0].logos.map((logo) => {
      marcasContainer.innerHTML += `<a href="../index.html?mensaje=Hola! Me gustaria consultar sobre la siguiente categoria de productos livianos:%20${currentCategory[0].categoria}#formContacto" class="logo col-3"><img class="removeBackground" src="${logo}" alt="Logo" /></a>`;
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
