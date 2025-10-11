// script.js - envuelto en DOMContentLoaded para evitar problemas de elementos no existentes
document.addEventListener('DOMContentLoaded', () => {

  /* ===== Navbar scroll class ===== */
  const navbar = document.querySelector('.navbar');
  function checkNavbar() {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  checkNavbar();
  window.addEventListener('scroll', checkNavbar);

  /* ===== Smooth scroll for anchors ===== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ===== Fade-in sections (IntersectionObserver) ===== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('section').forEach(sec => observer.observe(sec));

  /* ===== CART (simulado) ===== */
  /* ===== CART (simulado) ===== */
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById('cartCount');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const closeCartBtn = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkout');
const cartFeedback = document.getElementById('cartFeedback');
const cartPayment = document.getElementById('cartPayment');
const finalizePurchase = document.getElementById('finalizePurchase');
const cancelPayment = document.getElementById('cancelPayment');

function updateCartCount() {
  if (cartCount) cartCount.textContent = cart.length;
}

function renderCart() {
  if (!cartItemsEl) return;
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<li>Carrito vacío</li>';
    cartTotalEl.textContent = 'Total: $0.00';
    return;
  }
  cartItemsEl.innerHTML = cart.map((it, i) => {
    return `<li>
      <span>${it.name} <small style="color:#d2c2a9">($${Number(it.price).toFixed(2)})</small></span>
      <span><button class="remove-item" data-index="${i}" aria-label="Eliminar ${it.name}">Eliminar</button></span>
    </li>`;
  }).join('');
  const total = cart.reduce((s, it) => s + Number(it.price), 0);
  cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
}

// Agregar productos al carrito
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const itemEl = btn.closest('.item');
    const name = itemEl.dataset.name || itemEl.querySelector('h3')?.innerText || 'Producto';
    const price = parseFloat(itemEl.dataset.price || itemEl.querySelector('.price')?.innerText?.replace(/\$/g, '') || 0);
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Pequeño feedback visual
    btn.textContent = 'Añadido ✓';
    setTimeout(() => btn.textContent = 'Agregar', 1000);
  });
});

// Abrir modal del carrito
if (cartIcon) {
  cartIcon.addEventListener('click', () => {
    renderCart();
    cartModal.classList.add('show');
    cartModal.setAttribute('aria-hidden', 'false');
    if (cartFeedback) cartFeedback.style.display = 'none';
  });
}

// Cerrar modal
if (closeCartBtn) {
  closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('show');
    cartModal.setAttribute('aria-hidden', 'true');
  });
}

// Eliminar item del carrito
cartItemsEl.addEventListener('click', (e) => {
  if (e.target.matches('.remove-item')) {
    const idx = Number(e.target.dataset.index);
    cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }
});

// Iniciar compra
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    if (cartFeedback) {
      cartFeedback.textContent = 'Tu carrito está vacío.';
      cartFeedback.className = 'message error';
      cartFeedback.style.display = 'block';
    }
    return;
  }

  // Mostrar formulario de pago
  cartPayment.style.display = 'block';
  if (cartFeedback) cartFeedback.style.display = 'none';
});

// Cancelar pago
if (cancelPayment) {
  cancelPayment.addEventListener('click', () => {
    cartPayment.style.display = 'none';
    if (cartFeedback) cartFeedback.style.display = 'none';
  });
}

// Finalizar compra (simulada)
if (finalizePurchase) {
  finalizePurchase.addEventListener('click', () => {
    // Mostrar mensaje dentro del modal
    cartFeedback.textContent = '✅ Tu compra ha sido procesada. ¡Gracias por tu pedido!';
    cartFeedback.className = 'message success';
    cartFeedback.style.display = 'block';

    // Vaciar carrito y almacenamiento
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();

    // Ocultar formulario de pago
    cartPayment.style.display = 'none';

    // Ocultar mensaje luego de unos segundos
    setTimeout(() => {
      cartFeedback.style.display = 'none';
      cartModal.classList.remove('show');
      cartModal.setAttribute('aria-hidden', 'true');
    }, 3500);
  });
}

