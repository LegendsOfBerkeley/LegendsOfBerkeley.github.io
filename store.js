if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  document.cookie = "SameSite"
  ready()
}

var listItems = []

function ready() {
  switchToName()
  const elem = document.getElementById("switchToP")
  elem.addEventListener('click', switchToPurchase)
  var removeFromCartBtn = document.getElementsByClassName('rmv-btn')
  for (var i=0; i<removeFromCartBtn.length; i++) {
    var button = removeFromCartBtn[i]
    button.addEventListener('click', removeCartItem)
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (var i = 0; i < addToCartButtons.length; i++) {
    var b = addToCartButtons[i]
    b.addEventListener('click', addToCartClicked)
  }
}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  var imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  addItemToCart(title, price, imgSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemNames.length; i++) {
    console.log(cartItemNames[i].innerText)
    console.log(title)

    if (cartItemNames[i].innerText == title) {
      alert('This item is already added to the cart')
      return
    }
  }
  var cartRowContents = `
    <div class="cart-item cart-column">
      <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn rmv-btn" type="button">REMOVE</button>
    </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  updateCartTotal()
  cartRow.getElementsByClassName('rmv-btn')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function addToSheet(items) {
  var cartRows = items.getElementsByClassName('cart-row')
  var total = document.getElementsByClassName('cart-total-price')[0].innerText
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var quantity = quantityElement.value
    listItems += `item: ${cartItems.getElementsByClassName('cart-item-title')}` + `,` + `quantity: ${quantity}` + `,` + `price: ${priceElement}`
  };
  listItems += `total: ${total}`
  /*
  var values = [
    [
      listItems
    ]
  ];
  var body = {
    values: values
  };
  var valueInputOption = USER_ENTERED
  gapi.client.sheets.spreadsheets.values.append({
     spreadsheetId: 1QCr43gXZWeHFihE1pbtpzOH0hmpV7IjQF2YslH4NZk8,
     range: Sheet1,
     valueInputOption: valueInputOption,
     resource: body,
     insertDataOption: INSERT_ROWS
  }).then((response) => {
    var result = response.result
    console.log(`${result.updates.updatedCells} cells appended.`)
  });
  */
}

function purchaseClicked(){
  alert("Thank you for your purchase")
  var cartItems = document.getElementsByClassName('cart-items')[0]
  /*
  var key = AIzaSyBrWPNw7KkfF5bFubZbg50EbnpPGGTX9-0
  gapi.client.init({
    apiKey: key
  }).then(function () {
    gapi.client.sheets.spreadsheets.values.append()
  })
  */
  addToSheet(cartItems)
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('$', ''))
    var quantity = quantityElement.value
    total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

///take name from the text box and add it to the sheet vars, then switch styling on .name-insert for .cart-total and .btn btn-purchase
function switchToPurchase() {
  console.log("yeetpt2")
    var name = document.getElementById("full-name").value
    var email = document.getElementById("email").value
    listItems += `${name}` + `,` + `${email}` + `,`
    document.getElementById("name").style.display = "none";
    document.getElementById("cart-total").style.display = "block";
    document.getElementById("btn btn-purchase").style.display = "block";
}

///swtich back styling to pre-switchToPurchase
function switchToName() {
    document.getElementById("name").style.display = "block";
    document.getElementById("cart-total").style.display = "none";
    document.getElementById("btn btn-purchase").style.display = "none";
}
