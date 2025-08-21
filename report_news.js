// pages-assets/report_news.js
(function () {
  const form = document.getElementById('reportForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('newsTitle').value.trim();
    const body  = document.getElementById('newsBody').value.trim();
    const cat   = document.getElementById('newsCategory').value;

    if (!title || !body) {
      alert('Please fill title and content.');
      return;
    }

    // Example: send to server (replace URL)
    // fetch('/api/report', { method:'POST', headers:{'Content-Type':'application/json'},
    //   body: JSON.stringify({ title, body, category: cat })
    // }).then(r => r.json()).then(console.log);

    alert('Report submitted! (demo)');
    form.reset();
  });
})();
