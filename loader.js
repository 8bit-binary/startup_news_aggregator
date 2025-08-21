// loader.js

const mainBox = document.getElementById("mainContent");

function loadPage(pageUrl) {
  const baseName = pageUrl.replace(".html", "");

  fetch(pageUrl)
    .then(res => res.text())
    .then(html => {
      mainBox.innerHTML = html;

      // Load CSS
      const cssId = baseName + "-css";
      if (!document.getElementById(cssId)) {
        const link = document.createElement("link");
        link.id = cssId;
        link.rel = "stylesheet";
        link.href = baseName + ".css";
        document.head.appendChild(link);
      }

      // Load JS
      const jsId = baseName + "-js";
      if (!document.getElementById(jsId)) {
        const script = document.createElement("script");
        script.id = jsId;
        script.src = baseName + ".js";
        document.body.appendChild(script);
      }
    })
    .catch(err => {
      mainBox.innerHTML = "<p>Page failed to load.</p>";
      console.error(err);
    });
}

document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    loadPage(page);

    // ✅ Close sidebar automatically
    const sidebar = document.getElementById("offcanvasNavbar");
    const sidebarInstance = bootstrap.Offcanvas.getInstance(sidebar);
    if (sidebarInstance) {
      sidebarInstance.hide();
    }
  });
});
