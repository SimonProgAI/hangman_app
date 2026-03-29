export interface KeyButton {
  letter: string;
  disabled: boolean;
  key: number;
}
export const LETTERS = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

function keysRowArr(
  arr: string[],
  startIdx: number,
  rowLen: number,
): KeyButton[] {
  return arr.slice(startIdx, rowLen).map((ltr, i) => ({
    letter: ltr,
    disabled: false,
    key: startIdx + i + 1,
  }));
}

export const keyboardArr: KeyButton[][] = [
  keysRowArr(LETTERS, 0, 10), // Q-P
  keysRowArr(LETTERS, 10, 19), // A-L
  keysRowArr(LETTERS, 19, 26), // Z-M
];
