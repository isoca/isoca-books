let livros = []
const endpointDaApi = 'https://guilhermeonrails.github.io/casadocodigo/livros.json'

getBuscarLivrosDaApi()

const elementoParaInserirLivros = document.getElementById('livros')
const elementoComValorTotalDeLivros = document.getElementById('valor_total_livros_disponiveis')

async function getBuscarLivrosDaApi() {
    const res = await fetch(endpointDaApi)
    livros = await res.json() //tem que deixar o await pra ver de fato a resposta
    console.table(livros)

    let livrosComDesconto = aplicarDesconto(livros)
    exibirOsLivrosNaTela(livrosComDesconto)
}

// forEach
function exibirOsLivrosNaTela(listaDeLivros) {
    elementoComValorTotalDeLivros.innerHTML = ""
    elementoParaInserirLivros.innerHTML = ""
    listaDeLivros.forEach(livro => {
        // let disponibilidade = verificarDisponibilidade(livro)
        // usando operador ternario ao invés de função
        let disponibilidade = livro.quantidade > 0 ? 'livro__imagens' : 'livro__imagens indisponivel'
        elementoParaInserirLivros.innerHTML += `
        <div class="livro">
        <img class="${disponibilidade}" src="${livro.imagem}"
          alt="${livro.alt}" />
        <h2 class="livro__titulo">
          ${livro.titulo}
        </h2>
        <p class="livro__descricao">${livro.autor}</p>
        <p class="livro__preco" id="preco">R$ ${livro.preco.toFixed(2)}</p>
        <div class="tags">
          <span class="tag">${livro.categoria}</span>
        </div>
      </div>
        `
    })
}

// map
function aplicarDesconto(livros) {
    const desconto = 0.3
    livrosComDesconto = livros.map(livro => {
        // os ... copiam o objeto, exceto o preco que alteramos
        return {...livro, preco: livro.preco - (livro.preco * desconto)}
    })
    return livrosComDesconto
}


// function verificarDisponibilidade(livro) {
//     if (livro.quantidade > 0) {
//         return 'livros__imagens'
//     } else {
//         return 'livros__imagens indisponivel'
//     }
// }