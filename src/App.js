// src/App.js
import React, { useState } from 'react';
import StackedBarChart from './StackedBarChart';
import SankeyApproximation from './SankeyApproximation';
import HeatmapChart from './HeatmapChart';
import ScatterPlot from './ScatterPlot';
import data from './encuesta.json';

const App = () => {
  const [filteredData, setFilteredData] = useState(data);

  return (
    <div>
      <h2 className="chart-title">Encuesta anónima sobre Consumo de Información y Uso de Redes Sociales en Jóvenes de 18 a 22 Años: Relaciones con la Sociedad y el Capital Cultural</h2>
      <StackedBarChart width={600} height={400} data={filteredData} onClickBar={() => {}} />
      <SankeyApproximation width={600} height={600} data={filteredData} />
      <HeatmapChart width={600} height={600} data={filteredData} />
      <ScatterPlot width={600} height={600} data={filteredData} />
    </div>
  );
};

export default App;
