import {logError} from "./errorHandling"

export const capitalizeFirstLetter = (string="") => {
    if (!((typeof string) === "string")) return
    string = string.toLocaleLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const numberToOneDecimalPlaceString = number => {
    if (typeof number === "string") {
        if(!isNaN(number)) number = Number(number)
    }
    if (typeof number !== "number") {
        logError(`${number} is not a valid number`)
        return
    }
    if (Number.isInteger(number)) return `${number}.0` 
    const decimalPlaces = number.toString().split(".")[1].length || 0;
    if (decimalPlaces === 1) return number.toString()
    else if (decimalPlaces > 1) return `${Math.round(number * 10) / 10}`
}

export const capitalizeFirstLetterOfAllWords = (string="") => {
    if (!((typeof string) === "string")) {
        if (typeof string === "number") string = string.toString()
        else return
    }
    //collapse multiple spaces into one space
    string = string.replace(/\s\s+/g, ' ');
    const words = string.split(" ")
     
    return words.reduce((capitalizedWords, word) => {
        word = word.toLocaleLowerCase()
        word = word.charAt(0).toUpperCase() + word.slice(1);
        if (capitalizedWords) word = " " + word
        capitalizedWords = `${capitalizedWords}${word}`
        return capitalizedWords
    }, "") 
}