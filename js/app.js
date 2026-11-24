
/* ==========================================
   FANTASY CATS CAFÉ
   Sistema interativo - JavaScript
========================================== */

/* BANCO DE DADOS DEMONSTRATIVO */

const products = [
    {
        id: 1,
        name: "Poção de Morango",
        category: "Bebidas",
        price: 16,
        description: "Bebida cremosa de morango com chantilly e muito carinho.",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=700",
        tag: "Mais vendido"
    },
    {
        id: 2,
        name: "Café Lua Cheia",
        category: "Bebidas",
        price: 14,
        description: "Café especial com leite vaporizado e toque de baunilha.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700",
        tag: "Especial"
    },
    {
        id: 3,
        name: "Milkshake Encantado",
        category: "Bebidas",
        price: 19,
        description: "Milkshake de chocolate com cobertura cremosa.",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700",
        tag: "Favorito"
    },
    {
        id: 4,
        name: "Bolo Gatinho",
        category: "Doces",
        price: 18,
        description: "Bolo macio com decoração inspirada nos nossos gatinhos.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700",
        tag: "Fofo"
    },
    {
        id: 5,
        name: "Cupcake Estelar",
        category: "Doces",
        price: 12,
        description: "Cupcake artesanal com cobertura especial.",
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=700",
        tag: "Delicado"
    },
    {
        id: 6,
        name: "Donut Galáctico",
        category: "Doces",
        price: 10,
        description: "Donut com cobertura colorida e confeitos mágicos.",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=700",
        tag: "Novidade"
    },
    {
        id: 7,
        name: "Sanduíche da Floresta",
        category: "Salgados",
        price: 21,
        description: "Sanduíche artesanal com ingredientes fresquinhos.",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700",
        tag: "Natural"
    },
    {
        id: 8,
        name: "Torta do Reino",
        category: "Salgados",
        price: 17,
        description: "Torta salgada artesanal com recheio especial.",
        image: "https://images.unsplash.com/photo-1576458088443-04a19bb13da6?w=700",
        tag: "Artesanal"
    },
    {
        id: 9,
        name: "Chá da Lua",
        category: "Bebidas",
        price: 13,
        description: "Chá aromático para momentos de tranquilidade.",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=700",
        tag: "Relaxante"
    }
];

const missions = [
    {
        id: 1,
        title: "Copinho reutilizável",
        description: "Utilize um copo reutilizável na sua próxima visita.",
        points: 20,
        icon: "🥤"
    },
    {
        id: 2,
        title: "Reciclagem mágica",
        description: "Separe corretamente seus resíduos recicláveis.",
        points: 15,
        icon: "♻️"
    },
    {
        id: 3,
        title: "Ajude a natureza",
        description: "Plante uma muda ou cuide de uma plantinha.",
        points: 30,
        icon: "🌱"
    },
    {
        id: 4,
        title: "Menos desperdício",
        description: "Evite desperdício de alimentos e água.",
        points: 15,
        icon: "💧"
    },
    {
        id: 5,
        title: "Compartilhe consciência",
        description: "Incentive alguém a ter uma atitude sustentável.",
        points: 25,
        icon: "🌎"
    },
    {
        id: 6,
        title: "Sacola consciente",
        description: "Utilize uma sacola reutilizável nas compras.",
        points: 20,
        icon: "🛍️"
    }
];

const rewards = [
    {
        id: 1,
        name: "Desconto de 5%",
        description: "Ganhe 5% de desconto em uma compra.",
        points: 50,
        icon: "🎀"
    },
    {
        id: 2,
        name: "Bebida surpresa",
        description: "Desbloqueie uma bebida especial.",
        points: 100,
        icon: "🧋"
    },
    {
        id: 3,
        name: "Doce mágico",
        description: "Resgate um doce especial da casa.",
        points: 150,
        icon: "🧁"
    }
];

/* ARMAZENAMENTO */

function loadData(key, fallback) {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        return fallback;
    }
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

