// src/HeatmapChart.js
import React, { useEffect, useState } from 'react';
import { scaleBand } from '@visx/scale';
import { scaleSequential } from 'd3-scale';
import { interpolateBlues } from 'd3-scale-chromatic';

const HeatmapChart = ({ width, height, data }) => {
  const [flattenedData, setFlattenedData] = useState([]);

  useEffect(() => {
    const trustLevels = [1, 2, 3, 4, 5];
    const influenceLevels = [1, 2, 3, 4, 5];
    const tempData = [];

    trustLevels.forEach(trust => {
      influenceLevels.forEach(influence => {
        const count = data?.filter(d =>
          d['En una escala del 1 al 5, ¿Cuanto Confías en la información que encuentras en redes sociales?'] === trust &&
          d['En una escala del 1 al 5, ¿Cuanto Crees que las redes sociales influyen en tus decisiones de compra?'] === influence
        ).length || 0;
        tempData.push({ trust, influence, count });
      });
    });

    setFlattenedData(tempData);
  }, [data]);

  const xScale = scaleBand({
    domain: [1, 2, 3, 4, 5],
    range: [50, width + 50], // Add padding for labels
    padding: 0.1,
  });

  const yScale = scaleBand({
    domain: [1, 2, 3, 4, 5],
    range: [height, 50], // Add padding for labels
    padding: 0.1,
  });

  const colorScale = scaleSequential(interpolateBlues).domain([
    0,
    Math.max(...flattenedData.map(d => d.count)),
  ]);

  if (!flattenedData.length) return <div>Loading data...</div>; // Safeguard if data is empty

  return (
    <div className="chart-container">
      <h2 className="chart-title">Confianza e Influencia en Decisiones de Compra</h2>
      <svg width={width + 100} height={height + 100}>
        {/* X-axis Label */}
        <text x={(width + 100) / 2} y={height + 10} textAnchor="middle" fontSize={16} fontWeight="bold">
          Influencia en Decisiones de Compra (1-5)
        </text>

        {/* Y-axis Label */}
        <text
          x={20}
          y={(height + 170) / 2}
          textAnchor="middle"
          fontSize={16}
          fontWeight="bold"
          transform={`rotate(-90, 20, ${(height + 100) / 2})`}
        >
          Nivel de Confianza (1-5)
        </text>

        {flattenedData.map((cell, i) => (
          <rect
            key={`heatmap-rect-${i}`}
            x={xScale(cell.influence)}
            y={yScale(cell.trust)}
            width={xScale.bandwidth()}
            height={yScale.bandwidth()}
            fill={cell.count > 0 ? colorScale(cell.count) : '#f0f0f0'} // Light color for 0 counts
          >
            <title>{`Confianza: ${cell.trust}, Influencia: ${cell.influence}, Count: ${cell.count}`}</title>
          </rect>
        ))}

        {/* X-axis Ticks */}
        {xScale.domain().map((tick, i) => (
          <text
            key={`x-tick-${i}`}
            x={xScale(tick) + xScale.bandwidth() / 2}
            y={height + 60}
            textAnchor="middle"
            fontSize={12}
            fontWeight="bold"
          >
            {tick}
          </text>
        ))}

        {/* Y-axis Ticks */}
        {yScale.domain().map((tick, i) => (
          <text
            key={`y-tick-${i}`}
            x={30}
            y={yScale(tick) + yScale.bandwidth() / 2}
            textAnchor="end"
            fontSize={12}
            fontWeight="bold"
            dy=".35em"
          >
            {tick}
          </text>
        ))}
      </svg>
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: colorScale(0.1) }}></div>
          Bajo (Menos Respuestas)
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: colorScale(0.5) }}></div>
          Medio
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: colorScale(1) }}></div>
          Alto (Más Respuestas)
        </div>
      </div>
    </div>
  );
};

export default HeatmapChart;
