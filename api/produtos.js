const grid = document.getElementById("product-grid")
const carrossel = document.getElementById("carrossel-track")

fetch("https://fakestoreapi.com/products")

.then(res => res.json())

.then(produtos => {

let cards = ""

produtos.forEach(produto => {

cards += `
<div class="product-card">

<img src="${produto.image}">

<h3>${produto.title}</h3>

<p>Produto disponível</p>

<span>R$ ${produto.price}</span>

<button class="buy-btn">Comprar</button>

</div>
`

})

grid.innerHTML = cards
carrossel.innerHTML = cards + cards

})

/* CONTROLE CARROSSEL */

let position = 0

const left = document.querySelector(".left")
const right = document.querySelector(".right")

right.onclick = () => {
position -= 300
carrossel.style.transform = `translateX(${position}px)`
}

left.onclick = () => {
position += 300
carrossel.style.transform = `translateX(${position}px)`
}

/* AUTO SCROLL */

setInterval(()=>{
position -= 1
carrossel.style.transform = `translateX(${position}px)`
},30)