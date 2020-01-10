let monsterUrl = "http://localhost:3000/monsters"
let monsterContainer = document.getElementById("monster-container")
let createMonster = document.getElementById("create-monster")
let pageNumber = 1
let limit = 50
let back = document.getElementById("back")
let forward = document.getElementById("forward")

function fetchMonsters(){
    fetch(`${monsterUrl}?_limit=${limit}&_page=${pageNumber}`)
        .then(r=>r.json())
        .then(monsters => {addMonsters(monsters)})
}

function addMonsters(monsters){
    monsters.forEach(monster => {
        monsterContainer.innerHTML += `
            <div>
                <h2>${monster.name}</h2>
                <h4>Age: ${monster.age}</h4>
                <p>Bio: ${monster.description}</P
            </div>
        `
    })
}

function createForm(){
    createMonster.innerHTML = `
        <form id="monster-form">
            <input id="name" placeholder="name...">
            <input id="age" placeholder="age...">
            <input id="description" placeholder="description...">
            <button>Create</button>
        </form>
    `
}

createMonster.addEventListener("submit",(e) => {
    e.preventDefault()
    let monsterName = e.target.name.value
    let monsterAge = e.target.age.value
    let bio = e.target.description.value
    let monsterForm = document.getElementById("monster-form")

    fetch(monsterUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: monsterName,
            age: monsterAge,
            description: bio
        })
    })
    monsterForm.reset()
})

forward.addEventListener("click",(e) => {
    if(monsterContainer.getElementsByTagName("div").length === 50){
        pageNumber++
        monsterContainer.innerHTML = ''
        fetchMonsters()
    }
})

back.addEventListener("click",(e) => {
    if(pageNumber > 1){
        pageNumber--
        monsterContainer.innerHTML = ''
        fetchMonsters()
    }
})




fetchMonsters()
createForm()