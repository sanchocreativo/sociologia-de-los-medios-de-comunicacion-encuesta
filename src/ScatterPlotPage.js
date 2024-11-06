import React from 'react';
import ScatterPlot from './ScatterPlot';

const ScatterPlotPage = ({ data }) => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '20px' }}>
    <h2>Influencia de Amigos en Decisiones de Compra</h2>
    <ScatterPlot width={600} height={600} data={data} />
    <p>
      Este gráfico explora la influencia de los amigos en las decisiones de compra de los encuestados, ilustrando el
      concepto de **solidaridad social** de Émile Durkheim. La influencia social entre amigos refleja la transición de
      la solidaridad mecánica (basada en la similitud) hacia una solidaridad orgánica (basada en la interdependencia)
      en las sociedades contemporáneas.
    </p>
  </div>
);

export default ScatterPlotPage;