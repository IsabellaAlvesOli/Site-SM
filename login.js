document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".password-toggle").forEach((button) => {
        button.addEventListener("click", () => {
            const input = document.getElementById(button.dataset.target);
            const show = input.type === "password";

            input.type = show ? "text" : "password";
            button.textContent = show ? "Ocultar" : "Mostrar";
        });
    });


    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            clearErrors();

            const email = document.getElementById("loginEmail");
            const password = document.getElementById("loginPassword");

            let ok = true;

            if (!email.value.trim()) {
                err(
                    email,
                    "loginEmailError",
                    "Digite seu e-mail."
                );
            } else if (!validEmail(email.value.trim())) {
                err(
                    email,
                    "loginEmailError",
                    "Digite um e-mail válido."
                );
            }

            if (!password.value) {
                err(
                    password,
                    "loginPasswordError",
                    "Digite sua senha."
                );
            } else if (password.value.length < 6) {
                err(
                    password,
                    "loginPasswordError",
                    "A senha deve ter pelo menos 6 caracteres."
                );
            }

            if (document.querySelectorAll(".input-error").length) {
                ok = false;
            }

            if (!ok) {
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
                msg(
                    "Senha incorreta.",
                    "error-message"
                );

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

            msg(
                "Login realizado! Entrando...",
                "success-message"
            );

            setTimeout(() => {
                location.href = "home.html";
            }, 600);
        });
    }


    const cadastroForm = document.getElementById("cadastroForm");

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", (event) => {
            event.preventDefault();

            clearErrors();

            const type = document.getElementById("userType");
            const email = document.getElementById("cadastroEmail");
            const password = document.getElementById("cadastroPassword");
            const confirmPassword =
                document.getElementById("confirmPassword");

            if (!type.value) {
                err(
                    type,
                    "userTypeError",
                    "Selecione uma opção."
                );
            }

            if (!email.value.trim()) {
                err(
                    email,
                    "cadastroEmailError",
                    "Digite seu e-mail."
                );
            } else if (!validEmail(email.value.trim())) {
                err(
                    email,
                    "cadastroEmailError",
                    "Digite um e-mail válido."
                );
            }

            if (!password.value) {
                err(
                    password,
                    "cadastroPasswordError",
                    "Digite uma senha."
                );
            } else if (password.value.length < 6) {
                err(
                    password,
                    "cadastroPasswordError",
                    "A senha deve ter pelo menos 6 caracteres."
                );
            }

            if (!confirmPassword.value) {
                err(
                    confirmPassword,
                    "confirmPasswordError",
                    "Confirme sua senha."
                );
            } else if (password.value !== confirmPassword.value) {
                err(
                    confirmPassword,
                    "confirmPasswordError",
                    "As senhas não coincidem."
                );
            }

            if (
                document.querySelectorAll(".input-error").length
            ) {
                return;
            }

            const mail = email.value.trim().toLowerCase();

            localStorage.setItem(
                "lumeUser",
                JSON.stringify({
                    name: mail.split("@")[0],
                    email: mail,
                    password: password.value,
                    type: type.value
                })
            );

            msg(
                "Conta criada! Redirecionando...",
                "success-message"
            );

            setTimeout(() => {
                location.href = "login.html";
            }, 800);
        });
    }


    const forgotPassword =
        document.getElementById("forgotPassword");

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


function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function err(input, id, text) {
    input.classList.add("input-error");

    document.getElementById(id).textContent = text;
}


function clearErrors() {
    document
        .querySelectorAll(".error")
        .forEach((element) => {
            element.textContent = "";
        });

    document
        .querySelectorAll(".input-error")
        .forEach((element) => {
            element.classList.remove("input-error");
        });

    const message = document.querySelector(".form-message");

    if (message) {
        message.textContent = "";
        message.className = "form-message";
    }
}


function msg(text, className) {
    const message = document.querySelector(".form-message");

    if (message) {
        message.textContent = text;
        message.className =
            "form-message " + className;
    }
}