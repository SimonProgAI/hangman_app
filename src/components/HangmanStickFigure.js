const HangmanStickfigure = ({count}) => {
    
    const headColor = count>0 ? 'black': 'white';
    const torsoColor = count>1 ? 'black': 'white';
    const leftArmColor = count>2 ? 'black': 'white';
    const rightArmColor = count>3 ? 'black': 'white';
    const leftLegColor = count>4 ? 'black': 'white';
    const rightLegColor = count>5 ? 'black': 'white';

    return (
        <div>
            <svg width="300" height="300" > 
                <circle cx="140" cy="80" r="20" style={{fill: headColor}}/>
                <line x1="140" y1="150" x2="140" y2="98"  style={{stroke: torsoColor, strokeWidth: '8', strokeLinecap: 'round'}}/>
                <line x1="140" y1="110" x2="105" y2="130" style={{stroke: leftArmColor, strokeWidth: '6', strokeLinecap: 'round'}}/>
                <line x1="140" y1="110" x2="175" y2="130" style={{stroke: rightArmColor, strokeWidth: '6', strokeLinecap: 'round'}}/>
                <line x1="140" y1="150" x2="105" y2="190" style={{stroke: leftLegColor, strokeWidth: '6', strokeLinecap: 'round'}}/>
                <line x1="140" y1="150" x2="175" y2="190" style={{stroke: rightLegColor, strokeWidth: '6', strokeLinecap: 'round'}}/>

                <line x1="140" y1="25" x2="140" y2="60 " style={{stroke: 'brown', strokeWidth: '3'}}/>
                <line x1="120" y1="25" x2="55" y2="80" style={{stroke: 'black', strokeWidth: '6'}}/>
                <rect width="120" height="10" x="50" y="20" rx="5" ry="5" fill="black" />
                <rect width="10" height="210" x="50" y="20" rx="5" ry="5" fill="black" />
                <rect width="260" height="25" x="10" y="220" rx="5" ry="5" fill="black" />
            </svg>
        </div>
    );
};

export default HangmanStickfigure;