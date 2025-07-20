const questionCardTemplate = document.querySelector("[data-question-card]")
const questionCardContainer = document.querySelector("[question-card-container]")
const searchInput = document.querySelector("[data-search]")

let questions = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    questions.forEach(questionset => {
        questionset.forEach(question => {
            const isVisible = question.query.toLowerCase().includes(value)
        question.element.classList.toggle("hide", !isVisible)
        })
    })
})

//Because I don't want to use packages, and in browser js doesn't have access to the names of files within folders, we will do it the manual way... sigh
const m_and_b = ["HPL toelating1.json", "HPL toelating2.json", "HPL toelating3.json", "HPL toelating4.json"]

m_and_b.forEach((filename) => populateQuestions(filename))

function populateQuestions(filename) 
{
    fetch(`jsons/hpl/${filename}`)
    .then(res => res.json())
    .then(data => {
        questions.push( data.questions.map(question => {
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

            //console.log(question)
            questionCardContainer.append(card) 
            return {query: question.query, element: card}
        }));
        
    })

}




function clearInput()
{
    searchInput.value = "";

    //unhide all things
    questions.forEach(questionset => {
        questionset.forEach(question => {
        question.element.classList.toggle("hide", false)
        })
    })
}