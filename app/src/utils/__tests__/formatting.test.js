import { numberToOneDecimalPlaceString, capitalizeFirstLetterOfAllWords } from "../formatting";

describe("test numberToOneDecimalPlaceString", () => {
    it('returns a string with one zero in the decimal places if an integer is provided', () => {
        const number= 1
        const numberString = numberToOneDecimalPlaceString(number)
        expect(numberString).toBe("1.0")
    });

    it('returns a string version of the number provided if a number with one decimal places is provided', () => {
        const number= 1.1
        const numberString = numberToOneDecimalPlaceString(number)
        expect(numberString).toBe("1.1")
    });
    it('returns a string version of the number, rounded to one decimal places, if a number with more than two decimal places is provided', () => {
        const number= 1.2223456
        const numberString = numberToOneDecimalPlaceString(number)
        expect(numberString).toBe("1.2")
    });
    it('rounds up appropriately when a number with more than two decimal places is provided', () => {
        const number= 1.273456
        const numberString = numberToOneDecimalPlaceString(number)
        expect(numberString).toBe("1.3")
    });
    it('rejects parameters that are not numbers or numerical strings', () => {
        let number= null
        let numberString = numberToOneDecimalPlaceString(number)
        expect(numberString).toBe(undefined)
        number= {id: "badParam"}
        numberString = numberToOneDecimalPlaceString(number)
        expect(numberString).toBe(undefined)
        number= "dogslikecats"
        numberString = numberToOneDecimalPlaceString(number)
        expect(numberString).toBe(undefined)
    });
    it('converts numerical integers and uses them appropriately', () => {
        const number= "1"
        const numberString = numberToOneDecimalPlaceString(number)
        expect(numberString).toBe("1.0")
    });
    it('converts numerical decimals and uses them appropriately', () => {
        const number= "1.781"
        const numberString = numberToOneDecimalPlaceString(number)
        expect(numberString).toBe("1.8")
    });
})

describe("test capitalizeFirstLetterOfAllWords", ()=> {
    it('capitalizes both words in a string with two lowercase words', () => {
        const string = "fat cat"
        const result = capitalizeFirstLetterOfAllWords(string)
        expect(result).toBe("Fat Cat")
    })
    it('capitalizes both words in a string with a mix of lowercase and uppercase words', () => {
        let string = "Fat cat"
        let result = capitalizeFirstLetterOfAllWords(string)
        expect(result).toBe("Fat Cat")
        string = "fat Cat"
        result = capitalizeFirstLetterOfAllWords(string)
        expect(result).toBe("Fat Cat")
        string = "fat Cat mart"
        result = capitalizeFirstLetterOfAllWords(string)
        expect(result).toBe("Fat Cat Mart")
        string = "fat Cat Mart"
        result = capitalizeFirstLetterOfAllWords(string)
        expect(result).toBe("Fat Cat Mart")
        string = "Fat cat mart"
        result = capitalizeFirstLetterOfAllWords(string)
        expect(result).toBe("Fat Cat Mart")
        
    })
    it('capitalizes only alphabetical words in a string that starts with numbers', () => {
        const string = "1fat cat"
        const result = capitalizeFirstLetterOfAllWords(string)
        expect(result).toBe("1fat Cat")
    })
    it('converts all letters not at the beginning of the sentence to lowercase', () => {
        const string = "fAT CaT"
        const result = capitalizeFirstLetterOfAllWords(string)
        expect(result).toBe("Fat Cat")
    })
    it('collapses all spaces to a single space', () => {
        const string = "fat  cat rat          mat"
        const result = capitalizeFirstLetterOfAllWords(string)
        expect(result).toBe("Fat Cat Rat Mat")
    })
    it('rejects objects, null or arrays as non-strings', () => {
        let string = {}
        let result = capitalizeFirstLetterOfAllWords(string)
        expect(result).toBe(undefined)
        string = null
        result = capitalizeFirstLetterOfAllWords(string)
        expect(result).toBe(undefined)
        string = [2,3,4]
        result = capitalizeFirstLetterOfAllWords(string)
        expect(result).toBe(undefined)
    })
    it('converts numbers to strings', () => {
        const string = 2
        const result = capitalizeFirstLetterOfAllWords(string)
        expect(result).toBe("2")
    })
})