// Cargar contador al iniciar
updateCartCount();


  /* ===== Reservation form simple validation (simulado) ===== */
  const reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre')?.value.trim();
      const fecha = document.getElementById('fecha')?.value;
      const hora = document.getElementById('hora')?.value;
      const personas = document.getElementById('personas')?.value;
      if (!nombre || !fecha || !hora || !personas) {
        alert('Por favor completa todos los campos de la reserva.');
        return;
      }
      alert(`Reserva confirmada para ${nombre} el ${fecha} a las ${hora} para ${personas} persona(s). (Simulado)`);
      reservationForm.reset();
    });
  }

  /* ===== Reviews (simulado) ===== */
  const reviewForm = document.getElementById('reviewForm');
  const reviewsContainer = document.getElementById('reviewsContainer');
  if (reviewForm && reviewsContainer) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('reviewNombre')?.value.trim();
      const comentario = document.getElementById('reviewComentario')?.value.trim();
      const cal = reviewForm.querySelector('input[name="calificacion"]:checked')?.value;
      if (!nombre || !comentario || !cal) {
        alert('Por favor completa nombre, comentario y calificación.');
        return;
      }
      const div = document.createElement('div');
      div.className = 'review';
      div.innerHTML = `<strong>${nombre}</strong> <span style="color:#d2c2a9"> - ${'★'.repeat(cal)}</span><p>${comentario}</p>`;
      reviewsContainer.prepend(div);
      reviewForm.reset();
    });
  }

}); // DOMContentLoaded end
// --- Validación de Reservas ---
/* === VALIDACIÓN DE FORMULARIOS === */

// --- Reservas ---
const reservaForm = document.getElementById('reservation-form');
if (reservaForm) {
  reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    const people = document.getElementById('people');
    const message = document.getElementById('reservation-message');
    let valid = true;

    [name, date, time, people].forEach(i => i.classList.remove('error'));

    if (!name.value.trim()) { name.classList.add('error'); valid = false; }
    if (!date.value) { date.classList.add('error'); valid = false; }
    if (!time.value) { time.classList.add('error'); valid = false; }
    if (!people.value || people.value <= 0) { people.classList.add('error'); valid = false; }

    if (!valid) {
      message.textContent = "Por favor, corrige los campos marcados.";
      message.className = "message error";
      message.style.display = "block";
    } else {
      message.textContent = "✅ Fecha reservada";
      message.className = "message success";
      message.style.display = "block";
      reservaForm.reset();
    }
  });
}

// --- Calificación con tazas ---
const ratingContainer = document.getElementById('rating');
let selectedRating = 0;

if (ratingContainer) {
  ratingContainer.querySelectorAll('span').forEach(span => {
    span.addEventListener('mouseenter', () => {
      resetHover();
      highlightCups(span.dataset.value);
    });
    span.addEventListener('mouseleave', () => {
      resetHover();
      if (selectedRating > 0) highlightCups(selectedRating);
    });
    span.addEventListener('click', () => {
      selectedRating = parseInt(span.dataset.value);
      resetHover();
      highlightCups(selectedRating);
    });
  });
}

function highlightCups(value) {
  ratingContainer.querySelectorAll('span').forEach(s => {
    if (parseInt(s.dataset.value) <= value) s.classList.add('active');
  });
}

function resetHover() {
  ratingContainer.querySelectorAll('span').forEach(s => s.classList.remove('active'));
}

