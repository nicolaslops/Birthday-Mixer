/* venues.js */

// Venue data
const BM_VENUES = [
  {
    id: 1,
    name: "Bar do Porto",
    desc: "Música ao vivo, petiscos",
    price: 45,
    capacity: 120,
    coords: { lat: -23.555, lng: -46.64 },
  },
  {
    id: 2,
    name: "Club 88",
    desc: "Pista, DJ",
    price: 60,
    capacity: 200,
    coords: { lat: -23.545, lng: -46.63 },
  },
  {
    id: 3,
    name: "Cervejaria Central",
    desc: "Ambiente descolado",
    price: 35,
    capacity: 80,
    coords: { lat: -23.56, lng: -46.62 },
  },
];

/**
 * Retrieves the RSVP count for a specific venue on the current date.
 * @param {number} venueId - The ID of the venue.
 * @returns {number} The number of RSVPs for the venue today.
 */
function rsvpCountForVenue(venueId) {
  const key = "bm_rsvps";
  const raw = localStorage.getItem(key);
  if (!raw) return 0;

  try {
    const all = JSON.parse(raw);
    const today = new Date().toISOString().split("T")[0];
    return all.filter((r) => r.venueId === venueId && r.date === today).length;
  } catch (e) {
    return 0;
  }
}

/**
 * Renders the list of venues in the DOM.
 */
function renderVenueList() {
  const ul = document.getElementById("venueList");
  if (!ul) return;

  ul.innerHTML = "";

  BM_VENUES.forEach((v) => {
    const li = document.createElement("li");
    const count = rsvpCountForVenue(v.id);

    li.innerHTML = `
      <div>
        <strong>${v.name}</strong>
        <div class="muted-small">${v.desc}</div>
        <small class="muted">Entrada: R$${v.price} • Capacidade: ${v.capacity}</small>
      </div>
      <div>
        <div class="muted-small">Aniversariantes hoje: <strong>${count}</strong></div>
        <button class="btn-small" data-id="${v.id}">Quero ir</button>
        <button class="btn-small-secondary contact-btn" data-id="${v.id}">Pedir contato</button>
      </div>
    `;
    ul.appendChild(li);
  });

  // Add event listeners for RSVP buttons
  document.querySelectorAll(".btn-small").forEach((b) => {
    b.addEventListener("click", () => handleRsvp(parseInt(b.dataset.id)));
  });

  // Add event listeners for contact request buttons
  document.querySelectorAll(".contact-btn").forEach((b) => {
    b.addEventListener("click", () =>
      handleContactRequest(parseInt(b.dataset.id))
    );
  });
}

/**
 * Handles RSVP for a venue.
 * @param {number} venueId - The ID of the venue.
 */
function handleRsvp(venueId) {
  const email = sessionStorage.getItem("bm_user");
  if (!email) {
    alert("Faça login");
    window.location.href = "login.html";
    return;
  }

  const uraw = localStorage.getItem("bm_user_" + email);
  if (!uraw) {
    alert("Conta inválida");
    return;
  }

  const user = JSON.parse(uraw);
  const today = new Date().toISOString().split("T")[0];
  const key = "bm_rsvps";
  const raw = localStorage.getItem(key);
  let arr = raw ? JSON.parse(raw) : [];

  // Check if user already RSVPed today
  if (
    arr.some(
      (r) => r.email === email && r.venueId === venueId && r.date === today
    )
  ) {
    alert("Você já confirmou presença nesse local hoje.");
    return;
  }

  // Add RSVP
  arr.push({
    email,
    venueId,
    date: today,
    createdAt: new Date().toISOString(),
    isBirthday: user.birthdate && user.birthdate.slice(5) === today.slice(5),
  });

  localStorage.setItem(key, JSON.stringify(arr));
  renderVenueList();
  alert("Presença confirmada (protótipo).");
}

/**
 * Handles a contact request for a venue.
 * @param {number} venueId - The ID of the venue.
 */
function handleContactRequest(venueId) {
  const email = sessionStorage.getItem("bm_user");
  if (!email) {
    alert("Faça login");
    window.location.href = "login.html";
    return;
  }

  const key = "bm_contact_requests";
  const raw = localStorage.getItem(key);
  let arr = raw ? JSON.parse(raw) : [];
  const today = new Date().toISOString().split("T")[0];

  // Add contact request
  arr.push({
    id: "req_" + Date.now(),
    from: email,
    venueId,
    date: today,
    message: "Oi! Quer conversar durante o evento?",
    status: "pending",
  });

  localStorage.setItem(key, JSON.stringify(arr));
  alert("Pedido de contato enviado (protótipo).");
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", renderVenueList);
