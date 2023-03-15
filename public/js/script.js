let isResult = false;
window.addEventListener('DOMContentLoaded', (event) => {
    const keys = document.querySelectorAll(".touches");
    keys.forEach(key => key.addEventListener('click', event => {
        const printedResult = document.getElementById("res");
        if (isResult) {
            isResult = false;
            printedResult.value = "" 
        }
        const error = document.getElementById("error")
        const currentCharacter = event.currentTarget.innerHTML;
        if(currentCharacter == "AC") return printedResult.value = ""
        if(currentCharacter == "SUPP") return printedResult.value = printedResult.value.slice(0, -1); 
        let value = printedResult.value;
        //if invalid character return
        if(checkIfValidCharacter(value, currentCharacter) == false) {
            error.innerHTML = "Erreur de syntaxe, impossible de mettre ce caractère ou de lancer ce calcul"
            return
        }
        value += currentCharacter;
        error.innerHTML = ""
        if(currentCharacter === "="){
            const valueToSendToBack = translateToBack(printedResult.value);
            fetch(`http://localhost:3000/calculate?calcul=${encodeURIComponent(valueToSendToBack)}`)
                .then(response => response.json())
                .then(response => printedResult.value = response.result)
                .catch(error => alert("Erreur : " + error));    
                isResult = true;
                return
            }
        printedResult.value = value;
    }));
});


function checkIfValidCharacter(value, character){
    const valueLength = value.length;
    const invalidStartCharacter = ['+', '/', '*', '^', '%', '.', ')','=']
    const invalidFinalCharacter = ['+', '/', '-', '*', '^', '%', '.', '(', '√']
    const forbidenAssociation = [
    '++', '//', '--', '**', '%%', '..', '^^', '√√', //double indentical character
    '+/', '/+', '*/', '/*', '/)', '(/', './', '/.', '√/', '^/', '/^', '%/', '/%', '-/', '/0', // division
    '+*', '*+', '-+', '+^', '^+', '+%','%+', '.+', '+.','(+','+)', '√+', // addition
    '-^', '*^', '^*', '^%', '%^', '.^', '^.', '(^', '^)', '√^', // power
    '-*', '*%', '%*', '*.', '.*', '(*', '*)', '*√', '√*', // multiplication
    '-%', '.%', '%.', '(%', '%)', '%√','√%', //modulo
    '-.', '.-', '.(', '(.', '.)', ').', '√.', '.√', // .   
    '-)', '√)', ')√','()', // brackets           
    '√-' //soustraction
]
    //check if first character valid
    if (valueLength === 0){
        if(invalidStartCharacter.includes(character)) return false 
        return true
    }
    const lastCharacter = value.split('')[valueLength - 1]
    
    //check if last character is valid
    if (character == '='){
        if(invalidFinalCharacter.includes(lastCharacter)) return false
        //check if there is the same number of open and close brackets
        if((value.match(/\(/g) || []).length !== (value.match(/\)/g) || []).length) return false    
    }
    // check valid format of √ 
    if(lastCharacter == "√" && character != '(') return false
    //check if two operators that are not supposed to be side by side are not
    if(forbidenAssociation.includes(lastCharacter+character)) return false
    const arrayOfForbidenAssociationWithNumberBefore = ["(", "√"];
    if(lastCharacter.match(/\d/g) && arrayOfForbidenAssociationWithNumberBefore.includes(character) || lastCharacter == ")" && character.match(/\d/g)) return false
}

function translateToBack(expressionToTransform){
    if (expressionToTransform.matchAll(/√/gm)) {

        const matches = expressionToTransform.match(/√/g);
        for (let i = 0; i < matches.length; i++) {
            const matchIndex = expressionToTransform.indexOf(matches[i]);
            let openBracketsCounter = 0;
            let closeBracketsCounter = 0
            let lastBracketIndexOfTheSQRT;
            for(let iterator = matchIndex; iterator < expressionToTransform.length; iterator++){
                if(expressionToTransform[iterator] == '(') openBracketsCounter++;
                if(expressionToTransform[iterator] == ')') closeBracketsCounter++;
                if(expressionToTransform[iterator] == ')' && openBracketsCounter == closeBracketsCounter){
                    lastBracketIndexOfTheSQRT = iterator;
                    break;
                }
            }
            expressionToTransform = expressionToTransform.toString().split('')
            expressionToTransform.splice(lastBracketIndexOfTheSQRT, 0,')')
            expressionToTransform = expressionToTransform.join('').replace(/√/, '(sqrt')
        }
        return expressionToTransform
    }
}