// all functions related to DabaBase
let DBController = (function () {
    let db, id;

    db = {
        store: [
            {
                id: 0,
                storeProductName: "Ananas",
                img: "imges/ananas.jpg",
                storeProductDescription: "Lorem30",
                storeProductPriceValue: 12,
            },
            {
                id: 1,
                storeProductName: "Acovado",
                img: "imges/avocado.webp",
                storeProductDescription: "Lorem30",
                storeProductPriceValue: 7,
            },
            {
                id: 2,
                storeProductName: "Banana",
                img: "imges/banana.jpg",
                storeProductDescription: "Lorem30",
                storeProductPriceValue: 8,
            },
            {
                id: 3,
                storeProductName: "Cherry",
                img: "imges/cherry.jpeg",
                storeProductDescription: "Lorem30",
                storeProductPriceValue: 14,
            },
            {
                id: 4,
                storeProductName: "Orange",
                img: "imges/darling-oranges-1.png",
                storeProductDescription: "Lorem30",
                storeProductPriceValue: 5,
            },
            {
                id: 5,
                storeProductName: "Green Apple",
                img: "imges/green-apple.jpg",
                storeProductDescription: "Lorem30",
                storeProductPriceValue: 3,
            },
            {
                id: 6,
                storeProductName: "Kiwi",
                img: "imges/kiwi.jpg",
                storeProductDescription: "Lorem30",
                storeProductPriceValue: 6.5,
            },
            {
                id: 7,
                storeProductName: "Lemon",
                img: "imges/lemon.jpg",
                storeProductDescription: "Lorem30",
                storeProductPriceValue: 4.5,
            },
            {
                id: 8,
                storeProductName: "Peach",
                img: "imges/peach.png",
                storeProductDescription: "Lorem30",
                storeProductPriceValue: 7,
            },
            {
                id: 9,
                storeProductName: "Pears",
                img: "imges/pears.webp",
                storeProductDescription: "Lorem30",
                storeProductPriceValue: 2,
            },
        ],
        cart: [],
        receipes: []
    }

    id = {
        store: 0,
        cart: 0,
        receipe: 1
    }

    let CartProduct = function (id, img, cartProductName, productPrice, quantity) {
        this.id = id;
        this.img = img;
        this.cartProductName = cartProductName;
        this.productPrice = productPrice;
        this.quantity = quantity;
    }

    let Receipe = function (id, cartProducts, totalPrice) {
        this.id = id;
        this.products = cartProducts;
        this.totalPrice = totalPrice;
    }


    return {
        addProductToCartDB: function (product) {
            let newCartProduct, allProductsInCart, isInCart, result;

            allProductsInCart = db.cart;

            for (var i = 0; i < allProductsInCart.length; i++) {
                if (allProductsInCart[i].cartProductName === product.productName) {
                    isInCart = true;
                    allProductsInCart[i].quantity += product.productQuantity;
                    result = allProductsInCart[i]
                }
            }

            if (!isInCart) {
                newCartProduct = new CartProduct(id.cart, product.productImage, product.productName, product.productPrice, product.productQuantity);
                db.cart.push(newCartProduct)
                id.cart++
                result = newCartProduct
            }

            return result;
        },

        addReceipeToDB: function (totalPrice) {
            let newReceipe;

            if (totalPrice > 0) {
                newReceipe = new Receipe(id.receipe, db.cart, totalPrice)
                db.receipes.push(newReceipe);
                id.receipe++;
            }

            db.cart = [];

            return newReceipe;
        },

        getStoreProducts: function () {
            return db.store
        },

        checkDB: function () {
            return db;
        }
    }
})();


