/**
 * Calculates the monthly mortgage payment.
 *
 * @param propertyPrice - The price of the property.
 * @param deposit - The deposit amount.
 * @param annualInterestRate - The annual interest rate.
 * @param mortgageTermInYears - The mortgage term in years.
 * @returns The monthly mortgage payment.
 */
export function calculateMonthlyPayment(
  propertyPrice: number,
  deposit: number,
  annualInterestRate: number,
  mortgageTermInYears: number
): number {
  const adjustedLoanAmount = propertyPrice - deposit;
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = mortgageTermInYears * 12;

  if (monthlyInterestRate === 0) {
    return adjustedLoanAmount / numberOfPayments;
  }

  const monthlyPayment =
    (adjustedLoanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return monthlyPayment;
}

/**
 * Calculates the total repayment.
 *
 * @param calcMonthlyPayment - The total monthly payment.
 * @param mortgageTermInYears - The mortgage term in years.
 * @returns The total repayment amount.
 */
export function calculateTotalRepayment(
  calcMonthlyPayment: number,
  mortgageTermInYears: number
): number {
  return calcMonthlyPayment && mortgageTermInYears
    ? calcMonthlyPayment * 12 * Number(mortgageTermInYears)
    : 0;
}

/**
 * Calculates the total capital.
 *
 * @param propertyPrice - The price of the property.
 * @param deposit - The deposit amount.
 * @returns The total capital amount.
 */
export function calculateCapital(
  propertyPrice: number,
  deposit: number
): number {
  return propertyPrice && deposit ? propertyPrice - deposit : 0;
}

/**
 * Calculates the total interest.
 *
 * @param totalRepayment - The total repayment amount.
 * @param capital - The total capital amount.
 * @returns The total interest amount.
 */
export function calculateInterest(
  totalRepayment: number,
  capital: number
): number {
  return totalRepayment && capital ? totalRepayment - capital : 0;
}

/**
 * Calculates the total interest.
 *
 * @param monthlyPayment - The total monthly payment.
 * @param totalRepayment - The total repayment amount.
 * @returns An array of the remaining amounts per year.
 */
export function yearlyBreakdown(
  monthlyPayment: number,
  totalRepayment: number,
  mortgageTermInYears: number
): number[] {
  let currentMonthlyPayment = monthlyPayment;
  let currentLoanAmount = totalRepayment;
  let totalArr = [];

  for (let i = 0; i < mortgageTermInYears; i++) {
    currentLoanAmount = currentLoanAmount - currentMonthlyPayment * 12;
    currentLoanAmount = currentLoanAmount < 0 ? 0 : currentLoanAmount;
    totalArr.push(currentLoanAmount);
  }

  return totalArr;
}
