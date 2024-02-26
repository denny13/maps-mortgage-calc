import { useState, useEffect } from "react";
//import { useFormState } from "react-dom";
//import { getPrice } from "./actions";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";

import { formatCurrency } from "../utils/formatCurrency";
import {
  calculateMonthlyPayment,
  calculateTotalRepayment,
  calculateCapital,
  calculateInterest,
  yearlyBreakdown,
} from "../utils/MortgageCalculator/calculateRepayment";

interface FormState {
  price: any;
  deposit: any;
  term: number;
  interest: number;
}

// Set initial state for useFormState hook.
// const initialState = {
//   price: null,
//   deposit: null,
//   term: 15,
//   interest: 5.25,
// }

export default function MortgageCalculator() {
  const [form, setForm] = useState({} as FormState);
  const [errors, setErrors] = useState(Object({}));

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [capital, setCapital] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [affordability, setAffordability] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const [remainingAmount, setRemainingAmount] = useState([] as number[]);
  
  // Implementing UseFormState hook to update state based on the form action.
  //const [state, formAction] = useFormState<State, FormData>(getPrice, initialState);

  // Setting up state to store the Bank of England interest rate api response.
  // const [boeInterestRate, setBOEInterestRate] = useState({});

  // UseEffect to fetch the api given.. returns csv. In progress.
  // useEffect(() => {
  //   const BoEAPI = 'https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp?csv.x=yes&Datefrom=18/Jan/2024&Dateto=18/Feb/2024&SeriesCodes=IUMABEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N';

  //   const api = fetch(BoEAPI)
  //     .then(res => res.json)
  //     .then(data => setBOEInterestRate(data));

  //   console.log(boeInterestRate);
  // }, [boeInterestRate]);

  //Initialize form data state
  useEffect(() => {
    setForm({
      price: null,
      deposit: null,
      term: 15,
      interest: 5.25,
    });
  }, []);

  const setField = (field: any, value: any) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const validateForm = () => {
    interface ValidateForm {
      price: string;
      deposit: string;
      term: string;
      interest: string;
    }

    const newErrors = {} as ValidateForm;

    if (!form.price || form.price === 0) {
      newErrors.price = "Please enter your Property Price";
    }
    if (!form.deposit || form.deposit === 0) {
      newErrors.deposit = "Please enter your Deposit amount";
    }
    if (!form.term || form.term === 0) {
      newErrors.term = "Please enter your Mortgage Term";
    }
    if (!form.interest || form.interest === 0) {
      newErrors.interest = "Please enter your Interest Rate";
    }

    return newErrors;
  };

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      calculateResults();
      setIsVisible(true);
    }
  };

  function calculateResults() {
    const calcMonthlyPayment = calculateMonthlyPayment(
      form.price,
      form.deposit,
      form.interest,
      form.term
    );
    setMonthlyPayment(calcMonthlyPayment);

    const calcTotalRepayment = calculateTotalRepayment(
      calcMonthlyPayment,
      form.term
    );
    setTotalRepayment(calcTotalRepayment);

    const calcCapital = calculateCapital(form.price, form.deposit);
    setCapital(calcCapital);

    const calcInterest = calculateInterest(calcTotalRepayment, calcCapital);
    setInterestRate(calcInterest);

    const calcAffordability = calculateMonthlyPayment(
      form.price,
      form.deposit,
      Number(form.interest + 3),
      form.term
    );
    setAffordability(calcAffordability);

    const calcYearlyBreakdown = yearlyBreakdown(
      calcMonthlyPayment,
      calcTotalRepayment,
      form.term
    );
    setRemainingAmount(calcYearlyBreakdown);
  }

  return (
    <Container>
      <h1><title>Mortgage Calculator Test</title></h1>
      <Row className="gap-x-10 pt-3">
        <Col className="border-r" md="auto">
          {/* To replace <Form> tag and add server action for utilising form with javascript disabled. */}
          {/* <Form action={formAction}> */} 
          <Form>
            <Form.Label htmlFor="price">Property Price</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>£</InputGroup.Text>
              <Form.Control
                required
                id="price"
                name="price"
                type="number"
                className="no-spinner"
                step="any"
                aria-label="Property Price"
                defaultValue={form.price}
                onChange={(e) => setField("price", Number(e.target.value))}
                isInvalid={!!errors.price}
                tabIndex={0}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Label htmlFor="deposit">Deposit</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>£</InputGroup.Text>
              <Form.Control
                required
                id="deposit"
                name="deposit"
                type="number"
                className="no-spinner"
                step="any"
                aria-label="Deposit"
                defaultValue={form.deposit}
                onChange={(e) => setField("deposit", Number(e.target.value))}
                isInvalid={!!errors.deposit}
                tabIndex={0}
              />
              <Form.Control.Feedback type="invalid">
                {errors.deposit}
              </Form.Control.Feedback>
            </InputGroup>

            <Form.Label htmlFor="term">Mortgage Term</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                required
                id="term"
                name="term"
                type="number"
                step="any"
                aria-label="Mortgage Term"
                defaultValue={15}
                onChange={(e) => setField("term", Number(e.target.value))}
                isInvalid={!!errors.term}
                tabIndex={0}
              />
              <Form.Control.Feedback type="invalid">
                {errors.term}
              </Form.Control.Feedback>
              <InputGroup.Text>years</InputGroup.Text>
            </InputGroup>
            <Form.Label htmlFor="interest">Interest Rate</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                required
                id="interest"
                name="interest"
                type="number"
                step="any"
                className="no-spinner"
                aria-label="Interest rate"
                defaultValue={5.25}
                onChange={(e) => setField("interest", Number(e.target.value))}
                isInvalid={!!errors.interest}
                tabIndex={0}
              />
              <Form.Control.Feedback type="invalid">
                {errors.interest}
              </Form.Control.Feedback>
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
            <Button
              className="w-full"
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e as any)}
              tabIndex={0}
            >
              Calculate
            </Button>
          </Form>
        </Col>
        {isVisible && (
          <>
            <Col md="auto">
              <h2 className="pb-3">Results</h2>
              <Table striped="columns">
                <tbody>
                  <tr className="border-b border-t">
                    <td>Monthly Payment</td>
                    <td className="text-right">
                      {formatCurrency(monthlyPayment)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td>Total Repayment</td>
                    <td className="text-right">
                      {formatCurrency(totalRepayment)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td>Capital</td>
                    <td className="text-right">{formatCurrency(capital)}</td>
                  </tr>
                  <tr className="border-b">
                    <td>Interest</td>
                    <td className="text-right">
                      {formatCurrency(interestRate)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td>Affordability check</td>
                    <td className="text-right">
                      {formatCurrency(affordability)}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>

            <Col md="auto">
              <h2 className="pb-3">Yearly Breakdown</h2>
              <Table className="max-w-52" bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Remaining Debt</th>
                  </tr>
                </thead>
                <tbody>
                  {remainingAmount.map((amount, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatCurrency(amount)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}
