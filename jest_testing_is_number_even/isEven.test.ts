import {isEven} from "./example2";

describe("test isEven function", () => {
    it("should return true for isEven(10)", () => {
        expect(isEven(10)).toBeTruthy();
    });
    it("should return false for isEven(9)", () => {
        expect(isEven(9)).toBeFalsy();
    });
    it("should return false for isEven(-7)", () => {
        expect(isEven(-7)).toBeFalsy();
    });
    it("should return false for isEven(0.5)", () => {
        expect(isEven(0.5)).toBeFalsy();
    });
});