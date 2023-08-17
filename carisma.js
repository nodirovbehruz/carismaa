const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const clearCartBtn = document.querySelector('.clear-cart-btn');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const nameInput = document.querySelector('#nameInput');
const phoneInput = document.querySelector('#phoneInput');
const adressInput = document.querySelector('#adress');
const massaInput = document.querySelector('#massa');
const comentsInput = document.querySelector('#coments');
const sendBtn = document.querySelector('#sendButton');
const photos = ['/long/DSC01424.jpg', '/long/DSC01362.jpg', '/long/cfutbolka.png','/casual/DSC01652.jpg', '/long/DSC01428.jpg', '/long/DSC01702.jpg', '/long/DSC01727-copy-0.png' ,'/img-carisma/DSC01278.jpg','/long/DSC01358.jpg','/long/hello.jpg','/Carisma clasics/DSC01278.jpg','/Carisma clasics/DSC01287.jpg','/Carisma clasics/DSC01303 (1).jpg','/regbi-img/DSC01274.jpg','/regbi-img/DSC01278.jpg','/regbi-img/DSC01280.jpg','/regbi-img/DSC01284.jpg','/regbi-img/DSC01280.jpg','/white/DSC01284.jpg','/white/DSC01289.jpg','/white/DSC01292.jpg','/white/DSC01362.jpg','/white/DSC01287.jpg','/base-img/DSC01424.jpg','/base-img/DSC01448.jpg','/base-img/DSC01448.jpg','/base-img/DSC01431.jpg','/base-img/DSC01444.jpg','/simbolismo-img/DSC01367.jpg','/simbolismo-img/one.jpg','/simbolismo-img/DSC01373.jpg','/simbolismo-img/DSC01377.jpg','/inizale-img/VIN_0456.JPG','/inizale-img/VIN_0458.JPG','/inizale-img/VIN_0457.JPG','/choko-pants/DSC01652.jpg','/choko-pants/DSC01659.jpg','/choko-pants/DSC01662.jpg','/pants-two-img/DSC01503.jpg','/pants-two-img/DSC01472.jpg','/pants-two-img/DSC01474.jpg','/pants-two-img/DSC01507.jpg','/pants-two-img/DSC01507.jpg','/shorts-one/DSC01702.jpg','/shorts-one/DSC01714.jpg','/shorts-one/DSC01721.jpg','/shorts-one/DSC01725.jpg','/polo/DSC01300.jpg','/polo/DSC01306.jpg','/polo/DSC01352.jpg','/polo/DSC01354.jpg'];
const telegramBotToken = '6693285897:AAFwr3e3nFu4SLU3_XuIgCjxOufeBlb4YS0';
const telegramChatId = '-945321208';
const CLIENT_ID = 'your-client-id';
const API_KEY = 'your-api-key';
const SPREADSHEET_ID = '1OGPFnNFXMDvEoT0AzvrWAaM3D1dTxyYG_5yjLtFZHes';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

// document.addEventListener('contextmenu', event => {
//   event.preventDefault();
// });
// let cart = [];

if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
  showCartItems();
}
addToCartBtns.forEach(addToCartBtn => {
  addToCartBtn.addEventListener('mousedown', () => {
    const name = addToCartBtn.dataset.name;
    const price = Number(addToCartBtn.dataset.price);
    const image = addToCartBtn.dataset.image;

    const existingItem = cart.find(item => item.name === name);
    if (!existingItem) {
      cart.push({
        name: name,
        price: price,
        image: image,
        quantity: 1
      });
    }

    saveCart();
    showCartItems();
  });
});


clearCartBtn.addEventListener('click', () => {
  cart = [];
  saveCart();
  showCartItems();
});
localStorage.setItem('photos', JSON.stringify(photos));
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

