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
// Function to fetch and display gacha history from the URL
function fetchGachaHistory(url) {
  fetch(url)  // Fetch data from the given URL
    .then(response => response.json())  // Assuming the data is in JSON format
    .then(data => {
      // Process and display the data
      displayGachaHistory(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Failed to load the data.');
    });
}

// Function to display the fetched gacha history
function displayGachaHistory(data) {
  const wishList = document.getElementById("wish-list");

  // Clear existing data
  wishList.innerHTML = "";

  // Loop through the data and create table rows
  data.forEach(wish => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${wish.itemName}</td>
      <td>${wish.rarity}★</td>
      <td>${wish.date}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;
    wishList.appendChild(row);

    // Add delete functionality
    row.querySelector(".delete-btn").addEventListener("click", () => {
      row.remove();
    });
  });
}

// Event listener for submitting the URL
document.getElementById("submit-url").addEventListener("click", () => {
  const url = document.getElementById("url-input").value;
  if (url) {
    fetchGachaHistory(url);
  } else {
    alert("Please enter a valid URL.");
  }
});
