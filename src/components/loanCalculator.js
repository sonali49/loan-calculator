import React, { useState, useEffect } from "react";
import "./loanCalculator.scss";
import { loanParams } from "../utility/constants";
import { numbersOnly } from "../utility/utils";
import LoanCalculatorTemplate from "./loanCalculatorTemplate";
import { MessageTemplate } from "./Helper/messageTemplate";

const initialState = {
  monthlyIncome: "",
  requestedAmount: "",
  loanTerm: "",
  selectedChildren: "",
  coApplicant: "",
  errorAvailable: true,
};
const url = "https://homework.fdp.workers.dev";

const isValidInputCharacter = (key) => {
  const regex = /^[0-9\b]+$/;
  return regex.test(key);
}

const isValidKeypress = (event) => {
  if (!isValidInputCharacter(event.key)) {
      return false;
    }
}

const LoanCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [selectedChildren, setSelectedChildren] = useState("");
  const [coApplicant, setCoApplicant] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState(initialState);
  const [elementName, setElementName] = useState("");


  // eslint-disable-next-line no-unused-vars
  const handleKeyPress = (e) => {
    if (!isValidKeypress(e)) {
      e.preventDefault();
    }
  }

  const validateMonthlyIncome = (value, e) => {
    if (!value) {
      setErrorMsg((rest) => ({
        ...rest,
        monthlyIncome: "Monthly income is required",
        errorAvailable: true,
      }));
    } else if (value < loanParams.minimumMonthlyIncome) {
      setErrorMsg((rest) => ({
        ...rest,
        monthlyIncome: `Monthly income should be more than ${loanParams.minimumMonthlyIncome}`,
        errorAvailable: true,
      }));
    }
    else if (!numbersOnly(value)) {
      setErrorMsg((rest) => ({
        ...rest,
        monthlyIncome: "Monthly income should be number",
        errorAvailable: true,
      }));
    }
    else {
      setErrorMsg((rest) => ({
        ...rest,
        monthlyIncome: "",
        errorAvailable: false,
      }));
    }
    return;
  };

  const validateRequestedAmount = (value) => {
    if (!value) {
      setErrorMsg((rest) => ({
        ...rest,
        requestedAmount: "Requested amount is required",
        errorAvailable: true,
      }));
    } else if (value < loanParams.minimumRequestedAmount) {
      setErrorMsg((rest) => ({
        ...rest,
        requestedAmount: `Requested amount should be more than ${loanParams.minimumRequestedAmount}`,
        errorAvailable: true,
      }));
    } else if (!numbersOnly(value)) {
      setErrorMsg((rest) => ({
        ...rest,
        requestedAmount: "Requested amount should be number",
        errorAvailable: true,
      }));
    } else {
      setErrorMsg((rest) => ({
        ...rest,
        requestedAmount: "",
        errorAvailable: false,
      }));
    }
    return;
  };

  const validateLoanTerm = (value) => {
    if (!value) {
      setErrorMsg((rest) => ({
        ...rest,
        loanTerm: "Loan term is required",
        errorAvailable: true,
      }));
    } else if (value < loanParams.minTerm) {
      setErrorMsg((rest) => ({
        ...rest,
        loanTerm: `Term should be more that ${loanParams.minTerm} months`,
        errorAvailable: true,
      }));
    } else if (value > loanParams.maxTerm) {
      setErrorMsg((rest) => ({
        ...rest,
        loanTerm: `Term should be less that ${loanParams.maxTerm} months`,
        errorAvailable: true,
      }));
    } else if (!numbersOnly(value)) {
      setErrorMsg((rest) => ({
        ...rest,
        loanTerm: "Please enter a number",
        errorAvailable: true,
      }));
    } else {
      setErrorMsg((rest) => ({ ...rest, loanTerm: "", errorAvailable: false }));
    }
    return;
  };

  const validateSelectedChildren = (value) => {
    if (value === "") {
      setErrorMsg((rest) => ({
        ...rest,
        selectedChildren: "Please select NONE if no children",
        errorAvailable: true,
      }));
    } else {
      setErrorMsg((rest) => ({
        ...rest,
        selectedChildren: "",
        errorAvailable: false,
      }));
    }
  };

  const validateCoApplicant = (value) => {
    if (value === "") {
      setErrorMsg((rest) => ({
        ...rest,
        coApplicant: "Please select NONE if there is no co-appliant",
        errorAvailable: true,
      }));
    } else {
      setErrorMsg((rest) => ({
        ...rest,
        coApplicant: "",
        errorAvailable: false,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e?.currentTarget;
    switch (name) {
      case "monthlyIncome":
        setMonthlyIncome(value);
        setElementName(name);
        validateMonthlyIncome(value,e );
        break;

      case "requestedAmount":
        setRequestedAmount(value);
        setElementName(name);
        validateRequestedAmount(value);
        break;

      case "loanTerm":
        setLoanTerm(value);
        setElementName(name);
        validateLoanTerm(value);
        break;

      case "selectedChildren":
        setSelectedChildren(value);
        validateSelectedChildren(value);
        break;
      case "coApplicant":
        setCoApplicant(value);
        validateCoApplicant(value);
        break;
      default:
        e?.preventDefault();
    }
  };

  useEffect(() => {
    const errorElement = `<span>${errorMsg}</span>`;
    document.getElementsByName(elementName)[1]?.appendChild(errorElement);
    if (
      !errorMsg.errorAvailable &&
      requestedAmount !== "" &&
      monthlyIncome !== "" &&
      loanTerm !== "" &&
      selectedChildren !== "" &&
      coApplicant !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    errorMsg,
    elementName,
    disabled,
    requestedAmount,
    monthlyIncome,
    loanTerm,
    selectedChildren,
    coApplicant,
  ]);

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      monthlyIncome: parseInt(monthlyIncome),
      requestedAmount: parseInt(requestedAmount),
      loanTerm: parseInt(loanTerm),
      selectedChildren: selectedChildren,
      coApplicant: coApplicant,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": "swb-222222",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(function (response) {
        console.log("Here it is----", response);
      })
      .catch(function (error) {
        <MessageTemplate message="Failed due to internal" />;
        console.log(error, "heyyyy");
      });
  };


  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <LoanCalculatorTemplate
        monthlyIncome={monthlyIncome}
        requestedAmount={requestedAmount}
        loanTerm={loanTerm}
        selectedChildren={selectedChildren}
        coApplicant={coApplicant}
        handleChange={handleChange}
        disabled={disabled}
        errorMsg={errorMsg}
        // handleKeyPress={handleKeyPress}
      />
    </form>
  );
};

export default LoanCalculator;