// all the functions that are related to UI store section
let UIStoreController = (function () {
    return {
        getProduct: function (id) {
            let product, name, img, price, quantity;

            product = document.getElementById(id)

            // get each data I need in order to create a new item in card
            name = product.getElementsByClassName('store-product-title')[0].innerText;
            img = product.getElementsByClassName('store-product-img')[0].src;
            price = parseFloat(product.getElementsByClassName('store-product-price-value')[0].innerText);
            quantity = parseFloat(product.getElementsByClassName('store-product-quantity')[0].value);
            if (quantity < 1 || isNaN(quantity)) {
                quantity = 1;
            }

            return {
                productName: name,
                productImage: img,
                productPrice: price,
                productQuantity: quantity
            }
        },

        displayProducts: function (allProducts) {
            let html, storeHtml;

            for (var i = 0; i < allProducts.length; i++) {
                html = `<div class="store-product" id="store-product-id-${allProducts[i].id}">
                        <h4 class="store-product-title">${allProducts[i].storeProductName}</h4>
                        <div class="store-product-presentation">
                            <img src=${allProducts[i].img} alt=${allProducts[i].storeProductName} class="store-product-img">
                            <p class="store-product-description">Lorem ipsum dolor sit amet
                                consectetur adipisicing
                                elit.
                                Officiis delectus, qui eveniet repellendus ducimus similique, reiciendis exercitationem,
                                fugiat placeat pariatur asperiores quae natus minus deserunt consequuntur expedita quam
                                laudantium perspiciatis!</p>
                        </div>
                        <div class="store-product-action">
                            <div class="store-product-price-display">
                                <p class="store-product-price">Price/Unit:</p>
                                <p class="store-product-price-value">${allProducts[i].storeProductPriceValue}</p>
                                <p class="store-dollar-sign">$</p>

                            </div>
                            <div class="store-product-stock">
                                <p class="store-product-stock">Stock:</p>
                                <p class="store-product-stock-quantity">50</p>
                                <input type="number" class="store-product-quantity" value="1">
                                <button class="add-to-cart-btn">Add To Cart</button>
                            </div>
                        </div>
                    </div>`;

                storeHtml += html
            }
            document.getElementsByClassName('store-products')[0].insertAdjacentHTML('beforeend', storeHtml);
        }
    }
})();


// all the functions that are related to UI cart section
let UICartController = (function () {


    return {
        updateUI: function (newProduct) {
            let html, productInCart;

            productInCart = document.getElementById('cart-id-' + newProduct.id);
            if (productInCart === null) {
                html = `<div class="cart-product " id="cart-id-${newProduct.id}">
                    <img src="${newProduct.img}" alt="${newProduct.cartProductName}"
                    class="cart-product-img cart-product-display">
                    <h4 class="cart-product-name cart-product-display">${newProduct.cartProductName}</h4>
                    <input type="number" class="cart-product-quantity" value=${newProduct.quantity}>
                    <p class="cart-product-price cart-product-display">${newProduct.productPrice}$</p>
                    <p class="cart-product-total-price cart-product-display">${newProduct.productPrice * newProduct.quantity}$</p>
                    <button class="cart-product-delete">Delete</button>
                </div>`;

                document.getElementsByClassName('cart-products')[0].insertAdjacentHTML('beforeend', html);
            } else {
                productInCart.getElementsByClassName('cart-product-quantity')[0].value = newProduct.quantity;
            }

            return 'cart-id-' + newProduct.id
        },


        updateCartTotalPrice: function () {
            let allProductsInCart, cartTotalPrice, price, quantity;

            cartTotalPrice = 0;

            allProductsInCart = document.getElementsByClassName('cart-product')
            for (var i = 0; i < allProductsInCart.length; i++) {
                price = parseFloat(allProductsInCart[i].getElementsByClassName('cart-product-price')[0].innerText);
                quantity = parseFloat(allProductsInCart[i].getElementsByClassName('cart-product-quantity')[0].value);


                cartTotalPrice += (price * quantity);
            }

            document.getElementsByClassName('cart-total-price')[0].innerText = cartTotalPrice;
        },

        updateCartProductTotalPrice: function (product) {
            let productQuantity, productPrice, productTotalPrice;

            productQuantity = product.getElementsByClassName('cart-product-quantity')[0].value;
            productPrice = parseFloat(product.getElementsByClassName('cart-product-price')[0].innerText);
            product.getElementsByClassName('cart-product-total-price')[0].innerText = productQuantity * productPrice + '$';
        },

        emptyCart: function () {
            document.getElementsByClassName('cart-products')[0].innerHTML = "";
        }
    }
})();




