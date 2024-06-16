import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const startTypingString = 'Type something - the more letters you guess at once, the more points you earn!'
  const loadToStartString = 'Load a text to begin the game'
  const gameWonString = 'You win! Load another text to start a new game'
  const [inputText, setInputText] = useState<string>('');
  const [displayText, setDisplayText] = useState<string>('');
  const [hiddenText, setHiddenText] = useState<string>('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [placeholderText, setPlaceholderText] = useState<string>(loadToStartString);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(gameOver){
      return;
    }

    var text = event.target.value;
    text = text.replace("\n", "");
    setInputText(text);
  };

  const handleLoadTextButtonClick = () => {
    loadText("hello, world");
  }

  const loadText = (text: string) => {
    text = text.toUpperCase()
    setScore(0);
    setHiddenText(text);
    setDisplayText(stripNonAlphaCharacters(text));
    setGameOver(false);
    setPlaceholderText(startTypingString)
  }

  function scoreGuess(guessText: string){
    if(guessText.length === 0){
      return;
    }

    guessText = guessText.toUpperCase();
    var scoreMultiplier = guessText.length;
    var newDisplayText = displayText;
    var newScore = score;

    for(var c of guessText){
      var foundGoodGuess = false;
  findLoop:
      for(var i = 0; i < newDisplayText.length; ++i){
        if(newDisplayText[i] !== "_"){
          continue;
        }
        if(hiddenText[i] !== c){
          continue;
        }

        // at this point, we've found a hidden character that they guessed right
        newDisplayText = newDisplayText.substring(0, i) + c + newDisplayText.substring(i + 1);
        newScore = newScore + scoreMultiplier;
        setDisplayText(newDisplayText);
        setScore(newScore);
        foundGoodGuess = true;
        break;
      }
      if(!foundGoodGuess){
        setScore(score - scoreMultiplier)
      }
    }

    if(!newDisplayText.includes("_")){
      setGameOver(true);
      setPlaceholderText(gameWonString)
    }
  }

  function stripNonAlphaCharacters(inputText: string): string {
    return inputText.replace(/[a-zA-Z]/g, '_');
  }

  const handleEnterPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      handleButtonClick()
    }
  };

  const handleButtonClick = () => {
    scoreGuess(inputText);
    setInputText('');
  };

  return (
    <div className="App">
      <div className="left-div">
        <header className="App-header">
          <h1>Memorize!</h1>
        </header>
        <textarea
            value={inputText}
            disabled={gameOver}
            onChange={handleInputChange}
            onKeyPress={handleEnterPress}
            placeholder={placeholderText}
          />
          <button 
            onClick={handleButtonClick}
            disabled={gameOver}
          >
            ENTER
          </button>
      </div>
      <div className="right-div">
        <div className="score-box">
          Score: {score}
        </div>
        <div className="display-box">
          {displayText}
        </div>
        <button onClick={handleLoadTextButtonClick}>LOAD TEXT</button>
      </div>
    </div>
  );
};

export default App;
