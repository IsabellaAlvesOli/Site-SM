function fazerLogin(form) {
    const email = form.loginEmail.value.trim().toLowerCase();
    const password = form.loginPassword.value;

    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    const user = JSON.parse(
        localStorage.getItem("lumeUser") || "null"
    );

    if (
        user &&
        user.email === email &&
        user.password !== password
    ) {
        alert("Senha incorreta.");
        return false;
    }

    const name =
        user && user.email === email
            ? user.name
            : email.split("@")[0];

    localStorage.setItem(
        "lumeSession",
        JSON.stringify({
            loggedIn: true,
            name: name,
            email: email
        })
    );

    alert("Login realizado! Entrando...");

    location.href = "../home.html";

    return false;
}
