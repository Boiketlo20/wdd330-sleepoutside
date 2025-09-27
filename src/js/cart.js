import { getLocalStorage, loadHeaderFooter, updateCartBadge } from "./utils.mjs";

loadHeaderFooter();

function cartItemActions() {
  const cartList = document.querySelector(".product-list");
  cartList.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".cart-card__remove a");
    if (!removeBtn) return;
    e.preventDefault();

    const key = removeBtn.dataset.id;
    const li = removeBtn.closest("li.cart-card");
    li.remove();

    const cartItems = getLocalStorage(CARTKEY) || [];
    const newCartItems = cartItems.filter(item => item.Id != key);
    localStorage.setItem(CARTKEY, JSON.stringify(newCartItems));
    renderCartItems()
    updateCartBadge();
  });

  cartList.addEventListener("input", (e) => {
    if (!e.target.classList.contains("cart-card__quantity")) return;

    const input = e.target;
    const newQty = Math.max(1, Math.floor(Number(input.value))); // Garantizar entero >= 1
    input.value = newQty;

    const cartItems = getLocalStorage(CARTKEY) || [];
    const item = cartItems.find(i => i.Id === input.dataset.id);
    if (item) {
      item.qty = newQty;
      setLocalStorage(CARTKEY, cartItems);
      updateCartBadge();
      renderCartContents(); // Opcional si quieres recalcular total
    }
  });
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  cartItemActions()
  renderCartItems()
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

//Adding total to cart:
function renderCartItems() {
  const cartItems = getLocalStorage('so-cart') || [];
  const cartMessage = document.getElementById("cart-message");
  if (cartItems.length === 0) {
    cartMessage.textContent = "Your cart is empty.";
    document.querySelector(".product-list").innerHTML = "";
    document.querySelector('.cart-total').innerHTML = "";
    return;
  }

  document.querySelector('.cart-footer').classList.remove('hide');
  if (cartItems.length > 0) {
    let totalAmount = 0;
    for (const item of cartItems) {
      totalAmount += (item.FinalPrice * (item.qty || 1));
    }
    document.querySelector('.cart-total').innerHTML = `Total: $${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}
