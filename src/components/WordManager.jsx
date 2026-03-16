export function WordManager({
  handleRandomWord,
  isDisabled,
  randomWordLengthRef,
  createUserWord,
  userWordRef,
  handleRestart,
  errMsgRef2,
  errMsg2,
  errMsgRef1,
  errMsg1,
}) {
  return (
    <div className="top_container">
      {/*<div className="errMsg3">{errMsg3}</div>*/}
      <div className="button_container">
        <div className="randomWord_div">
          <button
            onClick={handleRandomWord}
            disabled={isDisabled}
            className="randomWord_btn button"
          >
            Random Word
          </button>
          <input
            ref={randomWordLengthRef}
            placeholder="3-9 letters"
            type="number"
            min="3"
            max="9"
            disabled={isDisabled}
            className="numOfLetters_input"
          />
          <br />
        </div>
        <div className="userWord_div">
          <span>
            <button
              onClick={createUserWord}
              disabled={isDisabled}
              className="userWord_btn button"
            >
              User Word
            </button>
            <input
              type="text"
              ref={userWordRef}
              disabled={isDisabled}
              placeholder="enter a word..."
              className="userWord_input"
            ></input>
          </span>
        </div>
        <div className="resetGame_btn_div">
          <button onClick={handleRestart} className="resetGame_btn button">
            Reset Game
          </button>
        </div>
        <div className="errMsg">
          <span ref={errMsgRef2}>{errMsg2}</span>
          <span ref={errMsgRef1}>{errMsg1}</span>
        </div>
      </div>
    </div>
  );
}
