'use client'
import React, { useState, useRef } from 'react';

const Spotlight = ({ children }) => {
    const [isOn, setIsOn] = useState(false);
    const spotlightRef = useRef(null);

    return (
        <div>
            <button onClick={() => setIsOn(!isOn)} style={{ marginBottom: '10px' }}>
                {isOn ? 'Spotlight Off' : 'Spotlight On'}
            </button>
            <div ref={spotlightRef} style={{
                position: 'relative',
                zIndex: isOn ? 2 : 1,
                borderRadius: '10px', // 丸い四角形を作る
                transition: 'all 0.5s ease', // スムーズな表示切り替え
                boxShadow: isOn
                    ? '0 0 0 2000px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.5)'
                    : 'none',
            }}>
                {children}
            </div>
        </div >
    );
};

export default Spotlight;
