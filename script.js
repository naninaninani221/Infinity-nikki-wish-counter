const wishList = document.getElementById("wish-list");
const addWishButton = document.getElementById("add-wish");

addWishButton.addEventListener("click", () => {
  const itemName = document.getElementById("item-name").value;
  const rarity = document.getElementById("rarity").value;
  const date = document.getElementById("date").value;

  if (!itemName || !date) {
    alert("Please fill out all fields.");
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${itemName}</td>
    <td>${rarity}★</td>
    <td>${date}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  wishList.appendChild(row);

  // Add delete functionality
  row.querySelector(".delete-btn").addEventListener("click", () => {
    row.remove();
  });

  // Clear input fields
  document.getElementById("item-name").value = "";
  document.getElementById("date").value = "";
});
