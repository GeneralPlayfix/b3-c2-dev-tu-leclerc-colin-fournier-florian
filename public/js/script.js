window.addEventListener('DOMContentLoaded', (event) => {
    const keys = document.querySelectorAll(".touches");
    keys.forEach(key => key.addEventListener('click', event => {
        const printedResult = document.getElementById("res");
        if(event.target.innerHTML == "AC") return printedResult.value = ""


        let value = printedResult.value;
      
        if(event.target.innerHTML !== "=")
            value += event.target.innerHTML;
        if(event.target.innerHTML === "="){
            // fetch("http://localhost:3000/calculate")
            //     .then(response => response.json())
            //     .then(response => console.log(response))
            //     .catch(error => alert("Erreur : " + error));    

        }
        printedResult.value = value;
    }));

});