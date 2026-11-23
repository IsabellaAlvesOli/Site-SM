
(function () {

    const script = document.currentScript;
    const root = script.getAttribute("data-root") || "./";

    const header = `
        <header class="lume-header" aria-label="Cabeçalho principal do Lume">
            <div class="lume-header-inner">

                <a class="lume-brand" href="${root}home.html" aria-label="Lume - Página inicial">
                    <img src="${root}images/logo.png" alt="Lume">
                </a>

                <button type="button" class="lume-menu-btn"
                    aria-label="Abrir menu"
                    aria-expanded="false"
                    aria-controls="lume-nav">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav class="lume-nav" id="lume-nav" aria-label="Navegação principal">
                    <a href="${root}home.html">Início</a>
                    <a href="${root}home.html#function">Como funciona</a>
                    <a href="${root}home.html#project">Projetos</a>
                    <a href="${root}faq.html">FAQ</a>
                    <a href="${root}html/r_index.html">Blogs</a>
                    <a href="${root}html/favoritos.html">Favoritos</a>
                    <a href="${root}html/index.html">Agendamento</a>
                    <a href="${root}html/index_sof.html">Voluntários</a>
                </nav>

                <div class="lume-auth-area">
                    <a class="lume-cta" href="${root}formularios.html">Ser voluntário</a>
                    <a class="lume-login-link" href="${root}html/login.html">Entrar</a>
                </div>

            </div>
        </header>
    `;

    document.body.insertAdjacentHTML("afterbegin", header);

    const links = document.querySelectorAll(".lume-nav a");
    const menuBotao = document.querySelector(".lume-menu-btn");
    const menu = document.querySelector(".lume-nav");
    const paginaAtual = window.location.pathname.toLowerCase();

    function normalizarCaminho(caminho) {

        if (caminho.length > 1 && caminho.endsWith("/")) {
            caminho = caminho.slice(0, -1);
        }

        return caminho;
    }

    function destacarLink(linkAtivo) {

        links.forEach(function (link) {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        });

        if (linkAtivo) {
            linkAtivo.classList.add("active");
            linkAtivo.setAttribute("aria-current", "page");
        }
    }

    // ABRE E FECHA O MENU NO CELULAR

    function fecharMenu() {
        menu.classList.remove("open");
        menuBotao.setAttribute("aria-expanded", "false");
        menuBotao.setAttribute("aria-label", "Abrir menu");
    }

    menuBotao.addEventListener("click", function () {

        const menuAberto = menu.classList.toggle("open");

        menuBotao.setAttribute("aria-expanded", menuAberto);

        if (menuAberto) {
            menuBotao.setAttribute("aria-label", "Fechar menu");
        } else {
            menuBotao.setAttribute("aria-label", "Abrir menu");
        }

    });

    links.forEach(function (link) {

        link.addEventListener("click", function () {
            fecharMenu();
        });

    });

    document.addEventListener("click", function (evento) {

        if (
            !menu.contains(evento.target) &&
            !menuBotao.contains(evento.target)
        ) {
            fecharMenu();
        }

    });

    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape") {
            fecharMenu();
        }

    });

    // IDENTIFICA A PÁGINA ATUAL

    const paginaHome = paginaAtual.endsWith("/home.html") || paginaAtual === "/";

    if (paginaHome) {

        const comoFunciona = document.getElementById("function");
        const projetos = document.getElementById("project");
        const headerMenu = document.querySelector(".lume-header");

        function atualizarMenuAtivo() {

            const limite = headerMenu.offsetHeight + 100;

            let linkAtivo = links[0];

            if (
                projetos &&
                projetos.getBoundingClientRect().top <= limite
            ) {
                linkAtivo = links[2];
            }
            else if (
                comoFunciona &&
                comoFunciona.getBoundingClientRect().top <= limite
            ) {
                linkAtivo = links[1];
            }

            destacarLink(linkAtivo);
        }

        window.addEventListener("scroll", atualizarMenuAtivo);
        window.addEventListener("resize", atualizarMenuAtivo);

        atualizarMenuAtivo();

    } else {

        let linkAtivo = null;

        links.forEach(function (link) {

            const destino = new URL(link.href, window.location.href);

            const caminhoDestino = normalizarCaminho(
                destino.pathname.toLowerCase()
            );

            const caminhoAtual = normalizarCaminho(paginaAtual);

            if (
                caminhoDestino === caminhoAtual &&
                !destino.hash
            ) {
                linkAtivo = link;
            }

        });

        destacarLink(linkAtivo);
    }

})();
