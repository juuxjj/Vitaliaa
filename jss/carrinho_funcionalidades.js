const carrinho = [];
const carrinhoCorpo = document.getElementById('carrinho-corpo');
const totalGeral = document.getElementById('total-geral');

// Adicionar item ao carrinho
document.querySelectorAll('.btn-add').forEach((button) => {
    button.addEventListener('click', () => {
        const nome = button.getAttribute('data-name');
        const preco = parseFloat(button.getAttribute('data-price'));

        const itemExistente = carrinho.find((item) => item.nome === nome);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({ nome, preco, quantidade: 1 });
        }

        atualizarCarrinho();
    });
});

// Atualizar carrinho
function atualizarCarrinho() {
    carrinhoCorpo.innerHTML = '';
    let total = 0;

    carrinho.forEach((item) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>€${item.preco.toFixed(2)}</td>
            <td>€${subtotal.toFixed(2)}</td>
        `;
        carrinhoCorpo.appendChild(row);
    });

    totalGeral.textContent = `€${total.toFixed(2)}`;
}
// JavaScript Document
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
const carrinhoCorpo = document.getElementById('carrinho-corpo');
const totalGeral = document.getElementById('total-geral');

// Atualizar carrinho na página
function atualizarCarrinho() {
    carrinhoCorpo.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>€${item.preco.toFixed(2)}</td>
            <td>€${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="removerItem(${index})">Remover</button>
            </td>
        `;
        carrinhoCorpo.appendChild(row);
    });

    totalGeral.textContent = `€${total.toFixed(2)}`;
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Adicionar item ao carrinho (chamado na página marmitas.html)
document.querySelectorAll('.btn-add').forEach((button) => {
    button.addEventListener('click', () => {
        const nome = button.getAttribute('data-name');
        const preco = parseFloat(button.getAttribute('data-price'));

        const itemExistente = carrinho.find((item) => item.nome === nome);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({ nome, preco, quantidade: 1 });
        }

        atualizarCarrinho();
    });
});

// Remover item do carrinho
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Finalizar Compra
document.getElementById('finalizar-compra')?.addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('carrinho');
    carrinho.length = 0;
    atualizarCarrinho();
});

// Atualizar carrinho ao carregar a página
atualizarCarrinho();