// all the functions that are related to UI receipe section
let UIReceipeController = (function () {
    return {
        updateUI: function (newReceipe) {
            // check if there value is empty or not
            if (typeof (newReceipe) === 'object') {
                let html, receipeId, receipeProduct, receipeTotal;

                // header of the receipe (display id)
                receipeId = `<div class="receipe" id="receipe-${newReceipe.id}">
                                <h2>Receipe id ${newReceipe.id}</h2>
                                <table>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>`;
                // footer of the receipte (total price)
                receipeTotal = `<tr>
                                    <td colspan="2">
                                        <h2>Total: ${newReceipe.totalPrice}$</h2>
                                    </td>
                                </tr>
                            </table>
                        </div>`;

                html = receipeId
                for (var i = 0; i < newReceipe.products.length; i++) {
                    // each product from receipe
                    receipeProduct = `<tr>
                                        <td class="receipe-product-name">${newReceipe.products[i].cartProductName}</td>
                                        <td class="receipe-product-quantity">${newReceipe.products[i].quantity}</td>
                                        <td class="receipe-product-price">${newReceipe.products[i].productPrice}</td>
                                    </tr>`;

                    html += receipeProduct;
                }
                html += receipeTotal;
                document.getElementsByClassName('receipe-all')[0].insertAdjacentHTML('beforeend', html);
            }
        }
    }
})();






// application controlet
let appController = (function (DBCtrl, UIStCtrl, UICaCrtl, UIReCtrl) {
    // all event listeners
    let eventLisneters = function () {
        addToCarListener();
        deleteListener();
        inputListener();
        buyNowListener();

        UICaCrtl.updateCartTotalPrice();
    }

    // event listener to "Add to Cart" button for click
    let addToCarListener = function () {
        document.addEventListener('click', (e) => {
            let productId, product, newProductInCart, productUi, productToUpdateTotal;

            // identify the button I clcked on
            const isBtn = e.target.nodeName === 'BUTTON' && e.target.className === 'add-to-cart-btn'
            if (!isBtn) {
                return;
            }

            productId = e.target.parentNode.parentNode.parentNode.id;

            // Get the data from the clicked product
            product = UIStCtrl.getProduct(productId);

            // Add product to Cart DataBase
            newProductInCart = DBCtrl.addProductToCartDB(product);

            // Update CartUI (add new product or update quntity if product exist)
            productUi = UICaCrtl.updateUI(newProductInCart);

            // update total price for Cart
            UICaCrtl.updateCartTotalPrice();

            // update total price for product
            productToUpdateTotal = document.getElementById(productUi)
            UICaCrtl.updateCartProductTotalPrice(productToUpdateTotal)
        })
    }

    // event listener to "Delete" button for click
    let deleteListener = function () {
        document.addEventListener('click', (e) => {
            let cartProduct;

            // identify the button I clcked on
            const isBtn = e.target.nodeName === 'BUTTON' && e.target.className === 'cart-product-delete'
            if (!isBtn) {
                return;
            }

            // remove product from card
            cartProduct = e.target.parentNode
            document.getElementsByClassName('cart-products')[0].removeChild(cartProduct)

            // update price
            UICaCrtl.updateCartTotalPrice();

            console.log(cartProduct)
        })
    }

    // event listener to "input" to check when quantity is changed
    let inputListener = function () {
        document.addEventListener('change', (e) => {
            const isButton = e.target.nodeName === 'INPUT' && e.target.className === 'cart-product-quantity';
            if (!isButton) {
                return;
            }

            // update the total price for one product
            UICaCrtl.updateCartProductTotalPrice(e.target.parentNode)
            console.log('modified')

            // update price when quantity in changed
            UICaCrtl.updateCartTotalPrice();
        })
    }

    // add event listenter to "Buy Now" button
    let buyNowListener = function () {
        document.getElementsByClassName('buy-now')[0].addEventListener('click', (e) => {

            // add receipe to DB
            let totalPrice, newReceipe;

            totalPrice = parseFloat(document.getElementsByClassName('cart-total-price')[0].innerText);
            newReceipe = DBCtrl.addReceipeToDB(totalPrice);

            // clear cart
            UICaCrtl.emptyCart();
            UICaCrtl.updateCartTotalPrice();

            // update receipe UI
            UIReCtrl.updateUI(newReceipe);
        })
    }

    let addPrroductToStore = function () {
        let allProducts;

        // get all products from store
        allProducts = DBCtrl.getStoreProducts()

        // write alll producst form store in store 
        UIStCtrl.displayProducts(allProducts);
    }

    return {
        init: function () {
            eventLisneters();
            addPrroductToStore();
        }
    }
})(DBController, UIStoreController, UICartController, UIReceipeController);

appController.init();