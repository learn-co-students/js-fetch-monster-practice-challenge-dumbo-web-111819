const monsters_url = 'http://localhost:3000/monsters'
const monster_display = document.querySelector('#monster-container')
const monster_form = document.querySelector('#create-monster')
const numMons = 2
display_form()
renderMonsters(0, numMons)
addEventsToButtons()
// get fetch
// team closure
function fetchMonsters(){
    return fetch(monsters_url)
    .then(res => res.json())
//     .then(monster_objs =>{
//         monster_objs.forEach((monster,index) => {
//              add_monster_to_DOM(monster)
      
            
       
//        }) // end of forEach
//        forward.addEventListener('click', (e) => {
//         console.log(e.target)
// })
    // })
} // end of show_all_monsters 
function addEventsToButtons(){
    let hidden = document.createElement("div")
    hidden.style.display ="none" 
    hidden.dataset.pageNum = 1
    hidden.id = "hidden"
    document.querySelector("body").append(hidden)
    document.querySelector("#forward").addEventListener("click", (evt) => {
        hidden.dataset.pageNum = parseInt(hidden.dataset.pageNum) + 1
        renderMonsters((parseInt(hidden.dataset.pageNum)-1)*numMons, parseInt(hidden.dataset.pageNum)*numMons)
    })
}
//help function
function renderMonsters(start, end){ 
    fetchMonsters()
    .then((allMonsters) => {
        let child = monster_display.lastElementChild
        while (child){
            child.remove()
            child = monster_display.lastElementChild
        }
        allMonsters.slice(start, end).forEach((monster) => {
            const h2Tag = document.createElement('h2')
            h2Tag.innerText = monster.name
            const h4Tag = document.createElement('h4')
            h4Tag.innerText = monster.age
            const pTag = document.createElement('p')
            pTag.innerText = monster.description
            monster_display.prepend(h2Tag,h4Tag,pTag)
        })
        let page = document.querySelector("#hidden").dataset.pageNum
        let pageTitle = document.createElement("h1")
        pageTitle.innerText = `Page ${page}`
        monster_display.prepend(pageTitle)
    })
}
// We are doing POST patch, so we don't need the id, hence this can go out of the main function.
monster_form.addEventListener("submit", (e) => {
    e.preventDefault()
    // post fetch
    monster_name = e.target.name.value
    monster_age = e.target.age.value
    monster_des = e.target.description.value
    fetch((monsters_url), {
        method:'POST',
        headers: {
            "Content-Type": "application/json",
             Accept: "application/json"
        },
        body: JSON.stringify({
            name: monster_name,
            age: monster_age,
            description: monster_des 
        })
     
    }) // end of fetch object
    .then(res => res.json())  // Add to the DOM 
    .then((monsterObj) => {
        add_monster_to_DOM(monsterObj)
    })
        
}) //end of AddEventListener
// display_form()
function display_form(){
    const form = document.createElement('form')
    form.id = 'create-monster'
    const form_name_input = document.createElement('input')
    const form_des_input = document.createElement('input')
    const form_age_input = document.createElement('input')
    
    const form_submit = document.createElement('input')
    form_name_input.label ='test'
    form_name_input.type = 'text'
    form_name_input.name = 'name'
    form_name_input.placeholder ='monster name..'
    form_des_input.label ='test'
    form_des_input.name = 'description'
    form_des_input.placeholder ='monster des..'
    form_des_input.type = 'text'
    form_age_input.label ='test'
    form_age_input.name = 'age'
    form_age_input.placeholder ='age'
    form_age_input.type = 'text'
    form_submit.label ='test'
    form_submit.id = 'create-button'
    form_submit.value = 'Create Monster'
    form_submit.type = 'submit'
    
    form.append(form_name_input)
    form.append(form_des_input)
    form.append(form_age_input)
    form.append(form_submit)
    monster_form.append(form)
    
}