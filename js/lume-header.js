
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

    links.forEach(function (link) {
        const destino = new URL(link.href, window.location.href);

        if (destino.pathname === paginaAtual &&
            !destino.hash) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

})();
