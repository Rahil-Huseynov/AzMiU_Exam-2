const menuItems = [
  {
    id: 1,
    name: "Sezar Salatı",
    price: 12.99,
    image: "🥗",
    category: "appetizers",
    description: "Parmesan pendiri və krutonlarla təzə romaine kahı",
  },
  {
    id: 2,
    name: "Toyuq Qanadları",
    price: 14.99,
    image: "🍗",
    category: "appetizers",
    description: "Ranch sousu ilə ədviyyatlı buffalo qanadları",
  },
  {
    id: 3,
    name: "Mozzarella Çubuqları",
    price: 9.99,
    image: "🧀",
    category: "appetizers",
    description: "Marinara sousu ilə qızardılmış mozzarella",
  },
  {
    id: 4,
    name: "Qızardılmış Qızılbalıq",
    price: 24.99,
    image: "🐟",
    category: "mains",
    description: "Limon yağı sousu ilə təzə Atlantik qızılbalığı",
  },
  {
    id: 5,
    name: "Mal Əti Biftek",
    price: 28.99,
    image: "🥩",
    category: "mains",
    description: "Mükəmməl bişirilmiş premium ribeye biftek",
  },
  {
    id: 6,
    name: "Toyuqlu Pasta",
    price: 18.99,
    image: "🍝",
    category: "mains",
    description: "Qızardılmış toyuqla kremalı alfredo pasta",
  },
  {
    id: 7,
    name: "Marqarita Pizza",
    price: 16.99,
    image: "🍕",
    category: "mains",
    description: "Təzə mozzarella və reyhanla klassik pizza",
  },
  {
    id: 8,
    name: "Mal Əti Burger",
    price: 15.99,
    image: "🍔",
    category: "mains",
    description: "Kahı, pomidor və kartof qızartması ilə şirəli mal əti köftəsi",
  },
  {
    id: 9,
    name: "Şokolad Tortu",
    price: 8.99,
    image: "🍰",
    category: "desserts",
    description: "Vanil dondurması ilə zəngin şokolad tortu",
  },
  {
    id: 10,
    name: "Çizkeyk",
    price: 7.99,
    image: "🍰",
    category: "desserts",
    description: "Giləmeyvə sousu ilə Nyu-York üslubunda çizkeyk",
  },
  {
    id: 11,
    name: "Dondurma",
    price: 5.99,
    image: "🍨",
    category: "desserts",
    description: "Vanil, şokolad və çiyələk - üç top",
  },
  {
    id: 12,
    name: "Təzə Portağal Şirəsi",
    price: 4.99,
    image: "🍊",
    category: "drinks",
    description: "Təzə sıxılmış portağal şirəsi",
  },
  {
    id: 13,
    name: "Qəhvə",
    price: 3.99,
    image: "☕",
    category: "drinks",
    description: "Premium qovurulmuş qəhvə dənələri",
  },
  {
    id: 14,
    name: "Sərinləşdirici İçkilər",
    price: 2.99,
    image: "🥤",
    category: "drinks",
    description: "Koka-Kola, Pepsi, Sprite və digərləri",
  },
  {
    id: 15,
    name: "Şərab",
    price: 8.99,
    image: "🍷",
    category: "drinks",
    description: "Ev qırmızı və ya ağ şərabı",
  },
]

let order = JSON.parse(localStorage.getItem("restaurantOrder")) || []
const favorites = JSON.parse(localStorage.getItem("restaurantFavorites")) || []
let currentFilter = "all"
let slideIndex = 1

// Başlatma
document.addEventListener("DOMContentLoaded", () => {
  loadMenu()
  updateOrderCount()
  updateFavoritesCount()
  showSlides(slideIndex)

  // Avtomatik slayd
  setInterval(nextSlide, 5000)
})

// Slayder Funksiyaları
function showSlides(n) {
  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".slider-dot")

  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }

  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].classList.add("active")
  }
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add("active")
  }
}

function currentSlide(n) {
  slideIndex = n
  showSlides(slideIndex)
}

function nextSlide() {
  slideIndex++
  showSlides(slideIndex)
}

// Menyu Funksiyaları
function filterMenu(category) {
  currentFilter = category

  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  loadMenu()
}

