const footer = document.createElement('footer');
document.querySelector('html').appendChild(footer);
const ulist = document.createElement('ul');
ulist.classList.add('allergens');
footer.appendChild(ulist);

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
            <button>Add to cart</button>
            `;
            document.body.appendChild(pizzaDiv);
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
