const products = [
  { name: "Kamillen Power", price: 2.99 },
  { name: "Herbs Blast", price: 3.29 },
  { name: "Elder Boost", price: 2.79 },
  { name: "Mint Refresh", price: 2.89 }
];

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const discountApplied = localStorage.getItem("discount") === "true";

const itemsList = document.getElementById("checkout-items");
const totalEl = document.getElementById("checkout-total");

function getCartCounts() {
  const counts = {};
  cart.forEach(item => {
    counts[item.name] = (counts[item.name] || 0) + 1;
  });
  return counts;
}

function updateCheckoutView() {
  const counts = getCartCounts();
  itemsList.innerHTML = "";

  let subtotal = 0;

  for (const [name, count] of Object.entries(counts)) {
    const product = products.find(p => p.name === name);
    if (!product) continue;

    const itemTotal = product.price * count;
    subtotal += itemTotal;

    const displayPrice = discountApplied ? (itemTotal * 0.5).toFixed(2) : itemTotal.toFixed(2);

    const li = document.createElement("li");
    li.textContent = `${name} x${count} - ${displayPrice} €`;
    itemsList.appendChild(li);
  }

  if (discountApplied) subtotal *= 0.5;
  totalEl.textContent = `Summe: ${subtotal.toFixed(2)} € (inkl. MwSt.)`;
}

updateCheckoutView();
document.getElementById("apply-coupon").addEventListener("click", () => {
  const input = document.getElementById("coupon-input").value.trim().toLowerCase();
  if (input === toAscii("ZW5lcnRlZTUw")) {
    localStorage.setItem("discount", "true");
    alert("✔️ Rabatt aktiviert: 50%!");
    window.location.reload();
  } else {
    alert("Ungültiger Rabattcode");
  }
});

function toCheckout() {
  document.getElementById("checkout-popup").style.display = "flex";
}

function closeCheckout() {
  document.getElementById("checkout-popup").style.display = "none";
}

function submitPayment() {
  alert("Zahlung abgeschickt!");
  closeCheckout();
}


function toAscii(base64String) {
  try {
    // 1. Base64 decodieren → binärer String
    let decoded = atob(base64String);
    return decoded;
  } catch (e) {
    console.error("Ungültiger Base64-String:", e);
    return null;
  }
}

