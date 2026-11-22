
(function () {

    const script = document.currentScript;
    const root = script.getAttribute("data-root") || "./";

    const header = `
        <header class="lume-header" aria-label="Cabeçalho principal do Lume">
            <div class="lume-header-inner">

                <a class="lume-brand" href="${root}home.html" aria-label="Lume - Página inicial">
                    <img src="${root}images/logo.png" alt="Lume">
                </a>

                <input type="checkbox" id="lume-menu-toggle" class="lume-menu-toggle">

                <label for="lume-menu-toggle" class="lume-menu-btn" aria-label="Abrir menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>

                <nav class="lume-nav" aria-label="Navegação principal">
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
    const paginaAtual = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    function destacarLink(linkAtivo) {

        links.forEach(function (link) {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        });

        if (linkAtivo) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    }

    /* IDENTIFICA A PÁGINA ATUAL */

    if (paginaAtual === "home.html" || paginaAtual === "") {

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

            const destino = new URL(link.href);
            const nomeDestino = destino.pathname
                .split("/")
                .pop()
                .toLowerCase();

            if (nomeDestino === paginaAtual) {
                linkAtivo = link;
            }

        });

        destacarLink(linkAtivo);
    }

    /* FECHA O MENU NO CELULAR */

    const menuToggle = document.getElementById("lume-menu-toggle");

    links.forEach(function (link) {

        link.addEventListener("click", function () {
            menuToggle.checked = false;
        });

    });

})();
