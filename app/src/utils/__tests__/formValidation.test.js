import { fieldValueIsNotBlank } from "../formValidation";
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