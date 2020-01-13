const monstersUrl = "http://localhost:3000/monsters"
const createMonster = document.querySelector('#create-monster')

const backBtn = document.querySelector('#back')
const forwardBtn = document.querySelector('#forward')

fetch(`${monstersUrl}/?_limit=50&_page=1`)
.then(r => r.json())
.then(monsters => monsters.forEach(monster => displayMonsters(monster)))



function displayMonsters(monster){
    const monsterContainer = document.querySelector('#monster-container')
    const div = document.createElement('div')
    
    const h2 = document.createElement('h2')
    h2.innerText = monster.name
    const h4 = document.createElement('h4')
    h4.innerText = `Age: ${monster.age}`
    const p = document.createElement('p')
    p.innerText = monster.description
    
    div.append(h2, h4, p)
    monsterContainer.append(div)
    
}

function createMonsterForm(){
    
    const form = document.createElement('form')
    form.id = "monster-form"
    const inputName = document.createElement('input')
    inputName.id = "name"
    inputName.placeholder = "Name..."
    const inputAge = document.createElement('input')
    inputAge.id = "age"
    inputAge.placeholder = "Age..."
    const inputDesc = document.createElement('input')
    inputDesc.id = "description"
    inputDesc.placeholder = "Description..."
    const button = document.createElement('button')
    button.innerText = "Create"
    
    form.append(inputName, inputAge, inputDesc, button)
    createMonster.append(form)
    
    createNewMonster(form)
}
createMonsterForm()

function createNewMonster(form){
    form.addEventListener("submit", (event) => {
    event.preventDefault()
    const monsterName = event.target.name.value
    const monsterAge = event.target.age.value
    const monsterDesc = event.target.description.value

    fetch(monstersUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
           "name": monsterName,
           "age": monsterAge,
           "description": monsterDesc 
        })
    })
    .then(r => r.json())
    .then(monster => displayMonsters(monster))
    event.target.reset()
})}

backBtn.addEventListener("click", (event) => {
    fetch
})
