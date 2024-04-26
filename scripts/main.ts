async function getJoke() {
    let valid: boolean = false
    let quote: string = ''
    let response: Array<string> = ["Well this is awkward this is not suppose to happen..."]

    while (!valid){
    let rawdata = await fetch("https://icanhazdadjoke.com/slack")
    let jsondata = await rawdata.json()
    quote = jsondata.attachments[0].text
    quote = quote.trim()

        if (quote.split("?").length > 1){
            response = quote.split("?")
            console.log("question mark")
            valid = true
        }
        else if (quote.split(".").length > 2){
            response = quote.split(".")
            console.log("two parter")
            valid = true
        }
        else{
            console.log("poor")
        }

        if(response.length > 2 || quote[quote.length - 1] == '"' || quote[quote.length - 1] == '?'){
            valid = false
        }

    }
    console.log(quote)
    displayQuote(response)
}

function displayQuote(quote: Array<string>) {
    let quoteContainer :HTMLElement | null = document.getElementById("quoteContainer")
    
    let lead : HTMLElement | null = document.getElementById("lead")
    if (lead) lead.innerHTML = ""
    let punch : HTMLElement | null = document.getElementById("punch")
    if (punch) punch.innerHTML = ""
    for(let i = 0; i < quote.length - 1; i++){
        if (lead) lead.innerHTML += quote[i]
    }

    if (punch){
        punch.innerHTML = quote[quote.length - 1]
        console.log(punch.innerHTML)
    }
}

getJoke()

let button : HTMLElement | null = document.getElementById("funny")

button?.addEventListener("click", () => {
    let punch : HTMLElement | null = document.getElementById("punch")
    
    punch?.classList.remove("invisible")
})

let newJoke : HTMLElement | null = document.getElementById("new")

newJoke?.addEventListener("click", () => {
    let punch : HTMLElement | null = document.getElementById("punch")
    punch?.classList.add("invisible")

    getJoke()

})