document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    const result = await response.json();
    const msg = document.getElementById("signupMessage");
    msg.textContent = result.message;

    if (response.ok) {
      msg.style.color = "green";
      // Redirect to inner page after 1 second
      setTimeout(() => {
        window.location.href = "index.html"; // or "plan.html"
      }, 1000);
    } else {
      msg.style.color = "red";
    }

  } catch (error) {
    console.error(error);
    document.getElementById("signupMessage").textContent = "Server error. Try again!";
    document.getElementById("signupMessage").style.color = "red";
  }
});
