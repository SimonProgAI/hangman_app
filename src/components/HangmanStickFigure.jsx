import "./components.css";
const HangmanStickfigure = ({ count }) => {
  const visibleColor = "white";
  const hiddenColor = "transparent";
  /* const bodyPartsColorsArr = [
    headColor0,
    torsoColor1,
    leftArmColor2,
    rightArmColor3,
    leftLegColor4,
    rightLegColor5,
  ];
  
  function colorDisplay(arr, count){
    
  } */

  const headColor0 = count > 0 ? visibleColor : hiddenColor;
  const torsoColor1 = count > 1 ? visibleColor : hiddenColor;
  const leftArmColor2 = count > 2 ? visibleColor : hiddenColor;
  const rightArmColor3 = count > 3 ? visibleColor : hiddenColor;
  const leftLegColor4 = count > 4 ? visibleColor : hiddenColor;
  const rightLegColor5 = count > 5 ? visibleColor : hiddenColor;

  return (
    <div className="gallowBackground_div">
      <svg viewBox="0 0 300 250" width="100%" height="100%">
        <circle cx="140" cy="80" r="20" style={{ fill: headColor0 }} />
        <line
          x1="140"
          y1="150"
          x2="140"
          y2="98"
          style={{
            stroke: torsoColor1,
            strokeWidth: "8",
            strokeLinecap: "round",
          }}
        />
        <line
          x1="140"
          y1="110"
          x2="105"
          y2="130"
          style={{
            stroke: leftArmColor2,
            strokeWidth: "6",
            strokeLinecap: "round",
          }}
        />
        <line
          x1="140"
          y1="110"
          x2="175"
          y2="130"
          style={{
            stroke: rightArmColor3,
            strokeWidth: "6",
            strokeLinecap: "round",
          }}
        />
        <line
          x1="140"
          y1="150"
          x2="105"
          y2="190"
          style={{
            stroke: leftLegColor4,
            strokeWidth: "6",
            strokeLinecap: "round",
          }}
        />
        <line
          x1="140"
          y1="150"
          x2="175"
          y2="190"
          style={{
            stroke: rightLegColor5,
            strokeWidth: "6",
            strokeLinecap: "round",
          }}
        />

        <line
          x1="120"
          y1="25"
          x2="55"
          y2="80"
          style={{ stroke: "black", strokeWidth: "6" }}
        />
        <rect
          width="120"
          height="10"
          x="50"
          y="20"
          rx="5"
          ry="5"
          fill="black"
        />
        <rect
          width="10"
          height="210"
          x="50"
          y="20"
          rx="5"
          ry="5"
          fill="black"
        />
        <rect
          width="260"
          height="25"
          x="10"
          y="220"
          rx="5"
          ry="5"
          fill="black"
        />
      </svg>
    </div>
  );
};
//<line x1="140" y1="25" x2="140" y2="60 " style={{stroke: 'brown', strokeWidth: '3'}}/> the "rope" was not working on smallerscreens
export default HangmanStickfigure;
