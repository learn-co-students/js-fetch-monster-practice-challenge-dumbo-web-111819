document.addEventListener("DOMContentLoaded", function (){



    fetch('http://localhost:3000/monsters')
    .then(rep => rep.json())
    .then(json => console.log(json))
})
