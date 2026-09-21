
function enviarInscricao() {
    let f = document.IformVoluntario;
 
    let areas = [];
    for (let i = 0; i < f.Iarea.length; i++) {
        if (f.Iarea[i].checked) {
            areas.push(f.Iarea[i].value);
        }
    }
    if (areas.length == 0) {
        alert("Escolha pelo menos uma área de interesse.");
        return false;
    }
 
    let disponibilidade = "";
    for (let i = 0; i < f.Idisponibilidade.length; i++) {
        if (f.Idisponibilidade[i].checked) {
            disponibilidade = f.Idisponibilidade[i].value;
        }
    }
    if (disponibilidade == "") {
        alert("Escolha uma disponibilidade.");
        return false;
    }
 
    let voluntario = {
        nome: f.Inome.value,
        email: f.Iemail.value,
        telefone: f.Itelefone.value,
        areas: areas,
        disponibilidade: disponibilidade,
        experiencia: f.Iexperiencia.value,
        motivacao: f.Imotivacao.value
    };
 
    let lista = JSON.parse(localStorage.getItem("voluntarios")) || [];
    lista.push(voluntario);
    localStorage.setItem("voluntarios", JSON.stringify(lista));
 
    alert("Inscrição enviada com sucesso!");
    f.reset();
    return false;
}
 
function mascaraTelefone(campo) {
    let n = campo.value.replace(/\D/g, "").substring(0, 11);
    if (n.length > 10) {
        n = "(" + n.substring(0, 2) + ") " + n.substring(2, 7) + "-" + n.substring(7);
    } else if (n.length > 6) {
        n = "(" + n.substring(0, 2) + ") " + n.substring(2, 6) + "-" + n.substring(6);
    } else if (n.length > 2) {
        n = "(" + n.substring(0, 2) + ") " + n.substring(2);
    } else if (n.length > 0) {
        n = "(" + n;
    }
    campo.value = n;
}
 
