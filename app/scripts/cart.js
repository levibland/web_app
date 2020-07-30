let menuItem = document.querySelectorAll('.add-to-cart');

let products = [
    {
        name: "Short Black",
        tag: "shortblack",
        price: 2,
        inCart: 0
    },
    {
        name: "Macchiato",
        tag: "macchiato",
        price: 2,
        inCart: 0
    },
    {
        name: "Ristretto",
        tag: "ristretto",
        price: 2,
        inCart: 0
    },
    {
        name: "Long Black",
        tag: "longblack",
        price: 2,
        inCart: 0
    },
    {
        name: "Americano",
        tag: "americano",
        price: 2,
        inCart: 0
    },
    {
        name: "Flat White",
        tag: "flatwhite",
        price: 2,
        inCart: 0
    },
    {
        name: "Cappuccino",
        tag: "cappuccino",
        price: 2,
        inCart: 0
    },
    {
        name: "Latte",
        tag: "latte",
        price: 2,
        inCart: 0
    },
    {
        name: "Mochaccino",
        tag: "mochaccino",
        price: 2,
        inCart: 0
    },
    {
        name: "Mocha Latte",
        tag: "mochalatte",
        price: 2,
        inCart: 0
    },
    {
        name: "Hot Chocolate",
        tag: "hotchocolate",
        price: 2,
        inCart: 0
    },
    {
        name: "Chai Latte",
        tag: "chailatte",
        price: 2,
        inCart: 0
    },
    {
        name: "Iced Coffee",
        tag: "icedcoffee",
        price: 3,
        inCart: 0
    },
    {
        name: "Iced Chocolate",
        tag: "icedchocolate",
        price: 3,
        inCart: 0
    },
    {
        name: "Iced Chai",
        tag: "icedchai",
        price: 3,
        inCart: 0
    },
]

for (let i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.HeaderButtonBuy span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (action) {
        localStorage.setItem("cartNumbers", productNumbers -1);
        document.querySelector('.HeaderButtonBuy span').textContent = productNumbers - 1;
        console.log("action running");
    } else if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.HeaderButtonBuy span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.HeaderButtonBuy span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}


function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="../assets/images/${item.tag}.jpg" />
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price">$${item.price}.00</div>
            <div class="quantity sm-hide">
                <ion-icon class="decrease" name="chevron-back-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="chevron-forward-circle"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price}.00
            </div>
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">$${cart}.00</h4>
            </div>
        `

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        });
    }
}

onLoadCartNumbers();
displayCart();