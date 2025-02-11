document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio tradicional do formulário

        const email = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;

        // Se ambos os campos estiverem preenchidos, redireciona diretamente
        if (email && password) {
            window.location.href = "index.html"; // Redireciona para a página inicial
        }
    });
});
