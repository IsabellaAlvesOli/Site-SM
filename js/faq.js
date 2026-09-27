function avisoEmergencia() {

    alert("Em casos de risco imediato, procure um serviço de emergência da sua região ou ligue para o CVV pelo número 188.");

}

function procurarPergunta() {

    let pergunta = prompt("Digite uma palavra para procurar nas perguntas:");

    if (pergunta == null || pergunta == "") {

        alert("Nenhuma palavra foi informada.");

    }

    else {

        pergunta = pergunta.toLowerCase();

        if (pergunta.indexOf("plataforma") >= 0) {

            alert("Existe uma pergunta sobre como funciona a plataforma.");

        }

        else if (pergunta.indexOf("gratuito") >= 0 || pergunta.indexOf("grátis") >= 0) {

            alert("Existe uma pergunta sobre os atendimentos serem gratuitos.");

        }

        else if (pergunta.indexOf("voluntário") >= 0 || pergunta.indexOf("voluntaria") >= 0) {

            alert("Existe uma pergunta sobre como se cadastrar como voluntário.");

        }

        else if (pergunta.indexOf("anonimato") >= 0 || pergunta.indexOf("anônimo") >= 0) {

            alert("Existe uma pergunta sobre o anonimato dos usuários.");

        }

        else if (pergunta.indexOf("emergência") >= 0 || pergunta.indexOf("emergencia") >= 0) {

            alert("Existe uma pergunta sobre atendimento para emergências psicológicas.");

        }

        else {

            alert("Não encontramos uma pergunta relacionada a essa palavra.");

        }

    }

}

function avaliarFAQ(nota) {

    if (nota == 1) {

        alert("Você avaliou a FAQ com 1 estrela. Sentimos que sua experiência não foi tão boa. Obrigado pelo feedback!");

    }

    else if (nota == 2) {

        alert("Você avaliou a FAQ com 2 estrelas. Obrigado pelo feedback! Vamos buscar melhorar a experiência.");

    }

    else if (nota == 3) {

        alert("Você avaliou a FAQ com 3 estrelas. Obrigado pelo feedback! Sua opinião é importante para nós.");

    }

    else if (nota == 4) {

        alert("Você avaliou a FAQ com 4 estrelas. Ficamos felizes com sua avaliação! Obrigado pelo feedback!");

    }

    else if (nota == 5) {

        alert("Você avaliou a FAQ com 5 estrelas. Ficamos muito felizes que você gostou! Obrigado pelo feedback!");

    }

}

function contatoVoluntario() {

    let nome = prompt("Digite seu nome:");

    if (nome == null || nome == "") {

        alert("Nome não informado.");

    }

    else {

        alert("Olá, " + nome + "! Para entrar em contato com um voluntário, acesse a página de voluntários.");

    }

}