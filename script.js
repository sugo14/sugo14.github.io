let currPrompt = document.getElementById('current-prompt');
let typed = document.getElementById('typed');

window.addEventListener('keydown', (e) => {
  if (e.key.length === 1) { typed.textContent += e.key; }
  else if (e.key === 'Backspace') { typed.textContent = typed.textContent.slice(0, -1); }
  else if (e.key === 'Enter') {
    console.log('Command entered: ', typed.textContent);
    typed.textContent = '';
  }
});
