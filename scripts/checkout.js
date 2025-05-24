const products = [
  { name: "Kamillen Power", price: 1.10 },
  { name: "Herbs Blast", price: 0.90 },
  { name: "Elder Boost", price: 0.80 },
  { name: "Mint Refresh", price: 0.80 }
];
const cart = JSON.parse(localStorage.getItem("cart")) || [];

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

    const displayPrice = localStorage.getItem("discountApplied") === "true" ? (itemTotal * 0.5).toFixed(2) : itemTotal.toFixed(2);

    const li = document.createElement("li");
    li.textContent = `${name} x${count} - ${displayPrice} €`;
    itemsList.appendChild(li);
  }

  if (localStorage.getItem("discountApplied") === "true") subtotal *= 0.5;
  totalEl.textContent = `Summe: ${subtotal.toFixed(2)} € (inkl. MwSt.)`;
}

updateCheckoutView();
document.getElementById("apply-coupon").addEventListener("click", () => {
  const input = document.getElementById("coupon-input").value.trim().toLowerCase();
  if (input === toAscii("ZW5lcnRlZTUw") && localStorage.getItem("discount") !== "true") {
    localStorage.setItem("discount", "true");
    alert("✔️ Rabatt aktiviert: 50%!");
    localStorage.setItem("discountApplied", "true");
    window.location.reload();
  } else if (input === "" || input !== toAscii("ZW5lcnRlZTUw")) {
    alert("Ungülitger Rabattcode!");
    localStorage.setItem("discountApplied", "false");
  } else if (localStorage.getItem("discount") === "true") {
    alert("Rabattcode wurde bereits aktiviert!")
    localStorage.setItem("discountApplied", "false");
  }
});

function toCheckout() {
  document.getElementById("checkout-popup").style.display = "flex";
  document.getElementById("coupon").style.display = "none";
}

function closeCheckout() {
  document.getElementById("checkout-popup").style.display = "none";
  document.getElementById("coupon").style.display = "flex";
  localStorage.setItem("discountApplied", "false");
  window.location.reload();
}

function submitPayment() {
  alert("Diese Aktion ist ein nur Zur Veranschaulichung implementiertes System. Es wurden weder Ihre Kreditkartendaten gespeichert, noch wurde ihnen ein Betrag abgebucht. Weitere Hinweise auf: ");
  if (confirm("https://www.enertee.com/README.md")) {
    window.open("https://www.enertee.com/README.md", "_blank");
  }
  localStorage.removeItem("cart");
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

