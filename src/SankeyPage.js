import React from 'react';
import SankeyApproximation from './SankeyApproximation';

const SankeyPage = ({ data }) => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '20px' }}>
    <h2>Relación entre Tipo de Contenido Preferido y Tiempo en Celular</h2>
    <SankeyApproximation width={500} height={500} data={data} />
    <p>
      Este diagrama muestra la relación entre el tipo de contenido preferido y el tiempo dedicado en redes sociales.
      Basado en la teoría de **hiperrealidad** de Jean Baudrillard, esta visualización sugiere que los patrones de
      consumo de contenido en redes sociales pueden distorsionar la percepción de la realidad, generando un mundo
      mediado por imágenes y representaciones en lugar de experiencias directas.
    </p>
  </div>
);

export default SankeyPage;