function loadMenu() {
  const menuGrid = document.getElementById("menu-grid")
  if (!menuGrid) return

  menuGrid.innerHTML = ""

  const filteredItems =
    currentFilter === "all" ? menuItems : menuItems.filter((item) => item.category === currentFilter)

  filteredItems.forEach((item) => {
    const menuItem = document.createElement("div")
    menuItem.className = "menu-item"
    menuItem.innerHTML = `
            <div class="item-image">
                ${item.image}
            </div>
            <div class="item-info">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-description">${item.description}</p>
                <div class="item-price">$${item.price}</div>
                <div class="item-actions">
                    <button class="btn btn-small" onclick="addToOrder(${item.id}, event)">Səbətə Əlavə Et</button>
                    <button class="btn btn-secondary btn-small" onclick="addToFavorites(${item.id})">❤️</button>
                </div>
            </div>
        `
    menuGrid.appendChild(menuItem)
  })
}

// Səhifə Naviqasiyası
function showOrderPage() {
  document.getElementById("home-page").style.display = "none"
  document.getElementById("order-page").style.display = "block"
  loadOrderPage()
}

function showHomePage() {
  document.getElementById("home-page").style.display = "block"
  document.getElementById("order-page").style.display = "none"
}

// Sifariş Funksiyaları
function loadOrderPage() {
  const orderContent = document.getElementById("order-content")
  if (!orderContent) return

  if (order.length === 0) {
    orderContent.innerHTML = `
            <div class="empty-order">
                <h3>Sifarişiniz boşdur</h3>
                <p>Görünür hələ heç nə əlavə etməmisiniz.</p>
                <button class="btn" onclick="showHomePage()">Menyuya Bax</button>
            </div>
        `
    return
  }

  let subtotal = 0
  let orderItemsHTML = ""

  order.forEach((item) => {
    const itemTotal = item.price * item.quantity
    subtotal += itemTotal

    orderItemsHTML += `
            <div class="order-item" id="order-item-${item.id}">
                <div class="item-image">${item.image}</div>
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-description">${item.description}</div>
                    <div class="item-price">$${item.price}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromOrder(${item.id})">Sil</button>
            </div>
        `
  })

  const deliveryFee = subtotal > 25 ? 0 : 3.99
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  orderContent.innerHTML = `
        <div class="order-container">
            <div class="order-items">
                ${orderItemsHTML}
            </div>
            <div class="order-summary">
                <h3 class="summary-title">Sifariş Xülasəsi</h3>
                <div class="summary-row">
                    <span>Ara cəm:</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Çatdırılma haqqı:</span>
                    <span>${deliveryFee === 0 ? "Pulsuz" : "$" + deliveryFee.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Vergi:</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="summary-row total">
                    <span>Cəmi:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                
                <div class="delivery-options">
                    <h4>Çatdırılma Seçimləri:</h4>
                    <div class="delivery-option">
                        <input type="radio" id="delivery" name="orderType" value="delivery" checked>
                        <label for="delivery">🚚 Çatdırılma (30-45 dəq)</label>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" id="pickup" name="orderType" value="pickup">
                        <label for="pickup">🏃 Götürmə (15-20 dəq)</label>
                    </div>
                </div>
                
                <button class="btn btn-secondary" onclick="showHomePage()" style="width: 100%; margin-bottom: 1rem;">Sifarişə Davam Et</button>
                <button class="btn" onclick="placeOrder()" style="width: 100%;">Sifariş Ver</button>
            </div>
        </div>
    `
}

function createFlyingAnimation(itemImage, startElement) {
  const flyingItem = document.createElement("div")
  flyingItem.className = "flying-item"
  flyingItem.textContent = itemImage

  const startRect = startElement.getBoundingClientRect()
  const cartIcon = document.getElementById("cart-icon")
  const cartRect = cartIcon.getBoundingClientRect()

  flyingItem.style.left = startRect.left + startRect.width / 2 + "px"
  flyingItem.style.top = startRect.top + startRect.height / 2 + "px"

  document.body.appendChild(flyingItem)

  setTimeout(() => {
    flyingItem.style.left = cartRect.left + cartRect.width / 2 + "px"
    flyingItem.style.top = cartRect.top + cartRect.height / 2 + "px"
  }, 10)

  setTimeout(() => {
    if (flyingItem.parentNode) {
      flyingItem.parentNode.removeChild(flyingItem)
    }

    cartIcon.classList.add("cart-bounce")
    setTimeout(() => {
      cartIcon.classList.remove("cart-bounce")
    }, 600)
  }, 1000)
}

function addToOrder(itemId, event) {
  const item = menuItems.find((i) => i.id === itemId)
  const existingItem = order.find((orderItem) => orderItem.id === itemId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    order.push({ ...item, quantity: 1 })
  }

  localStorage.setItem("restaurantOrder", JSON.stringify(order))
  updateOrderCount()

  if (event && event.target) {
    const menuItemElement = event.target.closest(".menu-item")
    if (menuItemElement) {
      menuItemElement.classList.add("item-added-effect")
      setTimeout(() => {
        menuItemElement.classList.remove("item-added-effect")
      }, 500)

      createFlyingAnimation(item.image, menuItemElement)
    }
  }

  showSuccessMessage(`${item.name} səbətə əlavə edildi!`)
}

