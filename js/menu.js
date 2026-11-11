// js menu    

const botao = document.querySelector('#menu-botao');
const menu = document.querySelector('#menu-principal');
const icone = document.querySelector('#menu-icone');

botao.addEventListener('click', () => {
  if (botao.getAttribute('aria-expanded') === 'true') {
    // Estava aberto: fecha
    menu.classList.add('hidden');
    botao.setAttribute('aria-expanded', 'false');
    icone.textContent = '☰';
  } else {
    // Estava fechado: abre
    menu.classList.remove('hidden');
    botao.setAttribute('aria-expanded', 'true');
    icone.textContent = '✕';
  }
});
