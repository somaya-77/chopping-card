
// filter products
const categoryTitle = document.querySelectorAll(".category-title");
const allProducts = document.querySelectorAll(".all");

for(let i = 0; i < categoryTitle.length; i++){
    categoryTitle[i].addEventListener("click", filterProducts.bind(this, categoryTitle[i]));
}

function filterProducts(item) {
    changeActive(item);
    for(let i = 0; i < allProducts.length; i++){
        if(allProducts[i].classList.contains(item.attributes.id.value)) {
            allProducts[i].style.display = "block";
        }else{
            allProducts[i].style.display = "none";
        }
    }
}
function changeActive(activeItem) {
    for(let i = 0; i < categoryTitle.length; i++){
        categoryTitle[i].classList.remove('active');
    }
    activeItem.classList.add("active")
}

// open and close buy
let openIcon = document.querySelector(".cartIcon");
let cart = document.querySelector(".cart");
let closeCart = document.getElementById("close-cart");

openIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};



// search product
function search() {
    const searchBox = document.getElementById("searchPro").value.toUpperCase();
    const containPro = document.querySelector(".content");
    const products = document.querySelectorAll(".product");
    const titlePro = document.getElementsByTagName("h5");

    for(let i=0; i < titlePro.length; i++){
        let valueTitle = products[i].getElementsByTagName("h5")[0];

        if(valueTitle){
            let textValue = valueTitle.textContent || valueTitle.innerHTML;

            if(textValue.toUpperCase().indexOf(searchBox) > -1){
                products[i].style.display = '';
            }else{
                products[i].style.display = 'none';
            }
        }
    }
}
// ////////////////////////////////////////////////////////////////////////////////////////////////
start();

function  start(){
    // delete button
    let deleteProduct = document.getElementsByClassName("delete");
    for(let i = 0; i < deleteProduct.length; i++){
        let button = deleteProduct[i];
        button.addEventListener('click', removeItem);
    };
    // quantity input
    let input = document.getElementsByClassName("input");
    for(let i = 0; i < input.length; i++){
        let change = input[i];
        change.addEventListener('change', quantityChanged);
    };
    // add to cart
    let addCart = document.getElementsByClassName("addCart");
    for(let i = 0; i < addCart.length; i++){
        let button = addCart[i];
        button.addEventListener('click', addToCart);
    };
    // buy button
    document.getElementsByClassName("buyNow")[0].addEventListener("click", buyNow)
};

// removeItem
function removeItem(event){
    let clickedBtn = event.target;
    clickedBtn.parentElement.parentElement.remove();
    updateTotal();
};

// quantityChanged
function quantityChanged(event) {
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    };
    updateTotal();
};

// addToCart
function addToCart(event){
    let clickedBtn = event.target;
    let shopItem = clickedBtn.parentElement.parentElement.parentElement;
    let title = shopItem.getElementsByClassName("titlePro")[0].innerText;
    let price = shopItem.getElementsByClassName("price-pro")[0].innerText;
    let image = shopItem.getElementsByClassName("image")[0].src;
    addItemToCart(title, price, image);
    updateTotal();
}
// buyNow
function buyNow(){
    alert("Thank you for your purchase");
    let parent = document.getElementsByClassName("products-cart")[0];
    // check & remove child
    while(parent.hasChildNodes()){
        parent.innerHTML = '';
    };
    updateTotal();
};
// add the product to cart
function addItemToCart(title, price, image){
    let div = document.createElement("div");
    div.classList.add("product-cart");
    let parent = document.getElementsByClassName("products-cart")[0];
    let titlePro = document.getElementsByClassName("title-pro");
    for(let i = 0; i < titlePro.length; i++){
        if(titlePro[i].innerText == title){
            alert("This item is already added to the cart");
            return;
        }
    }
    let contain = `
        <div class="contain">
            <div class="img-cart">
                <img  class="image" src="${image}" alt="">
            </div>
            <div class="detail-pro">
                <h4 class="title-pro">${title}</h4>
                <p class="price">${price}</p>
                <input type="number" value="1" class="input">
            </div>
        </div>
        <div class="trash">
            <i class="fa-solid fa-trash-can delete"></i>
        </div>
    `
    div.innerHTML = contain;
    parent.append(div);
    div.getElementsByClassName("delete")[0].addEventListener('click', removeItem);
    div.getElementsByClassName("input")[0].addEventListener('change', quantityChanged);

}


// update total products
function updateTotal() {
    let productItems = document.getElementsByClassName("products-cart")[0];
    let productItem = productItems.getElementsByClassName("product-cart");
    let total = 0;
    for(let i = 0; i < productItem.length; i++){
        let product = productItem[i];
        let priceProduct = product.getElementsByClassName("price")[0];
        let quantityProduct = product.getElementsByClassName("input")[0];

        let price = parseFloat(priceProduct.innerText.replace('$',''));
        let qantity = quantityProduct.value;
        total = total + (price * qantity);
    };
    total = total.toFixed(2);
    document.getElementById("total-price").innerText = '$' + total;
};








