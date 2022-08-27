const score = document.querySelector(".score")
const rulesButton = document.querySelector(".rules-button")
const modale = document.querySelector(".modale-container")
const closModalBtn = document.querySelector(".close-modale")
const choices = document.querySelector(".choices")
const battle = document.querySelector(".battle")
const player = document.querySelector(".player")
const robot = document.querySelector(".robot")
const endgame = document.querySelector(".end-game")
const endgametext = document.querySelector(".end-game p")
const playagain = document.querySelector(".end-game button")
const playerWave = document.querySelector(".player .wave-back")
const robotWave = document.querySelector(".robot .wave-back")
let userChoice
const tambour = new Audio("./assets/tambour.mp3")
let win

score.innerHTML = localStorage.getItem("score") ? localStorage.getItem("score") : 0

function closeModale(){
    modale.style.opacity = 0
    setTimeout(() => {
        modale.classList.remove("open-modale")
    }, 300);
}

rulesButton.addEventListener("click", ()=>{
    modale.classList.add("open-modale")
    setTimeout(() => {
        modale.style.opacity = 1
    }, 0);
})

closModalBtn.addEventListener("click", () => closeModale())
playagain.addEventListener("click", () => playAgain())

window.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && modale.classList.length == 2){
        closeModale()
    }
})

function playAgain(){
    battle.style.opacity = 0
    setTimeout(() => {
        win = undefined
       battle.style.display = "none"
       choices.style.display = "flex"
       choices.classList.remove("swipe-choices")
       player.classList.remove("appear-p")
       robot.classList.remove("appear-r")
       document.querySelector(".player img:nth-child(1)").style.display = ""
       document.querySelector(".player img:nth-child(2)").style.display = ""
       document.querySelector(".player img:nth-child(3)").style.display = ""
       document.querySelector(".robot img:nth-child(1)").style.display = ""
       document.querySelector(".robot img:nth-child(2)").style.display = ""
       document.querySelector(".robot img:nth-child(3)").style.display = ""
       setTimeout(() => {
           choices.style.opacity = "1"
           battle.style.gap = ""
           player.classList.remove("rock", "paper", "scisors")
           robot.classList.remove("rock", "paper", "scisors")
           endgame.style.opacity = ""
           endgame.style.display = ""
           playagain.style.color = ""
           playerWave.style.display = ""
           robotWave.style.display = ""
       }, 100);
    }, 500);
}

function robotChoice(){
    const random = Math.floor(Math.random() * 3)
    switch (random) {
        case 0:
            robot.classList.add("paper")
            document.querySelector(".robot img:nth-child(1)").style.display = "initial"
            userChoice === "paper" ? win = "both" : null
            userChoice === "scisors" ? win = "player" : null
            userChoice === "rock" ? win = "robot" : null
            break;
        case 1:
            robot.classList.add("scisors")
            document.querySelector(".robot img:nth-child(3)").style.display = "initial"
            userChoice === "paper" ? win = "robot" : null
            userChoice === "scisors" ? win = "both" : null
            userChoice === "rock" ? win = "player" : null
            break;
        case 2:
            robot.classList.add("rock")
            document.querySelector(".robot img:nth-child(2)").style.display = "initial"
            userChoice === "paper" ? win = "player" : null
            userChoice === "scisors" ? win = "robot" : null
            userChoice === "rock" ? win = "both" : null
            break;
        default:
            break;
        }
}

function endGame(){
    switch (win) {
        case "player":
            localStorage.setItem("score", (parseInt(localStorage.getItem("score")) + 1))
            score.innerHTML = localStorage.getItem("score")
            endgametext.innerHTML = "YOU WIN"
            playerWave.style.display = "flex"
            break;
        case "robot":
            localStorage.setItem("score", (parseInt(localStorage.getItem("score")) - 1))
            score.innerHTML = localStorage.getItem("score")
            endgametext.innerHTML = "YOU LOSE"
            playagain.style.color = "hsl(349, 71%, 52%)"
            robotWave.style.display = "flex"
            break;
            case "both":
            endgametext.innerHTML = "YOU... TIE"
            break
        default:
            break;
        }
        endgame.style.display = "initial"
        battle.style.gap = "24em"
        setTimeout(() => {
            endgame.style.opacity = "1"
        }, 1000);
    }

function play(){
    choices.classList.add("swipe-choices")

    setTimeout(() => {
        choices.style.display = "none"
        battle.style.display = "flex"

        setTimeout(() => {     
            battle.style.opacity = "1"
            choices.style.opacity = "0"
            player.classList.add("appear-p")
            switch (userChoice) {
                case "paper":
                    document.querySelector(".player img:nth-child(1)").style.display = "flex"
                    player.classList.add("paper")
                    break;
                case "scisors":
                    document.querySelector(".player img:nth-child(3)").style.display = "flex"
                    player.classList.add("scisors")
                    break;
                case "rock":
                    document.querySelector(".player img:nth-child(2)").style.display = "flex"
                    player.classList.add("rock")
                    break;
                default:
                    break;
                }
                
            robotChoice()
            setTimeout(() => {
                tambour.play()
                document.querySelector(".pick-container:last-child p").classList.add('tremble')
                
                setTimeout(() => {
                    document.querySelector(".pick-container:last-child p").classList.remove('tremble')
                    robot.classList.add("appear-r")

                    setTimeout(() => {
                        endGame()
                    }, 1000);

                }, 2300);
            }, 1500);
        }, 100);
    }, 1500);
}

document.querySelectorAll(".choice").forEach(choice => {
    choice.addEventListener("click", (e)=>{
        userChoice = e.target.getAttribute("choice")
        play()
    })
});