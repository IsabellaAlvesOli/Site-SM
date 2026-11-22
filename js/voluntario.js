
function enviarInscricao() {
    let f = document.IformVoluntario;
    let valido = true;

    document.getElementById("mensagem").textContent = "";

    let campos = [
        f.Inome,
        f.Iemail,
        f.Itelefone,
        f.Icpf,
        f.Inascimento,
        f.Icidade,
        f.Iestado,
        f.Iendereco,
        f.Icep,
        f.Inumero,
        f.Iescolaridade,
        f.IdisponibilidadeData,
        f.Ihoras,
        f.Iexperiencia,
        f.Imotivacao
    ];

    for (let i = 0; i < campos.length; i++) {
        if (!validarCampo(campos[i])) {
            valido = false;
        }
    }

    // Áreas de interesse
    let areas = [];

    for (let i = 0; i < f.Iarea.length; i++) {
        if (f.Iarea[i].checked) {
            areas.push(f.Iarea[i].value);
        }
    }

    if (areas.length == 0) {
        document.getElementById("erroArea").textContent =
            "Escolha pelo menos uma área de interesse.";

        for (let i = 0; i < f.Iarea.length; i++) {
            f.Iarea[i].classList.add("is-invalid");
        }

        valido = false;
    } else {
        document.getElementById("erroArea").textContent = "";

        for (let i = 0; i < f.Iarea.length; i++) {
            f.Iarea[i].classList.remove("is-invalid");
        }
    }

    // Disponibilidade
    let disponibilidade = "";

    for (let i = 0; i < f.Idisponibilidade.length; i++) {
        if (f.Idisponibilidade[i].checked) {
            disponibilidade = f.Idisponibilidade[i].value;
        }
    }

    if (disponibilidade == "") {
        document.getElementById("erroDisponibilidade").textContent =
            "Escolha uma disponibilidade.";

        for (let i = 0; i < f.Idisponibilidade.length; i++) {
            f.Idisponibilidade[i].classList.add("is-invalid");
        }

        valido = false;
    } else {
        document.getElementById("erroDisponibilidade").textContent = "";

        for (let i = 0; i < f.Idisponibilidade.length; i++) {
            f.Idisponibilidade[i].classList.remove("is-invalid");
        }
    }

    if (!valido) {
        document.getElementById("mensagem").textContent =
            "Verifique os campos destacados e tente novamente.";

        return false;
    }

    // Dados do voluntário
    let voluntario = {
        nome: f.Inome.value.trim(),
        email: f.Iemail.value.trim(),
        telefone: f.Itelefone.value,
        cpf: f.Icpf.value,
        nascimento: f.Inascimento.value,
        cidade: f.Icidade.value.trim(),
        estado: f.Iestado.value,
        endereco: f.Iendereco.value.trim(),
        cep: f.Icep.value,
        numero: f.Inumero.value,
        escolaridade: f.Iescolaridade.value,
        disponibilidadeData: f.IdisponibilidadeData.value,
        horas: f.Ihoras.value,
        areas: areas,
        disponibilidade: disponibilidade,
        experiencia: f.Iexperiencia.value.trim(),
        motivacao: f.Imotivacao.value.trim()
    };

    let lista = JSON.parse(localStorage.getItem("voluntarios")) || [];

    lista.push(voluntario);

    localStorage.setItem("voluntarios", JSON.stringify(lista));

    f.reset();

    document.getElementById("mensagem").textContent =
        "Inscrição enviada com sucesso!";

    return false;
}


