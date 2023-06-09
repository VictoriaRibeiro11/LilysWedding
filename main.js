let carts = document.querySelectorAll('.cart-btn');

let products = 
[
    {
        name: 'Bolo de Casamento Petit',
        tag: 'cake1',
        price: 150.00,
        inCart: 0
    },
    {
        name: 'Bolo de Casamento Elegant',
        tag: 'cake2',
        price: 300.00,
        inCart: 0
    },
    {
        name: 'Bolo de Casamento Deluxe',
        tag: 'cake3',
        price: 650.00,
        inCart: 0
    },

    {
        name: 'Vestido Simples',
        tag: 'dress1',
        price: 720.00,
        inCart: 0
    },
    {
        name: 'Vestido Elegante',
        tag: 'dress2',
        price: 999.00,
        inCart: 0
    },
    {
        name: 'Vestido de Luxo',
        tag: 'dress3',
        price: 1080.00,
        inCart: 0
    },

    {
        name: 'Terno Branco',
        tag: 't1',
        price: 699.00,
        inCart: 0
    },
    {
        name: 'Terno Cinza',
        tag: 't2',
        price: 799.00,
        inCart: 0
    },
    {
        name: 'Terno Preto',
        tag: 't3',
        price: 900.00,
        inCart: 0
    },

    {
        name: 'Sandália com Laço Preto',
        tag: 'sap1',
        price: 80.00,
        inCart: 0
    },
    {
        name: 'Salto Alto - Tipo Quadrado',
        tag: 'sap2',
        price: 200.00,
        inCart: 0
    },
    {
        name: 'Salto Alto - Tipo Fino',
        tag: 'sap3',
        price: 170.00,
        inCart: 0
    },

    {
        name: 'Chocker de Tecido com Adornos',
        tag: 'chocker1',
        price: 11.00,
        inCart: 0
    },
    {
        name: 'Chocker Simples com Argola',
        tag: 'chocker2',
        price: 15.00,
        inCart: 0
    },
    {
        name: 'Chocker Rendado com Adornos',
        tag: 'chocker3',
        price: 18.00,
        inCart: 0
    },
    
    {
        name: 'Top Gótico - Coleção Especial',
        tag: 'blk0',
        price: 25.00,
        inCart: 0
    },
    {
        name: 'Coturno Gótico - Coleção Especial',
        tag: 'blk2',
        price: 200.00,
        inCart: 0
    },
    {
        name: 'Saia Gótica - Coleção Especial',
        tag: 'blk3',
        price: 75.00,
        inCart: 0
    }
];

for (let i=0; i < carts.length; i++)
{
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers()
{
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers)
    {
        document.querySelector('.shop .cart-icon span').textContent = productNumbers;
    }
}

function cartNumbers(product) 
{
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if ( productNumbers )
    {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.shop .cart-icon span').textContent = productNumbers + 1;
    }
    else
    {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.shop .cart-icon span').textContent = 1;
    }

    setItems (product);
}

function setItems(product)
{
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null)
    {
        if(cartItems[product.tag] == undefined)
        {
            cartItems =
            {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else
    {
        product.inCart = 1;
        cartItems = 
        {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product)
{
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null)
    {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else
    {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart()
{
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".items");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer)
    {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => 
        {
            productContainer.innerHTML += 
            `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="img/${item.tag}.png">
                <span>${item.name}</span>
            </div>
            <div class ="price">${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `;
        });

        productContainer.innerHTML += 
        `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Total no Carrinho
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>
            </div>
        `;
    }
}

onLoadCartNumbers();
displayCart();