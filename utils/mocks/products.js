const productMocks = [
  {
    name: "Red shoes",
    price: 75,
    image: 'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5823.png',
    tags: [ "shoes", "red", "cheap" ]
  },
  {
    name: "Bycicle",
    price: 700,
    image: "https://pngimg.com/uploads/bicycle/bicycle_PNG5374.png",
    tags: [ "sport", "expensive" ]
  }
];

function filteredProductsMock(tag) {
  return productMocks.filter(product => product.tags.includes(tag));
}

class ProductsServiceMock {
  async getProducts() {
    return Promise.resolve(productMocks);
  }

  async createProduct() {
    return Promise.resolve("6bedb1267d1ca7f3053e2875");
  }
}

module.exports = {
  productMocks,
  filteredProductsMock,
  ProductsServiceMock
};