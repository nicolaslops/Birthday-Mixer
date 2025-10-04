/* auth.js */

async function sha256(text) {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function saveUser(user) {
  localStorage.setItem("bm_user_" + user.email, JSON.stringify(user));
}

function loadUser(email) {
  const raw = localStorage.getItem("bm_user_" + email);
  return raw ? JSON.parse(raw) : null;
}

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const birthdate = document.getElementById("birthdate").value;
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;
      const agree = document.getElementById("agree").checked;
      const box = createMessageBox(".auth-card");

      if (!agree) {
        showMessage(box, "Você precisa concordar com os termos.", "error");
        return;
      }

      if (!name || !birthdate || !email || password.length < 6) {
        showMessage(box, "Preencha todos os campos corretamente.", "error");
        return;
      }

      const age = Math.floor(
        (Date.now() - new Date(birthdate).getTime()) /
          (365.25 * 24 * 3600 * 1000)
      );

      if (age < 16) {
        showMessage(box, "Você deve ter 16 anos ou mais.", "error");
        return;
      }

      if (loadUser(email)) {
        showMessage(box, "E-mail já cadastrado. Faça login.", "error");
        return;
      }

      const hash = await sha256(password);
      const user = {
        name,
        email,
        birthdate,
        passhash: hash,
        premium: false,
        createdAt: new Date().toISOString(),
        contacts: [],
        requests: [],
      };

      saveUser(user);
      showMessage(
        box,
        "Conta criada com sucesso! Redirecionando...",
        "success",
        1200
      );

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1200);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;
      const box = createMessageBox(".auth-card");

      // Admin shortcut
      if (email === "admin@mix.com" && password === "admin123") {
        sessionStorage.setItem("bm_user", "admin@mix.com");
        showMessage(box, "Entrando como admin...", "success", 800);
        setTimeout(() => {
          window.location.href = "admin.html";
        }, 800);
        return;
      }

      const user = loadUser(email);
      if (!user) {
        showMessage(box, "Credenciais inválidas.", "error");
        return;
      }

      const hash = await sha256(password);
      if (hash !== user.passhash) {
        showMessage(box, "Credenciais inválidas.", "error");
        return;
      }

      sessionStorage.setItem("bm_user", email);
      showMessage(box, "Login bem-sucedido! Entrando...", "success", 800);

      setTimeout(() => {
        window.location.href = "main.html";
      }, 800);
    });
  }
});
