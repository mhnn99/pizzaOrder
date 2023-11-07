const footer = document.createElement("footer");
document.querySelector("html").appendChild(footer);
const ulist = document.createElement("ul");
ulist.classList.add("allergens");
document.querySelector("#menu-title").appendChild(ulist);
let cartItems;
if (localStorage.getItem("cartItems")) {
  cartItems = JSON.parse(localStorage.getItem("cartItems"));
  console.log(cartItems);
} else {
  cartItems = [];
}
const emptyBasket = () => {
  document.querySelector("#root").insertAdjacentHTML(
    "beforeend",
    `<div class="card">
<div class="row">
    <div class="col-lg-8 cart">
        <div class="title">
            <div class="row">
                <div class="col"><h4><b>Shopping Cart</b></h4></div>
                <div id="go-back-msg">Your shopping cart is empty</div>
                <div class="loader">
                  <p class="heading">Please add some items to your basket</p>
                  <div class="loading">
                    <div class="load"></div>
                    <div class="load"></div>
                    <div class="load"></div>
                    <div class="load"></div>
                  </div>
                </div>
                </div>
                <button class="back-btN">
                  <span> Back to Menu</span>
                </button>             
        </div>
    </div>
    
  </div> `
  );
  document.querySelector(".back-btN").addEventListener("click", () => {
    window.location.pathname = "/menu";
  });
};
let total = 0;
cartItems.forEach((item) => (total += item.qty));
console.log(cartItems);
if (window.location.pathname === "/menu") {
  document
    .querySelector(".basket-btn")
    .insertAdjacentHTML("beforeend", `<span>${total}</span>`);
  const pizzaFetch = async () => {
    const allergenPckgs = await fetch("http://localhost:9000/api/allergens");
    const pizzaPckgs = await fetch("http://localhost:9000/api/pizza");
    const dataAllergens = await allergenPckgs.json();
    const data = await pizzaPckgs.json();
    const pizzaDiv = document.createElement("div");
    pizzaDiv.setAttribute("class", "row row-cols-1 row-cols-md-3 g-4");
    document.querySelector("#root").appendChild(pizzaDiv);
    const pizzaDisplay = (array) => {
      const pizzaData = array.map(
        (pizza) => `<div class="col">
          <div class="card h-100">
          <img src="${pizza.img}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title">${pizza.name}</h5>
          <p class="card-text">${pizza.ingredients.join(",")}</p>
          <p class="card-text">Allergens: ${pizza.allergens}</p>
          <input class="quantity" type="number" min="1" max="10" value="1"/> Qty.
          </div>
          </div>
          </div>`
      );
      pizzaDiv.insertAdjacentHTML("beforeend", pizzaData.join(" "));
      document.querySelectorAll(".card-body").forEach((body) => {
        const addBtn = document.createElement("button");
        addBtn.classList.add("add-btn");
        addBtn.textContent = "Add to cart";
        body.insertBefore(addBtn, body.children[3]);
        addBtn.addEventListener("click", (e) => {
          const index = data.pizzas.findIndex(
            (pizza) =>
              pizza.name === e.target.parentNode.children[0].textContent
          );
          const index2 = cartItems.findIndex(
            (cart) => cart.name === data.pizzas[index].name
          );
          if (index2 !== -1) {
            cartItems.splice(index2, 1, {
              ...data.pizzas[index],
              qty:
                Number(cartItems[index2].qty) +
                Number(e.target.nextSibling.value),
            });
          } else {
            cartItems.push({
              ...data.pizzas[index],
              qty: Number(e.target.nextSibling.value),
            });
          }
          total += Number(e.target.nextSibling.value);
          document.querySelector("span").textContent =
            Number(document.querySelector("span").textContent) +
            Number(e.target.nextSibling.value);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          console.log(cartItems);
        });
      });
    };
    pizzaDisplay(data.pizzas);
    dataAllergens.forEach((allergen) => {
      const allergenDiv = document.createElement("li");
      allergenDiv.classList.add("allergen");
      allergenDiv.innerHTML = `
                <li>${allergen.id}. ${allergen.name}</li>
                `;
      ulist.appendChild(allergenDiv);
    });
    document.querySelectorAll(".allergen").forEach((allergen) => {
      allergen.addEventListener("click", (e) => {
        const index = dataAllergens.findIndex(
          (allergen) => allergen.name === e.target.innerHTML.split(" ")[1]
        );
        const pizzaData = data.pizzas.filter((pizza) =>
          pizza.allergens.includes(dataAllergens[index].id)
        );
        pizzaDiv.innerHTML = "";
        pizzaDisplay(pizzaData);
        console.log(dataAllergens[index].id);
      });
    });
  };
  pizzaFetch();
} else if (window.location.pathname === "/about") {
  document.querySelector("#root").insertAdjacentHTML(
    "beforeend",
    `
        <h2 class="text-center white">About us</h2>
        <div class="flex-center white">
            <div class="container">
                Welcome to "Pizza Express", the premier online pizza ordering website established in 2023. Our website is designed to make ordering your favorite pizzas easy, convenient and hassle-free.
                When you visit our website, you'll be greeted by a user-friendly interface that allows you to customize your order with just a few clicks. You can choose from a variety of crusts, sauces, and toppings to create your perfect pizza. Whether you're a meat lover, a vegetarian, or a vegan, we have something for everyone.
                At "Pizza Express", we understand that time is precious, which is why we offer fast and reliable delivery options. Our delivery team is equipped with state-of-the-art technology that ensures your pizza arrives hot and fresh, every time. We also offer easy payment options, including cash on delivery and online payment.
                So, what are you waiting for? Visit "Pizza Express" today and order your favorite pizza in just a few clicks.
            </div>
        </div>
        <button class="order-now-btn"> ORDER NOW!
        </button>
    `
  );
  document.querySelector(".order-now-btn").addEventListener("click", () => {
    window.location.pathname = "/menu";
  });
} else if (window.location.pathname === "/contact") {
  document.querySelector("#root").insertAdjacentHTML(
    "beforeend",
    `
    <section class="form01 cid-rKZvdqkfc9" id="form01-1h">
    <div class="container">
        <div class="row">
            <div id="form-section" class="col-lg-6 my-auto md-pb mbr-form" data-form-type="formoid">
                <!--Formbuilder Form-->
                <form action="http://127.0.0.1:9003/about" class="mbr-form form-with-styler" data-form-title="Form Name" data-gtm-form-interact-id="0"><input type="hidden" name="email" data-form-email="true" value="Cv8s/k4rFI6kL7k3T8R8G9v9LIb8BW+ZZQqQe7r1UtJdLZm+93MZDXHx8IGvReETzt+ZAcJePT/Ou9UoXcFB/Cdt4EJD7SADxMRQWA5k2dxfFN1ogxbDxuHZVHfl4nYR.KngEUX/GE1utv3kkgU1UIbTYev+bHJocfWs7mvnYH5yZoHZfdZaeKHlgrrslb3lWgSuVi+rNphxd6DiJ/98+lYGuLHgUAKGcThuGAfGAOmAnri8ycrOgzXhsA9TWYbbs">
                    <div class="form-row">
                        <div hidden="hidden" data-form-alert="" class="alert alert-success col-12"></div>
                        <div hidden="hidden" data-form-alert-danger="" class="alert alert-danger col-12">Oops...! some
                            problem!</div>
                    </div>
                    <div class="dragArea form-row">
                        <div id="contact-details" class="col-lg-12">
                            <h5 class="align-left mbr-fonts-style display-7"><strong>Ask a question</strong>
                            </h5>
                        </div>
                        <div id="contact-details" class="col-lg-12 col-md-12 col-sm-12 form-group" data-for="Name">
                            <input type="text" name="Name" placeholder="Name" data-form-field="Name" required="required" class="form-control display-7" value="" id="Name-form01-1h">
                        </div>
                        <div id="contact-details" data-for="Email" class="col-lg-12 col-md-12 col-sm-12 form-group">
                            <input type="email" name="Email" placeholder="Email" data-form-field="Email" class="form-control display-7" required="required" value="" id="Email-form01-1h" data-gtm-form-interact-field-id="0">
                        </div>
                        <div id="contact-details" data-for="Phone" class="col-lg-12 col-md-12 col-sm-12 form-group">
                            <input type="tel" name="Phone" placeholder="Phone Number" data-form-field="Phone" class="form-control display-7" required="required" value="" id="Phone-form01-1h">
                        </div>
                        <div id="contact-details" data-for="Message" class="col-lg-12 col-md-12 col-sm-12 form-group">
                            <textarea name="Message" placeholder="Your Message" data-form-field="Message" required="required" class="form-control display-7" id="Message-form01-1h"></textarea>
                        </div>
                        <div class="col-auto"><button type="submit" class="add-btn">SEND</button></div>
                    </div>
                </form>
                <!--Formbuilder Form-->
            </div>
            <div class="col-lg-6 col-md-12">
            <div class="google-map"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7040.1773047163915!2d26.112502!3d44.439061!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff3720fc05a1%3A0x916032a35d575c4e!2sStrada%20Semilunei%204%2C%20Bucure%C8%99ti%20030167!5e1!3m2!1sen!2sro!4v1681401595630!5m2!1sen!2sro" width="714" height="374.19" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
            </div>
            <div id="address">
              <div id="address-details">
                <br>
                <h5 class="address-center"><img src="./public/images/pinpoint.png"/><strong>Strada Semilunei 4 București 030167</strong></h5>
              </div>
              <div id="address-details">
                <br>
                <h5 class="address-center"><img src="./public/images/phone.png"/><strong>+40 (739) 855 117</strong></h5>
              </div>
              <div id="address-details">
                <br>
                <h5 class="address-center"><img src="./public/images/time.png"/><strong>Monday - Friday</strong></h5>
              </div>
              <div id="address-details">
              <br>
              <h5 class="address-center"><strong>10:00 AM - 9:00 PM</strong></h5>
            </div>
            </div>

        </div>

      </div>
    </section>
    `
  );
} else if (window.location.pathname === "/basket") {
  if (cartItems.length) {
    const priceReducer = (items, flag) => {
      const totalPrice = items.reduce((total, pizza) => {
        if (flag === "price") {
          total += pizza.price * pizza.qty;
        } else {
          total += pizza.qty;
        }
        return total;
      }, 0);
      return totalPrice;
    };
    document.querySelector("#root").insertAdjacentHTML(
      "beforeend",
      `<div class="card">
    <div class="row">
        <div class="col-lg-8 cart">
            <div class="title">
                <div class="row">
                    <div class="col"><h4><b>Order Summary</b></h4></div>
                    <div id="total-items" class="col align-self-center text-right text-muted">${total} items</div>
                </div>
            </div>
            </div>
            <div class="col-md-4 summary">
            <div><h5><b>Shipping info</b></h5></div>
            <hr>
            
            <form>
            <label for="name">Name:</label><input type="text" name="Name" id="name">
            <label for="email">Email:</label><input type="email" name="Email" id="email">
            <label for="city">City:</label><input type="text" name="City" id="city">
            <label for="street">Street:</label><input type="text" name="Street" id="street">
            <button type="submit" class="btn">CHECKOUT</button>
            </form>
            <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
                <div class="col">TOTAL PRICE</div>
                <div id="total-price" class="col text-right">$${priceReducer(
                  cartItems,
                  "price"
                )}</div>
                </div>
            </div>
            </div> `
    );

    const itemDetails = cartItems.map(
      (item) => `<div class="row border-top border-bottom">
    <div class="row main align-items-center">
        <div class="col-2"><img class="img-fluid" src=${
          item.img
        } alt="pizza"></div>
        <div class="col">
            <div class="row text-muted">Pizza</div>
            <div class="row">${item.name}</div>
        </div>
        <div class="col">
            <a href="#" id='substract'>-</a><a href="#" class="border">${
              item.qty
            }</a><a href="#" id='add'>+</a>
        </div>
        <div class="col">$${
          item.price * item.qty
        } <span class="close"></span></div>
    </div>
  </div>`
    );
    document
      .querySelector(".cart")
      .insertAdjacentHTML("beforeend", itemDetails.join(" "));
    document.querySelectorAll("#substract").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const index = cartItems.findIndex(
          (item) =>
            item.name ===
            e.target.parentNode.parentNode.children[1].children[1].textContent
        );
        if (priceReducer(cartItems, "qty") === 1) {
          document.querySelector("#root").innerHTML = "";
          emptyBasket();
          cartItems.splice(index, 1);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } else {
          if (cartItems[index].qty > 1) {
            cartItems[index].qty--;
            document.querySelector("#total-items").innerHTML = `${priceReducer(
              cartItems,
              "qty"
            )} items`;
            document.querySelector("#total-price").innerHTML = `$${priceReducer(
              cartItems,
              "price"
            )}`;
          } else {
            cartItems.splice(index, 1);
            e.target.parentNode.parentNode.parentNode.removeChild(
              e.target.parentNode.parentNode
            );
            document.querySelector("#total-items").innerHTML = `${priceReducer(
              cartItems,
              "qty"
            )} items`;
            document.querySelector("#total-price").innerHTML = `$${priceReducer(
              cartItems,
              "price"
            )}`;
          }
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          e.target.nextSibling.textContent = cartItems[index].qty;
          e.target.parentNode.nextSibling.nextSibling.firstChild.textContent = `$${
            cartItems[index].qty * cartItems[index].price
          }`;
         
        }
      })
    );
    document.querySelectorAll("#add").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const index = cartItems.findIndex(
          (item) =>
            item.name ===
            e.target.parentNode.parentNode.children[1].children[1].textContent
        );
        cartItems[index].qty++;
        e.target.previousSibling.textContent = cartItems[index].qty;
        e.target.parentNode.nextSibling.nextSibling.firstChild.textContent = `$${
          cartItems[index].qty * cartItems[index].price
        }`;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        document.querySelector("#total-items").innerHTML = `${priceReducer(
          cartItems,
          "qty"
        )} items`;
        document.querySelector("#total-price").innerHTML = `$${priceReducer(
          cartItems,
          "price"
        )}`;
        console.log(cartItems);
      })
    );
    document.querySelectorAll(".close").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const index = cartItems.findIndex(
          (item) =>
            item.name ===
            e.target.parentNode.parentNode.children[1].children[1].textContent
        );
        if (cartItems.length === 1) {
          document.querySelector("#root").innerHTML = "";
          cartItems.splice(index, 1);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          emptyBasket();
          console.log(cartItems);
        } else {
          cartItems.splice(index, 1);
          e.target.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode
          );
          console.log(cartItems);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
        document.querySelector("#total-items").innerHTML = `${priceReducer(
          cartItems,
          "qty"
        )} items`;
        document.querySelector("#total-price").innerHTML = `$${priceReducer(
          cartItems,
          "price"
        )}`;
      })
    );
  } else {
    emptyBasket();
  }
}
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  let fields = 0;
  e.preventDefault();

  const formData = new FormData(e.target);
  const entries = [...formData.entries()];
  const uid = Math.floor(Math.random() * 10000);
  let orderObj = {};
  let customerObj = {};
  const dateObj = {};
  const date = new Date();
  const customer = entries.reduce((acc, entry) => {
    const [k, v] = entry;
    if (k === "City" || k === "Street") {
      customerObj[k] = v;
    } else acc[k] = v;
    acc.address = { ...customerObj };
    if (!v) {
      fields++;
    }
    return acc;
  }, {});
  if (fields === 0) {
    const pizzaArr = cartItems.map((item) => {
      return { id: item.id, amount: item.qty };
    });

    dateObj.year = date.getFullYear();
    dateObj.month = date.getMonth() + 1;
    dateObj.day = date.getDate();
    dateObj.hour = date.getHours();
    dateObj.minute = date.getMinutes();

    orderObj.id = uid;
    orderObj.pizza = [...pizzaArr];
    orderObj.date = { ...dateObj };
    orderObj.customer = { ...customer };

    console.log(orderObj);
    if (!document.querySelector(".alert-success")) {
      const response = await fetch("http://localhost:9000/api/orders", {
        method: "POST",
        body: JSON.stringify(orderObj),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const res = await response.json();
      if (res === "DONE") {
        document.querySelector(".cart").insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-success mt-3" role="alert">
  Your order has been placed
</div>`
        );
        setTimeout(() => {
          document.querySelector("#root").innerHTML = "";
          emptyBasket();
          cartItems = [];
          localStorage.setItem("cartItems", cartItems);
        }, 3000);
      } else {
        document.querySelector(".cart").insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-danger mt-3" role="alert">
  Server error. Please try again later
</div>`
        );
        setTimeout(() => {
          document
            .querySelector(".cart")
            .removeChild(document.querySelector(".alert-danger"));
        }, 3000);
      }
    }
  } else {
    if (!document.querySelector(".alert-danger")) {
      document.querySelector(".cart").insertAdjacentHTML(
        "beforeend",
        `<div class="alert alert-danger mt-3" role="alert">
  Please fill all the fields
</div>`
      );
      setTimeout(() => {
        document
          .querySelector(".cart")
          .removeChild(document.querySelector(".alert-danger"));
      }, 3000);
    }
  }
});
