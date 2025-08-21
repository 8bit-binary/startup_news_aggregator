// code1.js

document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("SignUpBtn");

  signupBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent form from refreshing the page
    
    // ✅ Here you can add form validation if needed
    
    // Redirect to admin.html
    window.location.href = "admin.html";
  });
});
