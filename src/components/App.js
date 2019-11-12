import React, { useState, useEffect } from "react";

import "../styles/App.css";
import { Header } from "./Header";
import { Results } from "./Results";

const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
const locale = "en-GB";

export const App = function() {
  const [amountRequested, setAmountRequested] = useState(0);
  const [duration, setDuration] = useState(0);

  const [creditInterest, setCreditInterest] = useState(0);
  const [loanInterest, setLoanInterest] = useState(0);

  const [creditData, setCreditData] = useState([]);
  const [loanData, setLoanData] = useState([]);

  const [creditLimits, setCreditLimits] = useState({});
  const [loanLimits, setLoanLimits] = useState({});

  useEffect(() => {
    // fetch the limits
    fetch("https://www.mocky.io/v2/5d4aa9e93300006f000f5ea9")
      .then(response => response.json())
      .then(data => {
        setCreditLimits(data.revolving_credit_facility);
        setLoanLimits(data.business_loan);
      })
      .catch(err => {
        console.warn("Error while fetching limits: ", err);
      });
  }, []);

  useEffect(() => {
    const userCanAskForCredit =
      creditLimits.amount_max >= amountRequested &&
      creditLimits.amount_min <= amountRequested &&
      creditLimits.duration_max >= duration &&
      creditLimits.duration_min <= duration;

    const userCanAskForLoan =
      loanLimits.amount_max >= amountRequested &&
      loanLimits.amount_min <= amountRequested &&
      loanLimits.duration_max >= duration &&
      loanLimits.duration_min <= duration;

    if (
      (userCanAskForCredit || userCanAskForLoan) &&
      amountRequested > 0 &&
      duration > 0 &&
      duration < 200 &&
      creditInterest < 100 &&
      loanInterest < 100
    ) {
      const monthlyPaymentAmount =
        Number(amountRequested) / (Number(duration) || 1);
      const loanAddedInterest = Number(amountRequested) / 10;

      // Arrays with rows in objects to display data
      let creditResult = [];
      let loanResult = [];
      let remainingAmount = Number(amountRequested);
      let date = new Date();
      let creditRowData = {};
      let loanRowData = {};
      let creditInterestTotal = 0;
      let loanInterestTotal = 0;
      let creditTotal = 0;
      let loanTotal = 0;

      for (let i = 0; i < duration; i++) {
        if (userCanAskForCredit) {
          creditRowData.date = date.toLocaleDateString(locale, dateOptions);
          creditRowData.principal = monthlyPaymentAmount;
          creditRowData.interest =
            remainingAmount * (Number(creditInterest) / 100);
          creditRowData.total = creditRowData.interest + monthlyPaymentAmount;
          creditResult.push(creditRowData);
        }

        if (userCanAskForLoan) {
          loanRowData.date = date.toLocaleDateString(locale, dateOptions);
          loanRowData.principal = monthlyPaymentAmount;
          loanRowData.interest =
            i === 0
              ? remainingAmount * (Number(loanInterest) / 100) +
                loanAddedInterest
              : remainingAmount * (Number(loanInterest) / 100);
          loanRowData.total = loanRowData.interest + monthlyPaymentAmount;
          loanResult.push(loanRowData);
        }

        remainingAmount = remainingAmount - monthlyPaymentAmount;
        date.setMonth(date.getMonth() + 1);
        creditInterestTotal = creditInterestTotal + creditRowData.interest;
        loanInterestTotal = loanInterestTotal + loanRowData.interest;
        creditTotal = creditTotal + creditRowData.total;
        loanTotal = loanTotal + loanRowData.total;
        creditRowData = {};
        loanRowData = {};
      }

      // Totals
      if (userCanAskForCredit) {
        creditRowData.date = "Total";
        creditRowData.principal = amountRequested;
        creditRowData.interest = creditInterestTotal;
        creditRowData.total = creditTotal;
        creditResult.push(creditRowData);
      }

      if (userCanAskForLoan) {
        loanRowData.date = "Total";
        loanRowData.principal = amountRequested;
        loanRowData.interest = loanInterestTotal;
        loanRowData.total = loanTotal;
        loanResult.push(loanRowData);
      }

      setCreditData(creditResult);
      setLoanData(loanResult);
    } else {
      setCreditData([]);
      setLoanData([]);
    }
  }, [
    amountRequested,
    duration,
    creditInterest,
    loanInterest,
    creditLimits,
    loanLimits
  ]);

  return (
    <div className="app">
      <Header
        amountInputValue={amountRequested}
        amountInputOnChange={setAmountRequested}
        durationInputValue={duration}
        durationInputOnChange={setDuration}
      />
      <div className="results">
        <Results
          titleLabel={"Revolving Credit Facility"}
          data={creditData}
          inputLeftLabel={"Interest rate"}
          inputRightLabel={"(in %)"}
          inputValue={creditInterest}
          inputOnChange={setCreditInterest}
        />
        <Results
          titleLabel={"Business Loan"}
          data={loanData}
          inputLeftLabel={"Interest rate"}
          inputRightLabel={"(in %)"}
          inputValue={loanInterest}
          inputOnChange={setLoanInterest}
        />
      </div>
    </div>
  );
};
