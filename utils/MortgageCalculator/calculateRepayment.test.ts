import {
  calculateMonthlyPayment,
  calculateTotalRepayment,
  calculateCapital,
  calculateInterest,
  yearlyBreakdown
} from "./calculateRepayment";

describe("calculateMonthlyPayment", () => {
  test("should calculate the correct monthly payment with interest", () => {
    const result = calculateMonthlyPayment(300000, 60000, 3.5, 30);
    expect(result).toBeCloseTo(1077.71, 2);
  });

  test("should calculate the correct monthly payment without interest", () => {
    const result = calculateMonthlyPayment(300000, 60000, 0, 30);
    expect(result).toBeCloseTo(666.67, 2);
  });

  test("should calculate the correct monthly payment with a different term", () => {
    const result = calculateMonthlyPayment(300000, 60000, 3.5, 15);
    expect(result).toBeCloseTo(1715.72, 2);
  });
});

describe("calculateTotalRepayment", () => {
  test("should calculate the correct total repayment", () => {
    const result = calculateTotalRepayment(600, 30);
    expect(result).toBeCloseTo(216000, 2);
  });

  test("should calculate the correct total repayment with a different term", () => {
    const result = calculateTotalRepayment(600, 15);
    expect(result).toBeCloseTo(108000, 2);
  });
});

describe("calculateCapital", () => {
  test("should calculate the correct total capital repayment", () => {
    const result = calculateCapital(300000, 60000);
    expect(result).toBeCloseTo(240000, 2);
  });

  test("should calculate the correct total capital repayment with a different deposit", () => {
    const result = calculateCapital(300000, 30000);
    expect(result).toBeCloseTo(270000, 2);
  });
});

describe("calculateInterest", () => {
  test("should calculate the correct total interest repayment", () => {
    const result = calculateInterest(300000, 60000);
    expect(result).toBeCloseTo(240000, 2);
  });

  test("should calculate the correct total interest repayment with a different deposit", () => {
    const result = calculateInterest(300000, 12000);
    expect(result).toBeCloseTo(288000, 2);
  });
});

describe("yearlyBreakdown", () => {
  test("should calculate the correct total interest repayment", () => {
    const result = yearlyBreakdown(600, 300000, 15);
    const expected = [278400];
    expect(result).toEqual(expect.arrayContaining(expected));
  });

  test("should calculate the correct total interest repayment with a different monthly payment", () => {
    const result = yearlyBreakdown(1200, 300000, 15);
    const expected = [228000];
    expect(result).toEqual(expect.arrayContaining(expected));
  });
});
