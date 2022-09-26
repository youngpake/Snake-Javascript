import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition()
const EXPANSION_RATE = 5
let score = 0
let level = 1

export function update() {
  if (onSnake(food)) {

    if (score == 13) 
    {document.getElementById("LEVELUP").style.display = "block";
    document.getElementById("game-board").style.background = 'url("level-2-arena.webp")';
    level = level + 1}
    if (score == 40)
    {document.getElementById("LEVELUP").style.display = "none"}

    if (score == 364)
    {document.getElementById("LEVELUP").style.display = "block";
    document.getElementById("game-board").style.background = 'url("level-3-arena.webp")';
    level++}

    if (score == 1093)
    {document.getElementById("LEVELUP").style.display = "none";}

    if (score == 29524)
    {document.getElementById("LEVELUP").style.display = "block"
    level++}

    score = score *3+1
    document.getElementById("scorecounter").innerHTML ="Level: " + level + " || " + "Score: " + score;
    expandSnake(EXPANSION_RATE)
    food = getRandomFoodPosition()
  }
}

export function draw(gameBoard) { // adding to the snake length
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}