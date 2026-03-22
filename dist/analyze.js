import { SudokuSolver } from './sudokuSolver.js';
export function readGridFromCells(cells) {
  let s = '';
  cells.forEach((cell) => {
    const t = cell.textContent?.trim() ?? '';
    s += t === '' ? '.' : t;
  });
  return s;
}
export function writeGridToCells(cells, grid) {
  cells.forEach((cell, i) => {
    const v = grid[i];
    const isUser = cell.classList.contains('user-input');
    cell.textContent = v === 0 ? '' : String(v);
    cell.classList.remove('auto-filled');
    if (!isUser && v !== 0) {
      cell.classList.add('auto-filled');
    }
  });
}
export function setupAnalyzeButton(analyzeBtn, cells) {
  analyzeBtn.addEventListener('click', () => {
    const data = readGridFromCells(cells);
    const solver = new SudokuSolver(data);
    const ok = solver.solve();
    if (!ok) {
      alert('解が存在しません');
      return;
    }
    const solved = solver.getGrid();
    writeGridToCells(cells, solved);
    alert(`Backtrack: ${solver.getBacktrackCount()}`);
  });
}
//# sourceMappingURL=analyze.js.map
