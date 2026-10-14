let score = document.getElementById("score")
let btn = document.querySelectorAll(".btn")
let p = document.querySelector("p")
let arr = ['pink','green','blue','yellow']
let seq =[]
let userseq = []
let level = 0;
let highscore = 0;
let h1 = document.querySelector('h1')

let start = false
document.addEventListener("keypress", e=>{
    let random = Math.floor(Math.random()*arr.length)
    if(start){ return }
    start = true
    flash(arr[random])
    seq.push(arr[random])
    h1.innerHTML = 'Simon Says'
    levelup()
})

document.addEventListener("click", e=>{
    let random = Math.floor(Math.random()*arr.length)
    if(start) { return}
    start = true
    flash(arr[random])
    seq.push(arr[random])
    h1.innerHTML = 'Simon Says'
    levelup()
})

btn.forEach(e=>{
    e.addEventListener("click", (e)=>{
        e.target.classList.add("flash")
        e.stopPropagation()
        setTimeout(()=>{
        e.target.classList.remove("flash")
        },320)
        userseq.push(e.target.id)
        setTimeout(()=>{
            check(userseq.length-1)
        },320)
    })
})

function select(){
    let random = Math.floor(Math.random()*arr.length)
    flash(arr[random])
    seq.push(arr[random])
}

function levelup(){
    userseq=[]
    level++
    p.innerHTML = `<h2>level : ${level}</h2>`
    highscore = level
    score.innerHTML = highscore
}

function flash(b){
    let btn = document.querySelector(`#${b}`)
    btn.classList.add("flash")
    setTimeout(()=>{
        btn.classList.remove("flash")
    },230)
}

function check(idx){
    if(userseq[idx] == seq[idx]){
        if(userseq.length == seq.length){
            select()
            levelup()
        }
    }
    else{
        p.innerHTML = `<h2>Wrong</h2>`
        document.body.classList.add("error")
        h1.innerHTML = `press any key or click anywhere to restart the game...`
        setTimeout(()=>{
            document.body.classList.remove("error")
        },1000)
        start = false
        reset()
    }
}

function reset(){
    start = false
    userseq = []
    seq = []
    level = 0
    highscore = 0
}