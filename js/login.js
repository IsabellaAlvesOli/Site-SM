
document.addEventListener("DOMContentLoaded", () => {

    // Mostrar e ocultar senha
    document.querySelectorAll(".password-toggle").forEach((button) => {
        button.addEventListener("click", () => {
            const input = document.getElementById(button.dataset.target);
            const show = input.type === "password";

            input.type = show ? "text" : "password";
            button.textContent = show ? "Ocultar" : "Mostrar";
        });
    });


    // Máscara de CPF
    const campoCPF = document.getElementById("cadastroCPF");

    if (campoCPF) {
        campoCPF.addEventListener("input", () => {
            campoCPF.value = mascaraCPF(campoCPF.value);
        });
    }


    // Máscara de telefone
    const campoTelefone = document.getElementById("cadastroTelefone");

    if (campoTelefone) {
        campoTelefone.addEventListener("input", () => {
            campoTelefone.value = mascaraTelefone(campoTelefone.value);
        });
    }


    // LOGIN
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            clearErrors();

            const email = document.getElementById("loginEmail");
            const password = document.getElementById("loginPassword");

            if (!email.value.trim()) {
                err(email, "loginEmailError", "Digite seu e-mail.");
            } else if (!validEmail(email.value.trim())) {
                err(email, "loginEmailError", "Digite um e-mail válido.");
            }

            if (!password.value) {
                err(password, "loginPasswordError", "Digite sua senha.");
            } else if (password.value.length < 6) {
                err(password, "loginPasswordError",
                    "A senha deve ter pelo menos 6 caracteres.");
            }

            if (loginForm.querySelectorAll(".input-error").length > 0) {
                return;
            }

            const user = JSON.parse(
                localStorage.getItem("lumeUser") || "null"
            );

            const mail = email.value.trim().toLowerCase();

            if (
                user &&
                user.email === mail &&
                user.password !== password.value
            ) {
                msg("Senha incorreta.", "error-message");
                return;
            }

            const name =
                user && user.email === mail
                    ? user.name
                    : mail.split("@")[0];

            localStorage.setItem(
                "lumeSession",
                JSON.stringify({
                    loggedIn: true,
                    name: name,
                    email: mail
                })
            );

            msg("Login realizado! Entrando...", "success-message");

            setTimeout(() => {
                location.href = window.location.pathname.includes("/html/")
                    ? "../home.html"
                    : "home.html";
            }, 600);
        });
    }


    // CADASTRO
    const cadastroForm = document.getElementById("cadastroForm");

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", (event) => {
            event.preventDefault();

            clearErrors();

            const type = document.getElementById("userType");
            const name = document.getElementById("cadastroNome");
            const cpf = document.getElementById("cadastroCPF");
            const telefone = document.getElementById("cadastroTelefone");
            const email = document.getElementById("cadastroEmail");
            const password = document.getElementById("cadastroPassword");
            const confirmPassword = document.getElementById("confirmPassword");

            if (!type.value) {
                err(type, "userTypeError", "Selecione uma opção.");
            }

            if (!name.value.trim()) {
                err(name, "cadastroNomeError", "Digite seu nome completo.");
            } else if (name.value.trim().length < 3) {
                err(name, "cadastroNomeError",
                    "O nome deve ter pelo menos 3 caracteres.");
            }

            if (!cpf.value.trim()) {
                err(cpf, "cadastroCPFError", "Digite seu CPF.");
            } else if (!validCPF(cpf.value)) {
                err(cpf, "cadastroCPFError", "Digite um CPF válido.");
            }

            if (!telefone.value.trim()) {
                err(telefone, "cadastroTelefoneError", "Digite seu telefone.");
            } else if (!validTelefone(telefone.value)) {
                err(telefone, "cadastroTelefoneError",
                    "Digite um telefone válido com DDD.");
            }

            if (!email.value.trim()) {
                err(email, "cadastroEmailError", "Digite seu e-mail.");
            } else if (!validEmail(email.value.trim())) {
                err(email, "cadastroEmailError", "Digite um e-mail válido.");
            }

            if (!password.value) {
                err(password, "cadastroPasswordError", "Digite uma senha.");
            } else if (password.value.length < 6) {
                err(password, "cadastroPasswordError",
                    "A senha deve ter pelo menos 6 caracteres.");
            }

            if (!confirmPassword.value) {
                err(confirmPassword, "confirmPasswordError",
                    "Confirme sua senha.");
            } else if (password.value !== confirmPassword.value) {
                err(confirmPassword, "confirmPasswordError",
                    "As senhas não coincidem.");
            }

            if (cadastroForm.querySelectorAll(".input-error").length > 0) {
                return;
            }

            const mail = email.value.trim().toLowerCase();

            localStorage.setItem(
                "lumeUser",
                JSON.stringify({
                    name: name.value.trim(),
                    cpf: cpf.value,
                    telefone: telefone.value,
                    email: mail,
                    password: password.value,
                    type: type.value
                })
            );

            msg("Conta criada! Redirecionando...", "success-message");

            setTimeout(() => {
                location.href = window.location.pathname.includes("/html/")
                    ? "login.html"
                    : "html/login.html";
            }, 800);
        });
    }


    // Recuperação demonstrativa de senha
    const forgotPassword = document.getElementById("forgotPassword");

    if (forgotPassword) {
        forgotPassword.addEventListener("click", (event) => {
            event.preventDefault();

            msg(
                "A recuperação de senha é apenas demonstrativa neste projeto.",
                "error-message"
            );
        });
    }

});


// Máscara de CPF
function mascaraCPF(valor) {
    let numeros = valor.replace(/\D/g, "").substring(0, 11);

    numeros = numeros.replace(/(\d{3})(\d)/, "$1.$2");
    numeros = numeros.replace(/(\d{3})(\d)/, "$1.$2");
    numeros = numeros.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return numeros;
}


// Máscara de telefone
function mascaraTelefone(valor) {
    let numeros = valor.replace(/\D/g, "").substring(0, 11);

    if (numeros.length > 10) {
        numeros = numeros.replace(/^(\d{2})(\d)/, "($1) $2");
        numeros = numeros.replace(/(\d{5})(\d)/, "$1-$2");
    } else {
        numeros = numeros.replace(/^(\d{2})(\d)/, "($1) $2");
        numeros = numeros.replace(/(\d{4})(\d)/, "$1-$2");
    }

    return numeros;
}


// Validar CPF
function validCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    return resto === parseInt(cpf.charAt(10));
}


// Validar telefone
function validTelefone(telefone) {
    const numeros = telefone.replace(/\D/g, "");

    return numeros.length === 10 || numeros.length === 11;
}


// Validar e-mail
function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// Mostrar erro no campo
function err(input, id, texto) {
    input.classList.add("input-error");
    document.getElementById(id).textContent = texto;
}


// Limpar mensagens e erros
function clearErrors() {
    document.querySelectorAll(".error").forEach((element) => {
        element.textContent = "";
    });

    document.querySelectorAll(".input-error").forEach((element) => {
        element.classList.remove("input-error");
    });

    document.querySelectorAll(".form-message").forEach((message) => {
        message.textContent = "";
        message.className = "form-message";
    });
}


// Exibir mensagem geral
function msg(text, className) {
    const message = document.querySelector(".form-message");

    if (message) {
        message.textContent = text;
        message.className = "form-message " + className;
    }
}
