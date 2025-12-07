// -------------------- LOGIN --------------------
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!loginForm.checkValidity()) {
        loginForm.classList.add("was-validated");
        return;
      }

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (email === "omartineza@ufpso.edu.co" && password === "1234") {
        sessionStorage.setItem("user", JSON.stringify({ email }));
        window.location.href = "dashboard.html";
      } else {
        const alertEl = document.getElementById("loginAlert");
        alertEl.textContent = "Correo o contraseña incorrectos.";
        alertEl.classList.remove("d-none");
      }
    });
  }
});

// -------------------- DASHBOARD --------------------
document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.pathname.includes("dashboard.html")) return;

  let user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) window.location.href = "index.html";

  // Mostrar datos en la parte superior
  document.getElementById("userEmail").textContent = user.email;
  document.getElementById("userName").textContent = user.name || user.email.split("@")[0];

  // HOME – cargar valores
  document.getElementById("userEmailHome").textContent = user.email;
  document.getElementById("userNameHome").textContent = user.name || "Sin registrar";
  document.getElementById("userDescriptionHome").textContent = user.description || "Sin descripción";

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("user");
    window.location.href = "index.html";
  });

  // PERFIL – guardar cambios
  const profileForm = document.getElementById("profileForm");

  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("inputName");
      const descInput = document.getElementById("inputDescription");
      const msg = document.getElementById("profileMsg");

      if (nameInput.value.trim() === "") {
        msg.textContent = "El nombre no puede estar vacío.";
        msg.className = "text-danger mt-2";
        return;
      }

      // Guardar
      user.name = nameInput.value.trim();
      user.description = descInput.value.trim();
      sessionStorage.setItem("user", JSON.stringify(user));

      // Actualizar en pantalla
      document.getElementById("userName").textContent = user.name;
      document.getElementById("userNameHome").textContent = user.name;
      document.getElementById("userDescriptionHome").textContent = user.description;

      msg.textContent = "Cambios guardados correctamente.";
      msg.className = "text-success mt-2";
    });

    // Cargar datos al abrir sección
    document.getElementById("inputName").value = user.name || "";
    document.getElementById("inputDescription").value = user.description || "";
  }

  
  const darkToggle = document.getElementById("toggleDark");

  if (darkToggle) {
    const darkEnabled = localStorage.getItem("dark-mode") === "true";
    darkToggle.checked = darkEnabled;

    if (darkEnabled) document.body.classList.add("dark-mode");

    darkToggle.addEventListener("change", () => {
      if (darkToggle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "true");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "false");
      }
    });
  }
});

function showSection(id) {
  const sections = ["home", "profile", "settings"];

  sections.forEach(sec => {
    const el = document.getElementById(sec);
    const link = document.getElementById("link-" + sec);

    if (sec === id) {
      el.classList.remove("d-none");
      link.classList.add("active");
    } else {
      el.classList.add("d-none");
      link.classList.remove("active");
    }
  });
}
