import './components.css';
const HangmanStickfigure = ({count}) => {
    
    const headColor = count>0 ? 'black': 'transparent';
    const torsoColor = count>1 ? 'black': 'transparent';
    const leftArmColor = count>2 ? 'black': 'transparent';
    const rightArmColor = count>3 ? 'black': 'transparent';
    const leftLegColor = count>4 ? 'black': 'transparent';
    const rightLegColor = count>5 ? 'black': 'transparent';

    return (
        <div className='gallowBackground_div'>
            <svg viewBox="0 0 300 250" width="100%" height="100%"> 
                <circle cx="140" cy="80" r="20" style={{fill: headColor}}/>
                <line x1="140" y1="150" x2="140" y2="98"  style={{stroke: torsoColor, strokeWidth: '8', strokeLinecap: 'round'}}/>
                <line x1="140" y1="110" x2="105" y2="130" style={{stroke: leftArmColor, strokeWidth: '6', strokeLinecap: 'round'}}/>
                <line x1="140" y1="110" x2="175" y2="130" style={{stroke: rightArmColor, strokeWidth: '6', strokeLinecap: 'round'}}/>
                <line x1="140" y1="150" x2="105" y2="190" style={{stroke: leftLegColor, strokeWidth: '6', strokeLinecap: 'round'}}/>
                <line x1="140" y1="150" x2="175" y2="190" style={{stroke: rightLegColor, strokeWidth: '6', strokeLinecap: 'round'}}/>

                
                <line x1="120" y1="25" x2="55" y2="80" style={{stroke: 'black', strokeWidth: '6'}}/>
                <rect width="120" height="10" x="50" y="20" rx="5" ry="5" fill="black" />
                <rect width="10" height="210" x="50" y="20" rx="5" ry="5" fill="black" />
                <rect width="260" height="25" x="10" y="220" rx="5" ry="5" fill="black" />
            </svg>
        </div>
    );
};
//<line x1="140" y1="25" x2="140" y2="60 " style={{stroke: 'brown', strokeWidth: '3'}}/> the "rope" was not working on smallerscreens
export default HangmanStickfigure;