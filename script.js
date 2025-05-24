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
const header = document.getElementById("header");

window.onscroll = function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        header.style.position = "absolute";
        header.style.top = "-100px";
    } else {
        header.style.position = "fixed";
        header.style.top = "0";
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
};





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


function contact() {
    if (!confirm("Sind sie sicher. Sie können nur noch " + (3-parseInt(localStorage.getItem("contacted"))) + " Nachrichten senden!")) {
        return;
    }
    if (!localStorage.getItem("contacted")) {
        localStorage.setItem("contacted", "0");
    }

    if (parseInt(localStorage.getItem("contacted")) >= 3) {
        alert("Sie haben das Limit an möglichen Kontakten überschritten. Sie können uns aber manuell unter enertee.office@gmail.com erreichen.");
        return;
    } else {
        let val = parseInt(localStorage.getItem("contacted"));
        val++;
        localStorage.setItem("contacted", val.toString());
    }
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('msg').value.trim();

    if (!name || !email || !message) {
        alert('Bitte fülle alle Felder aus.');
        return;
    }

    emailjs.send('service_dqbm9ih', 'template_u9qc9wm', {
        from_name: name,
        from_email: email,
        message: message
    })
        .then(function(response) {
            alert('Danke! Deine Nachricht wurde gesendet.');
            // Optional: Formular zurücksetzen
            document.querySelector('#contact form').reset();
        }, function(error) {
            alert('Beim Senden ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
            console.error('EmailJS Fehler:', error);
        });
}

const products = [
    { name: "Kamillen Power", price: 1.10 },
    { name: "Herbs Blast", price: 0.90 },
    { name: "Elder Boost", price: 0.80 },
    { name: "Mint Refresh", price: 0.80 }
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
  