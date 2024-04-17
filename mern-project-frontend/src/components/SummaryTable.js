// src/components/SummaryTable.js

import React from 'react';
import sampleData from '../sampleData';
import './SummaryTable.css'; // Import CSS file for styling

const SummaryTable = () => {
  // Calculate the number of 0s and 1s
  const countZeros = sampleData.filter(dataPoint => dataPoint.value === 0).length;
  const countOnes = sampleData.filter(dataPoint => dataPoint.value === 1).length;

  // Identify continuous sequences of 0s and 1s for variations
  let variations = [];
  let currentSequence = [];
  for (const dataPoint of sampleData) {
    if (currentSequence.length === 0 || currentSequence[currentSequence.length - 1].value === dataPoint.value) {
      currentSequence.push(dataPoint);
    } else {
      variations.push(currentSequence);
      currentSequence = [dataPoint];
    }
  }
  if (currentSequence.length > 0) {
    variations.push(currentSequence);
  }

  return (
    <div className="summary-container">
      <h2>Summary Table</h2>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Value</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>{countZeros}</td>
          </tr>
          <tr>
            <td>1</td>
            <td>{countOnes}</td>
          </tr>
        </tbody>
      </table>
      <h2>Variations</h2>
      <ul className="variations-list">
        {variations.map((sequence, index) => (
          <li key={index}>
            {sequence[0].value} (Length: {sequence.length})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SummaryTable;
