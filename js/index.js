const formDiv = document.querySelector('#create-monster')
const monstersDiv = document.querySelector('#monster-container')
const nextButton = document.querySelector('#forward')
const backButton = document.querySelector('#back')
let i = 1

const monsterForm = document.createElement('form')
    const inputName = document.createElement('input')
        inputName.type = 'text'
        inputName.name = 'name'
        inputName.placeholder = 'name...'
    const inputAge = document.createElement('input')
        inputAge.type = 'text'
        inputAge.name = 'age'
        inputAge.placeholder = 'age...'
    const inputDescription = document.createElement('input')
        inputDescription.type = 'text'
        inputDescription.name = 'description'
        inputDescription.placeholder = 'description...'
    const submit = document.createElement('input')
        submit.type = 'submit'
        submit.textContent = 'Submit'
monsterForm.append( inputName, inputAge, inputDescription, submit)
formDiv.append(monsterForm)

monsterForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    postFetch(e)
})

const postFetch = (e) => {

    const newMonster = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
    }
    const configObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newMonster)
    }

    fetch(`http://localhost:3000/monsters`,configObj)
    .then(r => r.json())
    .then(addMonstersToDiv)
}



// let page = `_page=${i}`
loadPageMonsters(`_page=1`)

function loadPageMonsters(page){
    fetch(`http://localhost:3000/monsters/?_limit=5&${page}`)
    .then(r => r.json())
    .then(monsters => monsters.forEach(addMonstersToDiv))
}


const addMonstersToDiv = (monster) =>{
    console.log(monster)
    const individualMonstDiv = document.createElement('div')
    const monsterName = document.createElement('h2');
    monsterName.textContent = `${monster.id}. ${monster.name}`
    const monsterAge = document.createElement('h4')
    monsterAge.textContent = `Age: ${parseInt(monster.age)}`
    const monsterDesc = document.createElement('p')
    monsterDesc.textContent = monster.description

    individualMonstDiv.append(monsterName, monsterAge, monsterDesc)
    monstersDiv.append(individualMonstDiv)
}

//These are the page buttons

nextButton.addEventListener('click', ()=> {
    i+=1
    let page = `_page=${i}`
    monstersDiv.textContent = ''
    loadPageMonsters(page)
})

backButton.addEventListener('click', ()=>{
    if(i === 1){
        alert(`You're on the first page`)
    }else{
        i-=1
        let page = `_page=${i}`
        monstersDiv.textContent = ''
        loadPageMonsters(page)
    }
})