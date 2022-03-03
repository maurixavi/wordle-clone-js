const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.keyboard-container')

const messageDisplay = document.querySelector('.message-container')

let wordle 

const getWordle = () => {
    fetch('http://localhost:8000/word')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            wordle = json.toUpperCase();
        })
        .catch(err => console.log(err))
}
getWordle()

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '⌫'
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]
let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow,guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})



keys.forEach(key =>{
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})


const handleClick = (letter) => {
    console.log('clicked', letter)
    if (letter === '⌫'){
        deleteLetter()
        console.log('guessRows', guessRows)
        return
    }
    if (letter === 'ENTER'){
        checkRow()
        console.log('check row')
        return
    }
    addLetter(letter)
    
    console.log('guessRows', guessRows)
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6){
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile += 1
    }   
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
    
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')

    if (currentTile === 5){
        console.log('guess is ' + guess, 'wordle is ' + wordle)
        flipTile()
        if (wordle == guess) {
            showMessage('Congrats! You nailed it 👏')
            isGameOver = true
            return
        } else {
            if (currentRow >= 5){
                showMessage('Game is over!')
                isGameOver = true
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }

        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}


const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    
    let checkWordle = wordle
    let guess = []
    
    
    rowTiles.forEach((tile, index) => {
        const dataLetter = tile.getAttribute('data')

        setTimeout( () => {
            tile.classList.add('flip')
            if (dataLetter == wordle[index]){ //correct
                tile.classList.add('green-overlay')
                addColorToKey(dataLetter, 'green-overlay')
            } else if (wordle.includes(dataLetter)) { //present
                tile.classList.add('yellow-overlay')
                addColorToKey(dataLetter, 'yellow-overlay')
            } else { //absent
                tile.classList.add('grey-overlay')
                addColorToKey(dataLetter, 'grey-overlay')
            }
        }, 300 * index)
        

    })
}