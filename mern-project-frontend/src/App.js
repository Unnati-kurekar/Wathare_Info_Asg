// src/App.js

import React from 'react';
import SummaryTable from './components/SummaryTable';
import PlotComponent from './components/PlotComponent';

const App = () => {
  return (
    <div className="App">
      <h1>Wathare - Data Report</h1>
      <h4>Graph</h4>
      <PlotComponent/>
      <h4>Table</h4>
      <SummaryTable />
    </div>
  );
};

export default App;
