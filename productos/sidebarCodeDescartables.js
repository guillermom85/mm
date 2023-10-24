import { descartables } from "../db/descartables.js";

$(document).ready(function () {
  $(".push_menu").click(function () {
    $(".wrapper").toggleClass("active");
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

    currentCategory[0].logos.map((logo) => {
      let brand = filePath.split('/').pop().split('.')[0];
      let message = `Me gustaría obtener información de '${currentElement}', específicamente de la marca '${brand}'`
      $(".marcasContainer").append(
        `<a href="javascript:enviarContact('');" class="logo col-12 col-md-3"><img class="removeBackground" src="${logo}" alt="Logo" /></a>`
      );
    });
  });
  $(".contentContainer").prepend(
    `<p class="title fs-1 fw-normal">No se encuentra ningun filtro activo</p>`
  );
});
