import React from "react";
import { MessageTemplate } from "./Helper/messageTemplate";

export const LoanCalculatorTemplate = ({
  monthlyIncome,
  requestedAmount,
  loanTerm,
  selectedChildren,
  coApplicant,
  handleChange,
  disabled,
  errorMsg,
  // handleKeyPress
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="monthlyIncome" required>
          Monthly Income
        </label>
        <input
          type="text"
          value={monthlyIncome}
          onChange={handleChange}
          // onKeyPress={handleKeyPress}
          name="monthlyIncome"
          className={errorMsg?.monthlyIncome ? "error" : ""}
          // pattern="^[0-9]*[.,]{0,1}[0-9]{0,3}"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="requestedAmount" required>
          Requested Amount
        </label>
        <input
          type="text"
          value={requestedAmount}
          onChange={handleChange}
          name="requestedAmount"
          className={errorMsg?.requestedAmount ? "error" : ""}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="loanTerm" required>
          Loan Term(in months)
        </label>
        <input
          type="text"
          value={loanTerm}
          onChange={handleChange}
          name="loanTerm"
          className={errorMsg?.loanTerm ? "error" : ""}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="selectedChildren">Children</label>
        <select
          onChange={handleChange}
          name="selectedChildren"
          value={selectedChildren}
          className={errorMsg?.selectedChildren ? "error" : ""}
        >
          <option value="">--Choose an option--</option>
          <option value="NONE">NONE</option>
          <option value="SINGLE">SINGLE</option>
          <option value="MULTIPLE">MULTIPLE</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="coApplicant">Co-applicant</label>
        <select
          onChange={handleChange}
          name="coApplicant"
          value={coApplicant}
          className={errorMsg?.coApplicant ? "error" : ""}
        >
          <option value="">--Choose an option--</option>
          <option value="NONE">NONE</option>
          <option value="SINGLE_BORROWER">SINGLE_BORROWER</option>
          <option value="MULTIPLE_BORROWERS">MULTIPLE_BORROWERS</option>
        </select>
      </div>
      <MessageTemplate
        message={
          errorMsg?.monthlyIncome ||
          errorMsg?.requestedAmount ||
          errorMsg?.loanTerm ||
          errorMsg?.selectedChildren ||
          errorMsg?.coApplicant
        }
      />
      <button type="submit" disabled={disabled || false}>
        Submit
      </button>
    </>
  );
};
export default LoanCalculatorTemplate;
