import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
let isPaused = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/'
    }
    return
  }
  
  if (isPaused == true)
  {return}
  window.requestAnimationFrame(main) /* do another loop */
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

  lastRenderTime = currentTime

  update()
  draw()
}

if (isPaused == false){
  window.requestAnimationFrame(main)
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'p':
      if (isPaused == true){ /* switch to live game */
        isPaused = false
        console.log("running")
        window.requestAnimationFrame(main)
        document.getElementById("pause-screen").style.visibility="hidden"
        document.getElementById("pause-screen").style.animation = "none";
        break
      } 
      if (isPaused == false){ /* switch to paused game */
        isPaused = true
        console.log("paused")
        document.getElementById("pause-screen").style.animation = "fadeIn 1s";
        document.getElementById("pause-screen").style.visibility="visible"
        break
      }
      break}})

window.requestAnimationFrame(main) /* start loop */

function update() {
  updateSnake()
  updateFood()
  checkDeath()
  isPaused
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}