import { setLocalStorage, getLocalStorage } from "./utils.mjs";
//This script file will be programmed to contain the code to dynamically produce the product detail pages.
export default class ProductDetails {
    //It will be nice for the product to keep track of important information about itself.

  constructor(productId, dataSource) {
    this.productId = productId; //the product will know which id it has
    this.dataSource = dataSource; //it will have a source to get the information it needs when the time comes
    this.product = {}; //place to store the retrieved details
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
   
     // the product details are needed before rendering the HTML
    this.renderProductDetails()
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart(product){
    const cartItems = getLocalStorage("so-cart") || [];//Retrieve cart array of items, if nothing has been added yet set it to an empty array
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    console.log("Product added to cart: ", this.product);
  }

renderProductDetails() {
        if (!this.product) {
          return "<p>Product details not available.</p>";
    }
        const colorshtml = this.product.Colors.map(c => c.ColorName).join(', ');
        return `
            <h3>${this.product.Brand?.Name || ""}</h3>
            <h2 class="divider">${this.product.NameWithoutBrand}</h2>
            <img
                class="divider"
                src="${this.product.Images.PrimaryLarge}"
                alt="${this.product.NameWithoutBrand}"
            />

            <p class="product-card__price">$${this.product.FinalPrice}</p>
            <p class="product__color">${colorshtml}</p>
            <p class="product__description">${this.product.DescriptionHtmlSimple}</p>

            <div class="product-detail__add">
                <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
            </div>
        `;
    }
}