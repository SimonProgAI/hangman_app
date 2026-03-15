import { LETTERS } from "./lettersArr";

function keysRowArr(arr: string[], startIdx: number, rowLen: number) {
  return arr.slice(startIdx, rowLen).map((ltr, i) => ({
    letter: ltr,
    disabled: false,
    key: i,
  }));
}

export const keyboardArr = [
  keysRowArr(LETTERS, 0, 10), // Q-P
  keysRowArr(LETTERS, 10, 19), // A-L
  keysRowArr(LETTERS, 19, 26), // Z-M
];
