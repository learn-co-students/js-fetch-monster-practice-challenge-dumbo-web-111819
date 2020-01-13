const back = document.querySelector("#back")
const forward = document.querySelector("#forward")

const monsDiv = document.querySelector("#monster-container")
const divMon = document.querySelector("#create-monster")
const form = document.createElement("form")
let pageNumber = 1;
form.id = "monster-form"
form.innerHTML = `name:<input type="text" name="fname"><br>
  age:<input type="text" name="age"><br>
  bio:<input type="text" name="bio"><br>
  <input type="submit" value="Submit">`

divMon.append(form)



fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNumber}`)
.then((resp) => {
  return resp.json()
})
.then((monsterArray) => {

  displayMonsters(monsterArray)
})

forward.addEventListener("click", (evt) => {

    pageNumber += 1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then((resp) => resp.json())
    .then((monsters) => {
        monsDiv.innerHTML = ""
        displayMonsters(monsters)
    })
})

back.addEventListener("click", (evt) => {
  pageNumber -= 1
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
  .then((resp) => resp.json())
  .then((monsters) => {
      monsDiv.innerHTML = ""
      displayMonsters(monsters)
  })

})


  form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    inputName = evt.target.fname.value
    inputAge = evt.target.age.value
    inputBio = evt.target.bio.value

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: inputName,
        age: inputAge,
        description: inputBio
      })
    })
    .then((resp) => {
      return resp.json()
    })
    .then((monsterObj) => {
      displayOneMonster(monsterObj)
    })
  })


function displayOneMonster(monster){
  const h1 = document.createElement("h1");
  h1.innerText = monster.name
  const h3 =  document.createElement("h3");
  h3.innerText = monster.age
  const p = document.createElement("p");
  p.innerText = monster.description
  monsDiv.append(h1, h3, p)

}


function displayMonsters(monsters){

  monsters.forEach((monster) => {
    displayOneMonster(monster)
  })

}