// Validação individual dos campos
function validarCampo(campo) {
    let f = document.IformVoluntario;
    let valor = campo.value.trim();
    let mensagem = "";

    if (campo == f.Inome) {
        if (!validarNome(campo)) {
            mensagem = "Informe seu nome completo, usando pelo menos 3 caracteres.";
        }
    }

    else if (campo == f.Iemail) {
        if (!validarEmail(valor)) {
            mensagem = "Informe um e-mail válido.";
        }
    }
    
    else if (campo == f.Itelefone) {
        let telefone = campo.value.replace(/\D/g, "");

        if (telefone.length != 10 && telefone.length != 11) {
            mensagem = "Informe um telefone válido com DDD.";
        }
    }

    else if (campo == f.Icpf) {
        if (!validarCPF(campo.value)) {
            mensagem = "Informe um CPF válido.";
        }
    }

    else if (campo == f.Inascimento) {
        if (!campo.value || !validarIdade(campo.value)) {
            mensagem = "Você precisa ter pelo menos 18 anos para se inscrever.";
        }
    }

    else if (campo == f.Icidade) {
        if (!validarCidade(campo)) {
            mensagem = "Informe uma cidade válida, sem números.";
        }
    }

    else if (campo == f.Iestado) {
        if (campo.value == "") {
            mensagem = "Selecione seu estado.";
        }
    }

    else if (campo == f.Iendereco) {
        if (valor.length < 3) {
            mensagem = "Informe um endereço com pelo menos 3 caracteres.";
        }
    }

    else if (campo == f.Icep) {
        let cep = campo.value.replace(/\D/g, "");

        if (cep.length != 8) {
            mensagem = "Informe um CEP válido com 8 números.";
        }
    }

    else if (campo == f.Inumero) {
        let numero = Number(campo.value);

        if (campo.value == "" ||
            !Number.isInteger(numero) ||
            numero < 1) {
            mensagem = "Informe um número maior que zero.";
        }
    }

    else if (campo == f.Iescolaridade) {
        if (campo.value == "") {
            mensagem = "Selecione sua escolaridade.";
        }
    }

    else if (campo == f.IdisponibilidadeData) {
        if (!campo.value || !validarDataDisponivel(campo.value)) {
            mensagem = "Escolha uma data entre hoje e os próximos 12 meses.";
        }
    }

    else if (campo == f.Ihoras) {
        let horas = Number(campo.value);

        if (campo.value == "" ||
            !Number.isInteger(horas) ||
            horas < 1 ||
            horas > 40) {
            mensagem = "Informe entre 1 e 40 horas.";
        }
    }

    else if (campo == f.Iexperiencia) {
        if (valor.length < 10) {
            mensagem = "Escreva pelo menos 10 caracteres.";
        }
    }

    else if (campo == f.Imotivacao) {
        if (valor.length < 20) {
            mensagem = "Escreva pelo menos 20 caracteres.";
        }
    }

    if (mensagem != "") {
        mostrarErro(campo, mensagem);
        return false;
    } else {
        limparErro(campo);
        return true;
    }
}


// Consulta o CEP no ViaCEP
function buscarCEP(campo) {
    let cep = campo.value.replace(/\D/g, "");

    if (cep == "") {
        return;
    }

    if (cep.length != 8) {
        mostrarErro(campo, "Informe um CEP válido com 8 números.");
        return;
    }

    limparErro(campo);

    let f = document.IformVoluntario;

    // Indica que a consulta está acontecendo
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");

    fetch("https://viacep.com.br/ws/" + cep + "/json/")
        .then(function(resposta) {
            if (!resposta.ok) {
                throw new Error("Erro na consulta do CEP.");
            }

            return resposta.json();
        })
        .then(function(dados) {
            if (dados.erro) {
                mostrarErro(campo, "CEP não encontrado. Verifique o número informado.");
                campo.classList.remove("is-valid");

                f.Iendereco.value = "";
                f.Icidade.value = "";
                f.Iestado.value = "";

                return;
            }

            // Preenche os campos automaticamente
            let endereco = dados.logradouro;

            if (dados.bairro != "") {
                if (endereco != "") {
                    endereco += " - ";
                }

                endereco += dados.bairro;
            }

            f.Iendereco.value = endereco;
            f.Icidade.value = dados.localidade;
            f.Iestado.value = dados.uf;

            // Remove possíveis erros dos campos preenchidos
            limparErro(f.Iendereco);
            limparErro(f.Icidade);
            limparErro(f.Iestado);

            campo.classList.remove("is-invalid");
            campo.classList.add("is-valid");
        })
        .catch(function() {
            mostrarErro(campo, "Não foi possível consultar o CEP. Tente novamente.");
            campo.classList.remove("is-valid");
        });
}


// Validação do e-mail
function validarEmail(email) {
    let formato = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formato.test(email)) {
        return false;
    }

    if (email.includes("..") || email.startsWith(".") ||
        email.endsWith(".")) {
        return false;
    }

    return true;
}


