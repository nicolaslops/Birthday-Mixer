/* contacts.js for dashboard */

function renderContactRequests() {
  const ul = document.getElementById("contactRequests");
  if (!ul) return;

  ul.innerHTML = "";

  const email = sessionStorage.getItem("bm_user");
  if (!email) return;

  const raw = localStorage.getItem("bm_contact_requests");
  if (!raw) {
    ul.innerHTML =
      '<li class="muted-small">Nenhuma solicitação no momento.</li>';
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  const requests = JSON.parse(raw).filter((r) => r.date === today);

  const rsvpsRaw = localStorage.getItem("bm_rsvps");
  const rsvps = rsvpsRaw ? JSON.parse(rsvpsRaw) : [];

  const myVenues = rsvps
    .filter((rr) => rr.email === email && rr.date === today)
    .map((rr) => rr.venueId);

  const incoming = requests.filter((req) => myVenues.includes(req.venueId));

  if (incoming.length === 0) {
    ul.innerHTML =
      '<li class="muted-small">Nenhuma solicitação no momento.</li>';
    return;
  }

  incoming.forEach((req) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>De:</strong> ${req.from}
        <div class="muted-small">${req.message}</div>
      </div>
      <div class="contact-actions">
        <button class="btn-small" data-id="${req.id}" data-action="accept">Aceitar</button>
        <button class="btn-small-secondary" data-id="${req.id}" data-action="reject">Rejeitar</button>
      </div>
    `;
    ul.appendChild(li);
  });

  ul.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const action = button.dataset.action;
      processRequest(id, action);
    });
  });
}

function processRequest(id, action) {
  const raw = localStorage.getItem("bm_contact_requests");
  if (!raw) return;

  let requests = JSON.parse(raw);
  const idx = requests.findIndex((r) => r.id === id);
  if (idx === -1) return;

  if (action === "accept") {
    const req = requests[idx];
    const from = JSON.parse(localStorage.getItem("bm_user_" + req.from));
    const toEmail = sessionStorage.getItem("bm_user");
    const to = JSON.parse(localStorage.getItem("bm_user_" + toEmail));

    from.contacts = from.contacts || [];
    to.contacts = to.contacts || [];

    from.contacts.push({
      email: toEmail,
      acceptedAt: new Date().toISOString(),
    });
    to.contacts.push({ email: req.from, acceptedAt: new Date().toISOString() });

    localStorage.setItem("bm_user_" + req.from, JSON.stringify(from));
    localStorage.setItem("bm_user_" + toEmail, JSON.stringify(to));

    requests[idx].status = "accepted";
    localStorage.setItem("bm_contact_requests", JSON.stringify(requests));

    showMessage(createMessageBox(), "Solicitação aceita", "success");
    renderContactRequests();
  } else {
    requests[idx].status = "rejected";
    localStorage.setItem("bm_contact_requests", JSON.stringify(requests));

    showMessage(createMessageBox(), "Solicitação rejeitada", "success");
    renderContactRequests();
  }
}

window.renderContactRequests = renderContactRequests;
document.addEventListener("DOMContentLoaded", renderContactRequests);
