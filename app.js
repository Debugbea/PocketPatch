const purchaseForm = document.getElementById("purchaseForm");
const itemsList = document.getElementById("itemsList");
const savedWrap = document.getElementById("savedWrap");

const addItemBtn = document.getElementById("addItemBtn");
const clearBtn = document.getElementById("clearBtn");
const receiptImgEl = document.getElementById("receiptImg");
const receiptPreviewEl = document.getElementById("receiptPreview");
const previewWrap = document.querySelector(".preview-wrap");

let receiptBase64 = "";

  const reader = new FileReader();
  reader.onload = () => {
    receiptBase64 = reader.result;
    receiptPreviewEl.src = receiptBase64;
    previewWrap.style.display = "block";
  };
  reader.readAsDataURL(file);
});
const storeEl = document.getElementById("store");
const dateEl = document.getElementById("date");
const totalEl = document.getElementById("total");
const notesEl = document.getElementById("notes");

const itemNameEl = document.getElementById("itemName");
const itemQtyEl = document.getElementById("itemQty");
const itemPriceEl = document.getElementById("itemPrice");
const itemCategoryEl = document.getElementById("itemCategory");

let currentItems = [];

function money(n) {
  return Number(n || 0).toFixed(2);
}

function loadPurchases() {
  try {
    return JSON.parse(localStorage.getItem("pp_purchases")) || [];
  } catch {
    return [];
  }
}

function savePurchases(purchases) {
  localStorage.setItem("pp_purchases", JSON.stringify(purchases));
}

function renderCurrentItems() {
  itemsList.innerHTML = "";
  currentItems.forEach((it, idx) => {
    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML = `
      <div><strong>${it.name}</strong><div class="small">${it.category}</div></div>
      <div>Qty: ${it.qty}</div>
      <div>$${money(it.price)}</div>
      <div><span class="badge">$${money(it.qty * it.price)} total</span></div>
      <button type="button" data-idx="${idx}">X</button>
    `;
    li.querySelector("button").addEventListener("click", () => {
      currentItems.splice(idx, 1);
      renderCurrentItems();
    });
    itemsList.appendChild(li);
  });
}

function renderSaved() {
  const purchases = loadPurchases();
  savedWrap.innerHTML = "";

  if (purchases.length === 0) {
    savedWrap.innerHTML = `<div class="small">No purchases saved yet.</div>`;
    return;
  }

  purchases.slice().reverse().forEach((p) => {
    const div = document.createElement("div");
    div.className = "saved-card";

    const itemsHtml = p.items.map(i =>
      `<li>${i.name} (${i.category}) — Qty ${i.qty} — $${money(i.price)}</li>`
    ).join("");

    div.innerHTML = `
      <div class="row">
        <div><strong>${p.store}</strong> <span class="small">(${p.date})</span></div>
        <div><strong>Total:</strong> $${money(p.total)}</div>
      </div>
      <div class="small">${p.notes ? p.notes : ""}</div>
      <ul class="small">${itemsHtml}</ul>
    `;
    savedWrap.appendChild(div);
  });
}

addItemBtn.addEventListener("click", () => {
  const name = itemNameEl.value.trim();
  const qty = Number(itemQtyEl.value);
  const price = Number(itemPriceEl.value);
  const category = itemCategoryEl.value;

  if (!name || !qty || qty < 1 || isNaN(price)) return;

  currentItems.push({ name, qty, price, category });

  itemNameEl.value = "";
  itemQtyEl.value = 1;
  itemPriceEl.value = "";

  renderCurrentItems();
});

clearBtn.addEventListener("click", () => {
  purchaseForm.reset();
  currentItems = [];
  renderCurrentItems();
});

purchaseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const purchase = {
    id: crypto.randomUUID(),
    store: storeEl.value.trim(),
    date: dateEl.value,
    total: Number(totalEl.value),
    notes: notesEl.value.trim(),
    items: currentItems
  };

  const purchases = loadPurchases();
  purchases.push(purchase);
  savePurchases(purchases);
  alert("Purchase savedd!");

  purchaseForm.reset();
  currentItems = [];
  renderCurrentItems();
  renderSaved();
});
receiptImgEl.addEventListener("change", () => {
  const file = receiptImgEl.files && receiptImgEl.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    receiptBase64 = reader.result;
    receiptPreviewEl.src = receiptBase64;
    previewWrap.style.display = "block";
  };

  reader.readAsDataURL(file);
});

renderSaved();
