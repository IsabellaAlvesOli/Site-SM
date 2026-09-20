(function () {
    'use strict';

    var s = document.currentScript;
    var root = s && s.dataset.root || './';

    var links = [
        ['Início', root + 'home.html', 'home'],
        ['Como funciona', root + 'home.html#function', 'function'],
        ['Projetos', root + 'home.html#project', 'project'],
        ['FAQ', root + 'faq.html', 'faq'],
        ['Blogs', root + 'html/r_index.html', 'blog'],
        ['Agendamento', root + 'index.html', 'booking'],
        ['Voluntários', root + 'index_sof.html', 'volunteers']
    ];

    var h = document.createElement('header');
    h.className = 'lume-header';
    h.setAttribute('aria-label', 'Cabeçalho principal do Lume');

    var i = document.createElement('div');
    i.className = 'lume-header-inner';

    var b = document.createElement('a');
    b.className = 'lume-brand';
    b.href = root + 'home.html';
    b.setAttribute('aria-label', 'Lume - Página inicial');

    var img = document.createElement('img');
    img.src = root + 'imgs/logo.png';
    img.alt = 'Lume';
    b.appendChild(img);

    var n = document.createElement('nav');
    n.className = 'lume-nav';
    n.setAttribute('aria-label', 'Navegação principal');

    links.forEach(function (x) {
        var a = document.createElement('a');
        a.href = x[1];
        a.textContent = x[0];
        a.dataset.page = x[2];
        n.appendChild(a);
    });

    var authArea = document.createElement('div');
    authArea.className = 'lume-auth-area';

    var c = document.createElement('a');
    c.className = 'lume-cta';
    c.href = root + 'formularios.html';
    c.textContent = 'Ser voluntário';

    var loginLink = document.createElement('a');
    loginLink.className = 'lume-login-link';
    loginLink.href = root + 'login.html';
    loginLink.textContent = 'Entrar';

    var userArea = document.createElement('div');
    userArea.className = 'lume-user-area';
    userArea.hidden = true;

    var userImg = document.createElement('img');
    userImg.className = 'lume-user-avatar';
    userImg.src = root + 'assets/avatar-padrao.svg';
    userImg.alt = 'Imagem padrão do usuário';

    var userName = document.createElement('span');
    userName.className = 'lume-user-name';

    userArea.append(userImg, userName);
    authArea.append(c, loginLink, userArea);

    var m = document.createElement('button');
    m.className = 'lume-menu-btn';
    m.type = 'button';
    m.setAttribute('aria-label', 'Abrir menu');
    m.setAttribute('aria-expanded', 'false');
    m.innerHTML = '&#9776;';

    i.append(b, n, authArea, m);
    h.appendChild(i);
    document.body.insertBefore(h, document.body.firstChild);

    var p = location.pathname.toLowerCase();
    var cur = 'home';

    if (p.indexOf('index.html') !== -1 && p.indexOf('/html/') === -1) cur = 'booking';
    if (p.indexOf('index_sof') !== -1) cur = 'volunteers';
    if (p.indexOf('faq.html') !== -1) cur = 'faq';
    if (p.indexOf('r_index.html') !== -1) cur = 'blog';

    n.querySelectorAll('a').forEach(function (a) {
        if (a.dataset.page === cur) {
            a.classList.add('active');
            a.setAttribute('aria-current', 'page');
        }
    });

    function updateUserArea() {
        var session = null;
        try {
            session = JSON.parse(localStorage.getItem('lumeSession') || 'null');
        } catch (error) {
            session = null;
        }

        if (session && session.loggedIn) {
            c.hidden = true;
            loginLink.hidden = true;
            userArea.hidden = false;
            userName.textContent = session.name || 'Usuário';
            userImg.src = root + 'assets/avatar-padrao.svg';
            userImg.alt = 'Imagem padrão de ' + (session.name || 'usuário');
        } else {
            c.hidden = false;
            loginLink.hidden = false;
            userArea.hidden = true;
        }
    }

    updateUserArea();

    function close() {
        n.classList.remove('open');
        m.setAttribute('aria-expanded', 'false');
        m.setAttribute('aria-label', 'Abrir menu');
        m.innerHTML = '&#9776;';
    }

    m.addEventListener('click', function (e) {
        e.stopPropagation();
        var o = n.classList.toggle('open');
        m.setAttribute('aria-expanded', String(o));
        m.setAttribute('aria-label', o ? 'Fechar menu' : 'Abrir menu');
        m.innerHTML = o ? '&times;' : '&#9776;';
    });

    n.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', close);
    });

    document.addEventListener('click', function (e) {
        if (!h.contains(e.target)) close();
    });

    function scroll() {
        h.classList.toggle('scrolled', scrollY > 20);
    }

    addEventListener('scroll', scroll, { passive: true });
    addEventListener('storage', updateUserArea);
    scroll();
})();