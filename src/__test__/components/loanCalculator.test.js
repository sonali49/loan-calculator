import { render, screen } from "@testing-library/react";
import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { unmountComponentAtNode } from "react-dom";
import LoanCalculator from "../../components/loanCalculator";
import LoanCalculatorTemplate from "../../components/loanCalculatorTemplate";

Enzyme.configure({ adapter: new Adapter() });

describe("Loan Calculator", () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders without crashing", () => {
    render(<LoanCalculator />);
  });

  it("Should render loan calculator template", () => {
    const handleChange = jest.fn();
    const component = render(
      <LoanCalculatorTemplate
        monthlyIncome={500000}
        requestedAmount={20000000}
        loanTerm={38}
        selectedChildren="NONE"
        coApplicant="NONE"
        handleChange={handleChange()}
        disabled={false}
      />
    );
    expect(component.container).toMatchSnapshot();
  });
  it("Submit button should be disabled if fields are empty", () => {
    const handleChange = jest.fn();
    render(
      <LoanCalculatorTemplate
        monthlyIncome={500000}
        requestedAmount={20000000}
        loanTerm={38}
        selectedChildren="NONE"
        coApplicant="NONE"
        handleChange={handleChange()}
        disabled={true}
      />
    );

    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeDisabled();
  });
});
