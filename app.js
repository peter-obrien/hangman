import img00 from './images/0.png'
import img01 from './images/1.png'
import img02 from './images/2.png'
import img03 from './images/3.png'
import img04 from './images/4.png'
import img05 from './images/5.png'
import img06 from './images/6.png'
import img07 from './images/7.png'
import img08 from './images/8.png'
import img09 from './images/9.png'
import img10 from './images/10.png'
import img11 from './images/11.png'
const images = [img00, img01, img02, img03, img04, img05, img06, img07, img08, img09, img10, img11]
const wordToGuess = document.querySelector('#wordToGuess')
const wordForm = document.querySelector('#wordForm')
const reset = document.querySelector('#resetBtn')
const guessMode = document.querySelector('#guessMode')
const wordContainer = document.querySelector('#wordContainer')
const playersList = document.querySelector('#playersList')
const maxGuesses = 11
let incorrectGuesses = 0
wordForm.addEventListener('keypress', evt => {
    if (evt.key === 'Enter') {
        evt.preventDefault()
        const enteredWord = wordToGuess.value.trim()
        for (let i = 0; i < enteredWord.length; i++) {
            let letterHtml = ''
            if (enteredWord.charAt(i) === ' ') {
                letterHtml = `<input type="text" class="spaceLetter placeholder${i} w-12 h-12 text-center opacity-0" disabled maxlength="1">`
            } else {
                letterHtml = `<input type="text" class="unknownLetter placeholder${i} w-12 h-12 text-center bg-gray-200 border border-gray-300 rounded" disabled>`
            }
            wordContainer.innerHTML = wordContainer.innerHTML + letterHtml
        }
        let players = getPlayers()
        if (players) {
            playersList.classList.remove('hidden')
            playersList.innerHTML += players.join(' | ')
        } else {
            playersList.classList.add('hidden')
        }
        guessMode.classList.remove('hidden')
        wordForm.classList.toggle('hidden')
        updateGraphic()
    }
})
reset.addEventListener('click', resetGame)
let letterButtons = document.querySelectorAll('.letter')
for (const letterButton of letterButtons) {
    letterButton.addEventListener('click', handleGuess)
}

function resetGame(evt) {
    evt.preventDefault()
    guessMode.classList.add('hidden')
    wordToGuess.value = ''
    wordForm.classList.toggle('hidden')
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
    document.querySelector('#graphic').setAttribute('src', `${images[incorrectGuesses]}`)
}

function getPlayers() {
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('players')) {
        return searchParams.get('players').split(',')
    }
    return null
}
