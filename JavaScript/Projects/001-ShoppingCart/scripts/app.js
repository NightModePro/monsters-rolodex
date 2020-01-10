var DBControler = (function () {
    var dataBase, cartID, newCartItem, cartIndex, allItemsInCart;

    var Product = function (ID, productName, productImg, productDescription, productStock, productPrice) {
        this.ID = ID;
        this.productName = productName;
        this.productImg = productImg;
        this.productDescription = productDescription;
        this.productStock = productStock;
        this.productPrice = productPrice;
    };

    var CartItem = function (ID, cartIndex, itemName, itemImg, itemPrice, itemQuantity) {
        this.ID = ID;
        this.cartIndex = cartIndex;
        this.itemName = itemName;
        this.itemImg = itemImg;
        this.itemPrice = itemPrice;
        this.itemQuantity = itemQuantity;
    };



    dataBase = {
        store: [
            { product: 1 },
            { product: 2 }
        ],
        cart: [],
        receipe: [
            {
                id: 1,
                car: [
                    { item: 1 },
                    { item: 2 }
                ],
                total: 100
            }
        ]
    }

    cartID = 0
    cartIndex = 1

    return {
        addCartItemToDB: function (itemName, itemImg, itemPrice, itemQuantity) {
            var result, allItemsInCart;

            // check the item already exist in shopping cart
            allItemsInCart = dataBase.cart
            for (var i = 0; i < allItemsInCart.length; i++) {
                if (allItemsInCart[i].itemName === itemName) {
                    allItemsInCart[i].itemQuantity += itemQuantity
                    result = allItemsInCart[i].ID
                }
            }

            // add item in cart if it don't exist already
            if (typeof (result) !== 'number') {
                newCartItem = new CartItem(cartID, cartIndex, itemName, itemImg, itemPrice, itemQuantity);
                cartID++;
                cartIndex++;
                dataBase.cart.push(newCartItem);
                result = newCartItem
            }

            // return the result
            return result;
        },

        getItemFromCartBaseOnName: function (itemName) {
            var result, allItemsInCart;

            // check the item already exist in shopping cart
            allItemsInCart = dataBase.cart
            for (var i = 0; i < allItemsInCart.length; i++) {
                if (allItemsInCart[i].itemName === itemName) {
                    result = allItemsInCart[i]
                }
            }
            return result
        },

        getDB: function () {
            return dataBase
        }
    }

})();




var UIStoreController = (function () {
    //code here
    return {
        getTheProduct: function (event) {
            var btn, shopProduct, name, img, price, quantity;

            btn = event.target;
            shopProduct = btn.parentElement.parentElement;

            name = shopProduct.getElementsByClassName('product-name')[0].innerText;
            img = shopProduct.getElementsByTagName('img')[0].src;
            price = parseFloat(shopProduct.getElementsByClassName('price-value')[0].innerText);
            quantity = parseFloat(shopProduct.getElementsByClassName('add-product-quantity')[0].value);
            if (quantity < 1 || isNaN(quantity)) {
                quantity = 1
            }

            return {
                itemName: name,
                itemImg: img,
                itemPrice: price,
                itemQuantity: quantity
            }

        },


    }
})();




var UIShopController = (function () {
    DOMStrings = {

    }

    var updateCartTotal = function () {
        var cart, allItemsInCart, total, itemInCart, priceElement, price, quantityElement, quantity;

        cart = document.getElementsByClassName('cart')[0];
        allItemsInCart = cart.getElementsByClassName('cart-item');
        total = 0;

        for (i = 0; i < allItemsInCart.length; i++) {
            itemInCart = allItemsInCart[i];
            priceElement = itemInCart.getElementsByClassName('cart-product-price')[0];
            quantityElement = itemInCart.getElementsByClassName('cart-quantity')[0];
            price = parseFloat(priceElement.innerText);
            quantity = parseFloat(quantityElement.value);
            total += (price * quantity)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = total + '$';
    }

    return {
        addNewItem: function (item) {
            var html, newHtml, element;

            // create html string
            html = `<div class="cart-item product-${item.ID}"><p class="cart-index">${item.cartIndex}</p><p class="cart-prod-name">${item.itemName}</p><p class="cart-product-price">${item.itemPrice}</p><p class="cart-currency">$$</p><input type="number" class="cart-quantity" value="${item.itemQuantity}"><button class="delete">Delete</button></div>`

            // insert html string into to DOM
            document.getElementsByClassName('all-cart-items')[0].insertAdjacentHTML('beforeend', html);
        },

        updateQuantityInCart: function (itemInCart) {
            var itemOnDisplay;

            itemOnDisplay = document.getElementsByClassName('product-' + itemInCart.ID)[0];
            itemOnDisplay.getElementsByClassName('cart-quantity')[0].value = itemInCart.itemQuantity;

        },

        updateCartTotal: function () {
            updateCartTotal();
        },

        changeQuantity: function (event) {
            var input;

            input = event.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1
            }
            updateCartTotal();
        },

        buyNow: function () {
            // code here
        },

        deleteItemFromCart: function (event) {
            var buttonClicked;

            var buttonClicked = event.target;
            buttonClicked.parentElement.remove();
            updateCartTotal();
        },
    }
})();




var APPController = (function (DBCtrl, UIStCtrl, UIShCtrl) {

    var eventListeners = function () {
        clickRemoveButton();
        updateQuantityInCart();
        addToCartBtn();
        buyNowBtn();
        UIShCtrl.updateCartTotal();
    };

    // add event listener to all delete buttons
    var clickRemoveButton = function () {
        const cart = document.getElementById('cart');

        cart.addEventListener('click', (event) => {
            const isButton = event.target.nodeName === 'BUTTON' && event.target.className === 'delete';
            if (!isButton) {
                return;
            }

            console.log('del btn');
            console.log(event.target.nodeName)
        })
    }


    // add event listeners to update the quantity in cart
    var updateQuantityInCart = function () {
        const cart = document.getElementById('cart');

        cart.addEventListener('change', (event) => {
            const isButton = event.target.nodeName === 'INPUT' && event.target.className === 'cart-quantity';
            if (!isButton) {
                return;
            }
            UIShCtrl.changeQuantity(event);
            console.log('change');
            console.log(event.target.value)
        }, false)
    }

    // add event listner to all Add To Cart button
    var addToCartBtn = function () {
        var item, newItem;
        const store = document.getElementById('store');

        store.addEventListener('click', (event) => {
            const isButton = event.target.nodeName === 'BUTTON' && event.target.className === 'add-to-cart-btn';
            if (!isButton) {
                return;
            }

            // get product values
            item = UIStCtrl.getTheProduct(event);

            // add product to database 
            newItem = DBCtrl.addCartItemToDB(item.itemName, item.itemImg, item.itemPrice, item.itemQuantity);

            if (typeof (newItem) === 'number') {
                // update UI
                var itemInCart

                itemInCart = DBControler.getItemFromCartBaseOnName(item.itemName);
                UIShCtrl.updateQuantityInCart(itemInCart)
            } else {
                // Add the new item to UI
                UIShCtrl.addNewItem(newItem);
            }

            // update total in shopping cart
            UIShCtrl.updateCartTotal();
        })

    }

    // add event listener to Buy Now Buton
    var buyNowBtn = function () {
        document.getElementsByClassName('buy-now-btn')[0].addEventListener('click', function () {
            // code here
            // copy cart list on receipe db
            // display on UI receipe
            // remove from db cart list
            // remove from UI cart list
        })
    }


    return {
        init: function () {
            eventListeners();
        }
    }

})(DBControler, UIStoreController, UIShopController);

APPController.init();