// --- Opiniones ---
const reviewForm = document.getElementById('review-form');
if (reviewForm) {
  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('review-name');
    const text = document.getElementById('review-text');
    const message = document.getElementById('review-message');
    let valid = true;

    [name, text].forEach(i => i.classList.remove('error'));

    if (!name.value.trim()) { name.classList.add('error'); valid = false; }
    if (!text.value.trim()) { text.classList.add('error'); valid = false; }
    if (selectedRating === 0) { valid = false; }

    if (!valid) {
      message.textContent = selectedRating === 0
        ? "Por favor, selecciona una calificación y completa los campos."
        : "Por favor, completa los campos obligatorios.";
      message.className = "message error";
      message.style.display = "block";
    } else {
      message.textContent = `✅ Comentario enviado (${selectedRating} ☕)`;
      message.className = "message success";
      message.style.display = "block";
      reviewForm.reset();
      selectedRating = 0;
      resetHover();
    }
  });
}
// === FILTRO DE CATEGORÍAS DEL MENÚ ===
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-grid .item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Quitar la clase "active" de todos los botones
    filterButtons.forEach(b => b.classList.remove('active'));
    // Activar el botón seleccionado
    btn.classList.add('active');

    const category = btn.getAttribute('data-category');

    menuItems.forEach(item => {
      // Mostrar todos si es "all"
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = 'block';
        item.classList.add('fade-in');
      } else {
        item.style.display = 'none';
      }
    });
  });
});
/* === MODAL: Trabaja con nosotros === */
const trabajaBtn = document.querySelector('.trabaja-btn');
const applyModal = document.getElementById('applyModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeApplyModal = document.getElementById('closeApplyModal');
const cancelApply = document.getElementById('cancelApply');
const applyForm = document.getElementById('applyForm');
const applyFeedback = document.getElementById('apply-feedback');

function openApplyModal() {
  if (!applyModal) return;
  applyModal.classList.add('show');
  applyModal.setAttribute('aria-hidden', 'false');
}

function closeApply() {
  if (!applyModal) return;
  applyModal.classList.remove('show');
  applyModal.setAttribute('aria-hidden', 'true');
  // limpiar feedback y formulario después de cerrar
  if (applyFeedback) { applyFeedback.textContent = ''; applyFeedback.className = 'message'; }
  if (applyForm) applyForm.reset();
}

// Abrir modal al hacer click en botón 'Trabaja con nosotros'
if (trabajaBtn) {
  trabajaBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openApplyModal();
  });
}

// Cerrar modal con X o cancelar
if (closeApplyModal) closeApplyModal.addEventListener('click', closeApply);
if (cancelApply) cancelApply.addEventListener('click', closeApply);

// Cerrar al hacer click fuera del modal (backdrop)
if (modalBackdrop) modalBackdrop.addEventListener('click', closeApply);

// Validación/simulación de envío
if (applyForm) {
  applyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('app-name');
    const idnum = document.getElementById('app-id');
    const area = document.getElementById('app-area');
    const cv = document.getElementById('app-cv');
    const msg = document.getElementById('app-msg');

    // limpiar estilos previos
    [name, idnum, area, cv, msg].forEach(f => f && f.classList.remove('error'));

    let valid = true;
    if (!name.value.trim()) { valid = false; name.classList.add('error'); }
    if (!idnum.value.trim()) { valid = false; idnum.classList.add('error'); }
    if (!area.value.trim()) { valid = false; area.classList.add('error'); }
    if (!msg.value.trim()) { valid = false; msg.classList.add('error'); }

    // validar archivo PDF
    if (!cv.files || !cv.files[0]) {
      valid = false;
      cv.classList.add('error');
    } else {
      const file = cv.files[0];
      if (file.type !== 'application/pdf') {
        valid = false;
        cv.classList.add('error');
        if (applyFeedback) {
          applyFeedback.textContent = 'El CV debe ser un archivo PDF.';
          applyFeedback.className = 'message error';
        }
      }
    }

    if (!valid) {
      if (applyFeedback && applyFeedback.className.indexOf('error') === -1) {
        applyFeedback.textContent = ' Por favor completa los campos obligatorios correctamente ❌';
        applyFeedback.className = 'message error';
      }
      return;
    }

    // Simular envío
    if (applyFeedback) {
      applyFeedback.textContent = 'Enviando...';
      applyFeedback.className = 'message';
    }
    // simulamos delay
    setTimeout(() => {
      if (applyFeedback) {
        applyFeedback.textContent = ' Enviado, te estaremos contactando, muchas gracias ✅ ';
        applyFeedback.className = 'message success';
      }
      // limpiar formulario pero dejar modal visible unos segundos
      setTimeout(() => {
        closeApply();
      }, 2400);
    }, 900);
  });
}
