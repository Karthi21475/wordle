import React, { useEffect, useState  } from 'react'
import './App.css'
import Row from './Row.jsx';
import Keyboard from './Keyboard.jsx';
function App() {

  const [value,setValue]=useState('');
  const [guesses,setGuesses]=useState(Array(6).fill(null));
  const [isGameover,setIsGameover]=useState(false);
  const [isGameWon,setIsGameWon]=useState(false);
  const [showToast,setShowToast]=useState(false);
  const [toastContent,setToastContent]=useState("");
  const fiveLetterWords = [
  "about", "above", "actor", "admit", "adobe", "adore", "agent", "agile", "agree", "alarm",
  "alien", "alike", "alive", "allow", "alone", "alpha", "alter", "amber", "angel", "angry",
  "apple", "apply", "apron", "argue", "arise", "armor", "arrow", "aside", "asset", "audio",
  "audit", "avoid", "awake", "award", "aware", "awful", "bacon", "badge", "basic", "basil",
  "batch", "beach", "beard", "beast", "begin", "belly", "bench", "berry", "bible", "bingo",
  "birth", "black", "blame", "blank", "blast", "blend", "blink", "block", "blood", "bloom",
  "blown", "board", "boost", "bored", "bound", "brain", "brave", "bread", "break", "brick",
  "brief", "bring", "broad", "broke", "brown", "brush", "build", "built", "burst", "buyer",
  "cabin", "cable", "camel", "candy", "cared", "carry", "catch", "cause", "chain", "chair",
  "chalk", "champ", "chant", "chart", "chase", "cheap", "check", "cheek", "cheer", "chess",
  "chest", "chief", "child", "choir", "chunk", "civil", "class", "clean", "clear", "clerk",
  "click", "cliff", "clock", "close", "cloud", "clown", "coach", "coast", "color", "comic",
  "count", "court", "cover", "crack", "craft", "crash", "cream", "crime", "crisp", "cross",
  "crowd", "crown", "crude", "crush", "curve", "cycle", "daily", "dance", "death", "delay",
  "devil", "diary", "digit", "dirty", "dodge", "doing", "donut", "doubt", "dozen", "draft",
  "drain", "drama", "drawn", "dream", "dress", "drink", "drive", "drove", "dying", "eager",
  "early", "earth", "elite", "email", "empty", "enemy", "enjoy", "enter", "equal", "error",
  "event", "every", "exact", "exist", "extra", "faith", "false", "fault", "favor", "feast",
  "fence", "ferry", "fever", "fiber", "field", "fight", "final", "first", "flame", "flash",
  "fleet", "flesh", "float", "flock", "floor", "fluid", "focus", "force", "forth", "found",
  "frame", "fraud", "fresh", "front", "frost", "fruit", "funny", "giant", "globe", "glory",
  "grace", "grade", "grain", "grand", "grant", "grape", "graph", "grass", "great", "green",
  "grind", "group", "guard", "guess", "guest", "guide", "habit", "happy", "harsh", "heart",
  "heavy", "honey", "horse", "hotel", "house", "human", "humor", "hurry", "ideal", "image",
  "imply", "index", "inner", "input", "issue", "jeans", "joint", "judge", "juice", "juicy",
  "jumps", "kebab", "knife", "knock", "known", "label", "labor", "laser", "laugh", "layer",
  "learn", "leave", "legal", "level", "light", "limit", "local", "logic", "loose", "lucky",
  "lunch", "magic", "major", "maker", "march", "match", "maybe", "meant", "metal", "might",
  "minor", "model", "money", "month", "moral", "motor", "mount", "mouse", "mouth", "movie",
  "music", "naked", "nerdy", "never", "night", "ninja", "noise", "north", "novel", "nurse",
  "ocean", "offer", "often", "onion", "opera", "orbit", "order", "other", "outer", "owner",
  "paint", "panel", "panic", "party", "pause", "peace", "pearl", "pedal", "penis", "perky",
  "phase", "phone", "photo", "piano", "piece", "pilot", "pitch", "pizza", "place", "plain",
  "plant", "plate", "point", "polar", "polka", "porch", "pound", "power", "press", "price",
  "pride", "prime", "print", "prior", "prize", "proof", "proud", "prove", "punch", "queen",
  "query", "quest", "quick", "quiet", "quirk", "radio", "raise", "range", "rapid", "ratio",
  "reach", "react", "ready", "realm", "rebel", "refer", "relax", "reply", "retro", "rider",
  "right", "risky", "river", "robot", "rough", "round", "route", "royal", "ruler", "runny",
  "saint", "salty", "scale", "scene", "scent", "score", "scout", "screw", "serve", "shaft",
  "shake", "shall", "shame", "shape", "share", "shark", "sharp", "sheep", "sheer", "shelf",
  "shell", "shift", "shine", "shirt", "shock", "shoot", "shore", "short", "shout", "shove",
  "sight", "since", "skill", "skirt", "skull", "slang", "slash", "slave", "sleek", "sleep",
  "slice", "slide", "slope", "small", "smart", "smile", "smoke", "snack", "snake", "sneak",
  "solid", "solve", "sorry", "sound", "south", "space", "spare", "spark", "speak", "spice",
  "spine", "split", "spoil", "spoke", "sport", "spray", "squad", "stack", "staff", "stage",
  "stain", "stamp", "stand", "stare", "start", "state", "steam", "steel", "steep", "steer",
  "stern", "stick", "stiff", "still", "stock", "stone", "store", "storm", "story", "strip",
  "study", "stuff", "style", "sugar", "sunny", "super", "swear", "sweat", "sweet", "swing",
  "sword", "table", "taste", "teach", "tears", "tempo", "thank", "their", "theme", "there",
  "thick", "thing", "think", "third", "those", "throw", "tight", "tiger", "title", "today",
  "token", "topic", "total", "touch", "tough", "tower", "toxic", "trace", "track", "trade",
  "trail", "train", "treat", "trend", "trial", "tribe", "trick", "tried", "tries", "truck",
  "truly", "trunk", "trust", "truth", "twice", "uncle", "under", "union", "unite", "unity",
  "upper", "urban", "usage", "usual", "vague", "valid", "value", "vault", "video", "virus",
  "vital", "vivid", "voice", "voter", "waste", "watch", "water", "weird", "whale", "wheat",
  "wheel", "where", "which", "while", "white", "whole", "whose", "widen", "width", "wight",
  "woman", "world", "worry", "worse", "worst", "worth", "would", "wound", "wrath", "write",
  "wrong", "wrote", "yield", "young", "yours", "zebra", "zesty", "zonal"];
  const [word,setWord]=useState('');
  const [score,setScore]=useState(0);


  useEffect(()=>{
    setWord(fiveLetterWords[Math.floor(Math.random()*fiveLetterWords.length)])
  },[])

  useEffect(()=>{
    const handleKeyPress=async(e)=>{
      if (!e.repeat){
        if (showToast){
          setShowToast(false);
        }
        if(isGameover || isGameWon){
          return;
        }
        if(e.key==="Backspace"){
          if (value.length){
            setValue(prev=>prev.slice(0,-1))
          }
          return;
        }
        if(e.key=="Enter"){
          if (value.length<5){
            setShowToast(true)
            setToastContent("The word must be 5 letters long");
            return;
          }
          if (!fiveLetterWords.includes(value.toLowerCase())){
            setShowToast(true);
            setToastContent("The word does not exist in the word list");
            return;
          }

          if (value.toLowerCase()===word){
            setScore(prev=>prev+50);
            setIsGameWon(true);
          }
          setGuesses(prev=>{
            const newGuesses=[...prev];
            newGuesses[prev.findIndex(val=>val==null)]=value
            return newGuesses;
          })
          setValue('');
          return;
        }
        if(/^[A-Za-z]$/.test(e.key) && value.length<5){
          setValue(prev=>prev+e.key);
          return;
        }
      }
    }

    if (!guesses.includes(null)){
      setScore(prev=>prev-20);
      setIsGameover(true);
      return;
    }

    window.addEventListener("keydown",handleKeyPress)
    
    return ()=>window.removeEventListener("keydown",handleKeyPress);

  },[value,isGameover,guesses,word,isGameWon]);

  function reset(){
    setIsGameWon(false);
    setIsGameover(false);
    setGuesses(Array(6).fill(null));
    setValue('');
    setScore(0);
    setWord(fiveLetterWords[Math.floor(Math.random()*fiveLetterWords.length)])
  }

  console.log(word)

  return (
    <>
    {showToast &&
      <div className="toast">
        {toastContent}
      </div>
    }
    {isGameWon && 
    <div className="gamepop-cont">
      <div className='popup-cont'>
        <h1>Congragulations You won!!</h1>
        Your score is {Math.ceil(score)}
        <button onClick={()=>{reset()}}>Play Again</button>
      </div>
    </div>}
    {isGameover &&
    <div className="gamepop-cont">
      <div className="popup-cont">
        <h1>Game Over, Your score is {Math.ceil(score)}</h1>
        the word was <b>{word}</b>
        <button onClick={()=>{reset()}}>Try Again</button>
      </div>
    </div>}
    <div className="Main-container">
      <h1>Guess The Word</h1>
      <div className="Box-container">
        {guesses.map((guess,ind)=>{

          const isCurrentGuess= ind===guesses.findIndex(val=>val==null);
          const Submitted= guesses[ind]!==null;

          return <Row key={ind} guess={isCurrentGuess?value:guess ?? ""} word={word} Submitted={Submitted} setScore={setScore} ith_guess={ind}/>
        })}
      </div>
        <Keyboard guesses={guesses} word={word} isGameWon={isGameWon} isGameover={isGameover}/>
    </div>
    </>
  )
}

export default App