let cart = loadData("fantasyCart", []);
let users = loadData("fantasyUsers", []);
let currentUser = loadData("fantasyCurrentUser", null);
let orders = loadData("fantasyOrders", []);
let reviews = loadData("fantasyReviews", []);
let ecoPoints = loadData("fantasyEcoPoints", 0);
let clubPoints = loadData("fantasyClubPoints", 0);
let completedMissions = loadData("fantasyCompletedMissions", []);
let redeemedRewards = loadData("fantasyRedeemedRewards", []);

/* FUNÇÕES AUXILIARES */

function money(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

function toast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const notification = document.createElement("div");
    notification.className = "toast";
    notification.textContent = message;

    container.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/* NAVEGAÇÃO */

function navigate(page) {
    const target = document.getElementById(page);

    if (!target) return;

    document.querySelectorAll(".page").forEach(section => {
        section.classList.remove("active");
    });

    target.classList.add("active");

    if (page === "cart") renderCart();
    if (page === "account") renderAccount();
    if (page === "orders") renderOrders();
    if (page === "reviews") renderReviews();
    if (page === "eco") renderEco();
    if (page === "club") renderClub();
    if (page === "admin") renderAdmin();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

document.addEventListener("click", event => {
    const link = event.target.closest("[data-page]");

    if (link) {
        event.preventDefault();
        navigate(link.dataset.page);
    }
});

/* PRODUTOS */

function productCard(product) {
    return `
        <article class="product-card">

            <div class="product-image">
                <img src="${product.image}"
                     alt="${escapeHTML(product.name)}"
                     loading="lazy">

                <span class="product-tag">
                    ${escapeHTML(product.tag)}
                </span>
            </div>

            <div class="product-info">

                <h3>${escapeHTML(product.name)}</h3>

                <p>${escapeHTML(product.description)}</p>

                <div class="product-bottom">

                    <span class="product-price">
                        ${money(product.price)}
                    </span>

                    <button class="add-button"
                        data-add-product="${product.id}"
                        title="Adicionar ao carrinho">
                        +
                    </button>

                </div>

            </div>

        </article>
    `;
}

function renderFeatured() {
    const container = document.getElementById("featured-products");

    if (!container) return;

    container.innerHTML = products
        .slice(0, 3)
        .map(productCard)
        .join("");
}

function renderProducts(category = "Todos", search = "") {
    const container = document.getElementById("menu-products");

    if (!container) return;

    const filtered = products.filter(product => {
        const matchesCategory =
            category === "Todos" || product.category === category;

        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span>🐈‍⬛</span>
                Nenhum produto encontrado.
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(productCard).join("");
}

let selectedCategory = "Todos";

document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter-button").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        const search = document.getElementById("search-product").value;

        renderProducts(selectedCategory, search);
    });
});

document.getElementById("search-product").addEventListener("input", event => {
    renderProducts(selectedCategory, event.target.value);
});

/* PERSONALIZAÇÃO DO PRODUTO */

function openProductModal(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) return;

    const modal = document.getElementById("product-modal");
    const content = document.getElementById("modal-product-content");

    content.innerHTML = `
        <img src="${product.image}" class="modal-product-image"
             alt="${escapeHTML(product.name)}">

        <h2>${escapeHTML(product.name)}</h2>

        <p>${escapeHTML(product.description)}</p>

        <label for="product-size">Tamanho</label>

        <select id="product-size">
            <option value="0">Pequeno - sem acréscimo</option>
            <option value="4">Médio - + R$ 4,00</option>
            <option value="7">Grande - + R$ 7,00</option>
        </select>

        <label for="product-extra">Adicional</label>

        <select id="product-extra">
            <option value="0">Sem adicional</option>
            <option value="3">Chantilly - + R$ 3,00</option>
            <option value="4">Calda especial - + R$ 4,00</option>
            <option value="5">Confeitos mágicos - + R$ 5,00</option>
        </select>

        <label for="product-quantity">Quantidade</label>

        <input type="number" id="product-quantity"
               min="1" max="20" value="1">

        <p>
            Total:
            <strong id="modal-total">${money(product.price)}</strong>
        </p>

        <button class="primary-button full-button"
                id="confirm-product">
            Adicionar à sacolinha ♡
        </button>
    `;

    modal.classList.remove("hidden");

    const size = document.getElementById("product-size");
    const extra = document.getElementById("product-extra");
    const quantity = document.getElementById("product-quantity");
    const total = document.getElementById("modal-total");

    function updateTotal() {
        const value =
            (product.price +
            Number(size.value) +
            Number(extra.value)) *
            Math.max(1, Number(quantity.value) || 1);

        total.textContent = money(value);
    }

    size.addEventListener("change", updateTotal);
    extra.addEventListener("change", updateTotal);
    quantity.addEventListener("input", updateTotal);

    document.getElementById("confirm-product").addEventListener("click", () => {
        const amount = Math.min(
            20,
            Math.max(1, Number(quantity.value) || 1)
        );

        addToCart(
            product.id,
            amount,
            Number(size.value),
            Number(extra.value)
        );

        modal.classList.add("hidden");
    });
}