cartItems.addEventListener('click', e => {
  if (e.target.classList.contains('plus-btn')) {
    const name = e.target.dataset.name;
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
      saveCart();
      showCartItems();
    }
  }
  if (e.target.classList.contains('minus-btn')) {
    const name = e.target.dataset.name;
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity--;
      if (existingItem.quantity <= 0) {
        const index = cart.findIndex(item => item.name === name);
        if (index !== -1) {
          cart.splice(index, 1);
        }
      }
      saveCart();
      showCartItems();
    }
  }
  if (e.target.classList.contains('remove-item-btn')) {
    const name = e.target.dataset.name;
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
      cart.splice(index, 1);
      saveCart();
      showCartItems();
    }
  }
});

function createCartItem(item) {
  const li = document.createElement('li');
  li.innerHTML = `
    <img class="popup-img" src="${item.image}" alt="${item.name}">
    <div>
      <h3 class="item_name">${item.name}</h3>
      <p class="price">
        ${item.price} сум
        <button class="minus-btn" data-name="${item.name}">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="plus-btn" data-name="${item.name}">+</button>
      </p>
    
    </div>
    <button class="remove-item-btn" data-name="${item.name}">Удалить</button>
  `;
  return li;
}

function showCartItems() {
  cartItems.innerHTML = "";
  const shippingPrice = 30000; // Set the shipping price to 30,000

  if (cart.length === 0) {
    const emptyCartText = document.createElement("p");
    emptyCartText.textContent = "Здесь пока пуста";
    cartItems.appendChild(emptyCartText);

    // Hide the cart total and clear cart button when the cart is empty
    cartTotal.style.display = "none";
    clearCartBtn.style.display = "none";

    // Hide the input fields
    nameInput.style.display = "none";
    phoneInput.style.display = "none";
    adressInput.style.display = "none";
    comentsInput.style.display = "none";
    sendBtn.style.display = "none";
    massaInput.style.display = "none";
    return;
  }

  let totalQuantity = 0;
  let totalPrice = 0;

  // Show the cart total and clear cart button when there are items in the cart
  cartTotal.style.display = "block";
  clearCartBtn.style.display = "block";

  // Show the input fields when there are items in the cart
  nameInput.style.display = "block";
  phoneInput.style.display = "block";
  adressInput.style.display = "block";
  comentsInput.style.display = "block";
  sendBtn.style.display = "block";
  massaInput.style.display = "block";

  // Update the "Добавить в корзину" button text for each product
  addToCartBtns.forEach((addToCartBtn) => {
    const name = addToCartBtn.dataset.name;
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      addToCartBtn.textContent = "Добавлено в корзину";
    } else {
      addToCartBtn.textContent = "Добавить в корзину";
    }
  });

  cart.forEach((item) => {
    const li = createCartItem(item);
    cartItems.appendChild(li);
    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  cartTotal.textContent = `Товары: ${totalQuantity} шт. Доставка: ${shippingPrice.toFixed()} сум Итого: ${(totalPrice + shippingPrice).toFixed()} сум`;
}

sendBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const phone = phoneInput.value;
  const adress = adressInput.value;
  const massa = massaInput.value;
  const coments = comentsInput.value;

  if (!name || !phone|| !adress|| !massa|| !coments) {
    alert('Заполните все поля');
    return;
  }

  const products = cart.map(item => `${item.name} - ${item.quantity}`).join('\n');
  const message =`${products } \n Name: ${name} \n Телефон: ${phone}\n Адресс: ${adress}\n Размер: ${massa}\n Комент: ${coments}`; 
  const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${encodeURIComponent(message)}`;
  fetch(telegramUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Сетевой ответ был не в порядке');
      }
      return response.json();
    })
    .then(data => {
      Swal.fire(
        'Ваш заказ принят!',
        'С вами свяжутся в ближайшее время',
        'success'
      )
      cart = [];
      saveCart();
      showCartItems();
      nameInput.value = '';
      phoneInput.value = '';
      adressInput.value = '';
      massaInput.value = '';
      comentsInput.value = '';
    })
    .catch(error => {
      alert('Возникла проблема с отправкой вашего заказа. Пожалуйста, повторите попытку позже.');
      console.error('Произошла ошибка отправки сообщения:', error);
    });
});


document.getElementById("myButton").addEventListener("click", function(event) {
    event.preventDefault(); 
  });
