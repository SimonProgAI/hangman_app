export function hasOnlyLettersAndHyphen(word: string) {
  return /^[a-zA-Z-]+$/.test(word);
}
