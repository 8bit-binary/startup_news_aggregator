// account dropdown
document.addEventListener("DOMContentLoaded", () => {
    const accountBtn = document.querySelector(".account-dropdown .account");
    const dropdown = document.querySelector(".account-dropdown");

    accountBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("active");
    });

    // Close dropdown if clicked outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  });

  const seeMoreBtn = document.querySelector(".see-more button");
  const storylines = document.querySelector(".storylines");

  seeMoreBtn.addEventListener("click", () => {
    // Example fake data (replace with fetch later)
    const newStory = document.createElement("div");
    newStory.classList.add("story-card");
    newStory.innerHTML = `
      <h2>New Startup Raises $10M in Series A</h2>
      <p>Another big funding round in the SaaS space...</p>
    `;
    storylines.appendChild(newStory);
  });

    // --- Search Filter ---
  const searchInput = document.querySelector(".search input");
  const newsItems = document.querySelectorAll(".breaking, .news-feed-others > div");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    newsItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? "block" : "none";
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
  const tagSelect = document.getElementById("tags");

  tagSelect.addEventListener("change", function () {
    const value = this.value;
    if (value !== "none") {
      // Redirect to archive page with query param
      window.location.href = `Archive.html?tag=${value}`;
    }
  });
});