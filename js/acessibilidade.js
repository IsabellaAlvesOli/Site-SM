let btnAcessibilidade = document.getElementById("btnAcessibilidade");
let menuAcessibilidade = document.getElementById("menuAcessibilidade");
btnAcessibilidade.addEventListener("click", function () {

    menuAcessibilidade.classList.toggle("aberto");

});

document.getElementById("aumentarFonte").addEventListener("click", function () {

    document.body.style.fontSize = "larger";

});

document.getElementById("diminuirFonte").addEventListener("click", function () {

    document.body.style.fontSize = "smaller";

});

document.getElementById("altoContraste").addEventListener("click", function () {

    document.body.classList.toggle("alto-contraste");

});

document.getElementById("cinza").addEventListener("click", function () {

    document.body.classList.toggle("escala-cinza");

});

document.getElementById("reduzirMovimento").addEventListener("click", function () {

    document.body.classList.toggle("reduzir-movimento");

});

document.getElementById("restaurarAcessibilidade").addEventListener("click", function () {

    document.body.style.fontSize = "";

    document.body.classList.remove("alto-contraste");

    document.body.classList.remove("escala-cinza");

    document.body.classList.remove("reduzir-movimento");

});