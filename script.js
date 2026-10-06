"use strict";

// ======================================================
// SELECT ELEMENTS
// ======================================================

// Header & Navigation
const navLinks = document.querySelectorAll(".nav-link");
const toggleBtn = document.getElementById("toggleBtn");
const toggleText = document.querySelector(".toggle-text");
const toggleIcon = document.querySelector(".toggle-button > i");

// Page Sections
const gameAreaSection = document.querySelector(".game-area-section");
const gameStatsSection = document.querySelector(".game-stats-section");
const gameControlsSection = document.querySelector(".game-controls-section");
const footer = document.querySelector(".footer");

// Hangman Character
const hangmanCharacter = document.getElementById("hangmanCharacter");
const hangmanParts = document.querySelectorAll(".hangman-part");

// Game Information
const categoryValue = document.getElementById("categoryValue");
const hintText = document.getElementById("hintText");

// Word Display
const wordDisplay = document.getElementById("wordDisplay");

// Wrong Guesses
const wrongGuessesValue = document.getElementById("wrongGuessesValue");
const wrongGuessesDots = document.getElementById("wrongGuessesDots");
const wrongDots = document.querySelectorAll(".wrong-dot");

// Guessed Letters
const guessedLetters = document.getElementById("guessedLetters");

// Keyboard
const keyboard = document.getElementById("keyboard");
const keyboardKeys = document.querySelectorAll(".keyboard-key");

// Game Stats
const winsValue = document.getElementById("winsValue");
const lossesValue = document.getElementById("lossesValue");
const currentStreakValue = document.getElementById("currentStreakValue");
const difficultyValue = document.getElementById("difficultyValue");
const resetStatsBtn = document.getElementById("resetStatsBtn");

// Game Controls
const newGameBtn = document.getElementById("newGameBtn");
const hintBtn = document.getElementById("hintBtn");
const hintCountValue = document.getElementById("hintCountValue");
const resetGameBtn = document.getElementById("resetGameBtn");

// ======================================================
// STATE
// ======================================================

let currentCategory = "";
let currentWord = "";
let currentHint = "";

let guessedLettersArray = [];
let wrongGuesses = 0;
let maxWrongGuesses = 6;

let isGameOver = false;

let wins = 0;
let losses = 0;
let currentStreak = 0;

let difficulty = "Medium";
let hintsLeft = 1;

let currentTheme = "dark";

// ======================================================
// WORD DATA
// ======================================================

// ======================================================
// WORD DATA - 30 WORDS
// ======================================================

const wordData = [
  // MOVIES - 8
  {
    category: "Movies",
    word: "HARRY POTTER",
    hint: "A young wizard attends a magical school.",
  },
  {
    category: "Movies",
    word: "TITANIC",
    hint: "A famous love story aboard a sinking ship.",
  },
  {
    category: "Movies",
    word: "AVATAR",
    hint: "Humans explore a distant planet called Pandora.",
  },
  {
    category: "Movies",
    word: "INCEPTION",
    hint: "A thief enters people's dreams to steal secrets.",
  },
  {
    category: "Movies",
    word: "THE MATRIX",
    hint: "A hacker discovers that reality is a simulation.",
  },
  {
    category: "Movies",
    word: "STAR WARS",
    hint: "An epic space adventure featuring Jedi and lightsabers.",
  },
  {
    category: "Movies",
    word: "FROZEN",
    hint: "Two royal sisters live in a kingdom covered in snow.",
  },
  {
    category: "Movies",
    word: "GLADIATOR",
    hint: "A Roman general becomes a fighter in the arena.",
  },

  // ANIMALS - 8
  {
    category: "Animals",
    word: "ELEPHANT",
    hint: "A large animal with a long trunk.",
  },
  {
    category: "Animals",
    word: "PENGUIN",
    hint: "A flightless bird that is an excellent swimmer.",
  },
  {
    category: "Animals",
    word: "DOLPHIN",
    hint: "An intelligent marine mammal.",
  },
  {
    category: "Animals",
    word: "GIRAFFE",
    hint: "The tallest living land animal.",
  },
  {
    category: "Animals",
    word: "KANGAROO",
    hint: "An Australian animal that carries its baby in a pouch.",
  },
  {
    category: "Animals",
    word: "TIGER",
    hint: "A large wild cat with orange fur and black stripes.",
  },
  {
    category: "Animals",
    word: "OCTOPUS",
    hint: "A sea creature with eight arms.",
  },
  {
    category: "Animals",
    word: "BUTTERFLY",
    hint: "A colorful insect that begins life as a caterpillar.",
  },

  // COUNTRIES - 7
  {
    category: "Countries",
    word: "SLOVAKIA",
    hint: "A Central European country with Bratislava as its capital.",
  },
  {
    category: "Countries",
    word: "JAPAN",
    hint: "An island country famous for sushi and Mount Fuji.",
  },
  {
    category: "Countries",
    word: "BRAZIL",
    hint: "A South American country famous for football and Carnival.",
  },
  {
    category: "Countries",
    word: "CANADA",
    hint: "A North American country known for maple syrup.",
  },
  {
    category: "Countries",
    word: "GERMANY",
    hint: "A European country famous for Berlin and Oktoberfest.",
  },
  {
    category: "Countries",
    word: "AUSTRALIA",
    hint: "A country and continent known for kangaroos and koalas.",
  },
  {
    category: "Countries",
    word: "NORWAY",
    hint: "A Scandinavian country famous for fjords and northern lights.",
  },

  // TECHNOLOGY - 7
  {
    category: "Technology",
    word: "JAVASCRIPT",
    hint: "A programming language commonly used to make websites interactive.",
  },
  {
    category: "Technology",
    word: "KEYBOARD",
    hint: "A device used to type letters and numbers.",
  },
  {
    category: "Technology",
    word: "BROWSER",
    hint: "An application used to access websites.",
  },
  {
    category: "Technology",
    word: "COMPUTER",
    hint: "An electronic device that processes information.",
  },
  {
    category: "Technology",
    word: "SMARTPHONE",
    hint: "A portable device used for calls, apps, and internet access.",
  },
  {
    category: "Technology",
    word: "INTERNET",
    hint: "A global network connecting billions of devices.",
  },
  {
    category: "Technology",
    word: "DATABASE",
    hint: "An organized collection of information stored electronically.",
  },
];

