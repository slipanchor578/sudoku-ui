export class SudokuSolver {
    grid = new Array(81).fill(0);
    backtrackCount = 0;
    constructor(data) {
        let count = 0;
        for (const ch of data) {
            if (count >= 81)
                break;
            if (/\d/.test(ch)) {
                this.grid[count] = Number(ch);
                count++;
            }
            else if (ch === '.') {
                this.grid[count] = 0;
                count++;
            }
        }
    }
    isValid(pos, val) {
        const r = Math.floor(pos / 9);
        const c = pos % 9;
        for (let i = 0; i < 9; ++i) {
            if (this.grid[r * 9 + i] === val)
                return false;
            if (this.grid[i * 9 + c] === val)
                return false;
        }
        const rs = Math.floor(r / 3) * 3;
        const cs = Math.floor(c / 3) * 3;
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                if (this.grid[(rs + i) * 9 + (cs + j)] === val)
                    return false;
            }
        }
        return true;
    }
    solveRecursive() {
        const emptyCells = [];
        for (let i = 0; i < 81; ++i) {
            if (this.grid[i] === 0) {
                const cell = { index: i, candidates: [] };
                for (let v = 1; v <= 9; ++v) {
                    if (this.isValid(i, v))
                        cell.candidates.push(v);
                }
                emptyCells.push(cell);
            }
        }
        if (emptyCells.length === 0)
            return true;
        emptyCells.sort((a, b) => a.candidates.length - b.candidates.length);
        const target = emptyCells[0];
        if (target?.candidates.length === 0) {
            this.backtrackCount++;
            return false;
        }
        for (const v of target.candidates) {
            this.grid[target.index] = v;
            if (this.solveRecursive())
                return true;
            this.grid[target.index] = 0;
        }
        this.backtrackCount++;
        return false;
    }
    solve() {
        return this.solveRecursive();
    }
    getGrid() {
        return [...this.grid];
    }
    getBacktrackCount() {
        return this.backtrackCount;
    }
}
//# sourceMappingURL=sudokuSolver.js.map