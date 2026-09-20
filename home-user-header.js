document.addEventListener("DOMContentLoaded", () => {
    const s = JSON.parse(
        localStorage.getItem("lumeSession") || "null"
    );

    const userArea = document.querySelector(".lume-user-area");

    if (!userArea || !s || !s.loggedIn) {
        return;
    }

    userArea.innerHTML = `
        <img
            src="assets/avatar-padrao.svg"
            alt="Imagem do usuário"
            class="lume-user-avatar"
        >
        <span class="lume-user-name">${escapeHTML(s.name)}</span>
    `;

    function escapeHTML(value) {
        return value.replace(/[<>&"']/g, (char) => {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }[char];
        });
    }
});