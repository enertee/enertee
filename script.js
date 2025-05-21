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
