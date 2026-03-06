const grid = document.getElementById("product-grid")
const modal = document.getElementById("product-modal")
const paymentModal = document.getElementById("payment-modal")

let produtos = []

fetch("https://fakestoreapi.com/products")

.then(res => res.json())

.then(data => {

produtos = data

renderProducts(data)

})

function renderProducts(lista){

grid.innerHTML = ""

lista.forEach(produto => {

const card = document.createElement("div")
card.className = "product-card"

card.innerHTML = `
<img src="${produto.image}">
<h3>${produto.title}</h3>
<p>R$ ${produto.price}</p>
`

card.onclick = () => openProduct(produto)

grid.appendChild(card)

})

}

function openProduct(produto){

modal.style.display = "flex"

document.getElementById("modal-img").src = produto.image
document.getElementById("modal-title").innerText = produto.title
document.getElementById("modal-desc").innerText = produto.description

let price = produto.price
let icms = price * 0.18
let frete = 20

document.getElementById("modal-price").innerText = "R$ " + price.toFixed(2)
document.getElementById("modal-icms").innerText = "R$ " + icms.toFixed(2)
document.getElementById("modal-frete").innerText = "R$ " + frete.toFixed(2)

let final = price + icms + frete

document.getElementById("final-price").innerText =
"Total: R$ " + final.toFixed(2)

document.getElementById("apply-coupon").onclick = () => {

const cupom = document.getElementById("cupom").value

if(cupom == "NOVA10"){

final = final * 0.9

document.getElementById("final-price").innerText =
"Total com desconto: R$ " + final.toFixed(2)

}

}

document.querySelector(".buy-now").onclick = () => {

paymentModal.style.display = "flex"

}

}

document.querySelector(".close").onclick = () => {
modal.style.display = "none"
}

/* PESQUISA */

document.getElementById("search").addEventListener("input",(e)=>{

const texto = e.target.value.toLowerCase()

const filtrado = produtos.filter(p =>
p.title.toLowerCase().includes(texto)
)

renderProducts(filtrado)

})

/* PAGAMENTO */

document.querySelector(".pay-btn").onclick = () => {

alert("Compra realizada com sucesso!")

paymentModal.style.display = "none"

}
function comprarProduto(produto){

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

carrinho.push(produto)

localStorage.setItem("carrinho", JSON.stringify(carrinho))

window.location.href = "checkout.html"

}