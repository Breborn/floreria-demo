/**
 * FLORA DEL PUERTO • Florería de Autor & Vivero Botánico (V Región, Chile)
 * Catálogo filtrable, Ramo a Medida + Carrito con Despacho por Comuna a WhatsApp
 * Página creada por Breborn.cl
 */

const WHATSAPP_PHONE = '56956823670';

const CATALOG = [
  {
    id: 'brisa_renaca',
    cat: 'ramos',
    tag: 'TOP VENTAS',
    name: 'Ramo Brisa de Reñaca',
    catLabel: 'Ramo de Autor',
    desc: 'Peonías de estación, rosas de jardín crema, ranúnculos y eucalipto dólar envuelto en lino natural.',
    img: 'assets/hero-floreria.jpg',
    prices: { std: 28990, big: 38990 }
  },
  {
    id: 'sombrerera_mar',
    cat: 'sombrereras',
    tag: 'DESPACHO HOY',
    name: 'Sombrerera Cerro Alegre',
    catLabel: 'Sombrerera de Lujo',
    desc: 'Caja rígida artesanal colmada de rosas blush, ranúnculos blancos y ramas de olivo hidratadas en espuma.',
    img: 'assets/flower-hatbox.jpg',
    prices: { std: 38990, big: 49990 }
  },
  {
    id: 'monstera_greda',
    cat: 'vivero',
    tag: 'REGALO VIVO',
    name: 'Monstera Deliciosa + Cerámica',
    catLabel: 'Vivero & Plantas',
    desc: 'Planta de interior vigorosa de 55 cm en macetero de cerámica crema o terracota con plato incluido.',
    img: 'assets/plants-nursery.jpg',
    prices: { std: 26990, big: 35990 },
    sizeLabels: { std: 'Maceta M (55 cm)', big: 'Maceta XL (80 cm)' }
  },
  {
    id: 'atardecer_valpo',
    cat: 'ramos',
    tag: 'NUEVA COSECHA',
    name: 'Ramo Atardecer Porteño',
    catLabel: 'Ramo de Autor',
    desc: 'Tonos terracota, durazno y naranjo suave con alstroemerias locales y protea sudafricana.',
    img: 'assets/hero-floreria.jpg',
    prices: { std: 24990, big: 33990 }
  },
  {
    id: 'sombrerera_aniversario',
    cat: 'sombrereras',
    tag: 'AMOR & ANIVERSARIO',
    name: 'Caja Atelier Rosas & Bombones',
    catLabel: 'Sombrerera & Regalo',
    desc: 'Sombrerera floral de rosas premium + cajita de chocolates artesanales de la V Región y dedicatoria.',
    img: 'assets/flower-hatbox.jpg',
    prices: { std: 44990, big: 56990 }
  },
  {
    id: 'suscripcion_flores',
    cat: 'suscripcion',
    tag: 'PLAN MENSUAL',
    name: 'Suscripción Flores Frescas Casa/Café',
    catLabel: 'Suscripción Semanal',
    desc: 'Entrega quincenal de flores frescas listas para florero en hogares, cafeterías o recepciones de Viña y Valpo.',
    img: 'assets/plants-nursery.jpg',
    prices: { std: 32990, big: 48990 },
    sizeLabels: { std: '2 Entregas / Mes', big: '4 Entregas (Semanal)' }
  }
];

const State = {
  filter: 'todos',
  cardSizes: {}, // id -> 'std' | 'big'
  customPalette: 'Brisa Costera (Pastel, Peonías & Eucalipto)',
  customWrap: 'Papel Kraft & Lino Natural',
  customPrice: 27990,
  cart: [] // { key, name, variant, note, price, qty }
};

const formatCLP = (val) => '$' + Number(val).toLocaleString('es-CL');

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCatalogFilters();
  renderCatalog();
  initCustomBuilder();
  initCartDrawer();
  renderCart();
});

function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mobileNav');
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => nav.classList.remove('open')));
  document.getElementById('mobileOpenCart').addEventListener('click', () => {
    nav.classList.remove('open');
    openCart();
  });
}

