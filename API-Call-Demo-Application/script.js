const fetchBtn = document.getElementById("fetchBtn");
const dataContainer = document.getElementById("dataContainer");

fetchBtn.addEventListener("click", () => {
    dataContainer.innerHTML = "<p>Loading data...</p>";

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
            dataContainer.innerHTML = "";

            users.forEach(user => {
                const userCard = document.createElement("div");
                userCard.classList.add("user-card");

                userCard.innerHTML = `
                    <h3>${user.name}</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>City:</strong> ${user.address.city}</p>
                `;

                dataContainer.appendChild(userCard);
            });
        })
        .catch(error => {
            dataContainer.innerHTML = "<p>Error loading data. Please try again.</p>";
            console.error("Fetch Error:", error);
        });
});