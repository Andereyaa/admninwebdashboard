import { fieldValueIsNotBlank, fieldValueIsEmail } from "../formValidation";
import moment from 'moment'

describe("test fieldValueIsNotBlank", () => {
    it('returns false for null values', () => {
        const value= null
        const result = fieldValueIsNotBlank(value)
        expect(result).toBe(false)
    });
    it('returns false for empty strings', () => {
        const value= ""
        const result = fieldValueIsNotBlank(value)
        expect(result).toBe(false)
    });
    it('returns true for numbers', () => {
        const value= 2
        const result = fieldValueIsNotBlank(value)
        expect(result).toBe(true)
    });
    it('returns true for non-empty strings', () => {
        const value= "cat in hat"
        const result = fieldValueIsNotBlank(value)
        expect(result).toBe(true)
    });
    it('returns true for numerical strings', () => {
        const value= "5"
        const result = fieldValueIsNotBlank(value)
        expect(result).toBe(true)
    });
    it('returns false for strings of only whitespace', () => {
        const value= " "
        const result = fieldValueIsNotBlank(value)
        expect(result).toBe(false)
    });
    it('returns false for strings of multiple whitespace', () => {
        const value= "         "
        const result = fieldValueIsNotBlank(value)
        expect(result).toBe(false)
    });
    it('returns true for objects with content', () => {
        const value= {cat: "in hat"}
        const result = fieldValueIsNotBlank(value)
        expect(result).toBe(true)
    });
    it('returns false for empty objects', () => {
        const value= {}
        const result = fieldValueIsNotBlank(value)
        expect(result).toBe(false)
    });
    it('returns true for arrays with content', () => {
        const value= [2,"in hat"]
        const result = fieldValueIsNotBlank(value)
        expect(result).toBe(true)
    });
    it('returns false for empty arrays', () => {
        const value= []
        const result = fieldValueIsNotBlank(value)
        expect(result).toBe(false)
    });
    it('returns true for date objects',() => {
        const value= moment()
        const result = fieldValueIsNotBlank(value)
        expect(result).toBe(true)
    })
})

describe.only("test fieldValueIsEmail", () => {
    it('returns true for valid emails', () => {
        const value= 'test@test.com'
        const result = fieldValueIsEmail(value)
        expect(result).toBe(true)
    });

    it('returns false for strings without the @ sign but with a dot', () => {
        const value= 'testtest.com'
        const result = fieldValueIsEmail(value)
        expect(result).toBe(false)
    });

    it('returns false for strings with the @ sign but without a dot', () => {
        const value= 'test@testcom'
        const result = fieldValueIsEmail(value)
        expect(result).toBe(false)
    });

    it('returns false for letter strings', () => {
        const value= 'testtestcom'
        const result = fieldValueIsEmail(value)
        expect(result).toBe(false)
    });

    it('returns false for numbers', () => {
        const value= 1234
        const result = fieldValueIsEmail(value)
        expect(result).toBe(false)
    });

    it('returns false for number strings', () => {
        const value= "1234"
        const result = fieldValueIsEmail(value)
        expect(result).toBe(false)
    });

    it('returns false for null', () => {
        const value= null
        const result = fieldValueIsEmail(value)
        expect(result).toBe(false)
    });
})