document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("product-modal").classList.add("hidden");
});

document.getElementById("product-modal").addEventListener("click", event => {
    if (event.target.id === "product-modal") {
        event.currentTarget.classList.add("hidden");
    }
});

/* CARRINHO */

function addToCart(productId, quantity = 1, size = 0, extra = 0) {
    const product = products.find(item => item.id === productId);

    if (!product) return;

    const key = `${productId}-${size}-${extra}`;

    const existing = cart.find(item => item.key === key);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            key,
            productId,
            quantity,
            size,
            extra
        });
    }

    saveData("fantasyCart", cart);

    updateCartCount();

    toast(`${product.name} adicionado à sacolinha! ♡`);
}

function getCartTotal() {
    return cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.productId);

        if (!product) return total;

        return total +
            (product.price + item.size + item.extra) * item.quantity;
    }, 0);
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);

    document.getElementById("cart-count").textContent = count;
}

function renderCart() {
    const container = document.getElementById("cart-items");

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span>🛒</span>
                <h3>Sua sacolinha está vazia!</h3>
                <p>Escolha alguma delícia no nosso cardápio.</p>
                <button class="primary-button"
                        onclick="navigate('menu')">
                    Explorar cardápio
                </button>
            </div>
        `;
    } else {
        container.innerHTML = cart.map(item => {
            const product = products.find(p => p.id === item.productId);

            if (!product) return "";

            const unitPrice = product.price + item.size + item.extra;

            return `
                <div class="cart-item">

                    <img src="${product.image}" alt="${escapeHTML(product.name)}">

                    <div class="cart-item-info">

                        <h3>${escapeHTML(product.name)}</h3>

                        <p>
                            Tamanho: ${item.size === 0 ? "Pequeno" : item.size === 4 ? "Médio" : "Grande"}
                        </p>

                        <p>Adicionais: ${money(item.extra)}</p>

                        <span class="cart-item-price">
                            ${money(unitPrice * item.quantity)}
                        </span>

                        <div class="quantity-controls">

                            <button data-action="decrease"
                                    data-key="${item.key}">−</button>

                            <span>${item.quantity}</span>

                            <button data-action="increase"
                                    data-key="${item.key}">+</button>

                        </div>

                    </div>

                    <button class="remove-button"
                            data-action="remove"
                            data-key="${item.key}">
                        ✕
                    </button>

                </div>
            `;
        }).join("");
    }

    const total = getCartTotal();

    document.getElementById("cart-subtotal").textContent = money(total);
    document.getElementById("cart-total").textContent = money(total);
}

document.addEventListener("click", event => {
    const button = event.target.closest("[data-add-product]");

    if (button) {
        openProductModal(Number(button.dataset.addProduct));
    }

    const actionButton = event.target.closest("[data-action]");

    if (!actionButton) return;

    const key = actionButton.dataset.key;
    const item = cart.find(item => item.key === key);

    if (!item) return;

    switch (actionButton.dataset.action) {
        case "increase":
            item.quantity++;
            break;

        case "decrease":
            item.quantity--;

            if (item.quantity <= 0) {
                cart = cart.filter(item => item.key !== key);
            }
            break;

        case "remove":
            cart = cart.filter(item => item.key !== key);
            toast("Produto removido.");
            break;
    }

    saveData("fantasyCart", cart);

    updateCartCount();
    renderCart();
});

/* FINALIZAÇÃO DO PEDIDO */

document.getElementById("checkout-button").addEventListener("click", () => {
    if (!currentUser) {
        toast("Entre na sua conta para continuar! ♡");
        navigate("account");
        return;
    }

    if (cart.length === 0) {
        toast("Sua sacolinha está vazia!");
        return;
    }

    const order = {
        id: Date.now(),
        userEmail: currentUser.email,
        items: cart.map(item => ({ ...item })),
        total: getCartTotal(),
        date: new Date().toLocaleString("pt-BR"),
        status: "Pedido recebido"
    };

    orders.unshift(order);

    saveData("fantasyOrders", orders);

    cart = [];

    saveData("fantasyCart", cart);

    updateCartCount();
    renderCart();

    navigate("orders");

    toast("Pedido realizado com sucesso! ♡");
});

/* LOGIN E CADASTRO */

document.querySelectorAll(".auth-tab").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".auth-tab").forEach(tab => {
            tab.classList.remove("active");
        });

        button.classList.add("active");

        const register = button.dataset.auth === "register";

        document.getElementById("login-form").classList.toggle("hidden", register);
        document.getElementById("register-form").classList.toggle("hidden", !register);
    });
});

document.getElementById("register-form").addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim().toLowerCase();
    const password = document.getElementById("register-password").value;

    if (users.some(user => user.email === email)) {
        toast("Este e-mail já está cadastrado!");
        return;
    }

    const user = {
        id: Date.now(),
        name,
        email,
        password
    };

    users.push(user);

    saveData("fantasyUsers", users);

    currentUser = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    saveData("fantasyCurrentUser", currentUser);

    event.target.reset();

    renderAccount();

    toast("Cadastro realizado! Bem-vinda ao reino! ♡");
});

document.getElementById("login-form").addEventListener("submit", event => {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;

    const user = users.find(item =>
        item.email === email && item.password === password
    );

    if (!user) {
        toast("E-mail ou senha incorretos!");
        return;
    }

    currentUser = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    saveData("fantasyCurrentUser", currentUser);

    event.target.reset();

    renderAccount();

    toast("Login realizado! Que bom ter você aqui! ♡");
});

function renderAccount() {
    const auth = document.getElementById("auth-area");
    const profile = document.getElementById("profile-area");

    if (!currentUser) {
        auth.classList.remove("hidden");
        profile.classList.add("hidden");
        return;
    }

    auth.classList.add("hidden");
    profile.classList.remove("hidden");

    profile.innerHTML = `
        <div class="profile-box">

            <div class="profile-avatar">🐈‍⬛</div>

            <h3>Olá, ${escapeHTML(currentUser.name)}!</h3>

            <p>${escapeHTML(currentUser.email)}</p>

            <div class="profile-menu">

                <button onclick="navigate('orders')">
                    📦 Meus pedidos
                </button>

                <button onclick="navigate('club')">
                    ⭐ Minhas recompensas
                </button>

                <button onclick="navigate('reviews')">
                    ♡ Avaliar experiência
                </button>

                <button onclick="logout()">
                    Sair da conta
                </button>

            </div>

        </div>
    `;
}

function logout() {
    currentUser = null;

    saveData("fantasyCurrentUser", null);

    renderAccount();

    toast("Você saiu da sua conta.");
}

/* PEDIDOS */

function renderOrders() {
    const container = document.getElementById("orders-list");

    if (!container) return;

    if (!currentUser) {
        container.innerHTML = `
            <div class="empty-state">
                <span>🔐</span>
                Entre na sua conta para visualizar seus pedidos.
            </div>
        `;
        return;
    }

    const myOrders = orders.filter(order =>
        order.userEmail === currentUser.email
    );

    if (myOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span>📦</span>
                Você ainda não possui pedidos.
            </div>
        `;
        return;
    }

    container.innerHTML = myOrders.map(order => `
        <article class="order-card">

            <h3>Pedido #${order.id.toString().slice(-6)}</h3>

            <p>Data: ${escapeHTML(order.date)}</p>

            <p>Total: <strong>${money(order.total)}</strong></p>

            <span class="order-status">
                ${escapeHTML(order.status)}
            </span>

            <p style="margin-top: 12px;">
                ${order.items.length} produto(s) no pedido.
            </p>

        </article>
    `).join("");
}

