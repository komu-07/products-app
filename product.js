const url = 'https://course-api.com/javascript-store-single-product';
const productContainer = document.querySelector('.product');

const fetchProduct = async () => {
  try {
    productContainer.innerHTML = `<h4 class="product-loading">Loading...</h4>`;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const response = await fetch(`${url}?id=${id}`);

    const data = await response.json();
    return data;
  } catch (error) {
    productContainer.innerHTML = `<p class="error">There was an error loading the product.Please try again later</p>`;
  }
};

const displayProduct = (product) => {
  const { company, colors, price, name: title, description } = product.fields;
  const { url: img } = product.fields.image[0];
  document.title = title.toUpperCase();
  const formatPrice = price / 100;
  const colorsList = colors
    .map((color) => {
      return `<span class="product-color" style= 'background: ${color}'></span>`;
    })
    .join('');
  productContainer.innerHTML = `      <div class="product-wrapper">
        <img src=${img} alt=${title} class="img" />
        <div class="product-info">
          <h3>${title}</h3>
          <h5>${company}</h5>
          <span>$${formatPrice}</span>
          <div class="colors">
         
           ${colorsList}
            
          </div>
          <p>
            ${description}
          </p>
          <button class="btn">add to cart</button>
        </div>
      </div>`;
};
const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};
start();
