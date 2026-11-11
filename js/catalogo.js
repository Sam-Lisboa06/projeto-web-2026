// Catálogo: filtrar os produtos por categoria e material.
// Cada <li> de produto tem data-categoria e data-material no HTML.

const botaoFiltros = document.querySelector('#filtros-botao');
const painelFiltros = document.querySelector('#filtros-painel');
const iconeFiltros = document.querySelector('#filtros-icone');
const formulario = document.querySelector('#filtros-form');
const botaoLimpar = document.querySelector('#filtros-limpar');
const lista = document.querySelector('#lista-produtos');
const contagem = document.querySelector('#contagem');
const semResultados = document.querySelector('#sem-resultados');

// --- Abrir e fechar o painel de filtros (só se vê em ecrãs pequenos) ---
botaoFiltros.addEventListener('click', () => {
  if (botaoFiltros.getAttribute('aria-expanded') === 'true') {
    painelFiltros.classList.add('hidden');
    botaoFiltros.setAttribute('aria-expanded', 'false');
    iconeFiltros.textContent = '▾';
  } else {
    painelFiltros.classList.remove('hidden');
    botaoFiltros.setAttribute('aria-expanded', 'true');
    iconeFiltros.textContent = '▴';
  }
});

// --- Devolve a lista de valores marcados de um grupo de caixas ---
function valoresMarcados(nome) {
  const marcados = formulario.querySelectorAll(`input[name="${nome}"]:checked`);
  const valores = [];
  for (const caixa of marcados) {
    valores.push(caixa.value);
  }
  return valores;
}

// --- Mostra só os produtos que cumprem os filtros ---
function aplicarFiltros() {
  const categorias = valoresMarcados('categoria');
  const materiais = valoresMarcados('material');
  const produtos = lista.querySelectorAll('li');
  let visiveis = 0;

  for (const produto of produtos) {
    const categoria = produto.getAttribute('data-categoria');
    const material = produto.getAttribute('data-material');

    // Se nenhuma caixa do grupo está marcada, esse grupo não filtra
    const categoriaOk = categorias.length === 0 || categorias.includes(categoria);
    const materialOk = materiais.length === 0 || materiais.includes(material);

    if (categoriaOk && materialOk) {
      produto.classList.remove('hidden');
      visiveis = visiveis + 1;
    } else {
      produto.classList.add('hidden');
    }
  }

  // Texto com o número de produtos
  if (visiveis === 1) {
    contagem.textContent = '1 produto';
  } else {
    contagem.textContent = `${visiveis} produtos`;
  }

  // Mensagem quando não há resultados
  if (visiveis === 0) {
    semResultados.classList.remove('hidden');
  } else {
    semResultados.classList.add('hidden');
  }
}

// Sempre que se marca ou desmarca uma caixa, volta a filtrar
formulario.addEventListener('change', aplicarFiltros);

// Botão "Limpar filtros": desmarca tudo e volta a filtrar
botaoLimpar.addEventListener('click', () => {
  const caixas = formulario.querySelectorAll('input[type="checkbox"]');
  for (const caixa of caixas) {
    caixa.checked = false;
  }
  aplicarFiltros();
});

// Ao abrir a página, mostra a contagem inicial
aplicarFiltros();
