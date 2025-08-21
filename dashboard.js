
// Fake admin account data (could later come from server/localStorage)
const adminAccount = {
  name: "John Doe",
  email: "admin@web.com",
  role: "Administrator",
  joined: "Jan 2024",
  phone: "+1234567890"
};

// Handle Account Info
document.querySelector(".btn-info").addEventListener("click", () => {
  const info = `
    <strong>Name:</strong> ${adminAccount.name}<br>
    <strong>Email:</strong> ${adminAccount.email}<br>
    <strong>Role:</strong> ${adminAccount.role}<br>
    <strong>Joined:</strong> ${adminAccount.joined}<br>
    <strong>Phone-No:</strong> ${adminAccount.phone}<br>
  `;
  
  // Bootstrap Modal for clean display
  const modalHtml = `
    <div class="modal fade" id="accountModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header bg-info text-white">
            <h5 class="modal-title">Account Info</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            ${info}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Append modal only once
  if (!document.querySelector("#accountModal")) {
    document.body.insertAdjacentHTML("beforeend", modalHtml);
  }

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("accountModal"));
  modal.show();
});

// Handle Logout
document.querySelector(".btn-danger").addEventListener("click", () => {
  if (confirm("Are you sure you want to logout?")) {
    // Clear session (localStorage or cookies if any)
    localStorage.clear();

    // Redirect to login page (or homepage)
    window.location.href = "index.html";
  }
});
