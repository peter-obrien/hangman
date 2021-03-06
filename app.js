const wordToGuess = document.querySelector('#wordToGuess')
const wordForm = document.querySelector('#wordForm')
const reset = document.querySelector('#resetBtn')
const guessMode = document.querySelector('#guessMode')
const wordContainer = document.querySelector('#wordContainer')
const playersList = document.querySelector('#playersList')
const maxGuesses = 11
let incorrectGuesses = 0
wordForm.addEventListener('submit', evt => {
    evt.preventDefault()
    const enteredWord = wordToGuess.value.trim()
    for (let i = 0; i < enteredWord.length; i++) {
        let letterHtml = ''
        if (enteredWord.charAt(i) === ' ') {
            letterHtml = `<div class="unknownLetterContainer mx-1"><input type="text" class="spaceLetter placeholder${i} form-control" disabled maxlength="1"></div>`
        } else {
            letterHtml = `<div class="unknownLetterContainer mx-1"><input type="text" class="unknownLetter placeholder${i} form-control" disabled maxlength="1"></div>`
        }
        wordContainer.innerHTML = wordContainer.innerHTML + letterHtml
    }
    let players = getPlayers()
    if (players) {
        playersList.innerHTML += players.join(' | ')
    }
    guessMode.classList.remove('d-none')
    wordForm.classList.toggle('d-none')
    updateGraphic()
})
reset.addEventListener('click', resetGame)
let letterButtons = document.querySelectorAll('.letter')
for (const letterButton of letterButtons) {
    letterButton.addEventListener('click', handleGuess)
}

function resetGame(evt) {
    evt.preventDefault()
    guessMode.classList.add('d-none')
    wordToGuess.value = ''
    wordForm.classList.toggle('d-none')
    wordContainer.innerHTML = ''
    playersList.innerHTML = ''
    incorrectGuesses = 0
    for (const letterButton of letterButtons) {
        letterButton.disabled = false
    }
}

function handleGuess(evt) {
    evt.preventDefault()
    evt.target.disabled = true
    if (!validateLetter(evt.target.innerText)) {
        incorrectGuesses++
        updateGraphic()
    }
    if (isGameWon()) {
        alert(`Winner!\n\nThe answer was "${wordToGuess.value}".`)
        resetGame()
    }
    if (isGameOver()) {
        alert(`Game Over!\n\nThe answer was "${wordToGuess.value}".`)
        resetGame()
    }
}

function validateLetter(letter) {
    let result = false
    const enteredWord = wordToGuess.value.trim().toUpperCase()
    for (let i = 0; i < enteredWord.length; i++) {
        if (enteredWord.charAt(i) === letter) {
            result = true
            document.querySelector(`.placeholder${i}`).value = enteredWord.charAt(i)
        }
    }
    return result
}

function isGameWon() {
    for (const unknownLetter of document.querySelectorAll('.unknownLetter')) {
        if (!unknownLetter.value) {
            return false
        }
    }
    return true
}

function isGameOver() {
    return incorrectGuesses === maxGuesses
}

function updateGraphic() {
    document.querySelector('#graphic').setAttribute('src', `./images/${incorrectGuesses}.png`)
}

function getPlayers() {
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('players')) {
        return searchParams.get('players').split(',')
    }
    return null
}