// ======================================================
// THEME
// ======================================================

function loadTheme() {
  const storedTheme = localStorage.getItem("hangmanGameTheme");

  if (storedTheme) {
    currentTheme = storedTheme;
  }

  applyTheme();
}

function applyTheme() {
  document.documentElement.dataset.theme = currentTheme;

  if (currentTheme === "dark") {
    toggleText.textContent = "Dark Mode";
    toggleIcon.className = "bi bi-moon-fill";
  } else {
    toggleText.textContent = "Light Mode";
    toggleIcon.className = "bi bi-sun-fill";
  }
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme();

  localStorage.setItem("hangmanGameTheme", currentTheme);
}

// ======================================================
// NAVIGATION
// ======================================================

function navigateToSection(selectedSection) {
  if (selectedSection === "play") {
    gameAreaSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else if (selectedSection === "stats") {
    gameStatsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else if (selectedSection === "about") {
    footer.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// ======================================================
// SELECT RANDOM WORD
// ======================================================

function selectRandomWord() {
  const previousWord = currentWord;

  let selectedWord;

  do {
    const randomIndex = Math.floor(Math.random() * wordData.length);

    selectedWord = wordData[randomIndex];
  } while (selectedWord.word === previousWord && wordData.length > 1);

  currentWord = selectedWord.word;
  currentCategory = selectedWord.category;
  currentHint = selectedWord.hint;

  categoryValue.textContent = currentCategory;
  hintText.textContent = "Click Use Hint to reveal a clue.";
}

// ======================================================
// START NEW GAME
// ======================================================

function startNewGame() {
  selectRandomWord();

  guessedLettersArray = [];
  wrongGuesses = 0;
  isGameOver = false;
  hintsLeft = 1;

  hintCountValue.textContent = `${hintsLeft} left`;
  hintBtn.disabled = false;

  renderWordDisplay();
  updateKeyboard();
  updateHangmanCharacter();
  updateWrongGuesses();
  updateGuessedLetters();
}

// ======================================================
// RENDER WORD DISPLAY
// ======================================================

function renderWordDisplay() {
  wordDisplay.innerHTML = "";

  currentWord.split("").forEach((letter) => {
    const letterBox = document.createElement("span");

    letterBox.classList.add("letter-box");

    if (letter === " ") {
      letterBox.classList.add("space");
    } else if (guessedLettersArray.includes(letter)) {
      letterBox.textContent = letter;
      letterBox.classList.add("revealed");
    }

    wordDisplay.appendChild(letterBox);
  });
}

// ======================================================
// HANDLE LETTER GUESS
// ======================================================

function handleLetterGuess(letter) {
  if (isGameOver) return;

  if (guessedLettersArray.includes(letter)) return;

  guessedLettersArray.push(letter);

  if (!currentWord.includes(letter)) {
    wrongGuesses++;
  }

  renderWordDisplay();
  updateKeyboard();
  updateHangmanCharacter();
  updateWrongGuesses();
  updateGuessedLetters();
  checkGameResults();
}

// ======================================================
// UPDATE KEYBOARD
// ======================================================

function updateKeyboard() {
  keyboardKeys.forEach((button) => {
    const letter = button.dataset.letter;

    const wasGuessed = guessedLettersArray.includes(letter);
    const isCorrect = currentWord.includes(letter);

    button.classList.toggle("correct", wasGuessed && isCorrect);
    button.classList.toggle("wrong", wasGuessed && !isCorrect);

    button.disabled = wasGuessed || isGameOver;
  });
}

// ======================================================
// UPDATE HANGMAN CHARACTER
// ======================================================

function updateHangmanCharacter() {
  hangmanParts.forEach((part, index) => {
    if (index < wrongGuesses) {
      part.classList.add("show");
    } else {
      part.classList.remove("show");
    }
  });
}

// ======================================================
// UPDATE WRONG GUESSES
// ======================================================

function updateWrongGuesses() {
  wrongGuessesValue.textContent = `${wrongGuesses} / ${maxWrongGuesses}`;

  wrongDots.forEach((dot, index) => {
    if (index < wrongGuesses) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// ======================================================
// UPDATE GUESSED LETTERS
// ======================================================

function updateGuessedLetters() {
  guessedLetters.innerHTML = "";

  guessedLettersArray.forEach((letter) => {
    const letterSpan = document.createElement("span");

    letterSpan.textContent = letter;

    guessedLetters.append(letterSpan);
  });
}

// ======================================================
// CHECK GAME RESULT
// ======================================================

function checkGameResults() {
  const isWordGuessed = currentWord.split("").every((letter) => {
    return letter === " " || guessedLettersArray.includes(letter);
  });

  if (isWordGuessed) {
    completeGame(true);
    return;
  }

  if (wrongGuesses >= maxWrongGuesses) {
    completeGame(false);
    return;
  }
}

// ======================================================
// COMPLETE GAME
// ======================================================

function completeGame(isWin) {
  if (isGameOver) return;

  isGameOver = true;

  if (isWin) {
    wins++;
    currentStreak++;

    hintText.textContent = "Congratulations! You guessed the word!";
  } else {
    losses++;
    currentStreak = 0;

    hintText.textContent = `Game Over! The word was ${currentWord}.`;
  }

  hintBtn.disabled = true;

  updateKeyboard();
  updateStats();
  saveStats();
}

// ======================================================
// USE HINT
// ======================================================

function useHint() {
  if (isGameOver) return;

  if (hintsLeft <= 0) return;

  hintText.textContent = currentHint;

  hintsLeft--;

  hintCountValue.textContent = `${hintsLeft} left`;

  hintBtn.disabled = true;
}

// ======================================================
// UPDATE GAME STATS
// ======================================================

function updateStats() {
  winsValue.textContent = wins;
  lossesValue.textContent = losses;
  currentStreakValue.textContent = currentStreak;
  difficultyValue.textContent = difficulty;
}

// ======================================================
// SAVE / LOAD GAME STATS
// ======================================================

function saveStats() {
  const stats = {
    wins,
    losses,
    currentStreak,
  };

  localStorage.setItem("hangmanGameStats", JSON.stringify(stats));
}

function loadStats() {
  const storedStats = localStorage.getItem("hangmanGameStats");

  if (!storedStats) return;

  const stats = JSON.parse(storedStats);

  wins = stats.wins ?? 0;
  losses = stats.losses ?? 0;
  currentStreak = stats.currentStreak ?? 0;
}

// ======================================================
// RESET GAME STATS
// ======================================================

function resetStats() {
  const isConfirmed = confirm(
    "Are you sure you want to reset all your game statistics?",
  );

  if (!isConfirmed) return;

  wins = 0;
  losses = 0;
  currentStreak = 0;

  updateStats();
  saveStats();
}

// ======================================================
// RESET GAME
// ======================================================

function resetGame() {
  guessedLettersArray = [];
  wrongGuesses = 0;

  isGameOver = false;
  hintsLeft = 1;

  hintCountValue.textContent = `${hintsLeft} left`;
  hintBtn.disabled = false;

  hintText.textContent = "Click Use Hint to reveal a clue.";

  renderWordDisplay();
  updateKeyboard();
  updateHangmanCharacter();
  updateWrongGuesses();
  updateGuessedLetters();
}

// ======================================================
// EVENT LISTENERS
// ======================================================

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });

    link.classList.add("active");

    const selectedSection = link.dataset.link;

    navigateToSection(selectedSection);
  });
});

toggleBtn.addEventListener("click", toggleTheme);

newGameBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", useHint);
resetGameBtn.addEventListener("click", resetGame);
resetStatsBtn.addEventListener("click", resetStats);

keyboardKeys.forEach((button) => {
  button.addEventListener("click", () => {
    const letter = button.dataset.letter;

    handleLetterGuess(letter);
  });
});

// ======================================================
// INITIALIZE APP
// ======================================================

function initApp() {
  loadTheme();
  loadStats();

  updateStats();
  startNewGame();
}

initApp();
