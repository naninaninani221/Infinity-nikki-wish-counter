// Function to add a new wish to the list
function addWish() {
  const itemName = document.getElementById("item-name").value;
  const rarity = document.getElementById("rarity").value;
  const date = document.getElementById("date").value;

  if (!itemName || !rarity || !date) {
    alert("Please fill out all fields.");
    return;
  }

  // Create a new table row for the wish
  const wishList = document.getElementById("wish-list");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${itemName}</td>
    <td>${rarity}★</td>
    <td>${date}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;
  wishList.appendChild(row);

  // Clear input fields
  document.getElementById("item-name").value = "";
  document.getElementById("date").value = "";

  // Add delete functionality
  row.querySelector(".delete-btn").addEventListener("click", () => {
    row.remove();
  });
}

// Event listener for adding a new wish
document.getElementById("add-wish").addEventListener("click", addWish);

// Function to fetch and display gacha history from the URL
function fetchGachaHistory(url) {
  fetch(url)  // Fetch data from the given URL
    .then(response => response.json())  // Assuming the data is in JSON format
    .then(data => {
      console.log(data);  // Log the data to see its structure
      displayGachaHistory(data);  // Process and display the data
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

  // Assuming the API response is an array of gacha items
  data.data.forEach(wish => { // Adjust according to your actual API structure
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${wish.itemName || "Unknown Item"}</td>
      <td>${wish.rarity || "Unknown Rarity"}★</td>
      <td>${new Date(wish.timestamp * 1000).toLocaleDateString() || "Unknown Date"}</td>
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
