/* admin.js - builds charts on admin dashboard */

document.addEventListener("DOMContentLoaded", () => {
  // Compute users data from localStorage
  const users = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("bm_user_")) {
      users.push(JSON.parse(localStorage.getItem(key)));
    }
  }

  const totalUsers = users.length;
  const premiumCount = users.filter((u) => u.premium).length;

  // Get RSVPs data
  const rsvpsRaw = localStorage.getItem("bm_rsvps");
  const rsvps = rsvpsRaw ? JSON.parse(rsvpsRaw) : [];

  // Today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Count RSVPs for today
  const todayCount = rsvps.filter((r) => r.date === today).length;

  // Count RSVPs per venue for today
  const venueCounts = {};
  (window.BM_VENUES || []).forEach((v) => {
    venueCounts[v.name] = rsvps.filter(
      (r) => r.venueId === v.id && r.date === today
    ).length;
  });

  // Update dashboard stats
  document.getElementById("totalUsers").textContent = totalUsers;
  document.getElementById("todayRsvps").textContent = todayCount;
  document.getElementById("premiumCount").textContent = premiumCount;

  // Most popular venue today
  const popular = Object.entries(venueCounts).sort((a, b) => b[1] - a[1])[0];
  document.getElementById("popularVenue").textContent = popular
    ? `${popular[0]} (${popular[1]})`
    : "—";

  // Prepare data for users growth chart (last 6 months, mock data)
  const months = [];
  const usersData = [];
  for (let m = 5; m >= 0; m--) {
    const d = new Date();
    d.setMonth(d.getMonth() - m);
    months.push(d.toLocaleString("pt-BR", { month: "short" }));
    usersData.push(
      Math.max(
        5,
        Math.round(totalUsers * (0.5 + Math.random() * 0.9) * (1 - m * 0.05))
      )
    );
  }

  // Users line chart
  const ctxUsers = document.getElementById("chartUsers").getContext("2d");
  new Chart(ctxUsers, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Usuários",
          data: usersData,
          borderColor: "#6a11cb",
          backgroundColor: "rgba(106,17,203,0.08)",
          tension: 0.3,
        },
      ],
    },
    options: { responsive: true },
  });

  // Venues bar chart (confirmed RSVPs today)
  const ctxVen = document.getElementById("chartVenues").getContext("2d");
  new Chart(ctxVen, {
    type: "bar",
    data: {
      labels: Object.keys(venueCounts),
      datasets: [
        {
          label: "Confirmados hoje",
          data: Object.values(venueCounts),
          backgroundColor: "#2575fc",
        },
      ],
    },
    options: { responsive: true },
  });

  // Premium users pie chart
  const ctxPie = document.getElementById("chartPremium").getContext("2d");
  new Chart(ctxPie, {
    type: "pie",
    data: {
      labels: ["Gratuitas", "Premium"],
      datasets: [
        {
          data: [totalUsers - premiumCount, premiumCount],
          backgroundColor: ["#cbd5e1", "#6a11cb"],
        },
      ],
    },
    options: { responsive: true },
  });
});
