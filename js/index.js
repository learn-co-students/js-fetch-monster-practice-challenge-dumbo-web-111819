document.addEventListener("DOMContentLoaded",e => {
    const MonstCont = document.querySelector("#monster-container")
    const CreateMonst = document.querySelector("#create-monster")
    const backButton = document.querySelector("#back")
    const forwardButton = document.querySelector("#forward")
    let pageCounter = 1
    createForm(CreateMonst)
    newFetch()
    function newFetch(){
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}` )
        .then(r => r.json())
        .then(r => {
            r.forEach(element => {
                createMonsterCard(element)
            });
        })

    }
    backButton.addEventListener("click",function(){
        pageCounter += 1
        MonstCont.innerText = ""
        newFetch()
    })
    forwardButton.addEventListener("click",function(){
        pageCounter += 1
        MonstCont.innerText = ""
        newFetch()
    })

   
    function createMonsterCard(e){
        const div = document.createElement('div')
        const h2 =document.createElement('h2')
        const h4 =document.createElement('h4')
        const p =document.createElement('p')
    
        h2.innerText = e.name
        h4.innerText = e.age
        p.innerText = e.description
        div.append(h2,h4,p)
        MonstCont.append(div)
    
    }
    CreateMonst.addEventListener("submit",e =>{
        e.preventDefault()
        const name = e.target.name.value
        const age = e.target.age.value
        const description = e.target.description.value
        console.log(name,age,description)
        fetch("http://localhost:3000/monsters",{
            method : "POST",
            headers: 
                {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
 
            body: JSON.stringify({
                 "name": name,
                  "age": age,
                "description": description
            })
        })
        .then(r => r.json())
        .then( obj => {
            createMonsterCard(obj)
        })
    })
})

function createForm(CreateMonst){
    const form = document.createElement("FORM")
    const name = document.createElement("input")
    const age = document.createElement("input")
    const description = document.createElement("input")
    const subttn = document.createElement("button")

    name.placeholder = "name"
    name.name = "name"
    age.placeholder = "age"
    age.name = "age"
    description.placeholder = "description"
    description.name = "description"
    subttn.innerText = "Create"
    form.append(name,age,description,subttn)
    CreateMonst.append(form)
    
}

