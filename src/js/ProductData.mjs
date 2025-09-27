const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    //this.category = category;
    //this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
  const response = await fetch(`${baseURL}products/search/${category} `);
  const data = await convertToJson(response);
  return data.Result;
}
   async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
}

/* 
If your website needs info about a tent with ID "abc123", this class will:
Know the tents menu is at ../json/tents.json
Fetch and check that file
Search through all tents to find the one with ID "abc123"
Return just that tent's information
 */
