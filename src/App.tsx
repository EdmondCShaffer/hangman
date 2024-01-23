import React, { useCallback, useEffect, useState } from 'react';
import words from "./wordList.json";
import './App.css';
import Drawing from './components/Drawing';
import Word from './components/Word';
import Keyboard from './components/Keyboard';

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

function App() {
  const [currentWordToGuess, setCurrentWordToGuess] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | "ongoing">("ongoing");

  const inCorrectLetters = guessedLetters.filter(letter => !currentWordToGuess.includes(letter));

  const isLoser = inCorrectLetters.length >= 6;
  const isWinner = currentWordToGuess.split("").every(letter => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return;
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isLoser, isWinner]);

  const resetGame = useCallback(() => {
    setCurrentWordToGuess(getRandomWord());
    setGuessedLetters([]);
    setGameStatus("ongoing");
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters, addGuessedLetter]);

  useEffect(() => {
    if (isLoser) {
      setGameStatus("lose");
    } else if (isWinner) {
      setGameStatus("win");
    }
  }, [isLoser, isWinner]);

  useEffect(() => {
    if (gameStatus !== "ongoing") {
      setTimeout(() => {
        resetGame()
      }, 5000);

    }
  }, [gameStatus]);

  return (
    <>
      <div className='container'>
        <div className='win-loss'>
          {gameStatus === "win" && "Winner!"}
          {gameStatus === "lose" && "Nice try"}
        </div>
        <div>
          <Drawing numberOfGuesses={inCorrectLetters.length} />
        </div>
      </div>
      <Word guessedLetters={guessedLetters} currentWordToGuess={currentWordToGuess} reveal={isLoser} />
      <div className='keyboard-div'>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter => currentWordToGuess.includes(letter))}
          inActiveLetters={inCorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </>
  );
}

export default App;

