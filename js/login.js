
function mostrarErro(id, mensagem) {
    document.getElementById(id).textContent = mensagem;
}

function limparMensagens(formulario) {
    const erros = formulario.querySelectorAll(".error");

    erros.forEach(function (erro) {
        erro.textContent = "";
    });
}

function mostrarMensagem(id, mensagem, tipo) {
    const elemento = document.getElementById(id);

    elemento.textContent = mensagem;
    elemento.className = "form-message " + tipo;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    if (resto !== Number(cpf[9])) {
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    return resto === Number(cpf[10]);
}


// MÁSCARA DO CPF

const campoCPF = document.getElementById("cadastroCPF");

if (campoCPF) {
    campoCPF.addEventListener("input", function () {
        let valor = campoCPF.value.replace(/\D/g, "");

        valor = valor.substring(0, 11);

        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        campoCPF.value = valor;
    });
}


// MÁSCARA DO TELEFONE

const campoTelefone = document.getElementById("cadastroTelefone");

if (campoTelefone) {
    campoTelefone.addEventListener("input", function () {
        let valor = campoTelefone.value.replace(/\D/g, "");

        valor = valor.substring(0, 11);

        if (valor.length > 10) {
            valor = valor.replace(/^(\d{2})(\d{5})(\d{1,4}).*/, "($1) $2-$3");
        }
        else if (valor.length > 6) {
            valor = valor.replace(/^(\d{2})(\d{4})(\d{1,4}).*/, "($1) $2-$3");
        }
        else if (valor.length > 2) {
            valor = valor.replace(/^(\d{2})(\d+)/, "($1) $2");
        }
        else if (valor.length > 0) {
            valor = valor.replace(/^(\d+)/, "($1");
        }

        campoTelefone.value = valor;
    });
}


// MOSTRAR E ESCONDER SENHA

const botoesSenha = document.querySelectorAll(".password-toggle");

botoesSenha.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const id = botao.getAttribute("data-target");
        const campo = document.getElementById(id);

        if (campo.type === "password") {
            campo.type = "text";
            botao.textContent = "Ocultar";
        }
        else {
            campo.type = "password";
            botao.textContent = "Mostrar";
        }
    });
});


// CADASTRO

const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (evento) {
        evento.preventDefault();

        limparMensagens(cadastroForm);

        document.getElementById("cadastroMessage").textContent = "";

        const tipo = document.getElementById("userType").value;
        const nome = document.getElementById("cadastroNome").value.trim();
        const cpf = document.getElementById("cadastroCPF").value;
        const telefone = document.getElementById("cadastroTelefone").value;
        const email = document.getElementById("cadastroEmail").value.trim().toLowerCase();
        const senha = document.getElementById("cadastroPassword").value;
        const confirmarSenha = document.getElementById("confirmPassword").value;

        let formularioValido = true;

        if (tipo === "") {
            mostrarErro("userTypeError", "Selecione o tipo de cadastro.");
            formularioValido = false;
        }

        if (nome.length < 3) {
            mostrarErro("cadastroNomeError", "Digite seu nome completo.");
            formularioValido = false;
        }

        if (!validarCPF(cpf)) {
            mostrarErro("cadastroCPFError", "Digite um CPF válido.");
            formularioValido = false;
        }

        const telefoneNumeros = telefone.replace(/\D/g, "");

        if (telefoneNumeros.length !== 10 && telefoneNumeros.length !== 11) {
            mostrarErro("cadastroTelefoneError", "Digite um telefone válido.");
            formularioValido = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            mostrarErro("cadastroEmailError", "Digite um e-mail válido.");
            formularioValido = false;
        }

        if (senha.length < 6) {
            mostrarErro("cadastroPasswordError", "A senha deve ter pelo menos 6 caracteres.");
            formularioValido = false;
        }

        if (confirmarSenha === "" || confirmarSenha !== senha) {
            mostrarErro("confirmPasswordError", "As senhas não coincidem.");
            formularioValido = false;
        }

        if (!formularioValido) {
            mostrarMensagem(
                "cadastroMessage",
                "Confira os campos destacados e tente novamente.",
                "error"
            );
            return;
        }

        const usuarioExistente = JSON.parse(
            localStorage.getItem("lumeUser") || "null"
        );

        if (usuarioExistente && usuarioExistente.email === email) {
            mostrarMensagem(
                "cadastroMessage",
                "Este e-mail já possui uma conta cadastrada.",
                "error"
            );
            return;
        }

        const usuario = {
            name: nome,
            cpf: cpf,
            phone: telefone,
            userType: tipo,
            email: email,
            password: senha
        };

        localStorage.setItem("lumeUser", JSON.stringify(usuario));

        mostrarMensagem(
            "cadastroMessage",
            "Conta criada com sucesso! Você já pode fazer login.",
            "success"
        );

        cadastroForm.reset();
    });
}


// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (evento) {
        evento.preventDefault();

        limparMensagens(loginForm);

        document.getElementById("loginMessage").textContent = "";

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const senha = document.getElementById("loginPassword").value;

        let formularioValido = true;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            mostrarErro("loginEmailError", "Digite um e-mail válido.");
            formularioValido = false;
        }

        if (senha === "") {
            mostrarErro("loginPasswordError", "Digite sua senha.");
            formularioValido = false;
        }

        if (!formularioValido) {
            mostrarMensagem(
                "loginMessage",
                "Preencha os campos corretamente.",
                "error"
            );
            return;
        }

        const usuario = JSON.parse(
            localStorage.getItem("lumeUser") || "null"
        );

        if (!usuario || usuario.email !== email) {
            mostrarMensagem(
                "loginMessage",
                "Não encontramos uma conta com esse e-mail.",
                "error"
            );
            return;
        }

        if (usuario.password !== senha) {
            mostrarMensagem(
                "loginMessage",
                "Senha incorreta.",
                "error"
            );
            return;
        }

        localStorage.setItem(
            "lumeSession",
            JSON.stringify({
                loggedIn: true,
                name: usuario.name,
                email: usuario.email
            })
        );

        mostrarMensagem(
            "loginMessage",
            "Login realizado com sucesso! Entrando...",
            "success"
        );

        setTimeout(function () {
            location.href = "../home.html";
        }, 1000);
    });
}


// ESQUECI MINHA SENHA

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {
    forgotPassword.addEventListener("click", function (evento) {
        evento.preventDefault();

        mostrarMensagem(
            "loginMessage",
            "A recuperação de senha é apenas demonstrativa neste projeto.",
            "error"
        );
    });
}
