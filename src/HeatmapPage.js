import React from 'react';
import HeatmapChart from './HeatmapChart';

const HeatmapPage = ({ data }) => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '20px' }}>
    <h2>Confianza e Influencia en Decisiones de Compra</h2>
    <HeatmapChart width={500} height={500} data={data} />
    <p>
      Este gráfico de calor representa cómo la confianza en la información en redes sociales influye en las decisiones
      de compra de los encuestados. Inspirado en la teoría de **confianza en la modernidad** de Anthony Giddens, este
      análisis refleja cómo la confianza se desplaza hacia sistemas impersonales (redes sociales) en lugar de relaciones
      personales, afectando los comportamientos de compra en la era digital.
    </p>
  </div>
);

export default HeatmapPage;