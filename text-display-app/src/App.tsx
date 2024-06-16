import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [displayText, setDisplayText] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setDisplayText(inputText);
      setInputText('');
    }
  };

  const handleButtonClick = () => {
    setDisplayText(inputText);
    setInputText('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Text Display App</h1>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleEnterPress}
          placeholder="Type something..."
        />
        <button onClick={handleButtonClick}>ENTER</button>
        <div className="display-box">
          {displayText}
        </div>
      </header>
    </div>
  );
};

export default App;
