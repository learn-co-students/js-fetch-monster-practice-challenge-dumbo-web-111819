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
    monsterForm.reset()
})

// add monsters to the page
loadPageMonsters(`_page=${i}`)

const addMonstersToDiv = (monster) =>{
    //regular monster display
    const individualMonstDiv = document.createElement('div')
    const monsterName = document.createElement('h2');
    monsterName.textContent = `${monster.id}. ${monster.name}`
    const monsterAge = document.createElement('h4')
    monsterAge.textContent = `Age: ${monster.age}`
    const monsterDesc = document.createElement('p')
    monsterDesc.textContent = monster.description

    const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete Monster'
        deleteButton.addEventListener('click', ()=>{
            deleteFetch(monster, individualMonstDiv)
        })
    
    const editButton = document.createElement('button')
        editButton.textContent = 'Edit Monster'
        editButton.addEventListener('click',(e)=>{
            individualMonstDiv.style.display = 'none'
            editMonsterDiv.style.display = 'block'
        })
        
    //edit form div
    const editMonsterDiv = document.createElement('div')
    const editMonsterHeading = document.createElement('h1')
        editMonsterHeading.innerText = `Edit: ${monster.name}`
    const editMonsterForm = document.createElement('form')
    const editMonsterName = document.createElement('input')
        editMonsterName.value = monster.name
        editMonsterName.type = 'text'
        editMonsterName.name = 'name'
    const editMonsterAge = document.createElement('input')
        editMonsterAge.value = monster.age
        editMonsterAge.type = 'text'
        editMonsterAge.name = 'age'
    const editMonsterDesc = document.createElement('textarea')
        editMonsterDesc.value = monster.description
        editMonsterDesc.type = 'text'
        editMonsterDesc.style.width = '200px'
        editMonsterDesc.name = 'description'
        
    const editSubmit = document.createElement('input')
        editSubmit.type = 'submit'
        editSubmit.innerText = 'Submit Edits'

    editMonsterForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        individualMonstDiv.style.display = 'block'
        editMonsterDiv.style.display = 'none'
        patchFetch(e, monster, monsterName, monsterAge, monsterDesc)
    })

    const cancelEdit = document.createElement('button')
        cancelEdit.textContent = 'Cancel'
        cancelEdit.addEventListener('click', ()=>{
            individualMonstDiv.style.display = 'block'
            editMonsterDiv.style.display = 'none'
        })
        
        
        individualMonstDiv.append(monsterName, monsterAge, monsterDesc, deleteButton, editButton)
        editMonsterForm.append(editMonsterHeading, editMonsterName, editMonsterAge, editMonsterDesc, editSubmit)
        editMonsterDiv.append(editMonsterForm, cancelEdit)
        editMonsterDiv.style.display = 'none'
        monstersDiv.append(individualMonstDiv, editMonsterDiv)
}


//fetch requests 
function loadPageMonsters(page){
    fetch(`http://localhost:3000/monsters/?_limit=5&${page}`)
    .then(r => r.json())
    .then(monsters => monsters.forEach(addMonstersToDiv))
}

function postFetch(e){
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

function deleteFetch(monster, individualMonstDiv){
    fetch(`http://localhost:3000/monsters/${monster.id}`, {
        method: 'DELETE'
    })
    .then(
        individualMonstDiv.remove()
    )
}

function patchFetch(e, monster, name, age, description){
    const configObj ={
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify({
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value
        })
    }
    fetch(`http://localhost:3000/monsters/${monster.id}`,configObj)
        .then(resp => resp.json())
        .then(json => {
            name.textContent = `${json.id}. ${json.name}`,
            age.textContent = `Age: ${json.age}`,
            description.textContent = json.description
        })
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