// Verifica se a pessoa tem pelo menos 18 anos
function validarIdade(dataNascimento) {
    let nascimento = new Date(dataNascimento + "T00:00:00");
    let hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    if (nascimento >= hoje) {
        return false;
    }

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    let mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 ||
        (mes == 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade >= 18;
}


// Verifica se a data de início está entre hoje e 12 meses
function validarDataDisponivel(data) {
    let dataEscolhida = new Date(data + "T00:00:00");
    let hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    let limite = new Date(hoje);
    limite.setFullYear(limite.getFullYear() + 1);

    return dataEscolhida >= hoje && dataEscolhida <= limite;
}


// Validação do nome
function validarNome(campo) {
    campo.value = campo.value.replace(/[^A-Za-zÀ-ÿ\s'-]/g, "");

    return campo.value.trim().length >= 3;
}


// Validação da cidade
function validarCidade(campo) {
    campo.value = campo.value.replace(/[^A-Za-zÀ-ÿ\s'-]/g, "");

    return campo.value.trim().length >= 2;
}


// Máscara do telefone
function mascaraTelefone(campo) {
    let n = campo.value.replace(/\D/g, "").substring(0, 11);

    if (n.length > 10) {
        n = "(" + n.substring(0, 2) + ") " +
            n.substring(2, 7) + "-" + n.substring(7);
    } else if (n.length > 6) {
        n = "(" + n.substring(0, 2) + ") " +
            n.substring(2, 6) + "-" + n.substring(6);
    } else if (n.length > 2) {
        n = "(" + n.substring(0, 2) + ") " + n.substring(2);
    } else if (n.length > 0) {
        n = "(" + n;
    }

    campo.value = n;
}


// Máscara do CPF
function mascaraCPF(campo) {
    let n = campo.value.replace(/\D/g, "").substring(0, 11);

    if (n.length > 9) {
        n = n.substring(0, 3) + "." +
            n.substring(3, 6) + "." +
            n.substring(6, 9) + "-" +
            n.substring(9);
    } else if (n.length > 6) {
        n = n.substring(0, 3) + "." +
            n.substring(3, 6) + "." +
            n.substring(6);
    } else if (n.length > 3) {
        n = n.substring(0, 3) + "." + n.substring(3);
    }

    campo.value = n;
}


// Máscara do CEP
function mascaraCEP(campo) {
    let n = campo.value.replace(/\D/g, "").substring(0, 8);

    if (n.length > 5) {
        n = n.substring(0, 5) + "-" + n.substring(5);
    }

    campo.value = n;

    // Se o CEP for alterado, remove a validação anterior
    campo.classList.remove("is-valid");
}


// Validação do CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length != 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
    }

    resto = (soma * 10) % 11;

    if (resto == 10) {
        resto = 0;
    }

    if (resto != Number(cpf[9])) {
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto == 10) {
        resto = 0;
    }

    return resto == Number(cpf[10]);
}


// Mostra o erro no campo
function mostrarErro(campo, mensagem) {
    campo.classList.add("is-invalid");
    campo.classList.remove("is-valid");

    let feedback = campo.nextElementSibling;

    if (feedback && feedback.classList.contains("invalid-feedback")) {
        feedback.textContent = mensagem;
    }
}


// Remove o erro do campo
function limparErro(campo) {
    campo.classList.remove("is-invalid");

    let feedback = campo.nextElementSibling;

    if (feedback && feedback.classList.contains("invalid-feedback")) {
        feedback.textContent = "";
    }
}


// Configura as validações e a consulta do CEP
document.addEventListener("DOMContentLoaded", function() {
    let f = document.IformVoluntario;

    let campos = [
        f.Inome,
        f.Iemail,
        f.Itelefone,
        f.Icpf,
        f.Inascimento,
        f.Icidade,
        f.Iestado,
        f.Iendereco,
        f.Icep,
        f.Inumero,
        f.Iescolaridade,
        f.IdisponibilidadeData,
        f.Ihoras,
        f.Iexperiencia,
        f.Imotivacao
    ];

    for (let i = 0; i < campos.length; i++) {
        let campo = campos[i];

        campo.addEventListener("blur", function() {
            validarCampo(campo);
        });

        campo.addEventListener("input", function() {
            if (campo.classList.contains("is-invalid")) {
                validarCampo(campo);
            }
        });

        campo.addEventListener("change", function() {
            if (campo.classList.contains("is-invalid")) {
                validarCampo(campo);
            }
        });
    }

    // Consulta o ViaCEP quando sair do campo CEP
    f.Icep.addEventListener("blur", function() {
        buscarCEP(f.Icep);
    });

    // Áreas de interesse
    for (let i = 0; i < f.Iarea.length; i++) {
        f.Iarea[i].addEventListener("change", function() {
            if (this.checked) {
                document.getElementById("erroArea").textContent = "";

                for (let j = 0; j < f.Iarea.length; j++) {
                    f.Iarea[j].classList.remove("is-invalid");
                }
            }
        });
    }

    // Disponibilidade
    for (let i = 0; i < f.Idisponibilidade.length; i++) {
        f.Idisponibilidade[i].addEventListener("change", function() {
            if (this.checked) {
                document.getElementById("erroDisponibilidade").textContent = "";

                for (let j = 0; j < f.Idisponibilidade.length; j++) {
                    f.Idisponibilidade[j].classList.remove("is-invalid");
                }
            }
        });
    }

    // Limpar formulário
    f.addEventListener("reset", function() {
        let todosCampos = f.querySelectorAll("input, select, textarea");

        for (let i = 0; i < todosCampos.length; i++) {
            limparErro(todosCampos[i]);
            todosCampos[i].classList.remove("is-valid");
        }

        document.getElementById("erroArea").textContent = "";
        document.getElementById("erroDisponibilidade").textContent = "";
        document.getElementById("mensagem").textContent = "";

        for (let i = 0; i < f.Iarea.length; i++) {
            f.Iarea[i].classList.remove("is-invalid");
        }

        for (let i = 0; i < f.Idisponibilidade.length; i++) {
            f.Idisponibilidade[i].classList.remove("is-invalid");
        }
    });
});
