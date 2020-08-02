//Function to create interactions to cart
const doritos_Cart = () => {
    let buyButton = document.querySelectorAll('.add-to-cart');

    //Array of product
    let product = [
        {
            name: 'Doritos Queijo Nacho',
            oldPrice: 12.99,
            newPrice: 9.99,
            inCart: 0
        }
    ]

    //Loop in buy button to made functions
    for(let i = 0; i < buyButton.length; i++) {
        buyButton[i].addEventListener("click", () => {
            setDoritosCartNumbers();
        });
    }

    //Function to save products in cart to reload page
    function onloadDoritosCartNumbers() {
        let productNumbers = localStorage.getItem("cartQuantity");

        if( productNumbers ) {
            document.querySelector('.cart-items').textContent = productNumbers;
        }
    }

    //Function to set quantity products in cart
    function setDoritosCartNumbers() {
        let productNumbers = localStorage.getItem("cartQuantity");
        productNumbers = Number(productNumbers);
        
        //Check products, if exists add more products
        if( productNumbers ) {
            localStorage.setItem("cartQuantity", productNumbers + 1);
            document.querySelector('.cart-items').textContent = productNumbers + 1;
        } else {
            localStorage.setItem("cartQuantity", 1);
            document.querySelector('.cart-items').textContent = 1;
        }
    }

    onloadDoritosCartNumbers();
};   

document.addEventListener("DOMContentLoaded", () => {
    doritos_Cart();
});