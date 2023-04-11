const footer = document.createElement('footer');
document.querySelector('html').appendChild(footer);
const ulist = document.createElement('ul');
ulist.classList.add('allergens');
footer.appendChild(ulist);

if(window.location.pathname==='/menu'){
    fetch('http://localhost:9000/api/pizza')
        .then(response => response.json())
        .then(data => {
            data.pizzas.forEach(pizza => {
                const pizzaDiv = document.createElement('div');
                pizzaDiv.classList.add('pizza');
                pizzaDiv.innerHTML = `
                <h2>${pizza.name}</h2>
                <p>${pizza.ingredients}</p>
                <p>$ ${(pizza.price / 100).toFixed(2)}</p>
                <p>Allergens: ${pizza.allergens}</p>
                <input class="quantity" type="number" min="1" max="10" value="1"/>
                <button>Add to cart</button>
                `;
                document.querySelector('#root').appendChild(pizzaDiv);
            });
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
    <h2>About</h2>
    <div class="flex-center">
        <div class="container">
            Welcome to "Pizza Express", the premier online pizza ordering website established in 2023. Our website is designed to make ordering your favorite pizzas easy, convenient and hassle-free.
            When you visit our website, you'll be greeted by a user-friendly interface that allows you to customize your order with just a few clicks. You can choose from a variety of crusts, sauces, and toppings to create your perfect pizza. Whether you're a meat lover, a vegetarian, or a vegan, we have something for everyone.
        </div>
    </div>
    `)
}else if(window.location.pathname==='/contact'){

}else if(window.location.pathname==='/basket'){

}

