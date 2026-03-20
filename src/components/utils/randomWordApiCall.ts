export async function randomWordApiCall(
  wordLen: number,
): Promise<string | undefined> {
// console.log("function randomWordApiCall called");
  const url1 = `https://random-word-api.herokuapp.com/word?length=${wordLen}`;
  const url2 = `https://random-word-api.vercel.app/api?words=1&length=${wordLen}`;
  const urlArr: string[] = [url1, url2];
  for (let url of urlArr) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
        console.log(`data: ${data}`);
      const randomWord = data[0];
        console.log(`randomWord: ${randomWord}`);
      return randomWord;
    } catch (error) {
      const errMsg: string = `Error fetching data. ${error}. User Word mode is still playable.`;
      console.log(errMsg);
    }
    const ifAllFailedMsg: string =
      "All random word providers failed. User Word mode is still playable.";
    alert(ifAllFailedMsg);
    console.log(ifAllFailedMsg);
  }
}
