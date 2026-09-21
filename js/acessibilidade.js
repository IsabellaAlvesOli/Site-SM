function abrirMenu() {
    menuAcessibilidade.classList.toggle("aberto");
}

function aumentarFonte() {
    document.body.style.fontSize = "larger";
}

function diminuirFonte() {
    document.body.style.fontSize = "smaller";
}

function altoContraste() {
    document.body.classList.toggle("alto-contraste");
}

function escalaCinza() {
    document.body.classList.toggle("escala-cinza");
}

function reduzirMovimento() {
    document.body.classList.toggle("reduzir-movimento");
}

function restaurarAcessibilidade() {
    document.body.style.fontSize = "";
    document.body.classList.remove("alto-contraste");
    document.body.classList.remove("escala-cinza");
    document.body.classList.remove("reduzir-movimento");
}