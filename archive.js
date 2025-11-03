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



  // 📂 Click to redirect (example mapping)

});
