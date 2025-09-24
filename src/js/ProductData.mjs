function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}

/* 
If your website needs info about a tent with ID "abc123", this class will:
Know the tents menu is at ../json/tents.json
Fetch and check that file
Search through all tents to find the one with ID "abc123"
Return just that tent's information
 */
