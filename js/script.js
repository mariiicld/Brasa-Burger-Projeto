/* Brasa Burger — script do site (sem carrinho / sem compras) */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---- Modo escuro ---- */
  var root = document.documentElement;
  var themeBtn = $('.theme-toggle');
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    root.classList.toggle('dark', t === 'dark');
    root.classList.toggle('dark-mode', t === 'dark');
    if (document.body) {
      document.body.classList.toggle('dark', t === 'dark');
      document.body.classList.toggle('dark-mode', t === 'dark');
    }
    if (themeBtn) {
      themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
      themeBtn.setAttribute('aria-label', t === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    }
  }
  applyTheme(store.get('bb-theme') || 'light');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    store.set('bb-theme', t); applyTheme(t);
  });

  /* ---- Tamanho da fonte ---- */
  var size = parseInt(store.get('bb-font') || '100', 10);
  function applyFont() { root.style.fontSize = size + '%'; }
  applyFont();
  $$('[data-font]').forEach(function (b) {
    b.addEventListener('click', function () {
      var a = b.getAttribute('data-font');
      if (a === 'inc') size = Math.min(size + 10, 140);
      else if (a === 'dec') size = Math.max(size - 10, 80);
      else size = 100;
      store.set('bb-font', String(size)); applyFont();
    });
  });

  /* ---- Menu mobile ---- */
  var toggle = $('.menu-toggle'), nav = $('#main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      ['open', 'is-open', 'active', 'show'].forEach(function (c) { nav.classList.toggle(c, open); });
      toggle.classList.toggle('open', open);
    });
  }

  /* ---- Imagens ainda não adicionadas: mostra um quadro no lugar ---- */
  var st = document.createElement('style');
  st.textContent = 'img.img-faltando{background:linear-gradient(135deg,#3a2a1e,#6b3a1a);color:#f5e9d8;min-height:200px;width:100%;object-fit:contain;font-size:.9rem;text-align:center}';
  document.head.appendChild(st);
  function semImagem(img) {
    var next = img.nextElementSibling;
    if (next && next.classList.contains('menu-emoji')) { img.style.display = 'none'; next.style.display = 'flex'; }
    else img.classList.add('img-faltando');
  }
  document.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'IMG') semImagem(e.target);
  }, true);
  $$('img').forEach(function (img) { if (img.complete && img.naturalWidth === 0) semImagem(img); });

  /* ---- Formulários (contato e orçamento) ---- */
  function setupForm(formId, msgId, okText) {
    var form = document.getElementById(formId), msg = document.getElementById(msgId);
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        var bad = form.querySelector(':invalid');
        msg.textContent = 'Confira os campos obrigatórios e tente novamente.';
        msg.className = 'form-msg error'; msg.style.color = '#b3261e';
        if (bad) bad.focus();
        return;
      }
      msg.textContent = okText;
      msg.className = 'form-msg success'; msg.style.color = '#2e7d32';
      form.reset();
    });
  }
  setupForm('form-contato', 'msg-contato', 'Mensagem enviada com sucesso! Responderemos em breve. (demonstração)');
  setupForm('form-orcamento', 'msg-orcamento', 'Solicitação enviada! Entraremos em contato com o orçamento do seu evento. (demonstração)');

  var data = document.getElementById('o-data');
  if (data) data.min = new Date().toISOString().split('T')[0];
})();
