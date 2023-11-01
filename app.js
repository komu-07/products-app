const url = 'https://course-api.com/javascript-store-products';
const productDOM = document.querySelector('.products-center');

const fetchProducts = async () => {
  productDOM.innerHTML = `<div class="loading"></div>`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('there was an error fetching products');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    productDOM.innerHTML = `<p class="error">${error.message}</p>`;
  }
};

const displayProducts = (list) => {
  const productList = list
    .map((product) => {
      const { id } = product;
      const { price, name } = product.fields;
      const { url: img } = product.fields.image[0];
      const priceFormat = price / 100;
      return `
            <a href="product.html?id=${id}" class="single-product">
              <img src=${img} alt=${name} class="single-product-img img" />
              <footer>
                <h5 class="name">${name}</h5>
                <span class="price">$${priceFormat}</span>
              </footer>
            </a>
          `;
    })
    .join('');
  productDOM.innerHTML = `<div class='products-container'>
    ${productList}
    </div>`;
};

const start = async () => {
  const result = await fetchProducts();
  displayProducts(result);
};
start();
