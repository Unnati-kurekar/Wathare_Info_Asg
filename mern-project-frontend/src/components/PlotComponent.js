import React from 'react';
import Plot from 'react-plotly.js';
import sampleData from '../sampleData';

const PlotComponent = () => {
  // Sort sampleData by timestamp in ascending order
  const sortedData = sampleData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  // Create data points for grouped bars
  const data = sortedData.map(dataPoint => ({
    x: [dataPoint.timestamp], // Timestamp as x-axis value
    y: [dataPoint.value], // Category (0 or 1) for the bar
    type: 'bar',
    orientation: 'h',
    marker: {
      color: dataPoint.value === 0 ? 'yellow' : 'green', // Color based on category
    },
  }));

  const layout = {
    title: 'Grouped Bar Chart',
    xaxis: {
      title: 'Timestamp',
    },
    yaxis: {
      title: 'Category',
      tickvals: [0, 1], // Set tick values for categories (0 and 1)
      ticktext: ['Yellow', 'Green'], // Set tick text for categories
    },
    barmode: 'group', // Grouped bars
  };

  return <Plot data={data} layout={layout} />;
};

export default PlotComponent;