function addToFavorites(itemId) {
  const item = menuItems.find((i) => i.id === itemId)
  const existingItem = favorites.find((favItem) => favItem.id === itemId)

  if (!existingItem) {
    favorites.push(item)
    localStorage.setItem("restaurantFavorites", JSON.stringify(favorites))
    updateFavoritesCount()
    showSuccessMessage(`${item.name} sevimlilərə əlavə edildi!`)
  } else {
    showSuccessMessage(`${item.name} artıq sevimlilərdədir!`)
  }
}

function updateQuantity(itemId, change) {
  const item = order.find((item) => item.id === itemId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromOrder(itemId)
    } else {
      localStorage.setItem("restaurantOrder", JSON.stringify(order))
      updateOrderCount()
      loadOrderPage()
    }
  }
}

function removeFromOrder(itemId) {
  const item = order.find((item) => item.id === itemId)
  if (!item) return

  // Silmə animasiyasını göstər
  showRemoveItemAnimation(item.name)

  // Sürüşmə animasiyası üçün silmə sinfini əlavə et
  const orderItemElement = document.getElementById(`order-item-${itemId}`)
  if (orderItemElement) {
    orderItemElement.classList.add("removing")

    // Animasiya tamamlanana qədər gözlə, sonra massivdən sil
    setTimeout(() => {
      order = order.filter((item) => item.id !== itemId)
      localStorage.setItem("restaurantOrder", JSON.stringify(order))
      updateOrderCount()
      loadOrderPage()
    }, 500)
  } else {
    // Element tapılmadıqda ehtiyat variant
    order = order.filter((item) => item.id !== itemId)
    localStorage.setItem("restaurantOrder", JSON.stringify(order))
    updateOrderCount()
    loadOrderPage()
  }
}

function updateOrderCount() {
  const count = order.reduce((total, item) => total + item.quantity, 0)
  const orderCountElement = document.getElementById("order-count")
  if (orderCountElement) {
    orderCountElement.textContent = count
  }
}

function updateFavoritesCount() {
  const favoritesCountElement = document.getElementById("favorites-count")
  if (favoritesCountElement) {
    favoritesCountElement.textContent = favorites.length
  }
}

// Animasiya ilə Sifariş Vermə
function placeOrder() {
  if (order.length === 0) return

  const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = total > 25 ? 0 : 3.99
  const tax = total * 0.08
  const finalTotal = total + deliveryFee + tax

  const orderType = document.querySelector('input[name="orderType"]:checked').value
  const orderTypeText = orderType === "delivery" ? "çatdırılma" : "götürmə"
  const estimatedTime = orderType === "delivery" ? "30-45 dəqiqə" : "15-20 dəqiqə"

  // Animasiyanı göstər
  showOrderSuccessAnimation(finalTotal, estimatedTime)

  // Sifarişi təmizlə
  order = []
  localStorage.setItem("restaurantOrder", JSON.stringify(order))
  updateOrderCount()
}

function showOrderSuccessAnimation(total, estimatedTime) {
  const animation = document.getElementById("order-success-animation")
  const deliveryTimeElement = document.getElementById("delivery-time")
  const orderTotalElement = document.getElementById("order-total")

  deliveryTimeElement.textContent = `Təxmini çatdırılma: ${estimatedTime}`
  orderTotalElement.textContent = `Cəmi: $${total.toFixed(2)}`

  animation.classList.add("show")
}

function closeOrderAnimation() {
  const animation = document.getElementById("order-success-animation")
  animation.classList.remove("show")
  showHomePage()
  loadOrderPage()
}

// Məhsul Silmə Animasiyası
function showRemoveItemAnimation(itemName) {
  const animation = document.getElementById("remove-item-animation")
  const removedItemNameElement = document.getElementById("removed-item-name")

  removedItemNameElement.textContent = `${itemName} sifarişinizdən silindi`

  animation.classList.add("show")

  // 2 saniyə sonra avtomatik gizlət
  setTimeout(() => {
    animation.classList.remove("show")
  }, 2000)
}

function showSuccessMessage(message) {
  const successMessage = document.getElementById("success-message")
  if (successMessage) {
    successMessage.textContent = message
    successMessage.classList.add("show")

    setTimeout(() => {
      successMessage.classList.remove("show")
    }, 3000)
  }
}

// Anchor linklər üçün hamar sürüşmə
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
