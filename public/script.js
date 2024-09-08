document.addEventListener('DOMContentLoaded', function() {
    const quantidadeInput = document.getElementById('quantidade');
    const totalParagraph = document.getElementById('total');
    const precoUnitario = parseFloat(totalParagraph.textContent.replace('Total: R$ ', ''));

    if (quantidadeInput) {
        quantidadeInput.addEventListener('input', function() {
            const quantidade = parseInt(quantidadeInput.value, 10);
            if (quantidade > 0) {
                const total = precoUnitario * quantidade;
                totalParagraph.textContent = `Total: R$ ${total.toFixed(2)}`;
            } else {
                totalParagraph.textContent = `Total: R$ ${precoUnitario.toFixed(2)}`;
            }
        });
    }
});
