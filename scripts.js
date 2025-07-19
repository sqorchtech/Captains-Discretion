const questionCardTemplate = document.querySelector("[data-question-card]")
const questionCardContainer = document.querySelector("[question-card-container]")
const searchInput = document.querySelector("[data-search")

let questions = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    questions.forEach(question => {
        const isVisible = question.query.toLowerCase().includes(value)
        question.element.classList.toggle("hide", !isVisible)
    })
})

fetch("jsons/M&B toelating1.json")
.then(res => res.json())
.then(data => {
    questions = data.questions.map(question => {
        const card = questionCardTemplate.content.cloneNode(true).children[0]
        
        //select the header and body from the card template so we can put new elements on them
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")

        header.innerHTML += question.query

        question.options.forEach(option => {
            if (option.hasOwnProperty("correct")){
                body.innerHTML += `<strong> ${option.text} </strong>`
            } else {
                body.innerHTML += option.text
            }
            body.innerHTML += `<hr></hr>`
        })

        console.log(question)
        questionCardContainer.append(card) 
        return {query: question.query, element: card}
    });
    
})


