
var chaveFavoritos = "lumeFavoritos";

// Recupera os favoritos salvos no navegador
var favoritos = JSON.parse(localStorage.getItem(chaveFavoritos)) || [];

// Cria artigos de exemplo usando um vetor estático
if (favoritos.length === 0 && localStorage.getItem("lumeFavoritosDemoCarregados") !== "sim") {

    favoritos = [
        {
            id: "artigo1",
            nome: "A importância de cuidar da saúde mental",
            categoria: "Saúde mental",
            fonte: "Lume",
            url: "r_index.html",
            data: "22/11/2026"
        },
        {
            id: "artigo2",
            nome: "Como lidar com a ansiedade no dia a dia",
            categoria: "Ansiedade",
            fonte: "Lume",
            url: "r_index.html",
            data: "22/11/2026"
        },
        {
            id: "artigo3",
            nome: "A importância do autocuidado",
            categoria: "Autocuidado",
            fonte: "Lume",
            url: "r_index.html",
            data: "22/11/2026"
        },
        {
            id: "artigo4",
            nome: "Como reconhecer suas emoções",
            categoria: "Emoções",
            fonte: "Lume",
            url: "r_index.html",
            data: "22/11/2026"
        }
    ];

    salvarFavoritos();

    localStorage.setItem("lumeFavoritosDemoCarregados", "sim");
}

// Salva a lista atualizada no localStorage
function salvarFavoritos() {
    localStorage.setItem(chaveFavoritos, JSON.stringify(favoritos));
}

// Verifica quais artigos já estão salvos e atualiza os botões
function atualizarBotoes() {

    var botoes = document.querySelectorAll(".blog-salvar");

    for (var i = 0; i < botoes.length; i++) {

        var artigo = botoes[i].closest(".blog-card");
        var id = artigo.dataset.id;

        var encontrado = false;

        for (var j = 0; j < favoritos.length; j++) {
            if (favoritos[j].id === id) {
                encontrado = true;
            }
        }

        if (encontrado) {
            botoes[i].innerHTML = "♥ Salvo nos favoritos";
            botoes[i].classList.add("salvo");
        } else {
            botoes[i].innerHTML = "♡ Salvar nos favoritos";
            botoes[i].classList.remove("salvo");
        }
    }
}

// Adiciona ou remove um artigo dos favoritos
function configurarBotoes() {

    var botoes = document.querySelectorAll(".blog-salvar");

    for (var i = 0; i < botoes.length; i++) {

        botoes[i].addEventListener("click", function () {

            var artigo = this.closest(".blog-card");
            var id = artigo.dataset.id;
            var encontrado = false;

            for (var j = 0; j < favoritos.length; j++) {

                if (favoritos[j].id === id) {
                    encontrado = true;
                }

            }

            if (encontrado) {

                favoritos = favoritos.filter(function (item) {
                    return item.id !== id;
                });

            } else {

                var novoFavorito = {
                    id: id,
                    nome: artigo.dataset.title,
                    categoria: artigo.dataset.category,
                    fonte: artigo.dataset.source,
                    url: artigo.dataset.url,
                    data: new Date().toLocaleDateString("pt-BR")
                };

                favoritos.push(novoFavorito);

            }

            salvarFavoritos();
            atualizarBotoes();

        });

    }

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

// Verifica em qual página o usuário está
if (document.querySelector(".blog-lista")) {
    configurarBotoes();
    atualizarBotoes();
}

if (document.getElementById("listaFavoritos")) {
    carregarFavoritos();
    configurarSelecao();
    configurarExclusao();
}
