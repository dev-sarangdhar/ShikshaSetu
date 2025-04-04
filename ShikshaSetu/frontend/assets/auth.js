import API from "./api.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const userData = {
        name: document.getElementById("reg-name").value,
        email: document.getElementById("reg-email").value,
        password: document.getElementById("reg-password").value,
        role: document.getElementById("reg-role").value,
    };

    const response = await API.register(userData);
    if (response) {
        alert("Registration Successful! Redirecting to login...");
        window.location.href = "login.html";
    } else {
        alert("Registration Failed!");
    }
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const userData = {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value,
    };

    const response = await API.login(userData);
    if (response?.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Credentials!");
    }
});
