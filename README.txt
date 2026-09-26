BRASA BURGER — Site institucional + delivery (front-end)

COMO EXECUTAR
1. Extraia esta pasta.
2. Abra "index.html" no navegador (duplo clique) OU, no VS Code, use a extensão
   "Live Server" e clique em "Go Live" para melhor compatibilidade com o carrinho.

ESTRUTURA
brasa-burger/
├── index.html, sobre.html, cardapio.html, hamburgueres.html,
│   acompanhamentos.html, sobremesas.html, delivery.html,
│   ambiente.html, contato.html, orcamento.html
├── css/style.css        → todo o design do site (claro/escuro incluso)
├── js/script.js         → produtos, carrinho, delivery, modo escuro, fontes, formulários
└── img/                 → pastas reservadas para imagens locais (opcional)

RECURSOS
- Carrinho de delivery funcional com localStorage (persiste entre páginas)
- Modo escuro e controle de tamanho de fonte (A- / A / A+), salvos no navegador
- Formulários de contato e orçamento com validação HTML5 e mensagem de sucesso sem reload
- QR Code funcional apontando para o cardápio digital (cardapio.html)
- Totalmente responsivo (mobile, tablet, desktop) com menu hambúrguer no celular
- Sem backend, sem banco de dados, sem login — 100% front-end
