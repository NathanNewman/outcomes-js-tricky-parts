function guessingGame() {
    // Generate a random number between 0 and 99
    const secretNumber = Math.floor(Math.random() * 100);
  
    let gameOver = false;
    let numGuesses = 0;
  
    return function(guess) {
      if (gameOver) {
        return "The game is over, you already won!";
      }
  
      numGuesses++;
  
      if (guess === secretNumber) {
        gameOver = true;
        return `You win! You found ${guess} in ${numGuesses} ${numGuesses === 1 ? 'guess' : 'guesses'}.`;
      } else if (guess < secretNumber) {
        return `${guess} is too low!`;
      } else {
        return `${guess} is too high!`;
      }
    };
  }

module.exports = { guessingGame };
