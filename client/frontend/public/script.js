const footer = document.createElement('footer');
document.querySelector('html').appendChild(footer);
const ulist = document.createElement('ul');
ulist.classList.add('allergens');
footer.appendChild(ulist);

if(window.location.pathname==='/menu'){
    fetch('http://localhost:9000/api/pizza')
        .then(response => response.json())
        .then(data => {
            const pizzaDiv = document.createElement('div');
            pizzaDiv.setAttribute("class","row row-cols-1 row-cols-md-3 g-4");
            document.querySelector("#root").appendChild(pizzaDiv);
            const pizzaData = data.pizzas.map(pizza => `<div class="col">
            <div class="card h-100">
              <img src="${pizza.img}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${pizza.name}</h5>
                <p class="card-text">${pizza.ingredients.join(',')}</p>
                <p class="card-text">Allergens: ${pizza.allergens}</p>
                <button class="add-btn">Add to cart</button>
                <input class="quantity" type="number" min="1" max="10" value="1"/> Qty.
              </div>
            </div>
          </div>`)
          pizzaDiv.insertAdjacentHTML("beforeend",pizzaData.join(' '))
        })
        .catch(err => console.log(err));
    
    
    fetch('http://localhost:9000/api/allergens')
        .then(response => response.json())
        .then(data => {
            data.forEach(allergen => {
                const allergenDiv = document.createElement('li');
                allergenDiv.classList.add('allergen');
                allergenDiv.innerHTML = `
                <li>${allergen.id}. ${allergen.name}</li>
                `;
                ulist.appendChild(allergenDiv);
            });
        })
}else if(window.location.pathname==='/about'){
    document.querySelector('#root').insertAdjacentHTML("beforeend",`
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
    `)
    document.querySelector('.order-now-btn').addEventListener('click', () => {
        window.location.pathname = '/menu'
    })
}else if(window.location.pathname==='/contact'){

}else if(window.location.pathname==='/basket'){

}

