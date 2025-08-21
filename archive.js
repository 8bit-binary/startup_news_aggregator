document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".archive-tools input");
  const sortSelect = document.querySelector(".archive-tools select");
  const collectionGrid = document.querySelector(".Top_Collections");
  const boxes = Array.from(collectionGrid.querySelectorAll(".box"));

  // 🔎 Live Search
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    boxes.forEach(box => {
      const text = box.querySelector("p").textContent.toLowerCase();
      box.style.display = text.includes(query) ? "block" : "none";
    });
  });

  // 📑 Sorting
  sortSelect.addEventListener("change", () => {
    let sorted = [...boxes];
    const option = sortSelect.value;

    if (option === "latest") {
      sorted.reverse(); // Fake latest (since no real dates yet)
    } else if (option === "oldest") {
      sorted = boxes; // Default order
    } else if (option === "popular") {
      // Sort by items count inside <p class="bottom-tag">
      sorted.sort((a, b) => {
        const numA = parseInt(a.querySelector(".bottom-tag").textContent) || 0;
        const numB = parseInt(b.querySelector(".bottom-tag").textContent) || 0;
        return numB - numA; // Higher items first
      });
    } else if (option === "alpha") {
      sorted.sort((a, b) => {
        return a.querySelector("p").textContent.localeCompare(
          b.querySelector("p").textContent
        );
      });
    }

    // Re-render
    collectionGrid.innerHTML = "";
    sorted.forEach(box => collectionGrid.appendChild(box));
  });

  // 📂 Click to redirect (example mapping)
  boxes.forEach(box => {
    box.addEventListener("click", () => {
      const name = box.querySelector("p").textContent.trim().toLowerCase();
      if (name.includes("startups")) {
        window.location.href = "collections/startups.html";
      } else if (name.includes("closures")) {
        window.location.href = "collections/closures.html";
      } else if (name.includes("frauds")) {
        window.location.href = "collections/frauds.html";
      } else if (name.includes("funding")) {
        window.location.href = "collections/funding.html";
      } else {
        alert("Collection page under construction 🚧");
      }
    });
  });
});
