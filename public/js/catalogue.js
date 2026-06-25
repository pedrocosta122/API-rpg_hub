// Aguarda o HTML carregar completamente antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona todos os cards de livros na tela
    const bookCards = document.querySelectorAll('.book-card');

    bookCards.forEach(card => {
        card.addEventListener('click', () => {
            // Pega o título do livro que está dentro do card clicado
            const title = card.querySelector('.book-title').innerText;
            console.log(`Livro selecionado: ${title}`);
            
            // Opcional: Adiciona uma borda ou muda a cor temporariamente ao clicar
            card.style.borderColor = '#e67e22';
            setTimeout(() => {
                card.style.borderColor = '#e9ecef';
            }, 500);
        });
    });

    console.log("Catálogo Público carregado com sucesso!");
});