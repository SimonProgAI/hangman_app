import React, { useRef, useEffect } from 'react';

const HangmanStickfigure = () => {
  

  return (
    <div>
        <svg width="300" height="300" >
            <line x1="" y1=""/>
            <rect width="120" height="10" x="50" y="20" rx="5" ry="5" fill="black" />
            <rect width="10" height="200" x="50" y="20" rx="5" ry="5" fill="red" />
            <rect width="260" height="25" x="10" y="200" rx="5" ry="5" fill="black" />
        </svg>
    </div>
  );
};

export default HangmanStickfigure;