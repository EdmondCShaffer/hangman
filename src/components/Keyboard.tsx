import React from 'react';
import "./Keyboard.css";

const KEYS = [
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "a", "s", "d", "f", "g", "h", "j", "k", "l",
    "z", "x", "c", "v", "b", "n", "m"
];

type KeyboardProps = {
    activeLetters?: string[];
    inActiveLetters?: string[];
    addGuessedLetter: (letter: string) => void;
    disabled?: boolean;
}

function Keyboard({ activeLetters = [], inActiveLetters = [], addGuessedLetter, disabled = false }: KeyboardProps) {
    const getRowLetters = (rowIndex: number) => {
        let start = 0;
        for (let i = 0; i < rowIndex; i++) {
            if (i === 0) start += 10;
            else if (i === 1) start += 9;
            else if (i === 2) start += 7;
        }
        return KEYS.slice(start, start + (rowIndex === 0 ? 10 : (rowIndex === 1 ? 9 : 7)));
    };

    return (
        <div className='keyboard-container'>
            {[0, 1, 2].map(rowIndex => (
                <div key={rowIndex} className={`row row-${rowIndex}`}>
                    {getRowLetters(rowIndex).map(key => (
                        <button
                            key={key}
                            onClick={() => addGuessedLetter(key)}
                            className={`btn ${activeLetters.includes(key) ? 'active' : ''} ${inActiveLetters.includes(key) ? 'inactive' : ''}`}
                            disabled={inActiveLetters.includes(key) || activeLetters.includes(key) || disabled}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Keyboard;
