
function enviarInscricao() {
    let f = document.IformVoluntario;
    let valido = true;

    document.getElementById("mensagem").textContent = "";

    // Nome
    if (!validarNome(f.Inome)) {
        mostrarErro(f.Inome, "Informe seu nome completo, usando pelo menos 3 caracteres.");
        valido = false;
    } else {
        limparErro(f.Inome);
    }

    // Email
    if (f.Iemail.value.trim() == "" || !f.Iemail.checkValidity()) {
        mostrarErro(f.Iemail, "Informe um e-mail válido.");
        valido = false;
    } else {
        limparErro(f.Iemail);
    }

    // Telefone
    let telefone = f.Itelefone.value.replace(/\D/g, "");

    if (telefone.length != 10 && telefone.length != 11) {
        mostrarErro(f.Itelefone, "Informe um telefone válido com DDD.");
        valido = false;
    } else {
        limparErro(f.Itelefone);
    }

    // CPF
    if (!validarCPF(f.Icpf.value)) {
        mostrarErro(f.Icpf, "Informe um CPF válido.");
        valido = false;
    } else {
        limparErro(f.Icpf);
    }

    // Data de nascimento
    let nascimento = f.Inascimento.value;
    let hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    if (!nascimento || new Date(nascimento + "T00:00:00") >= hoje) {
        mostrarErro(f.Inascimento, "Informe uma data de nascimento anterior a hoje.");
        valido = false;
    } else {
        limparErro(f.Inascimento);
    }

    // CEP
    let cep = f.Icep.value.replace(/\D/g, "");

    if (cep.length != 8) {
        mostrarErro(f.Icep, "Informe um CEP válido com 8 números.");
        valido = false;
    } else {
        limparErro(f.Icep);
    }

    // Cidade
    if (!validarCidade(f.Icidade)) {
        mostrarErro(f.Icidade, "Informe uma cidade válida, sem números.");
        valido = false;
    } else {
        limparErro(f.Icidade);
    }

    // Estado
    if (f.Iestado.value == "") {
        mostrarErro(f.Iestado, "Selecione seu estado.");
        valido = false;
    } else {
        limparErro(f.Iestado);
    }

    // Endereço
    if (f.Iendereco.value.trim().length < 3) {
        mostrarErro(f.Iendereco, "Informe um endereço com pelo menos 3 caracteres.");
        valido = false;
    } else {
        limparErro(f.Iendereco);
    }

    // Número da residência
    if (f.Inumero.value == "" ||
        !Number.isInteger(Number(f.Inumero.value)) ||
        Number(f.Inumero.value) < 1) {

        mostrarErro(f.Inumero, "Informe um número maior que zero.");
        valido = false;
    } else {
        limparErro(f.Inumero);
    }

    // Escolaridade
    if (f.Iescolaridade.value == "") {
        mostrarErro(f.Iescolaridade, "Selecione sua escolaridade.");
        valido = false;
    } else {
        limparErro(f.Iescolaridade);
    }

    // Data disponível para começar
    let dataDisponivel = f.IdisponibilidadeData.value;

    if (!dataDisponivel ||
        new Date(dataDisponivel + "T00:00:00") < hoje) {

        mostrarErro(f.IdisponibilidadeData, "Escolha hoje ou uma data futura.");
        valido = false;
    } else {
        limparErro(f.IdisponibilidadeData);
    }

    // Horas semanais
    let horas = Number(f.Ihoras.value);

    if (f.Ihoras.value == "" ||
        !Number.isInteger(horas) ||
        horas < 1 ||
        horas > 40) {

        mostrarErro(f.Ihoras, "Informe entre 1 e 40 horas.");
        valido = false;
    } else {
        limparErro(f.Ihoras);
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

    // Experiência
    if (f.Iexperiencia.value.trim().length < 10) {
        mostrarErro(f.Iexperiencia, "Escreva pelo menos 10 caracteres.");
        valido = false;
    } else {
        limparErro(f.Iexperiencia);
    }

    // Motivação
    if (f.Imotivacao.value.trim().length < 20) {
        mostrarErro(f.Imotivacao, "Escreva pelo menos 20 caracteres.");
        valido = false;
    } else {
        limparErro(f.Imotivacao);
    }

    // Impede o envio se houver algum erro
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
        cep: f.Icep.value,
        cidade: f.Icidade.value.trim(),
        estado: f.Iestado.value,
        endereco: f.Iendereco.value.trim(),
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

                f.Iendereco.value = "";
                f.Icidade.value = "";
                f.Iestado.value = "";

                return;
            }

            let endereco = dados.logradouro || "";

            if (dados.bairro) {
                if (endereco != "") {
                    endereco += " - ";
                }

                endereco += dados.bairro;
            }

            f.Iendereco.value = endereco;
            f.Icidade.value = dados.localidade || "";
            f.Iestado.value = dados.uf || "";

            limparErro(f.Iendereco);
            limparErro(f.Icidade);
            limparErro(f.Iestado);
            limparErro(campo);

        })
        .catch(function() {
            mostrarErro(campo, "Não foi possível consultar o CEP. Tente novamente.");
        });
}


// Verifica se o CPF é válido
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


// Eventos do formulário
document.addEventListener("DOMContentLoaded", function() {
    let f = document.IformVoluntario;

    // Consulta o CEP quando o usuário sair do campo
    f.Icep.addEventListener("blur", function() {
        buscarCEP(f.Icep);
    });

    // Limpa as mensagens e os destaques ao clicar em Limpar Campos
    f.addEventListener("reset", function() {
        let campos = f.querySelectorAll("input, select, textarea");

        for (let campo of campos) {
            limparErro(campo);
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

    // Remove o erro das áreas quando uma opção for selecionada
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

    // Remove o erro da disponibilidade quando uma opção for selecionada
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
});
