import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const startTypingString = 'Type something - the more letters you guess at once, the more points you earn!'
  const loadToStartString = 'Load a text to begin the game'
  const gameWonString = 'You win! Load another text to start a new game'
  const [inputText, setInputText] = useState<string>('');
  const [displayText, setDisplayText] = useState<string>('Please load a text to begin the game');
  const [hiddenText, setHiddenText] = useState<string>('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [placeholderText, setPlaceholderText] = useState<string>(loadToStartString);
  const [selectedText, setSelectedText] = useState<string>('');

  const memorizationTexts: {[key: string]: string} = {
      "Alma 7:11-13": 
        `11 And he shall go forth, suffering pains and afflictions and temptations of every kind; and this that the word might be fulfilled which saith he will take upon him the pains and the sicknesses of his people.
        12 And he will take upon him death, that he may loose the bands of death which bind his people; and he will take upon him their infirmities, that his bowels may be filled with mercy, according to the flesh, that he may know according to the flesh how to succor his people according to their infirmities.
        13 Now the Spirit knoweth all things; nevertheless the Son of God suffereth according to the flesh that he might take upon him the sins of his people, that he might blot out their transgressions according to the power of his deliverance; and now behold, this is the testimony which is in me.`,
      "Alma 34:9-10": 
        `9 For it is expedient that an atonement should be made; for according to the great plan of the Eternal God there must be an atonement made, or else all mankind must unavoidably perish; yea, all are hardened; yea, all are fallen and are lost, and must perish except it be through the atonement which it is expedient should be made.
        10 For it is expedient that there should be a great and last sacrifice; yea, not a sacrifice of man, neither of beast, neither of any manner of fowl; for it shall not be a human sacrifice; but it must be an infinite and eternal sacrifice.`,
      "Alma 39:9": 
        "Now my son, I would that ye should repent and forsake your sins, and go no more after the lusts of your eyes, but cross yourself in all these things; for except ye do this ye can in nowise inherit the kingdom of God. Oh, remember, and take it upon you, and cross yourself in these things.",
      "Alma 41:10":
        "Do not suppose, because it has been spoken concerning restoration, that ye shall be restored from sin to happiness. Behold, I say unto you, wickedness never was happiness.",
      "Helaman 5:12":
        "And now, my sons, remember, remember that it is upon the rock of our Redeemer, who is Christ, the Son of God, that ye must build your foundation; that when the devil shall send forth his mighty winds, yea, his shafts in the whirlwind, yea, when all his hail and his mighty storm shall beat upon you, it shall have no power over you to drag you down to the gulf of misery and endless wo, because of the rock upon which ye are built, which is a sure foundation, a foundation whereon if men build they cannot fall.",
      "3 Nephi 11:10-11":
        `10 Behold, I am Jesus Christ, whom the prophets testified shall come into the world.
        11 And behold, I am the light and the life of the world; and I have drunk out of that bitter cup which the Father hath given me, and have glorified the Father in taking upon me the sins of the world, in the which I have suffered the will of the Father in all things from the beginning.`,
      "3 Nephi 12:48":
        "Therefore I would that ye should be perfect even as I, or your Father who is in heaven is perfect.",
      "3 Nephi 27:20":
        "Now this is the commandment: Repent, all ye ends of the earth, and come unto me and be baptized in my name, that ye may be sanctified by the reception of the Holy Ghost, that ye may stand spotless before me at the last day.",
      "Ether 12:6":
        "And now, I, Moroni, would speak somewhat concerning these things; I would show unto the world that faith is things which are hoped for and not seen; wherefore, dispute not because ye see not, for ye receive no witness until after the trial of your faith.",
      "Ether 12:27":
        "And if men come unto me I will show unto them their weakness. I give unto men weakness that they may be humble; and my grace is sufficient for all men that humble themselves before me; for if they humble themselves before me, and have faith in me, then will I make weak things become strong unto them.",
      "Moroni 7:45-48":
        `45 And charity suffereth long, and is kind, and envieth not, and is not puffed up, seeketh not her own, is not easily provoked, thinketh no evil, and rejoiceth not in iniquity but rejoiceth in the truth, beareth all things, believeth all things, hopeth all things, endureth all things.
        46 Wherefore, my beloved brethren, if ye have not charity, ye are nothing, for charity never faileth. Wherefore, cleave unto charity, which is the greatest of all, for all things must fail—
        47 But charity is the pure love of Christ, and it endureth forever; and whoso is found possessed of it at the last day, it shall be well with him.
        48 Wherefore, my beloved brethren, pray unto the Father with all the energy of heart, that ye may be filled with this love, which he hath bestowed upon all who are true followers of his Son, Jesus Christ; that ye may become the sons of God; that when he shall appear we shall be like him, for we shall see him as he is; that we may have this hope; that we may be purified even as he is pure. Amen.`,
      "Moroni 10:4-5":
        `4 And when ye shall receive these things, I would exhort you that ye would ask God, the Eternal Father, in the name of Christ, if these things are not true; and if ye shall ask with a sincere heart, with real intent, having faith in Christ, he will manifest the truth of it unto you, by the power of the Holy Ghost.
        5 And by the power of the Holy Ghost ye may know the truth of all things.`
    };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(gameOver){
      return;
    }

    var text = event.target.value;
    text = text.replace("\n", "");
    setInputText(text);
  };

  const handleLoadTextButtonClick = () => {
    loadText(selectedText);
  }

  const loadText = (text: string) => {
    text = text.toUpperCase()
    setScore(0);
    setHiddenText(text);
    setDisplayText(text.replace(/[a-zA-Z]/g, "_"));
    setGameOver(false);
    setPlaceholderText(startTypingString)
  }

  function scoreGuess(guessText: string){
    if(guessText.length === 0){
      return;
    }

    guessText = guessText.toUpperCase().replace(/[^a-zA-Z]/g, "");
    console.log("Guessing: " + guessText);
    var scoreMultiplier = guessText.length;
    var newDisplayText = displayText;
    var newScore = score;

    for(var c of guessText){
      var foundGoodGuess = false;
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

  const handleEnterPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      handleButtonClick()
    }
  };

  const handleButtonClick = () => {
    scoreGuess(inputText);
    setInputText('');
  };

  const handleTextSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedText(event.target.value)
  }

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
        <div>
          <label htmlFor="text">Text: </label>
          <select id="text" value={selectedText} onChange={handleTextSelectionChange}>
            <option value="" disabled>Please choose an option--</option>
            {Object.keys(memorizationTexts).map((key) => (
              <option key={key} value={memorizationTexts[key]}>{key}</option>
            ))}
          </select>
          <button onClick={handleLoadTextButtonClick} disabled={selectedText===""}>LOAD TEXT</button>
        </div>
        <div className="score-box">
          Score: {score}
        </div>
        <div className="display-box">
          {displayText}
        </div>
      </div>
    </div>
  );
};

export default App;
