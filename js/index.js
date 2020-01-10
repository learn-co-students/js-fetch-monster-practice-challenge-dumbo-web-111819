const URL_PREFIX='http://localhost:3000/';

const newMonsterFormContainer = document.querySelector('#create-monster')
const monsterContainer = document.querySelector('#monster-container');
const backButton = document.querySelector('#back');
const forwardButton = document.querySelector('#forward');
const showPageNumber = document.querySelector('#page-number')

let pageNumber = 1
let numberOfMonstersPerPage = 5
let totalNumberOfMonsters
// let lastViewablePage

// function setLastViewablePage(){
//   return totalNumberOfMonsters / numberOfMonstersPerPage
// }

function loadPage(pageNumber){
  monsterContainer.textContent = '';

  fetch(`${URL_PREFIX}monsters/?_limit=${numberOfMonstersPerPage}&_page=${pageNumber}`)
  .then(r => r.json())
  .then(monsters => monsters.forEach(renderMonster));
  renderShowPageNumber(pageNumber);

  fetch(`${URL_PREFIX}monsters`)
  .then(r => r.json())
  .then((monsters) => {totalNumberOfMonsters = monsters.length})
}

loadPage(pageNumber)

function renderMonster(monster){
  const monsterDiv = document.createElement('div');
    const name = document.createElement('h2');
      name.innerText = monster.name;
    const age = document.createElement('h4');
      age.innerText = monster.age;
    const description = document.createElement('p');
      description.innerText = monster.description;
  monsterContainer.append(monsterDiv);
  monsterDiv.append(name,age,description)
}

function renderNewMonsterForm() {
  const form = document.createElement("form");
  
  const inputName = document.createElement("input");
    inputName.id = "name";
    inputName.placeholder = "name...";
  
  const inputAge = document.createElement("input");
    inputAge.id = "age";
    inputAge.placeholder = "age...";
  
  const inputDescription = document.createElement("input");
    inputDescription.id = "description";
    inputDescription.placeholder = "description...";
  
  const buttonCreate = document.createElement("button");
    buttonCreate.innerText = "Create";

  form.append(inputName,inputAge,inputDescription,buttonCreate);
  newMonsterFormContainer.append(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm(inputName, inputAge, inputDescription, form);
  })
}

renderNewMonsterForm()

function submitForm(inputName, inputAge, inputDescription, form){
  fetch(`${URL_PREFIX}monsters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: inputName.value,
      age: inputAge.value,
      description: inputDescription.value
    })
  })
  .then(r => r.json())
  .then( renderMonster )
  form.reset
}

backButton.addEventListener('click', () => {
  if (pageNumber >= 2) {
    pageNumber--
    loadPage(pageNumber)
  }
})

function renderShowPageNumber(pageNumber){
  showPageNumber.innerText = pageNumber
}

forwardButton.addEventListener('click', () => {
  // ideally would limit max page, but better to do in Rails back end
  pageNumber++
  loadPage(pageNumber)
})

// -------------
//     NEXT
// -------------

// Update

// Delete

// When user creates, show last page

// Make page navigation less wonky