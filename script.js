/* ================= MENU ================= */
function toggleMenu() {
  const nav = document.getElementById("navbar");
  if (nav) {
    nav.classList.toggle("active");
  }
}

/* ================= CLOSE MENU ================= */
document.querySelectorAll("#navbar a").forEach(function(link) {
  link.addEventListener("click", function() {
    const nav = document.getElementById("navbar");
    if (nav) nav.classList.remove("active");
  });
});

/* ================= YEAR - SAFE ================= */
document.addEventListener("DOMContentLoaded", function() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  displayPlumberJobs(); // Job list bhi yahi se load hoga
});

/* ================= IMAGE POPUP ================= */
function openImage(image) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  if (!modal || !modalImage) return;
  modalImage.src = image.src;
  modal.style.display = "flex";
}

function closeImage() {
  const modal = document.getElementById("imageModal");
  if (modal) modal.style.display = "none";
}

/* ESC KEY + Bahar Click par band */
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") closeImage();
});
document.getElementById("imageModal")?.addEventListener("click", function(e){
  if(e.target === this) closeImage();
});

/* ================= GALLERY ================= */
function showMorePhotos() {
  alert("यहाँ आप अपनी बाकी 100+ plumbing photos जोड़ सकते हैं।");
}

/* ================= WHATSAPP BOOKING - FIXED ================= */
function sendBooking(event) {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  if(!name || !phone){
    alert("Naam aur Mobile Number jarur bhare");
    return;
  }

  const fullText = `🔧 *Plumber Salim Khan - Service Booking*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n🔧 Service: ${service}\n📝 Message: ${message}`;
  const whatsappNumber = "919166126185";
  const url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(fullText);
  window.open(url, "_blank");
}

/* ================= PLUMBER JOBS ================= */
const plumberJobs = [
  { title: "Senior Plumber", type: "Plumber", location: "Ajmer", exp: "2+ Years", salary: "₹15,000 - ₹22,000 / month", desc: "Bathroom fitting, leakage repair, motor fitting ka pura kaam aana chahiye. Bike honi chahiye." },
  { title: "Plumber Helper / Fresher", type: "Helper", location: "Jaipur", exp: "Fresher bhi chalega", salary: "₹8,000 - ₹12,000 / month", desc: "Senior plumber ke sath kaam karna hai. Kaam sikhne ki iccha ho, mehnati ho." },
  { title: "Plumber + Electrician", type: "Electrician", location: "Ajmer & Jaipur", exp: "1+ Year", salary: "₹18,000 - ₹25,000 / month", desc: "Plumbing ke sath geyser, wiring, switch board ka kaam aata ho to salary zyada milegi." }
];

const jobList = document.getElementById("plumber-job-list");
const jBtns = document.querySelectorAll(".j-btn");

function displayPlumberJobs(filter = "all"){
  if(!jobList) return;
  const filtered = filter === "all" ? plumberJobs : plumberJobs.filter(j => j.type === filter);
  jobList.innerHTML = filtered.map(job => `
      <div class="p-job-card">
        <div class="job-top">
          <span class="job-type">${job.type}</span>
          <span style="font-size:12px;">📍 ${job.location}</span>
        </div>
        <h3>${job.title}</h3>
        <p class="job-meta">💼 ${job.exp} | ${job.location}</p>
        <p class="job-desc">${job.desc}</p>
        <p class="salary">${job.salary}</p>
        <button class="p-apply-btn" onclick="applyPlumberJob('${job.title}')">WhatsApp par Apply Karo</button>
      </div>
    `).join("");
}

function applyPlumberJob(title){
  let number = "919166126185";
  let message = `Hello, Mujhe ${title} ki job chahiye. Mera naam ... hai. Location: Ajmer/Jaipur.`;
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
}

if(jBtns.length > 0){
  jBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      jBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      displayPlumberJobs(btn.dataset.filter);
    });
  });
}