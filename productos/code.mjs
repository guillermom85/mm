import { categoriasReactivos } from "../db/reactivos.js";

$(document).ready(function () {
  let reactivosContent = document.getElementById("reactivosContent");

  categoriasReactivos.map((categoria) => {
    reactivosContent.innerHTML += `<button class="reactivosButton m-2 btn btn-primary nextBtn pull-right col-3 rounded-pill" type="button" id="${categoria.categoria.replace(
      / /g,
      ""
    )}Button">${categoria.categoria}</button>`;
  });

  let currentElement;

  var reactivosButton = $(".reactivosButton");

  reactivosButton.click((e) => {
    e.preventDefault();
    currentElement = e.currentTarget.id;
    currentElement = currentElement.replace("Button", "");
    console.log(currentElement);
  });

  
});
