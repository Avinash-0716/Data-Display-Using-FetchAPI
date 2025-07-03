const userList = document.getElementById("userList");
const errorMsg = document.getElementById("errorMsg");
const reloadBtn = document.getElementById("reloadBtn");

function fetchUsers() {
  userList.innerHTML = "";
  errorMsg.textContent = "";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      return response.json();
    })
    .then((users) => {
      users.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.className = "user-card";
        userDiv.innerHTML = `
          <h3>${user.name}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        `;
        userList.appendChild(userDiv);
      });
    })
    .catch((error) => {
      errorMsg.textContent = "Failed to load users. Please check your connection.";
      console.error("Fetch error:", error);
    });
}

// Load on page load
window.addEventListener("load", fetchUsers);

// Reload on button click
reloadBtn.addEventListener("click", fetchUsers);
