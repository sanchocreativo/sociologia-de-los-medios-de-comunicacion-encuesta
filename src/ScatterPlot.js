// src/ScatterPlot.js
import React from 'react';
import { scaleLinear } from '@visx/scale';
import { GlyphCircle } from '@visx/glyph';
import { AxisLeft, AxisBottom } from '@visx/axis';

const ScatterPlot = ({ width, height, data }) => {
  // Map influence descriptions to numerical values for scatter plot
  const influenceMapping = {
    'Mucho': 4,
    'A veces': 3,
    'Raramente': 2,
    'No me influyen': 1,
  };

  const processedData = data.map(d => ({
    friendInfluence: influenceMapping[d['¿Cuánto influyen tus amigos o conocidos en la información que consumes en redes sociales?']] || 1,
    purchaseInfluence: d['En una escala del 1 al 5, ¿Cuanto Crees que las redes sociales influyen en tus decisiones de compra?'],
  }));

  const xScale = scaleLinear({
    domain: [1, 5],
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [1, 5],
    range: [height, 0],
  });

  return (
    <div className="chart-container">
      <h2 className="chart-title">Influencia de Amigos en Decisiones de Compra</h2>
      <svg width={width + 60} height={height + 60}>
        <text x={width / 2} y={height + 40} textAnchor="middle" fontSize={16} fontWeight="bold">
          Influencia de Amigos
        </text>
        <text x={-height / 2} y={20} transform="rotate(-90)" textAnchor="middle" fontSize={16} fontWeight="bold">
          Influencia en Decisiones de Compra
        </text>
        {processedData.map((d, i) => (
          <GlyphCircle
            key={i}
            left={xScale(d.friendInfluence)}
            top={yScale(d.purchaseInfluence)}
            size={50}
            fill="blue"
          />
        ))}
        <AxisBottom scale={xScale} top={height} label="Influencia de Amigos" />
        <AxisLeft scale={yScale} label="Influencia en Decisiones de Compra" />
      </svg>
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: "blue" }}></div>
          Respuesta Individual
        </div>
      </div>
    </div>
  );
};

export default ScatterPlot;
