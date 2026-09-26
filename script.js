/* ==========================================================================
   BRASA BURGER — script.js
   Carrinho, delivery, tema escuro, tamanho de fonte, menu mobile, formulários
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     BASE DE PRODUTOS (usada em cardapio, hamburgueres, acompanhamentos,
     sobremesas e delivery/carrinho)
  ------------------------------------------------------------------ */
  const PRODUTOS = {
    // Hambúrgueres
    "burg-classic": { nome: "Brasa Classic", categoria: "Hambúrgueres", preco: 24.9, imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80", ingredientes: "Pão brioche, blend 160g, queijo prato, alface, tomate, molho da casa", descricao: "O hambúrguer que começou tudo. Simples, suculento e no ponto certo da brasa." },
    "burg-bacon": { nome: "Brasa Bacon", categoria: "Hambúrgueres", preco: 28.9, imagem: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=700&q=80", ingredientes: "Pão brioche, blend 160g, queijo cheddar, bacon crocante, cebola caramelizada", descricao: "Bacon extra crocante e cebola caramelizada para quem gosta de intensidade." },
    "burg-cheddar": { nome: "Brasa Cheddar", categoria: "Hambúrgueres", preco: 27.9, imagem: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=700&q=80", ingredientes: "Pão brioche, blend 160g, dobro de cheddar, picles, maionese da casa", descricao: "Duas camadas generosas de cheddar derretido sobre a carne grelhada na brasa." },
    "burg-bbq": { nome: "Brasa BBQ", categoria: "Hambúrgueres", preco: 29.9, imagem: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80", ingredientes: "Pão brioche, blend 160g, queijo prato, onion rings, molho barbecue defumado", descricao: "Defumado, levemente doce e com crocância de onion rings por dentro." },
    "burg-duplo": { nome: "Brasa Duplo", categoria: "Hambúrgueres", preco: 34.9, imagem: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80", ingredientes: "Pão brioche, 2x blend 160g, queijo prato duplo, picles, molho especial", descricao: "Dois discos de carne grelhados na brasa para quem tem fome de verdade." },
    "burg-especial": { nome: "Brasa Especial", categoria: "Hambúrgueres", preco: 36.9, imagem: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=80", ingredientes: "Pão brioche artesanal, blend 180g, queijo gruyère, rúcula, cebola crispy, molho trufado", descricao: "A assinatura da casa: ingredientes nobres e defumado lento na parrilla." },
    // Acompanhamentos
    "ac-batata": { nome: "Batata Frita", categoria: "Acompanhamentos", preco: 14.9, imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80", ingredientes: "Batata rústica, sal na medida certa", descricao: "Crocante por fora, macia por dentro. A porção perfeita para dividir." },
    "ac-batata-cheddar": { nome: "Batata Cheddar & Bacon", categoria: "Acompanhamentos", preco: 22.9, imagem: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80", ingredientes: "Batata rústica, cheddar cremoso, bacon em cubos, cebolinha", descricao: "Nossa batata frita coberta com muito cheddar e bacon crocante." },
    "ac-onion": { nome: "Onion Rings", categoria: "Acompanhamentos", preco: 18.9, imagem: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=700&q=80", ingredientes: "Anéis de cebola, empanado crocante", descricao: "Anéis de cebola empanados e fritos até ficarem dourados e crocantes." },
    "ac-nuggets": { nome: "Nuggets", categoria: "Acompanhamentos", preco: 19.9, imagem: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80", ingredientes: "Frango empanado, 8 unidades", descricao: "Nuggets artesanais de frango, crocantes por fora e suculentos por dentro." },
    "ac-molhos": { nome: "Molhos Especiais", categoria: "Acompanhamentos", preco: 5.9, imagem: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=700&q=80", ingredientes: "Barbecue defumado, maionese da casa, cheddar ou pimenta", descricao: "Porção individual do molho que você escolher para acompanhar seu pedido." },
    // Sobremesas
    "sob-brownie": { nome: "Brownie", categoria: "Sobremesas", preco: 13.9, imagem: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=80", ingredientes: "Chocolate 70%, nozes, calda quente", descricao: "Brownie denso e amanteigado, servido quentinho com calda de chocolate." },
    "sob-shake-choc": { nome: "Milk-shake de Chocolate", categoria: "Sobremesas", preco: 16.9, imagem: "https://images.unsplash.com/photo-1560508180-03f285f67ded?auto=format&fit=crop&w=700&q=80", ingredientes: "Sorvete de chocolate, leite, calda e chantilly", descricao: "Cremoso, geladinho e generoso na cobertura de chantilly." },
    "sob-shake-morango": { nome: "Milk-shake de Morango", categoria: "Sobremesas", preco: 16.9, imagem: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=80", ingredientes: "Sorvete de morango, leite, morangos frescos e chantilly", descricao: "Feito com morangos de verdade e uma cobertura irresistível." },
    "sob-sundae": { nome: "Sundae", categoria: "Sobremesas", preco: 12.9, imagem: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=700&q=80", ingredientes: "Sorvete de baunilha, calda de chocolate, castanhas", descricao: "Clássico e refrescante, com calda quente derretendo o sorvete geladinho." },
    "sob-sorvete": { nome: "Sorvete", categoria: "Sobremesas", preco: 10.9, imagem: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=700&q=80", ingredientes: "Duas bolas, sabores variados", descricao: "Duas bolas do sabor que você escolher, no ponto certo de cremosidade." },
    // Bebidas
    "beb-coca": { nome: "Coca-Cola", categoria: "Bebidas", preco: 7.9, imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=700&q=80", descricao: "Lata gelada 350ml." },
    "beb-guarana": { nome: "Guaraná", categoria: "Bebidas", preco: 7.9, imagem: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=700&q=80", descricao: "Lata gelada 350ml." },
    "beb-sprite": { nome: "Sprite", categoria: "Bebidas", preco: 7.9, imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=700&q=80", descricao: "Lata gelada 350ml." },
    "beb-suco": { nome: "Suco Natural", categoria: "Bebidas", preco: 9.9, imagem: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80", descricao: "Feito na hora, sabores variados." },
    "beb-agua": { nome: "Água", categoria: "Bebidas", preco: 5.5, imagem: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=700&q=80", descricao: "Água mineral 500ml, com ou sem gás." }
  };

  const TAXA_ENTREGA = 8.9;
  const CART_KEY = "brasaCart";

  /* ------------------------------------------------------------------
     CARRINHO — utilidades de localStorage
  ------------------------------------------------------------------ */
  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  function addToCart(id, qty) {
    qty = qty || 1;
    if (!PRODUTOS[id]) return;
    const cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (item) {
      item.qty += qty;
    } else {
      cart.push({ id: id, qty: qty });
    }
    saveCart(cart);
  }

  function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter((i) => i.id !== id);
    saveCart(cart);
  }

  function changeQty(id, delta) {
    const cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(id);
      return;
    }
    saveCart(cart);
  }

  function cartTotalItems() {
    return getCart().reduce((sum, i) => sum + i.qty, 0);
  }

  function cartSubtotal() {
    return getCart().reduce((sum, i) => {
      const p = PRODUTOS[i.id];
      return p ? sum + p.preco * i.qty : sum;
    }, 0);
  }

  function formatBRL(v) {
    return "R$ " + v.toFixed(2).replace(".", ",");
  }

  function updateCartBadge() {
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = cartTotalItems();
    });
  }

  /* ------------------------------------------------------------------
     ADICIONAR AO CARRINHO — botões nas páginas de produtos
  ------------------------------------------------------------------ */
  function initAddToCartButtons() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;
      const id = btn.getAttribute("data-add");
      addToCart(id, 1);
      const original = btn.textContent;
      btn.textContent = "Adicionado ✓";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 1100);
    });
  }

  /* ------------------------------------------------------------------
     MENU MOBILE
  ------------------------------------------------------------------ */
  function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.textContent = isOpen ? "✕" : "☰";
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      })
    );
  }

  /* ------------------------------------------------------------------
     MODO ESCURO
  ------------------------------------------------------------------ */
  function initTheme() {
    const toggle = document.querySelector(".theme-toggle");
    const saved = localStorage.getItem("brasaTheme");
    if (saved === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    updateThemeIcon();

    if (!toggle) return;
    toggle.addEventListener("click", function () {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("brasaTheme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("brasaTheme", "dark");
      }
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    const toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    toggle.textContent = isDark ? "☀️" : "🌙";
    toggle.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
  }

  /* ------------------------------------------------------------------
     TAMANHO DA FONTE
  ------------------------------------------------------------------ */
  const FONT_STEPS = [0.9, 1, 1.1, 1.2];
  function initFontSize() {
    let idx = parseInt(localStorage.getItem("brasaFontIdx"), 10);
    if (isNaN(idx) || idx < 0 || idx >= FONT_STEPS.length) idx = 1;
    applyFontScale(idx);

    document.querySelectorAll("[data-font]").forEach((btn) => {
      btn.addEventListener("click", function () {
        const action = btn.getAttribute("data-font");
        if (action === "inc") idx = Math.min(idx + 1, FONT_STEPS.length - 1);
        else if (action === "dec") idx = Math.max(idx - 1, 0);
        else idx = 1;
        applyFontScale(idx);
      });
    });
  }

  function applyFontScale(idx) {
    document.documentElement.style.setProperty("--font-scale", FONT_STEPS[idx]);
    localStorage.setItem("brasaFontIdx", idx);
  }

  /* ------------------------------------------------------------------
     RENDERIZAÇÃO DE PRODUTOS (cardápio dinâmico opcional por categoria)
     Usado apenas onde houver [data-produtos="categoria"] no HTML
  ------------------------------------------------------------------ */
  function renderProductGrids() {
    document.querySelectorAll("[data-produtos]").forEach((container) => {
      const categoria = container.getAttribute("data-produtos");
      const ids = Object.keys(PRODUTOS).filter((id) => PRODUTOS[id].categoria === categoria);
      container.innerHTML = ids.map((id) => productCardHTML(id)).join("");
    });
  }

  function productCardHTML(id) {
    const p = PRODUTOS[id];
    return `
      <article class="product-card reveal">
        <div class="product-media">
          <img src="${p.imagem}" alt="Foto de ${p.nome}" loading="lazy">
        </div>
        <div class="product-body">
          <h3>${p.nome}</h3>
          ${p.ingredientes ? `<p class="product-ing">${p.ingredientes}</p>` : ""}
          <p class="product-desc">${p.descricao}</p>
          <div class="product-footer">
            <span class="product-price">${formatBRL(p.preco)}</span>
            <button class="btn btn-primary btn-sm" data-add="${id}">Adicionar</button>
          </div>
        </div>
      </article>`;
  }

  /* ------------------------------------------------------------------
     PÁGINA DE DELIVERY
  ------------------------------------------------------------------ */
  function initDeliveryPage() {
    const itemsWrap = document.getElementById("cart-items");
    if (!itemsWrap) return; // não é a página de delivery

    function render() {
      const cart = getCart();
      if (cart.length === 0) {
        itemsWrap.innerHTML = `<p class="cart-empty">Seu carrinho está vazio. Adicione itens no <a href="cardapio.html" style="color:var(--brasa);font-weight:700;">cardápio</a>.</p>`;
      } else {
        itemsWrap.innerHTML = cart
          .map((i) => {
            const p = PRODUTOS[i.id];
            if (!p) return "";
            return `
            <div class="cart-item">
              <img src="${p.imagem}" alt="${p.nome}">
              <div>
                <h5>${p.nome}</h5>
                <span class="preco-unit">${formatBRL(p.preco)} un.</span>
                <div class="qty-control" role="group" aria-label="Quantidade de ${p.nome}">
                  <button type="button" data-qty="dec" data-id="${i.id}" aria-label="Diminuir quantidade">−</button>
                  <span aria-live="polite">${i.qty}</span>
                  <button type="button" data-qty="inc" data-id="${i.id}" aria-label="Aumentar quantidade">+</button>
                </div>
                <button type="button" class="remove-btn" data-remove="${i.id}">Remover</button>
              </div>
              <strong>${formatBRL(p.preco * i.qty)}</strong>
            </div>`;
          })
          .join("");
      }

      const subtotal = cartSubtotal();
      const temItens = cart.length > 0;
      const taxa = temItens ? TAXA_ENTREGA : 0;
      document.getElementById("cart-subtotal").textContent = formatBRL(subtotal);
      document.getElementById("cart-taxa").textContent = formatBRL(taxa);
      document.getElementById("cart-total").textContent = formatBRL(subtotal + taxa);

      const finalizarBtn = document.getElementById("btn-finalizar");
      if (finalizarBtn) finalizarBtn.disabled = !temItens;
    }

    itemsWrap.addEventListener("click", function (e) {
      const qtyBtn = e.target.closest("[data-qty]");
      if (qtyBtn) {
        const id = qtyBtn.getAttribute("data-id");
        const delta = qtyBtn.getAttribute("data-qty") === "inc" ? 1 : -1;
        changeQty(id, delta);
        render();
        return;
      }
      const remBtn = e.target.closest("[data-remove]");
      if (remBtn) {
        removeFromCart(remBtn.getAttribute("data-remove"));
        render();
      }
    });

    render();

    /* Forma de pagamento — mostrar campo de troco */
    const pagamentoRadios = document.querySelectorAll('input[name="pagamento"]');
    const trocoPergunta = document.getElementById("troco-pergunta");
    const trocoValorWrap = document.getElementById("troco-valor-wrap");
    const trocoRadios = document.querySelectorAll('input[name="precisa-troco"]');

    pagamentoRadios.forEach((r) =>
      r.addEventListener("change", function () {
        if (this.value === "dinheiro" && this.checked) {
          trocoPergunta.classList.add("show");
        } else {
          trocoPergunta.classList.remove("show");
          trocoValorWrap.classList.remove("show");
        }
      })
    );

    trocoRadios.forEach((r) =>
      r.addEventListener("change", function () {
        if (this.value === "sim" && this.checked) {
          trocoValorWrap.classList.add("show");
        } else {
          trocoValorWrap.classList.remove("show");
        }
      })
    );

    /* Finalizar pedido */
    const form = document.getElementById("delivery-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        const cart = getCart();
        if (cart.length === 0) return;

        const nome = document.getElementById("nome").value;
        const endereco = document.getElementById("endereco").value;
        const numero = document.getElementById("numero").value;
        const bairro = document.getElementById("bairro").value;
        const pagamentoEl = document.querySelector('input[name="pagamento"]:checked');
        const pagamento = pagamentoEl ? pagamentoEl.nextElementSibling.textContent.trim() : "";

        const subtotal = cartSubtotal();
        const total = subtotal + TAXA_ENTREGA;
        const numeroPedido = "BB" + Math.floor(10000 + Math.random() * 89999);

        document.getElementById("resumo-pedido-num").textContent = numeroPedido;
        document.getElementById("resumo-pedido-total").textContent = formatBRL(total);
        document.getElementById("resumo-pedido-pagamento").textContent = pagamento;
        document.getElementById("resumo-pedido-endereco").textContent = `${endereco}, ${numero} — ${bairro}`;
        document.getElementById("resumo-pedido-itens").textContent = `${cartTotalItems()} ite${cartTotalItems() > 1 ? "ns" : "m"}`;
        document.getElementById("resumo-pedido-nome").textContent = nome;

        document.getElementById("modal-sucesso").classList.add("show");

        saveCart([]);
        render();
        form.reset();
        trocoPergunta.classList.remove("show");
        trocoValorWrap.classList.remove("show");
      });
    }

    const modalFechar = document.getElementById("modal-fechar");
    if (modalFechar) {
      modalFechar.addEventListener("click", function () {
        document.getElementById("modal-sucesso").classList.remove("show");
        window.location.href = "index.html";
      });
    }
  }

  /* ------------------------------------------------------------------
     FORMULÁRIOS — Contato e Orçamento (validação nativa + msg sem reload)
  ------------------------------------------------------------------ */
  function initSimpleForm(formId, msgId, successText) {
    const form = document.getElementById(formId);
    if (!form) return;
    const msg = document.getElementById(msgId);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        msg.textContent = "Verifique os campos destacados e tente novamente.";
        msg.className = "form-msg show erro";
        return;
      }
      msg.textContent = successText;
      msg.className = "form-msg show sucesso";
      form.reset();
      msg.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ------------------------------------------------------------------
     INICIALIZAÇÃO
  ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initTheme();
    initFontSize();
    initAddToCartButtons();
    renderProductGrids();
    updateCartBadge();
    initDeliveryPage();
    initSimpleForm("form-contato", "msg-contato", "Mensagem enviada com sucesso! Nossa equipe vai responder em breve.");
    initSimpleForm("form-orcamento", "msg-orcamento", "Solicitação enviada com sucesso! Em breve entraremos em contato para fechar os detalhes do seu evento.");
  });
})();
