
import { KeyButton } from "../TS Interfaces/KeyButton";

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
const rowLensArr: number[] = [10, 9, 7];
function keysRowArr(arr: string[],startIdx: number, rowLen: number):KeyButton[] {
  
  return arr.slice(startIdx, rowLen).map((ltr, i) => ({
    letter: ltr,
    disabled: false,
    key: startIdx + i + 1,
  }));
}

/* function keyboardBuilder(letterArr: string[], rowLenArr: number[]){
  
  let rowOfLetters = letterArr.map((ltr: string, index: number)=>({
    letter: ltr, disabled: false, key: index 
  })
  )

  return rowOfLetters;
} */

/* console.log(keyboardBuilder(LETTERS, rowLensArr)) */

export const keyboardArr: KeyButton[][] = [
  keysRowArr(LETTERS, 0, 10), // Q-P
  keysRowArr(LETTERS, 10, 19), // A-L
  keysRowArr(LETTERS, 19, 26), // Z-M
];