/* QUIZ MÁGICO */

const quizResults = {
    calma: {
        name: "Chá da Lua",
        description: "Sua energia pede tranquilidade. Uma bebida delicada para relaxar.",
        icon: "🌙",
        productId: 9
    },
    energia: {
        name: "Café Lua Cheia",
        description: "Você precisa de energia para conquistar o universo!",
        icon: "⚡",
        productId: 2
    },
    doce: {
        name: "Poção de Morango",
        description: "Seu dia merece um toque doce, cremoso e especial.",
        icon: "🍓",
        productId: 1
    },
    misterio: {
        name: "Milkshake Encantado",
        description: "Você tem uma alma curiosa e merece experimentar algo diferente!",
        icon: "🔮",
        productId: 3
    }
};

document.querySelectorAll(".quiz-option").forEach(button => {
    button.addEventListener("click", () => {
        const result = quizResults[button.dataset.answer];

        const content = document.getElementById("quiz-content");
        const resultArea = document.getElementById("quiz-result");

        content.classList.add("hidden");
        resultArea.classList.remove("hidden");

        resultArea.innerHTML = `
            <div class="quiz-result-card">

                <span style="font-size:55px;">${result.icon}</span>

                <h3>Sua combinação mágica é:</h3>

                <h2>${result.name}</h2>

                <p>${result.description}</p>

                <button class="primary-button"
                        id="quiz-add-product">
                    Quero experimentar ♡
                </button>

                <button class="secondary-button"
                        id="quiz-again"
                        style="margin-top:12px;">
                    Refazer quiz
                </button>

            </div>
        `;

        document.getElementById("quiz-add-product").addEventListener("click", () => {
            addToCart(result.productId);
        });

        document.getElementById("quiz-again").addEventListener("click", () => {
            resultArea.classList.add("hidden");
            content.classList.remove("hidden");
        });
    });
});