function initCatalogFilters() {
  document.querySelectorAll('#catalogFilters .filter-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#catalogFilters .filter-pill').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      State.filter = btn.dataset.cat;
      renderCatalog();
    });
  });
}

window.filterToVivero = function () {
  State.filter = 'vivero';
  document.querySelectorAll('#catalogFilters .filter-pill').forEach((b) => {
    b.classList.toggle('active', b.dataset.cat === 'vivero');
  });
  renderCatalog();
};

function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  const items = State.filter === 'todos' ? CATALOG : CATALOG.filter((i) => i.cat === State.filter);

  grid.innerHTML = items.map((item) => {
    const sel = State.cardSizes[item.id] || 'std';
    const labels = item.sizeLabels || { std: 'Estándar', big: 'Grande (+35%)' };
    const price = item.prices[sel];
    return `
      <article class="product-card">
        <div class="p-media">
          <img src="${item.img}" alt="${item.name}" loading="lazy">
          <span class="p-tag">${item.tag}</span>
        </div>
        <div class="p-body">
          <div>
            <span class="p-cat">${item.catLabel}</span>
            <h3>${item.name}</h3>
            <p class="p-desc">${item.desc}</p>
          </div>
          <div>
            <div class="size-switch" style="margin-bottom: 12px;">
              <button type="button" class="sz-btn ${sel === 'std' ? 'active' : ''}" onclick="setCardSize('${item.id}', 'std')">${labels.std}</button>
              <button type="button" class="sz-btn ${sel === 'big' ? 'active' : ''}" onclick="setCardSize('${item.id}', 'big')">${labels.big}</button>
            </div>
            <div class="p-footer">
              <span class="p-price">${formatCLP(price)}</span>
              <button type="button" class="btn-add-cart" onclick="addCatalogItem('${item.id}')">+ Agregar</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

window.setCardSize = function (id, size) {
  State.cardSizes[id] = size;
  renderCatalog();
};

window.addCatalogItem = function (id) {
  const item = CATALOG.find((i) => i.id === id);
  const sel = State.cardSizes[id] || 'std';
  const labels = item.sizeLabels || { std: 'Estándar', big: 'Grande (+35% flores)' };
  const variant = labels[sel];
  const price = item.prices[sel];
  const key = `${id}_${sel}`;

  const existing = State.cart.find((c) => c.key === key);
  if (existing) {
    existing.qty += 1;
  } else {
    State.cart.push({ key, name: item.name, variant, note: '', price, qty: 1 });
  }
  renderCart();
  showToast(`✓ Agregado: ${item.name} (${variant})`);
};

function initCustomBuilder() {
  document.querySelectorAll('#paletteGrid .palette-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#paletteGrid .palette-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      State.customPalette = btn.dataset.palette;
      document.getElementById('previewPalette').textContent = State.customPalette;
    });
  });

  document.querySelectorAll('#wrapGrid .wrap-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#wrapGrid .wrap-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      State.customWrap = btn.dataset.wrap;
      State.customPrice = Number(btn.dataset.price);
      document.getElementById('previewWrap').textContent = `Presentación: ${State.customWrap}`;
      document.getElementById('customPriceLabel').textContent = formatCLP(State.customPrice);
    });
  });

  const msgEl = document.getElementById('customCardMsg');
  msgEl.addEventListener('input', () => {
    const val = msgEl.value.trim();
    document.getElementById('previewCardQuote').textContent = val
      ? `💌 “${val}”`
      : '💌 “Tarjeta dedicatoria impresa en papel algodón incluida.”';
  });

  document.getElementById('addCustomBouquetBtn').addEventListener('click', () => {
    const cardText = msgEl.value.trim();
    const key = `custom_${Date.now()}`;
    State.cart.push({
      key,
      name: 'Ramo a Medida Personalizado',
      variant: `${State.customPalette} • ${State.customWrap}`,
      note: cardText,
      price: State.customPrice,
      qty: 1
    });
    renderCart();
    openCart();
    showToast('✓ Ramo personalizado agregado al carrito');
  });
}

function initCartDrawer() {
  document.getElementById('openCartBtn').addEventListener('click', openCart);
  document.getElementById('floatingCartBtn').addEventListener('click', openCart);
  document.getElementById('closeCartBtn').addEventListener('click', closeCart);
  document.getElementById('cartBackdrop').addEventListener('click', closeCart);
  document.getElementById('deliveryCommune').addEventListener('change', renderCart);
  document.getElementById('checkoutWaBtn').addEventListener('click', sendCartWhatsApp);
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartBackdrop').classList.add('open');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartBackdrop').classList.remove('open');
}

window.changeQty = function (index, delta) {
  const item = State.cart[index];
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    State.cart.splice(index, 1);
  }
  renderCart();
};

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const subtotal = State.cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalCount = State.cart.reduce((acc, item) => acc + item.qty, 0);

  const shipSelect = document.getElementById('deliveryCommune');
  const shipping = totalCount > 0 ? Number(shipSelect.value || 0) : 0;
  const grandTotal = subtotal + shipping;

  document.getElementById('navCartCount').textContent = totalCount;
  document.getElementById('mobileCartCount').textContent = totalCount;
  document.getElementById('floatCount').textContent = totalCount;
  document.getElementById('navCartTotal').textContent = formatCLP(subtotal);

  document.getElementById('drawerSubtotal').textContent = formatCLP(subtotal);
  document.getElementById('drawerShipping').textContent = totalCount > 0 ? formatCLP(shipping) : '$0';
  document.getElementById('drawerTotal').textContent = formatCLP(grandTotal);

  if (State.cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Tu carrito floral aún está vacío. Agrega un ramo del catálogo o configura uno a medida 🌸</div>';
    return;
  }

  container.innerHTML = State.cart.map((item, idx) => `
    <div class="cart-item">
      <div class="ci-info">
        <strong>${item.name}</strong>
        <small>${item.variant}</small>
        ${item.note ? `<small style="color:#B9574F;margin-top:3px;">💌 “${item.note}”</small>` : ''}
      </div>
      <div>
        <div class="ci-price">${formatCLP(item.price * item.qty)}</div>
        <div class="ci-controls">
          <button type="button" class="qty-btn" onclick="changeQty(${idx}, -1)">−</button>
          <strong>${item.qty}</strong>
          <button type="button" class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function sendCartWhatsApp() {
  if (State.cart.length === 0) {
    showToast('⚠️ Agrega al menos un arreglo o planta antes de enviar');
    return;
  }

  const shipSelect = document.getElementById('deliveryCommune');
  const shipOpt = shipSelect.options[shipSelect.selectedIndex];
  const shipLabel = shipOpt.dataset.label || shipOpt.textContent;
  const shipping = Number(shipSelect.value || 0);
  const subtotal = State.cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const total = subtotal + shipping;

  const day = document.getElementById('deliveryDay').value;
  const windowTime = document.getElementById('deliveryWindow').value;
  const recipient = document.getElementById('recipientName').value.trim() || 'Por confirmar en chat';

  const itemsLines = State.cart.map((it) => {
    const base = `• ${it.qty}x ${it.name} (${it.variant}) — ${formatCLP(it.price * it.qty)}`;
    return it.note ? `${base}\n  💌 Dedicatoria: "${it.note}"` : base;
  });

  const msg = [
    `¡Hola! 💐 Quiero hacer un pedido en *FLORA DEL PUERTO*:`,
    ``,
    ...itemsLines,
    ``,
    `Subtotal: ${formatCLP(subtotal)}`,
    `🚐 Entrega: ${shipLabel} (${formatCLP(shipping)})`,
    `💰 *Total Pedido:* ${formatCLP(total)}`,
    ``,
    `📅 *Cuándo:* ${day} • ${windowTime}`,
    `📍 *Destinatario y Dirección:* ${recipient}`,
    ``,
    `¿Me confirman disponibilidad y datos de transferencia? ¡Gracias!`
  ].join('\n');

  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}
