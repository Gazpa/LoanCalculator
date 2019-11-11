import React from "react";

import "../styles/Table.css";

export const Table = function(props) {
  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>Repayment Date</th>
          <th>Principal</th>
          <th>Interest</th>
          <th>Total Repayment</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map(row => {
          return (
            <tr key={row.date}>
              <td>{row.date}</td>
              <td>{row.principal}</td>
              <td>{row.interest}</td>
              <td>{row.total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