/* ECO MAGIC */

function renderEco() {
    document.getElementById("eco-points").textContent = ecoPoints;

    const container = document.getElementById("eco-missions");

    container.innerHTML = missions.map(mission => {
        const completed = completedMissions.includes(mission.id);

        return `
            <article class="mission-card">

                <span style="font-size:35px;">${mission.icon}</span>

                <h3>${mission.title}</h3>

                <p>${mission.description}</p>

                <p><strong>+${mission.points} pontos</strong></p>

                <button
                    data-mission="${mission.id}"
                    ${completed ? "disabled" : ""}>
                    ${completed ? "Missão concluída ✓" : "Concluir missão"}
                </button>

            </article>
        `;
    }).join("");
}

document.addEventListener("click", event => {
    const button = event.target.closest("[data-mission]");

    if (!button) return;

    const missionId = Number(button.dataset.mission);

    if (completedMissions.includes(missionId)) return;

    const mission = missions.find(item => item.id === missionId);

    if (!mission) return;

    completedMissions.push(missionId);

    ecoPoints += mission.points;

    saveData("fantasyCompletedMissions", completedMissions);
    saveData("fantasyEcoPoints", ecoPoints);

    renderEco();

    toast(`Você ganhou ${mission.points} pontos mágicos! 🌱`);
});

/* CLUBE FANTASY */

function renderClub() {
    document.getElementById("club-points").textContent = clubPoints;

    const container = document.getElementById("rewards-list");

    container.innerHTML = rewards.map(reward => {
        const redeemed = redeemedRewards.includes(reward.id);

        return `
            <article class="reward-card">

                <span style="font-size:35px;">${reward.icon}</span>

                <h3>${reward.name}</h3>

                <p>${reward.description}</p>

                <p><strong>${reward.points} pontos</strong></p>

                <button
                    data-reward="${reward.id}"
                    ${redeemed || clubPoints < reward.points ? "disabled" : ""}>
                    ${redeemed ? "Resgatado ✓" : "Resgatar recompensa"}
                </button>

            </article>
        `;
    }).join("");
}

