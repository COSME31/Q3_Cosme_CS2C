// Sample data for sellers
const sellers = [
  { username: "Seller1", password: "pass1" },
  { username: "Seller2", password: "pass2"}
];

// Sample data for food products
const products = {
  Pasta: [
    { name: "Spaghetti", price: 10},
    { name: "Lasagna", price: 12},
    { name: "Macaroni", price: 8}
    ],
  Desserts: [
    { name: "Cheesecake", price: 5},
    { name: "Brownie", price: 4},
    { name: "Ice Cream", price: 3}
    ],
  Drinks: [
    { name: "Soda", price: 2},
    { name: "Water", price: 1},
    { name: "Juice", price: 3}
    ]
};

// Cart for customers
let cart = [];

// Function to authenticate seller
function authenticateSeller() {
  const username = prompt("Enter username:(Seller1 or Seller2)");
  const password = prompt("Enter password:(pass1 or pass2)");
  return sellers.find(seller => seller.username === username && seller.password === password);
}

// Function to add item to products
function addItem(category) {
  const name = prompt("Enter the name of the item:");
  const price = parseFloat(prompt("Enter the price of the item:"));
  products[category].push({ name, price });
}

// Function to remove item from products
function removeItem(category) {
  const name = prompt("Enter the name of the item to remove:");
  const index = products[category].findIndex(item => item.name === name);
  if (index !== -1) {
    products[category].splice(index, 1);
  } else {
    alert("Item not found.");
  }
}

// Function to display products
function displayProducts() {
  console.log("Available Products:");
  for (const category in products) {
    console.log(category, ':');
    products[category].forEach(item => {
      console.log('– ', item.name, ':', '$', item.price);
    });
  }
}

// Function to add item to cart
function addToCart(item, quantity) {
  const cartItem = cart.find(cartItem => cartItem.name === item.name);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }
}

// Function to print cart
function printCart() {
  console.log("Your Cart:");
  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    console.log(item.name, '-', '$', item.price * item.quantity, '=', '$', itemTotal);
  });
  console.log("Total: $", total);
}

// Function to sort cart items by name
function sortCart() {
  cart.sort((a, b) => a.name.localeCompare(b.name));
}

// Main program loop
function main() {
  while (true) {
    const userType = prompt("Enter:\n1. SELLER\n2. CUSTOMER\n3. Exit");

    if (userType === "1") {
      const seller = authenticateSeller();
      if (!seller) {
        alert("Authentication failed.");
        continue;
      }
      while (true) {
        const action = prompt("Choose: LOGOUT, ADD, REMOVE").toUpperCase();
        if (action === "LOGOUT") break;
        const category = prompt("Enter category (Pasta, Desserts, Drinks):");
        if (action === "ADD") {
          addItem(category);
        } else if (action === "REMOVE") {
          removeItem(category);
        }
      }
    } else if (userType === "2") {
      displayProducts();
      while (true) {
        const action = prompt("Choose: ORDER, CART, CANCEL").toUpperCase();
        if (action === "CANCEL") break;
        if (action === "ORDER") {
          const category = prompt("Enter category (Pasta, Desserts, Drinks):");
          const itemName = prompt("Enter item name:");
          const quantity = parseInt(prompt("Enter quantity:"));
          const item = products[category].find(item => item.name === itemName);
          if (item) {
            addToCart(item, quantity);
          } else {
            alert("Item not found.");
          }
        } else if (action === "CART") {
          while (true) {
            const cartAction = prompt("Choose: PRINT, ADD, REMOVE, CANCEL").toUpperCase();
            if (cartAction === "CANCEL") break;
            if (cartAction === "PRINT") {
              sortCart();
              printCart();
            } else if (cartAction === "REMOVE") {
              const itemName = prompt("Enter the name of the item to remove:");
              const index = cart.findIndex(cartItem => cartItem.name === itemName);
              if (index !== -1) {
                cart.splice(index, 1);
              } else {
                alert("Item not found in cart.");

              }
            }
          }
        }
      }
    } else if (userType == "3") {
      console.log("You exits the program.");
      break; // Exit program
    }
  }
}

// Start the program
main();