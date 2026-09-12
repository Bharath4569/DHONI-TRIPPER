document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const credentials = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });

    const result = await response.json();
    const msg = document.getElementById("loginMessage");
    msg.textContent = result.message;

    if (response.ok) {
      msg.style.color = "green";
      // Save token in localStorage
      localStorage.setItem("token", result.token);
      // Redirect to inner page
      setTimeout(() => {
        window.location.href = "index.html"; // or "plan.html"
      }, 1000);
    } else {
      msg.style.color = "red";
    }

  } catch (error) {
    console.error(error);
    msg.textContent = "Server error. Try again!";
    msg.style.color = "red";
  }
});
