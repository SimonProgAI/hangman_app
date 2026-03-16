import { LETTERS } from "./lettersArr";

type Keybutton = {
  letter: string,
  disabled: boolean,
  key: number
}
const rowLensArr: number[] = [10, 9, 7];
function keysRowArr(arr: string[],startIdx: number, rowLen: number):Keybutton[] {
  
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

export const keyboardArr: Keybutton[][] = [
  keysRowArr(LETTERS, 0, 10), // Q-P
  keysRowArr(LETTERS, 10, 19), // A-L
  keysRowArr(LETTERS, 19, 26), // Z-M
];

// Zod for validation
// CSS Modules
