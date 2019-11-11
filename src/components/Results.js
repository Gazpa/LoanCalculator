import React from "react";

import "../styles/Results.css";
import { Input } from "./Input";
import { Table } from "./Table";

export const Results = function(props) {
  return (
    <div className="results-wrapper">
      <Input
        leftLabel={props.inputLeftLabel}
        rightLabel={props.inputRightLabel}
        inputValue={props.inputValue}
        onChange={props.inputOnChange}
      />
      <Table data={props.data} />
      <div className="results-title">{props.titleLabel}</div>
    </div>
  );
};
