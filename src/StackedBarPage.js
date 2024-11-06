import React from 'react';
import StackedBarChart from './StackedBarChart';

const StackedBarPage = ({ data }) => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '20px' }}>
    <h2>Uso de Aplicaciones Financieras y Preferencia de Recursos Financieros</h2>
    <StackedBarChart width={500} height={400} data={data} />
    <p>
      Este gráfico ilustra las preferencias en el uso de aplicaciones financieras y tipos de recursos financieros,
      aplicando los conceptos de **capital económico** de Pierre Bourdieu. Las preferencias por recursos tradicionales
      o fintech reflejan disposiciones de clase social y acceso al capital económico, indicando cómo las posiciones
      sociales afectan la confianza en las nuevas tecnologías financieras.
    </p>
  </div>
);

export default StackedBarPage;