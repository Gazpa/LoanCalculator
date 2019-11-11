import React from "react";

import { Input } from "./Input";

export const Header = function(props) {
  return (
    <div className="header">
      <h1>Your Loan</h1>
      <Input
        leftLabel={"Amount requested"}
        rightLabel={"(in £)"}
        inputValue={props.amountInputValue}
        onChange={props.amountInputOnChange}
      />
      <Input
        leftLabel={"Duration"}
        rightLabel={"(in months)"}
        inputValue={props.durationInputValue}
        onChange={props.durationInputOnChange}
      />
    </div>
  );
};
