if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
import { setupAnalyzeButton } from './analyze.js';
const cells = document.querySelectorAll('.cell');
const numberBtns = document.querySelectorAll('.number-btn');
const eraseBtn = document.querySelector('.action-btn:nth-child(2)');
const clearBtn = document.querySelector('.action-btn:nth-child(3)');
const analyzeBtn = document.querySelector('.action-btn:nth-child(4)');
const continuousBtn = document.querySelector('.continuous-btn');
let continuousMode = false;
let currentNumber = null;
continuousBtn.addEventListener('click', () => {
  continuousMode = !continuousMode;
  continuousBtn.classList.toggle('active', continuousMode);
  if (!continuousMode) {
    numberBtns.forEach((b) => b.classList.remove('active'));
    currentNumber = null;
  }
});
numberBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    numberBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentNumber = btn.textContent;
    if (!continuousMode) {
      const selected = document.querySelector('.cell.selected');
      if (!selected) return;
      if (selected.textContent !== '') return;
      selected.textContent = btn.textContent;
    }
  });
});
eraseBtn.addEventListener('click', () => {
  const selected = document.querySelector('.cell.selected');
  if (!selected) return;
  selected.classList.add('cleared');
  selected.textContent = '';
  setTimeout(() => {
    selected.classList.remove('cleared');
  }, 200);
});
clearBtn.addEventListener('click', () => {
  cells.forEach((cell) => {
    cell.classList.add('cleared');
    cell.textContent = '';
    cell.classList.remove('selected', 'related');
    setTimeout(() => {
      cell.classList.remove('cleared');
    }, 200);
  });
});
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    document
      .querySelectorAll('.cell.selected, .cell.related')
      .forEach((c) => c.classList.remove('selected', 'related'));
    cell.classList.add('selected');
    const row = Math.floor(index / 9);
    const col = index % 9;
    const blockRow = Math.floor(row / 3);
    const blockCol = Math.floor(col / 3);
    cells.forEach((c, i) => {
      const r = Math.floor(i / 9);
      const c2 = i % 9;
      const br = Math.floor(r / 3);
      const bc = Math.floor(c2 / 3);
      const sameRow = row === r;
      const sameCol = col === c2;
      const sameBlock = blockRow === br && blockCol === bc;
      if (sameRow || sameCol || sameBlock) {
        c.classList.add('related');
      }
      cell.classList.remove('related');
      if (continuousMode && currentNumber) {
        if (cell.textContent === '') {
          cell.textContent = currentNumber;
        }
      }
    });
  });
});
setupAnalyzeButton(analyzeBtn, cells);
//# sourceMappingURL=index.js.map
