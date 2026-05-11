let items = [];

const purchaseForm = document.getElementById("purchaseForm");
const itemsList = document.getElementById("itemsList");
const savedWrap = document.getElementById("savedWrap");

function showApp() {
  document.querySelector(".welcome").classList.add("hidden");
  document.getElementById("tracker").classList.remove("hidden");
}

document.getElementById("addItemBtn").addEventListener("click", () => {
  const name = document.getElementById("itemName").value.trim();
  const qty = document.getElementById("itemQty").value;
  const price = document.getElementById("itemPrice").value;
  const category = document.getElementById("itemCategory").value;

  if (!name || !price) {
    alert("Add item name and price");
    return;
  }

  items.push({ name, qty, price, category });

  const li = document.createElement("li");
  li.textContent = `${name} x${qty} - $${price} (${category})`;
  itemsList.appendChild(li);

  document.getElementById("itemName").value = "";
  document.getElementById("itemQty").value = 1;
  document.getElementById("itemPrice").value = "";
});

purchaseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const purchase = {
    store: document.getElementById("store").value,
    date: document.getElementById("date").value,
    total: document.getElementById("total").value,
    notes: document.getElementById("notes").value,
    items: items
  };

  const purchases = JSON.parse(localStorage.getItem("pocketPatchPurchases")) || [];
  purchases.push(purchase);
  localStorage.setItem("pocketPatchPurchases", JSON.stringify(purchases));

  purchaseForm.reset();
  items = [];
  itemsList.innerHTML = "";

  renderPurchases();
  alert("Purchase saved!");
});

document.getElementById("clearBtn").addEventListener("click", () => {
  purchaseForm.reset();
  items = [];
  itemsList.innerHTML = "";
});

function renderPurchases() {
  const purchases = JSON.parse(localStorage.getItem("pocketPatchPurchases")) || [];

  savedWrap.innerHTML = "";

  purchases.reverse().forEach((p) => {
    const div = document.createElement("div");
    div.className = "saved-card";

    div.innerHTML = `
      <h4>${p.store}</h4>
      <p><strong>Date:</strong> ${p.date}</p>
      <p><strong>Total:</strong> $${p.total}</p>
      <p>${p.notes || ""}</p>
    `;

    savedWrap.appendChild(div);
  });
}

renderPurchases();
