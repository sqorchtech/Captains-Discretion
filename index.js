main()

        async function main() {
            const thing = await getData();

            console.log(thing)

            const questionsUL = document.querySelector("#questions");

            for (const question of thing.questions) {
                questionsUL.innerHTML += `<h1> ${question.query} </h1>` 

                for (const options of question.options) {
                    if (options.hasOwnProperty("correct")){
                        questionsUL.innerHTML += `<strong> ${options.text} </strong>`
                    } else{
                        questionsUL.innerHTML += options.text
                    }
                    
                }
            }
        }
        

        async function  getData() 
        {
            const res = await fetch("jsons/M&B toelating1.json");
            const data = await res.json();

            return data            
        }