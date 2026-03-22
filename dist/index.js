if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
import { setupAnalyzeButton } from './analyze.js';
const cells = document.querySelectorAll('.cell');
const numberBtns = document.querySelectorAll('.number-btn');
const continuousBtn = document.querySelector('.action-btn:nth-child(1)');
const eraseBtn = document.querySelector('.action-btn:nth-child(2)');
const clearBtn = document.querySelector('.action-btn:nth-child(3)');
const analyzeBtn = document.querySelector('.action-btn:nth-child(4)');
const boardElement = document.querySelector('.board');
const actionButtons = [continuousBtn, eraseBtn, clearBtn, analyzeBtn];
let continuousMode = false;
let currentNumber = null;
function canPlace(cells, index, num) {
  const row = Math.floor(index / 9);
  const col = index % 9;
  for (let c = 0; c < 9; ++c) {
    if (cells[row * 9 + c]?.textContent === num) return false;
  }
  for (let r = 0; r < 9; ++r) {
    if (cells[r * 9 + col]?.textContent === num) return false;
  }
  const br = Math.floor(row / 3) * 3;
  const bc = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; ++r) {
    for (let c = 0; c < 3; ++c) {
      if (cells[(br + r) * 9 + (bc + c)]?.textContent === num) return false;
    }
  }
  return true;
}
continuousBtn.addEventListener('click', () => {
  continuousMode = !continuousMode;
  continuousBtn.classList.toggle('active', continuousMode);
  if (!continuousMode) {
    numberBtns.forEach((b) => b.classList.remove('active'));
    currentNumber = null;
    return;
  }
  const selected = document.querySelector('.number-btn.active');
  if (selected) {
    currentNumber = selected.textContent;
    return;
  }
  const btn1 = [...numberBtns].find((b) => b.textContent === '1');
  if (btn1) {
    btn1.classList.add('active');
    currentNumber = '1';
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
      const index = [...cells].indexOf(selected);
      if (!canPlace(cells, index, currentNumber)) {
        selected.classList.add('invalid');
        setTimeout(() => {
          selected.classList.remove('invalid');
        }, 250);
        return;
      }
      selected.textContent = btn.textContent;
      selected.classList.add('user-input');
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
    cell.classList.remove('auto-filled', 'user-input');
    cell.classList.remove('selected', 'related', 'same-number');
    setTimeout(() => {
      cell.classList.remove('cleared');
    }, 200);
  });
});
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    document
      .querySelectorAll('.cell.selected, .cell.related, .cell.same-number')
      .forEach((c) => c.classList.remove('selected', 'related', 'same-number'));
    cell.classList.add('selected');
    const value = cell.textContent.trim();
    if (value) {
      cells.forEach((c) => {
        if (c.textContent === value) {
          c.classList.add('same-number');
        }
      });
    }
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
          if (canPlace(cells, index, currentNumber)) {
            cell.textContent = currentNumber;
            cell.classList.add('user-input');
          } else {
            cell.classList.add('invalid');
            setTimeout(() => {
              cell.classList.remove('invalid');
            }, 250);
          }
        }
      }
    });
  });
});
setupAnalyzeButton(analyzeBtn, cells, actionButtons, boardElement);
//# sourceMappingURL=index.js.map
