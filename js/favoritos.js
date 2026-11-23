
var chaveFavoritos = "lumeFavoritos";

// Recupera os favoritos salvos no navegador
var favoritos = [];

try {
    favoritos = JSON.parse(localStorage.getItem(chaveFavoritos)) || [];
} catch (erro) {
    favoritos = [];
}

// Salva a lista atualizada no localStorage
function salvarFavoritos() {

    localStorage.setItem(chaveFavoritos, JSON.stringify(favoritos));

}

// Monta a tabela da página de favoritos
function carregarFavoritos() {

    var lista = document.getElementById("listaFavoritos");

    if (!lista) {
        return;
    }

    var quantidade = document.getElementById("quantidadeFavoritos");
    var mensagemVazia = document.getElementById("mensagemVazia");
    var selecionarTodos = document.getElementById("selecionarTodos");

    lista.innerHTML = "";

    for (var i = 0; i < favoritos.length; i++) {

        lista.innerHTML += `
            <tr>
                <td>
                    <input type="checkbox"
                        class="checkbox-favorito"
                        value="${favoritos[i].id}"
                        aria-label="Selecionar ${favoritos[i].nome}">
                </td>

                <td class="favoritos-nome">
                    ${favoritos[i].nome}
                </td>

                <td>
                    <span class="favoritos-categoria">
                        ${favoritos[i].categoria}
                    </span>
                </td>

                <td>${favoritos[i].fonte}</td>

                <td>${favoritos[i].data}</td>

                <td>
                    <a href="${favoritos[i].url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="favoritos-acessar">
                        Ler artigo →
                    </a>
                </td>
            </tr>
        `;

    }

    quantidade.innerHTML =
        favoritos.length + (favoritos.length === 1 ? " artigo" : " artigos");

    if (favoritos.length === 0) {
        mensagemVazia.style.display = "block";
    } else {
        mensagemVazia.style.display = "none";
    }

    selecionarTodos.checked = false;

    atualizarSelecionados();

}

// Atualiza a quantidade de artigos selecionados
function atualizarSelecionados() {

    var checkboxes = document.querySelectorAll(".checkbox-favorito");

    var totalSelecionados = 0;

    for (var i = 0; i < checkboxes.length; i++) {

        if (checkboxes[i].checked) {
            totalSelecionados++;
        }

    }

    var quantidade = document.getElementById("quantidadeSelecionados");
    var botaoExcluir = document.getElementById("btnExcluirFavoritos");
    var selecionarTodos = document.getElementById("selecionarTodos");

    if (!quantidade || !botaoExcluir || !selecionarTodos) {
        return;
    }

    if (totalSelecionados === 0) {
        quantidade.innerHTML = "Nenhum item selecionado";
    } else {
        quantidade.innerHTML =
            totalSelecionados + " item(ns) selecionado(s)";
    }

    botaoExcluir.disabled = totalSelecionados === 0;

    selecionarTodos.checked =
        checkboxes.length > 0 &&
        totalSelecionados === checkboxes.length;

}

// Seleciona ou desmarca todos os artigos
function configurarSelecao() {

    var selecionarTodos = document.getElementById("selecionarTodos");
    var lista = document.getElementById("listaFavoritos");

    if (!selecionarTodos || !lista) {
        return;
    }

    selecionarTodos.addEventListener("change", function () {

        var checkboxes = document.querySelectorAll(".checkbox-favorito");

        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = selecionarTodos.checked;
        }

        atualizarSelecionados();

    });

    lista.addEventListener("change", function (evento) {

        if (evento.target.classList.contains("checkbox-favorito")) {
            atualizarSelecionados();
        }

    });

}

// Exclui os artigos selecionados
function configurarExclusao() {

    var botaoExcluir = document.getElementById("btnExcluirFavoritos");

    if (!botaoExcluir) {
        return;
    }

    botaoExcluir.addEventListener("click", function () {

        var checkboxes = document.querySelectorAll(".checkbox-favorito");
        var novosFavoritos = [];

        for (var i = 0; i < checkboxes.length; i++) {

            if (!checkboxes[i].checked) {

                for (var j = 0; j < favoritos.length; j++) {

                    if (favoritos[j].id === checkboxes[i].value) {
                        novosFavoritos.push(favoritos[j]);
                    }

                }

            }

        }

        favoritos = novosFavoritos;

        salvarFavoritos();
        carregarFavoritos();

    });

}

// Inicializa as funções da página de favoritos
if (document.getElementById("listaFavoritos")) {

    carregarFavoritos();
    configurarSelecao();
    configurarExclusao();

}
