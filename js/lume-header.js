
var scriptAtual = document.currentScript;
var root = scriptAtual.getAttribute("data-root") || "./";

var cabecalho = `
<header class="lume-header">
    <div class="lume-header-inner">

        <a href="${root}home.html" class="lume-brand">
            <img src="${root}images/logo.png" alt="Lume">
        </a>

        <input type="checkbox" id="lume-menu-toggle"
            class="lume-menu-toggle" style="display:none;">

        <button class="lume-menu-btn" type="button"
            aria-label="Abrir menu"
            aria-expanded="false"
            aria-controls="lume-nav">
            <span>☰</span>
        </button>

        <nav class="lume-nav" id="lume-nav">
            <a href="${root}home.html">Início</a>
            <a href="${root}home.html#function">Como funciona</a>
            <a href="${root}home.html#project">Projetos</a>
            <a href="${root}faq.html">FAQ</a>
            <a href="${root}html/r_index.html">Blogs</a>
            <a href="${root}html/favoritos.html">Meus favoritos</a>
            <a href="${root}html/index.html">Agendamento</a>
            <a href="${root}html/index_sof.html">Voluntários</a>
        </nav>

        <div class="lume-auth-area">
            <a href="${root}formularios.html" class="lume-cta">
                Seja voluntário
            </a>

            <a href="${root}html/login.html" class="lume-login-link">
                Entrar
            </a>
        </div>

    </div>
</header>
`;

document.body.insertAdjacentHTML("afterbegin", cabecalho);

var botaoMenu = document.querySelector(".lume-menu-btn");
var menu = document.querySelector(".lume-nav");

botaoMenu.addEventListener("click", function() {
    menu.classList.toggle("open");

    if (menu.classList.contains("open")) {
        botaoMenu.setAttribute("aria-expanded", "true");
        botaoMenu.setAttribute("aria-label", "Fechar menu");
    } else {
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");
    }
});

var linksMenu = menu.querySelectorAll("a");

linksMenu.forEach(function(link) {
    link.addEventListener("click", function() {
        menu.classList.remove("open");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");
    });
});

var paginaAtual = window.location.pathname;

linksMenu.forEach(function(link) {
    var endereco = new URL(link.href).pathname;

    if (paginaAtual === endereco) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});
