document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const searchForm = document.getElementById("searchForm");
    const searchBox = document.querySelector(".search_box");
    const placeholder = document.querySelector(".externalNews");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    const sortByInput = document.getElementById("sortBy");
    const fromDateInput = document.getElementById("fromDate");
    const toDateInput = document.getElementById("toDate");
    const filterToggleBtn = document.getElementById("filterToggleBtn");

    // State
    let currentPage = 1;
    let currentSearchTerm = "startup";  // start with generic "startup"
    let currentFilters = {
        sortBy: "relevancy",
        from: "",
        to: ""
    };

    // Predefined startup categories (topics)
    const topicQueries = {
        funding: 'startup funding OR raised OR "Series A"',
        acquisition: 'startup acquisition OR merges OR acquired',
        launch: 'startup product launch OR release',
        market: 'startup market OR valuation OR IPO',
        founders: 'startup founder OR CEO OR leadership'
    };

    // On load: render title and fetch default startup news
    renderTitle("Startup News");
    fetchNews(currentSearchTerm, currentPage, true);

    // Toggle filter panel (if exists)
    if (filterToggleBtn) {
        filterToggleBtn.addEventListener("click", () => {
            const panel = document.getElementById("filterPanel");
            if (panel) {
                panel.style.display = panel.style.display === "none" ? "flex" : "none";
            }
        });
    }

    // Search form submission
    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const input = searchBox.value.trim();
            if (!input) {
                alert("Please enter a term to search.");
                return;
            }
            currentPage = 1;
            // Always include "startup" keyword
            currentSearchTerm = `startup ${input}`;
            currentFilters = {
                sortBy: sortByInput.value,
                from: fromDateInput.value,
                to: toDateInput.value
            };

            if (!validateDates(currentFilters.from, currentFilters.to)) return;

            renderTitle(`Results for "${input}"`);
            fetchNews(currentSearchTerm, currentPage, true);
        });
    }

    // Load more
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            currentPage++;
            fetchNews(currentSearchTerm, currentPage, false);
        });
    }

    // Category (topic) search function (exposed globally)
    window.searchStartupCategory = function (topicKey) {
        const query = topicQueries[topicKey] || "startup";
        currentSearchTerm = query;
        currentPage = 1;
        renderTitle(`Startup News: ${capitalize(topicKey)}`);
        fetchNews(query, currentPage, true);
    };

    // Fetch news from NewsAPI
    function fetchNews(query, page, clearOld = false) {
        const apiKey = 'befbfacfd5a346b49ae3704b53f5d60e';
        const pageSize = 9;

        // Build URL
        let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=${pageSize}&page=${page}&sortBy=${currentFilters.sortBy}&apiKey=${apiKey}`;
        if (currentFilters.from) url += `&from=${currentFilters.from}`;
        if (currentFilters.to) url += `&to=${currentFilters.to}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let newsGrid = document.querySelector("#api-extern");
                // If grid container not present, create via render
                if (!newsGrid) {
                    renderTitle("Startup News");
                    newsGrid = document.querySelector("#api-extern");
                    if (!newsGrid) {
                        console.error("Could not find or create news container.");
                        return;
                    }
                }

                if (clearOld) {
                    newsGrid.innerHTML = "";
                }

                if (!data.articles || data.articles.length === 0) {
                    if (page === 1) {
                        newsGrid.innerHTML = `<h2>No startup news found.</h2>`;
                    }
                    if (loadMoreBtn) loadMoreBtn.style.display = "none";
                    return;
                }

                data.articles.forEach(article => {
                    const title = article.title || "No title";
                    const description = article.description || "No description available";
                    const image = (article.urlToImage && article.urlToImage.startsWith("http"))
                        ? article.urlToImage
                        : "fallback.jpg";  // Replace with your fallback
                    const link = article.url || "#";
                    const source = article.source?.name || "Unknown Source";

                    const card = document.createElement("div");
                    card.classList.add("news-card");
                    card.innerHTML = `
                        <img src="${image}" alt="${title}" loading="lazy">
                        <h3>${title}</h3>
                        <p>${description}</p>
                        <p><strong>Source:</strong> ${source}</p>
                        <a href="${link}" target="_blank" rel="noopener">Read more</a>
                    `;
                    newsGrid.appendChild(card);
                });

                // Show or hide Load More
                if (loadMoreBtn) {
                    loadMoreBtn.style.display = (data.articles.length === pageSize) ? "inline-block" : "none";
                }
            })
            .catch(err => {
                console.error("Fetch error:", err);
                placeholder.innerHTML = `<h2>Error loading news: ${err.message}</h2>`;
                if (loadMoreBtn) loadMoreBtn.style.display = "none";
            });
    }

    // Render the title + container HTML
    function renderTitle(text) {
        placeholder.innerHTML = `
            <div class="othersTitle">
                <h1>${text}</h1>
            </div>
            <div id="api-extern" class="news-grid"></div>
        `;
    }

    // Validate date inputs
    function validateDates(from, to) {
        const now = new Date();
        const fromDate = from ? new Date(from) : null;
        const toDate = to ? new Date(to) : null;

        if (fromDate && toDate && fromDate > toDate) {
            alert("⚠️ 'From' date cannot be after 'To' date.");
            return false;
        }
        if ((fromDate && fromDate > now) || (toDate && toDate > now)) {
            alert("⚠️ Dates cannot be in the future.");
            return false;
        }
        return true;
    }

    function capitalize(s) {
        if (!s) return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
});
