/* helpers.js */

function createMessageBox(containerSelector = ".card") {
  let container = document.querySelector(containerSelector) || document.body;
  let box = container.querySelector(".message-box");

  if (!box) {
    box = document.createElement("div");
    box.className = "message-box";
    container.prepend(box);
  }

  box.hidden = false;
  return box;
}

function showMessage(box, text, type = "success", timeout = 3000) {
  box.textContent = text;
  box.className = "message-box " + (type === "error" ? "error" : "success");
  box.hidden = false;

  if (timeout) {
    setTimeout(() => {
      box.hidden = true;
    }, timeout);
  }
}

function requireAuthOrRedirect() {
  const email = sessionStorage.getItem("bm_user");
  if (!email) {
    window.location.href = "login.html";
    return null;
  }

  const raw = localStorage.getItem("bm_user_" + email);
  if (!raw) {
    sessionStorage.removeItem("bm_user");
    window.location.href = "login.html";
    return null;
  }

  return JSON.parse(raw);
}
