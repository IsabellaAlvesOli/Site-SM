
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

    // Destaca a página atual no menu
    const links = document.querySelectorAll(".lume-nav a");
    const paginaAtual = window.location.pathname;
    const caminhoHome = new URL(root + "home.html", window.location.href).pathname;

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

    // Verifica se está na página inicial
    if (paginaAtual === caminhoHome) {

        const inicio = document.getElementById("first");
        const comoFunciona = document.getElementById("function");
        const projetos = document.getElementById("project");

        const headerMenu = document.querySelector(".lume-header");

        function atualizarMenuAtivo() {
            const posicao = window.scrollY + headerMenu.offsetHeight + 100;

            let secaoAtual = "inicio";

            if (posicao >= projetos.offsetTop) {
                secaoAtual = "projetos";
            }
            else if (posicao >= comoFunciona.offsetTop) {
                secaoAtual = "funciona";
            }

            links.forEach(function (link) {
                const destino = new URL(link.href, window.location.href);

                if (secaoAtual == "inicio" &&
                    destino.pathname === caminhoHome &&
                    destino.hash == "") {
                    destacarLink(link);
                }

                else if (secaoAtual == "funciona" &&
                    destino.pathname === caminhoHome &&
                    destino.hash == "#function") {
                    destacarLink(link);
                }

                else if (secaoAtual == "projetos" &&
                    destino.pathname === caminhoHome &&
                    destino.hash == "#project") {
                    destacarLink(link);
                }
            });
        }

        window.addEventListener("scroll", atualizarMenuAtivo);
        window.addEventListener("resize", atualizarMenuAtivo);
        window.addEventListener("load", atualizarMenuAtivo);

        atualizarMenuAtivo();

    } else {

        // Nas outras páginas, destaca o link correspondente
        links.forEach(function (link) {
            const destino = new URL(link.href, window.location.href);

            if (destino.pathname === paginaAtual && !destino.hash) {
                destacarLink(link);
            }
        });
    }

})();
