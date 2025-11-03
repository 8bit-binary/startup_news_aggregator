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

// script.js
const apiKey = "befbfacfd5a346b49ae3704b53f5d60e"; // NewsAPI key
const newsContainer = document.getElementById("api-extern");
const numberOfNews = 12;
async function fetchNews() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=startups+OR+entrepreneurship+OR+"venture+capital"&pageSize=${numberOfNews}&apiKey=${apiKey}`
    );
    const data = await response.json();

    if (data.status === "ok" && data.articles) {
      displayNews(data.articles);
    } else {
      newsContainer.innerHTML = "<p>Unable to load news. Please try again later.</p>";
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = "<p>Error loading news. Please check your connection.</p>";
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = ""; // Clear previous content
  articles.forEach((article) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");

    // Ensure the article has required fields
    const title = article.title || "No title available";
    const description = article.description || "No description available";
    const url = article.url || "#";
    const image = article.urlToImage || "https://via.placeholder.com/300x200"; // Fallback image
    const source = article.source.name || "Unknown Source";

    newsCard.innerHTML = `
      <img src="${image}" alt="${title}" loading="lazy">
      <h3>${title}</h3>
      <p>${description}</p>
      <p><strong>Source:</strong> ${source}</p>
      <a href="${url}" target="_blank" rel="noopener">Read more</a>
    `;

    newsContainer.appendChild(newsCard);
  });
}

// Fetch news when the page loads
fetchNews();
