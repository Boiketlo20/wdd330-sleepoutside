// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
/*
It's like setting up a button that works whether you:
Tap it on a phone/tablet (touchscreen)
Click it with a mouse on a computer
*/
export function setClick(selector/* Which button element to target */, callback/* What should happen when someone taps/clicks */) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//URL Parameters
//get the product id from the query string
export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

/*
template: The "stamp" or pattern for each item
parentElement: Where to put the items on the page
list: The array of items to display
position: Where in the container to put them (default: at the top)
clear: Whether to clean the container first (default: false)
*/
//It takes a list of items (like products) and displays them on the page using a template pattern.
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false){
  const htmlStrings = list.map(template);
  //if clear is true we need to clear out the contents of the parent.
  if (clear){
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}


//For footer and header
export function renderWithTemplate(template, parentElement, data, callback){
  parentElement.innerHTML = template ; 
  if (callback){
    callback(data);
  }
}

export async function loadTemplate(path){
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}

export function updateCartBadge() {
  const cartItems = JSON.parse(localStorage.getItem(CARTKEY)) || [];
  const count = cartItems.reduce((total, item) => total + (item.qty || 1), 0);

  const cart = document.querySelector(".cart");
  let badge = cart.querySelector(".cart-badge");

  if (count > 0) {
    if (!badge) {
      badge = document.createElement("span");
      badge.classList.add("cart-badge");
      cart.appendChild(badge);
    }
    badge.textContent = count;
  } else {
    if (badge) {
      badge.remove();
    }
  }
}
