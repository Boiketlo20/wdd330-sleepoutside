import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    return `
        <li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
              <img
                src="${product.Image}"
                alt="${product.NameWithoutBrand}"
              />
              <h3 class="card__brand">${product.Brand?.Name || ""}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
        </li>
        `;
}

export default class ProductList{

    constructor(category, dataSource, listElement){
        // You passed in this information to make the class as reusable as possible.
        // Being able to define these things when you use the class will make it very flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init(){
        const list = await this.dataSource.getData();
        // next, render the list
        this.renderList(list);
    }

    renderList(list){
        // apply use new utility function 
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}