/* main.js - Birthday Mixer Professional with Animated Messages */

class Auth {
  constructor() {
    this.email = sessionStorage.getItem("bm_user");
    this.user = this.getUserData(this.email);
    this.checkAccess();
  }

  getUserData(email) {
    if (!email) return null;
    const raw = localStorage.getItem(`bm_user_${email}`);
    return raw ? JSON.parse(raw) : null;
  }

  checkAccess() {
    if (!this.email || !this.user) {
      sessionStorage.removeItem("bm_user");
      window.location.href = "login.html";
      return;
    }

    if (this.email === "admin@mix.com") {
      window.location.href = "admin.html";
    }
  }
}

class UI {
  static showMessage(container, message, type = "success", duration = 2500) {
    const msg = document.createElement("div");
    msg.className = `message-box ${type} fade-in`;
    msg.textContent = message;

    container.prepend(msg);

    // Fade out after duration
    setTimeout(() => {
      msg.classList.add("fade-out");
      msg.addEventListener("transitionend", () => msg.remove());
    }, duration);
  }

  static updateWelcome(user) {
    const welcomeTitle = document.getElementById("welcomeTitle");
    const userInfo = document.getElementById("userInfo");

    if (welcomeTitle) welcomeTitle.textContent = `Olá, ${user.name}!`;
    if (userInfo)
      userInfo.textContent = `Seu aniversário: ${user.birthdate} — Conta: ${
        user.premium ? "Premium" : "Gratuita"
      }`;
  }

  static updateBirthdayStats(listId = "birthdayList") {
    const list = document.getElementById(listId);
    if (!list) return;

    const rsvps = JSON.parse(localStorage.getItem("bm_rsvps") || "[]");
    const today = new Date().toISOString().split("T")[0];

    const birthdayRsvps = rsvps.filter((r) => r.date === today && r.isBirthday);
    const total = birthdayRsvps.length;

    const ages = birthdayRsvps
      .map((r) => {
        const userData = JSON.parse(
          localStorage.getItem(`bm_user_${r.email}`) || "{}"
        );
        return userData.birthdate
          ? new Date().getFullYear() -
              new Date(userData.birthdate).getFullYear()
          : null;
      })
      .filter(Boolean);

    const avg = ages.length
      ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length)
      : "-";

    list.innerHTML = `<li>Presenças de aniversariantes confirmadas hoje: <strong>${total}</strong> (idade média: <strong>${avg}</strong>)</li>`;
  }
}

class App {
  constructor() {
    this.auth = new Auth();
    this.user = this.auth.user;
    this.init();
  }

  init() {
    UI.updateWelcome(this.user);
    UI.updateBirthdayStats();

    this.setupLogout();
    this.setupUpgrade();
  }

  setupLogout() {
    const logoutLink = document.getElementById("logoutLink");
    if (!logoutLink) return;

    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.removeItem("bm_user");
      window.location.href = "login.html";
    });
  }

  setupUpgrade() {
    const upgradeBtn = document.getElementById("upgradeBtn");
    if (!upgradeBtn) return;

    upgradeBtn.textContent = this.user.premium
      ? "Você é Premium"
      : "Tornar-me Premium";

    upgradeBtn.addEventListener("click", () => {
      const container = document.querySelector(".card") || document.body;

      if (this.user.premium) {
        UI.showMessage(container, "Você já é premium!", "error");
        return;
      }

      if (confirm("Simular pagamento R$29,90?")) {
        this.user.premium = true;
        localStorage.setItem(
          `bm_user_${this.user.email}`,
          JSON.stringify(this.user)
        );
        UI.showMessage(container, "Upgrade aplicado com sucesso!", "success");
        setTimeout(() => location.reload(), 1200);
      }
    });
  }
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
