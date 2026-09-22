document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");


  // =========================
  // MOBILE NAVBAR
  // =========================

  hamburger.addEventListener("click", () => {

    navLinks.classList.toggle("show");

  });


  document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("show");

    });

  });



  // =========================
  // FAVORITES
  // =========================

  document.querySelectorAll(".favorite").forEach(button => {

    button.addEventListener("click", () => {

      button.classList.toggle("active");


      if (button.classList.contains("active")) {

        button.textContent = "♥";

      }

      else {

        button.textContent = "♡";

      }

    });

  });



  // =========================
  // CART VARIABLES
  // =========================

  const cartButton = document.getElementById("cartButton");

  const cartDrawer = document.getElementById("cartDrawer");

  const cartClose = document.getElementById("cartClose");

  const cartOverlay = document.getElementById("cartOverlay");

  const cartItems = document.getElementById("cartItems");

  const cartCount = document.getElementById("cartCount");

  const cartTotal = document.getElementById("cartTotal");


  let cart = [];



  // =========================
  // OPEN CART
  // =========================

  function openCart() {

    cartDrawer.classList.add("open");

    cartOverlay.classList.add("show");

  }



  // =========================
  // CLOSE CART
  // =========================

  function closeCart() {

    cartDrawer.classList.remove("open");

    cartOverlay.classList.remove("show");

  }



  cartButton.addEventListener("click", openCart);


  cartClose.addEventListener("click", closeCart);


  cartOverlay.addEventListener("click", closeCart);



  // =========================
  // ADD TO CART
  // =========================

  document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", () => {


      const card = button.closest(
        ".food-card, .product-card"
      );


      const name =
        card.querySelector("h3").textContent;


      const priceElement =
        card.querySelector(
          ".price, .product-bottom span"
        );


      const priceText =
        priceElement.textContent;


      const price =
        parseFloat(
          priceText.replace(/[^\d.]/g, "")
        );


      const existingProduct =
        cart.find(
          item => item.name === name
        );


      if (existingProduct) {

        existingProduct.quantity++;

      }

      else {

        cart.push({

          name: name,

          price: price,

          quantity: 1

        });

      }



      button.textContent = "✓ ADDED";

      button.classList.add("added");


      setTimeout(() => {

        button.textContent = "+ ADD TO CART";

        button.classList.remove("added");

      }, 800);



      updateCart();


      // Automatically open small cart
      openCart();

    });

  });



  // =========================
  // UPDATE CART
  // =========================

  function updateCart() {


    cartItems.innerHTML = "";


    let totalItems = 0;

    let totalPrice = 0;



    if (cart.length === 0) {

      cartItems.innerHTML = `

        <p class="empty-cart">
          Your cart is empty.
        </p>

      `;

    }



    cart.forEach((item, index) => {


      totalItems += item.quantity;


      totalPrice +=
        item.price * item.quantity;



      const cartItem =
        document.createElement("div");


      cartItem.classList.add("cart-item");


      cartItem.innerHTML = `

        <div class="cart-item-info">

          <strong>
            ${item.name}
          </strong>

          <span>
            EGP ${item.price.toFixed(2)}
          </span>

        </div>


        <div class="cart-item-actions">

          <button
            class="qty-btn decrease"
            data-index="${index}"
          >

            −

          </button>


          <span>

            ${item.quantity}

          </span>


          <button
            class="qty-btn increase"
            data-index="${index}"
          >

            +

          </button>


          <button
            class="remove-btn"
            data-index="${index}"
          >

            ×

          </button>

        </div>

      `;


      cartItems.appendChild(cartItem);

    });



    cartCount.textContent =
      totalItems;


    cartTotal.textContent =
      `EGP ${totalPrice.toFixed(2)}`;



    addCartButtonEvents();

  }



  // =========================
  // CART ITEM BUTTON EVENTS
  // =========================

  function addCartButtonEvents() {


    document
      .querySelectorAll(".increase")
      .forEach(button => {


        button.addEventListener("click", () => {


          const index =
            button.dataset.index;


          cart[index].quantity++;


          updateCart();

        });

      });



    document
      .querySelectorAll(".decrease")
      .forEach(button => {


        button.addEventListener("click", () => {


          const index =
            button.dataset.index;


          cart[index].quantity--;


          if (
            cart[index].quantity <= 0
          ) {

            cart.splice(index, 1);

          }


          updateCart();

        });

      });



    document
      .querySelectorAll(".remove-btn")
      .forEach(button => {


        button.addEventListener("click", () => {


          const index =
            button.dataset.index;


          cart.splice(index, 1);


          updateCart();

        });

      });

  }



  // =========================
  // ESC CLOSE CART
  // =========================

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closeCart();

    }

  });



  updateCart();

});