document.addEventListener("click", event => {
    const button = event.target.closest("[data-reward]");

    if (!button) return;

    const rewardId = Number(button.dataset.reward);

    const reward = rewards.find(item => item.id === rewardId);

    if (!reward) return;

    if (redeemedRewards.includes(rewardId)) return;

    if (clubPoints < reward.points) {
        toast("Você ainda não possui pontos suficientes!");
        return;
    }

    clubPoints -= reward.points;

    redeemedRewards.push(rewardId);

    saveData("fantasyClubPoints", clubPoints);
    saveData("fantasyRedeemedRewards", redeemedRewards);

    renderClub();

    toast("Recompensa resgatada! ♡");
});

/* AVALIAÇÕES */

document.getElementById("review-form").addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("review-name").value.trim();
    const rating = Number(document.getElementById("review-rating").value);
    const message = document.getElementById("review-message").value.trim();

    reviews.unshift({
        id: Date.now(),
        name,
        rating,
        message,
        date: new Date().toLocaleDateString("pt-BR")
    });

    saveData("fantasyReviews", reviews);

    event.target.reset();

    renderReviews();

    toast("Sua avaliação foi enviada! Muito obrigada! ♡");
});

function renderReviews() {
    const container = document.getElementById("reviews-list");

    if (!container) return;

    if (reviews.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span>💌</span>
                Seja a primeira pessoa a avaliar nosso café!
            </div>
        `;
        return;
    }

    container.innerHTML = reviews.map(review => `
        <article class="review-card">

            <h3>${escapeHTML(review.name)}</h3>

            <div class="review-stars">
                ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
            </div>

            <p>${escapeHTML(review.message)}</p>

            <small>${escapeHTML(review.date)}</small>

        </article>
    `).join("");
}

/* POÇÃO MISTERIOSA */

const mysteryProducts = [
    "Poção de Morango 🍓",
    "Café Lua Cheia ☕",
    "Milkshake Encantado 🧋",
    "Cupcake Estelar 🧁",
    "Donut Galáctico 🍩",
    "Chá da Lua 🌙"
];

document.getElementById("mystery-button").addEventListener("click", () => {
    const result = mysteryProducts[
        Math.floor(Math.random() * mysteryProducts.length)
    ];

    document.getElementById("mystery-result").innerHTML = `
        ✨ Sua poção misteriosa revelou: <br><br>
        <strong>${result}</strong>
    `;
});

/* ADMINISTRAÇÃO */

function renderAdmin() {
    document.getElementById("admin-orders").textContent = orders.length;
    document.getElementById("admin-users").textContent = users.length;
    document.getElementById("admin-reviews").textContent = reviews.length;

    const container = document.getElementById("admin-orders-list");

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                Nenhum pedido realizado ainda.
            </div>
        `;
        return;
    }

    container.innerHTML = orders.map(order => `
        <article class="order-card">

            <h3>Pedido #${order.id.toString().slice(-6)}</h3>

            <p>Cliente: ${escapeHTML(order.userEmail)}</p>

            <p>Data: ${escapeHTML(order.date)}</p>

            <p>Total: <strong>${money(order.total)}</strong></p>

            <label for="status-${order.id}">Status do pedido</label>

            <select id="status-${order.id}"
                    data-order-status="${order.id}">

                <option ${order.status === "Pedido recebido" ? "selected" : ""}>
                    Pedido recebido
                </option>

                <option ${order.status === "Em preparação" ? "selected" : ""}>
                    Em preparação
                </option>

                <option ${order.status === "Saiu para entrega" ? "selected" : ""}>
                    Saiu para entrega
                </option>

                <option ${order.status === "Concluído" ? "selected" : ""}>
                    Concluído
                </option>

            </select>

        </article>
    `).join("");
}

document.addEventListener("change", event => {
    const select = event.target.closest("[data-order-status]");

    if (!select) return;

    const orderId = Number(select.dataset.orderStatus);

    const order = orders.find(item => item.id === orderId);

    if (!order) return;

    order.status = select.value;

    saveData("fantasyOrders", orders);

    toast("Status do pedido atualizado!");
});

/* INICIALIZAÇÃO */

function initializeApp() {
    renderFeatured();
    renderProducts();
    updateCartCount();
    renderCart();
    renderAccount();
    renderReviews();
    renderEco();
    renderClub();
    renderAdmin();

    console.log("🐈‍⬛ Fantasy Cats Café iniciado com sucesso!");
}

initializeApp();
