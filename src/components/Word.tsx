import React from 'react'
import './Word.css'

type WordProps = {
    guessedLetters: string[]
    currentWordToGuess: string
    reveal?: boolean
}


const guessedLetters = ["t"]
function Word({ guessedLetters, currentWordToGuess, reveal = false }: WordProps) {
    return (
        <div className='word-container'>
            {currentWordToGuess.split("").map((letter, index) => (
                <span className='underscores' key={index}>
                    <span style={{
                        visibility: guessedLetters.includes(letter) || reveal ? "visible" : 'hidden', color: !guessedLetters.includes(letter) && reveal ? "red" : "white"
                    }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    )
}

export default Word
