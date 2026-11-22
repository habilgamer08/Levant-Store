import './style.css'

const games = [
  {
    name: "Mobile Legends",
    icon: "⚔️",
    category: "MOBA",
    products: [
      { name: "86 Diamonds", price: 20000 },
      { name: "172 Diamonds", price: 39000 },
      { name: "257 Diamonds", price: 58000 },
      { name: "344 Diamonds", price: 77000 }
    ]
  },
  {
    name: "Free Fire",
    icon: "🔥",
    category: "Battle Royale",
    products: [
      { name: "70 Diamonds", price: 10000 },
      { name: "140 Diamonds", price: 19000 },
      { name: "355 Diamonds", price: 47000 },
      { name: "720 Diamonds", price: 93000 }
    ]
  },
  
  {
    name: "PUBG Mobile",
    icon: "🎯",
    category: "Battle Royale",
    products: [
      { name: "60 UC", price: 16000 },
      { name: "325 UC", price: 75000 },
      { name: "660 UC", price: 145000 },
      { name: "1800 UC", price: 370000 }
    ]
  },
  {
    name: "Genshin Impact",
    icon: "💎",
    category: "RPG",
    products: [
      { name: "60 Crystal", price: 16000 },
      { name: "300 Crystal", price: 79000 },
      { name: "980 Crystal", price: 239000 }
    ]
  },{
    name: "eFootball",
    icon: "⚽",
    category: "Sports",
    products: [
      { name: "130 eFootball Coins", price: 16000 },
      { name: "300 eFootball Coins", price: 32000 },
      { name: "550 eFootball Coins", price: 58000 },
      { name: "1040 eFootball Coins", price: 105000 },
      { name: "2130 eFootball Coins", price: 210000 }
    ]
  }

];

let selectedGame = null;
let selectedProduct = null;

const gameList = document.getElementById("gameList");
const productList = document.getElementById("productList");
const gameName = document.getElementById("gameName");
const total = document.getElementById("total");

function formatPrice(price) {
  return "Rp " + price.toLocaleString("id-ID");
}

// TAMPILKAN GAME

function renderGames() {
  gameList.innerHTML = "";

  games.forEach((game, index) => {
    const card = document.createElement("button");

    card.className = "game-card";
    card.innerHTML = `
      <div class="game-icon">${game.icon}</div>
      <h3>${game.name}</h3>
      <p>${game.category}</p>
      <div class="game-action">PILIH GAME →</div>
    `;

    card.addEventListener("click", () => {
      selectGame(index);
    });

    gameList.appendChild(card);
  });
}

// PILIH GAME

function selectGame(index) {
  selectedGame = games[index];
  selectedProduct = null;

  gameName.value = selectedGame.name;
  total.textContent = "Rp 0";

  renderProducts();

  document.getElementById("order").scrollIntoView({
    behavior: "smooth"
  });
}

// TAMPILKAN PRODUK

function renderProducts() {
  productList.innerHTML = "";

  selectedGame.products.forEach((product, index) => {
    const button = document.createElement("button");

    button.className = "product-card";

    button.innerHTML = `
      <strong>${product.name}</strong>
      <span>${formatPrice(product.price)}</span>
    `;

    button.addEventListener("click", () => {
      selectProduct(index);
    });

    productList.appendChild(button);
  });
}

// PILIH NOMINAL

function selectProduct(index) {
  selectedProduct = selectedGame.products[index];

  const buttons = productList.querySelectorAll(".product-card");

  buttons.forEach((button, i) => {
    button.classList.toggle("selected", i === index);
  });

  total.textContent = formatPrice(selectedProduct.price);
}

// CHECKOUT

document.getElementById("checkout").addEventListener("click", () => {
  const userId = document.getElementById("userId").value.trim();
  const serverId = document.getElementById("serverId").value.trim();
  const payment = document.getElementById("payment").value;

  if (!selectedGame) {
    alert("Pilih game terlebih dahulu!");
    return;
  }

  if (!userId) {
    alert("Masukkan User ID!");
    return;
  }

  if (!selectedProduct) {
    alert("Pilih nominal top up!");
    return;
  }

  // GANTI NOMOR WHATSAPP ADMIN
  const phone = "6281234567890";

  const message = `
HALO ADMIN NEXSTORE

Game: ${selectedGame.name}
User ID: ${userId}
Server ID: ${serverId || "-"}
Produk: ${selectedProduct.name}
Harga: ${formatPrice(selectedProduct.price)}
Pembayaran: ${payment}

Mohon proses pesanan saya.
`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
});

// JALANKAN WEBSITE

renderGames();
