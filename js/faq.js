
document.addEventListener("DOMContentLoaded", function () {

    const btnEmergencia = document.getElementById("btnEmergencia");
    const mensagemEmergencia = document.getElementById("mensagemEmergencia");

    const btnPesquisar = document.getElementById("btnPesquisar");
    const areaPesquisa = document.getElementById("areaPesquisa");
    const campoPesquisa = document.getElementById("campoPesquisa");
    const confirmarPesquisa = document.getElementById("confirmarPesquisa");
    const resultadoPesquisa = document.getElementById("resultadoPesquisa");

    const btnContato = document.getElementById("btnContato");
    const areaContato = document.getElementById("areaContato");
    const campoNome = document.getElementById("campoNome");
    const confirmarContato = document.getElementById("confirmarContato");
    const resultadoContato = document.getElementById("resultadoContato");

    const mensagemAvaliacao = document.getElementById("mensagemAvaliacao");

    btnEmergencia.addEventListener("click", function () {
        mensagemEmergencia.hidden = !mensagemEmergencia.hidden;
    });

    btnPesquisar.addEventListener("click", function () {
        areaPesquisa.hidden = !areaPesquisa.hidden;
        areaContato.hidden = true;
        campoPesquisa.focus();
    });

    confirmarPesquisa.addEventListener("click", procurarPergunta);

    campoPesquisa.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            procurarPergunta();
        }
    });

    btnContato.addEventListener("click", function () {
        areaContato.hidden = !areaContato.hidden;
        areaPesquisa.hidden = true;
        campoNome.focus();
    });

    confirmarContato.addEventListener("click", contatoVoluntario);

    campoNome.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            contatoVoluntario();
        }
    });

    document.querySelectorAll(".estrelas label").forEach(function (estrela) {
        estrela.addEventListener("click", function () {
            avaliarFAQ(Number(estrela.dataset.nota));
        });
    });

    function procurarPergunta() {

        let pergunta = campoPesquisa.value.trim().toLowerCase();

        if (pergunta === "") {
            resultadoPesquisa.textContent = "Digite uma palavra para pesquisar.";
            return;
        }

        let perguntas = document.querySelectorAll(".m-faq-item");
        let encontrou = false;

        perguntas.forEach(function (item) {

            let texto = item.querySelector("summary").textContent.toLowerCase();

            if (texto.indexOf(pergunta) >= 0) {
                item.open = true;
                encontrou = true;
            }

        });

        if (encontrou) {
            resultadoPesquisa.textContent = "Encontramos uma pergunta relacionada à sua pesquisa.";
        } else {
            resultadoPesquisa.textContent = "Não encontramos uma pergunta relacionada a essa palavra.";
        }

    }

    function contatoVoluntario() {

        let nome = campoNome.value.trim();

        if (nome === "") {
            resultadoContato.textContent = "Nome não informado.";
        } else {
            resultadoContato.textContent = "Olá, " + nome + "! Para entrar em contato com um voluntário, acesse a página de voluntários.";

            let link = document.createElement("a");
            link.href = "html/index_sof.html";
            link.textContent = " Acessar página de voluntários";

            resultadoContato.appendChild(link);
        }

    }

    function avaliarFAQ(nota) {

        if (nota === 1) {
            mensagemAvaliacao.textContent = "Você avaliou a FAQ com 1 estrela. Sentimos que sua experiência não foi tão boa. Obrigado pelo feedback!";
        } else if (nota === 2) {
            mensagemAvaliacao.textContent = "Você avaliou a FAQ com 2 estrelas. Obrigado pelo feedback! Vamos buscar melhorar a experiência.";
        } else if (nota === 3) {
            mensagemAvaliacao.textContent = "Você avaliou a FAQ com 3 estrelas. Obrigado pelo feedback! Sua opinião é importante para nós.";
        } else if (nota === 4) {
            mensagemAvaliacao.textContent = "Você avaliou a FAQ com 4 estrelas. Ficamos felizes com sua avaliação! Obrigado pelo feedback!";
        } else if (nota === 5) {
            mensagemAvaliacao.textContent = "Você avaliou a FAQ com 5 estrelas. Ficamos muito felizes que você gostou! Obrigado pelo feedback!";
        }

    }

});
