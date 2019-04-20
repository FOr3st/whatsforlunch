import {
  parseDate
} from "./parse";

describe("Parse", () => {
  test("should parse string date representation MM.DD.YYYY", () => {
    const stringDate = '07.07.1986';
    const parsedDate = parseDate(stringDate);
    
    expect(parsedDate.getDate()).toBe(7);
    expect(parsedDate.getMonth()).toBe(6);
    expect(parsedDate.getFullYear()).toBe(1986);
  });

  test("should parse string date representation MM.D.YYYY", () => {
    const stringDate = '07.7.1986';
    const parsedDate = parseDate(stringDate);
    
    expect(parsedDate.getDate()).toBe(7);
    expect(parsedDate.getMonth()).toBe(6);
    expect(parsedDate.getFullYear()).toBe(1986);
  });

  test("should parse string date representation M.DD.YYYY", () => {
    const stringDate = '7.07.1986';
    const parsedDate = parseDate(stringDate);
    
    expect(parsedDate.getDate()).toBe(7);
    expect(parsedDate.getMonth()).toBe(6);
    expect(parsedDate.getFullYear()).toBe(1986);
  });

  test("should parse string date representation MM.DD.YY", () => {
    const stringDate = '07.07.86';
    const parsedDate = parseDate(stringDate);
    
    expect(parsedDate.getDate()).toBe(7);
    expect(parsedDate.getMonth()).toBe(6);
    expect(parsedDate.getFullYear()).toBe(1986);
  });

  test("should parse string date representation M.D.YY", () => {
    const stringDate = '7.7.86';
    const parsedDate = parseDate(stringDate);
    
    expect(parsedDate.getDate()).toBe(7);
    expect(parsedDate.getMonth()).toBe(6);
    expect(parsedDate.getFullYear()).toBe(1986);
  });
});
