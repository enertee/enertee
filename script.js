document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        const ingredients = button.nextElementSibling;
        if (ingredients.style.maxHeight) {
            ingredients.style.maxHeight = null;
        } else {
            ingredients.style.maxHeight = ingredients.scrollHeight + 'px';
        } 
    });
});


let lastScrollTop = 0;
const header = document.querySelector("header");

window.onscroll = function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        document.getElementById("header").style = "position: top;";
    } else {
        document.getElementById("header").style = "position: sticky;";
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
};


function contact() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let msg = document.getElementById("msg").value;

    let mailto = `mailto:enertee.office@gmail.com?subject=Kontaktformular von ${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}%0A%0AAntwort an: ${encodeURIComponent(email)}`;

    window.location.href = mailto;
}

// Scroll Animation
const productObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.product-scroll-item').forEach(item => {
    productObserver.observe(item);
});

// Toggle für Inhaltsstoffe (bestehender Code)
document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        const ingredients = button.nextElementSibling;
        ingredients.style.maxHeight = ingredients.style.maxHeight ? null : `${ingredients.scrollHeight}px`;
    });
});


const products = [
    { name: "Kamillen Power", price: 2.99 },
    { name: "Herbs Blast", price: 3.29 },
    { name: "Elder Boost", price: 2.79 },
    { name: "Mint Refresh", price: 2.89 },
  ];
  // DOM-Zugriffe
  const cartItems = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const cartSidebar = document.getElementById("cart-sidebar");
  const toggleCartBtn = document.getElementById("toggle-cart");
  
  // Cart Initialisieren
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function getCartCounts() {
    const counts = {};
    cart.forEach(item => {
      counts[item.name] = (counts[item.name] || 0) + 1;
    });
    return counts;
  }
  
  function updateCartSidebar() {
    if (!cartItems || !cartTotalEl) return; // Failsafe
  
    cartItems.innerHTML = "";
    const counts = getCartCounts();
  
    for (const [name, count] of Object.entries(counts)) {
      const product = products.find(p => p.name === name);
      if (!product) continue;
  
      const li = document.createElement("li");
      li.innerHTML = `
        ${name} x${count} - ${(product.price * count).toFixed(2)} € 
        <button class="remove-btn" onclick="removeFromCart('${name}')">Entfernen</button>
      `;
      cartItems.appendChild(li);
    }
  
    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    cartTotalEl.textContent = `Summe: ${subtotal.toFixed(2)} € (inkl. MwSt.)`;
  }
  
function addToCart(name) {
    console.log("Versuche hinzuzufügen:", name); // Debug
  
    const item = products.find(p => p.name === name);
    if (!item) {
      console.warn("Produkt nicht gefunden:", name);
      return;
    }
  
    cart.push(item);
    saveCart();
    updateCartSidebar();
  }
  
  function removeFromCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
      cart.splice(index, 1);
      saveCart();
      updateCartSidebar();
    }
  }

  function showCart() {
      let cart = document.getElementById('cart-sidebar')
      
      cart.style.display == "none" ? cart.style.display = "block" : cart.style.display = "none";
  }
  
  // Event Delegation für dynamische "In den Warenkorb"-Buttons
  document.addEventListener("click", (e) => {
    if (e.target.matches(".add-to-cart")) {
      const name = e.target.dataset.name;
      addToCart(name);
    }
  });
  
  // Initialisierung
  updateCartSidebar();
  