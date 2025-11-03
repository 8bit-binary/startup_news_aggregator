document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("authForm");
  const message = document.getElementById("message");
  const formTitle = document.getElementById("formTitle");
  const authBtn = document.getElementById("authBtn");
  const displayLink = document.getElementById("displayLink");
  const repassBox = document.getElementById("repassBox");
  const nameField = document.getElementById("name");

  let mode = "signup"; // start on signup

  // Helper: get saved users
  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem("startupUsers")) || [];
    } catch {
      return [];
    }
  }

  // Helper: save users
  function saveUsers(users) {
    localStorage.setItem("startupUsers", JSON.stringify(users));
  }

  // Helper: show message
  function showMessage(text, color = "red") {
    message.textContent = text;
    message.style.color = color;
  }

  // Helper: toggle between modes
  function switchMode(newMode) {
    mode = newMode;
    if (mode === "signup") {
      formTitle.textContent = "Sign Up";
      authBtn.textContent = "Create Account";
      repassBox.style.display = "block";
      nameField.parentElement.style.display = "block";
      displayLink.innerHTML = ""; // hide sign-in link by default
    } else {
      formTitle.textContent = "Sign In";
      authBtn.textContent = "Sign In";
      repassBox.style.display = "none";
      nameField.parentElement.style.display = "none";
      displayLink.innerHTML =
        `<a href="#" id="toggleMode">Don't have an account? Create one</a>`;
    }
    showMessage("");
  }

  // Handle form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("mail").value.trim().toLowerCase();
    const pass = document.getElementById("pass").value.trim();
    const repass = document.getElementById("repass")?.value.trim();
    const users = getUsers();

    if (mode === "signup") {
      if (!name || !email || !pass || !repass) {
        showMessage("Please fill all fields!");
        return;
      }

      if (pass !== repass) {
        showMessage("Passwords do not match!");
        return;
      }

      const exists = users.some((u) => u.email === email);
      if (exists) {
        showMessage("Account already exists! Please sign in.", "red");

        // 👉 Show sign-in link ONLY now
        displayLink.innerHTML = `<a href="#" id="toggleMode">Sign in</a>`;
        return;
      }

      users.push({ name, email, pass });
      saveUsers(users);
      localStorage.setItem(
        "startupCurrentUser",
        JSON.stringify({ name, email })
      );

      showMessage("Account created successfully!", "green");
      setTimeout(() => (window.location.href = "admin.html"), 700);

    } else {
      // Sign in mode
      if (!email || !pass) {
        showMessage("Please enter your email and password!");
        return;
      }

      const foundUser = users.find(
        (u) => u.email === email && u.pass === pass
      );
      if (!foundUser) {
        showMessage("Invalid email or password!");
        return;
      }

      localStorage.setItem(
        "startupCurrentUser",
        JSON.stringify({ name: foundUser.name, email: foundUser.email })
      );
      showMessage("Login successful!", "green");
      setTimeout(() => (window.location.href = "admin.html"), 700);
    }
  });

  // Handle link click dynamically
  displayLink.addEventListener("click", (e) => {
    if (e.target.id === "toggleMode") {
      e.preventDefault();
      switchMode(mode === "signup" ? "signin" : "signup");
    }
  });

  // Initial state — no link shown
  switchMode("signup");
});
