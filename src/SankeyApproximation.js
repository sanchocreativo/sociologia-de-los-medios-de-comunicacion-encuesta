// src/HeatmapChart.js
import React, { useEffect, useState } from 'react';
import { scaleBand } from '@visx/scale';
import { scaleSequential } from 'd3-scale';
import { interpolateBlues } from 'd3-scale-chromatic';

const SankeyApproximation = ({ width, height, data }) => {
  const [flattenedData, setFlattenedData] = useState([]);
  const contentTypes = [
    "Videos",
    "Podcasts",
    "Artículos escritos",
    "Infografías",
    "Historias o posts breves"
  ];

  const timeSpentCategories = [
    "Menos de 1 hora",
    "1 a 3 horas",
    "3 a 5 horas",
    "Más de 5 horas"
  ];

  useEffect(() => {
    // Define content types and time spent categories based on your dataset
    const contentTypes = [
      "Videos",
      "Podcasts",
      "Artículos escritos",
      "Infografías",
      "Historias o posts breves"
    ];

    const timeSpentCategories = [
      "Menos de 1 hora",
      "1 a 3 horas",
      "3 a 5 horas",
      "Más de 5 horas"
    ];

    const tempData = [];

    // Iterate through each combination of content type and time spent
    contentTypes.forEach(contentType => {
      timeSpentCategories.forEach(timeSpent => {
        const count = data.filter(d => 
          d['¿Qué tipo de contenido prefieres para informarte?'].includes(contentType) &&
          d['¿Cuánto tiempo pasas diariamente en el celular?'] === timeSpent
        ).length;
        tempData.push({ contentType, timeSpent, count });
      });
    });

    setFlattenedData(tempData);
  }, [data]);

  const xScale = scaleBand({
    domain: timeSpentCategories,
    range: [50, width + 50],
    padding: 0.1,
  });

  const yScale = scaleBand({
    domain: contentTypes,
    range: [height, 50],
    padding: 0.1,
  });

  const colorScale = scaleSequential(interpolateBlues).domain([
    0,
    Math.max(...flattenedData.map(d => d.count)),
  ]);

  if (!flattenedData.length) return <div>Loading data...</div>;

  return (
    <div className="chart-container">
      <h2 className="chart-title">Relación entre Tipo de Contenido Preferido y Tiempo en Celular</h2>
      <svg width={width + 100} height={height + 100}>
        {/* X-axis Label */}
        <text x={(width + 100) / 2} y={height + 10} textAnchor="middle" fontSize={16} fontWeight="bold">
          Tiempo en Celular (horas)
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
          Tipo de Contenido Preferido
        </text>

        {/* Heatmap cells */}
        {flattenedData.map((cell, i) => (
          <rect
            key={`heatmap-rect-${i}`}
            x={xScale(cell.timeSpent)}
            y={yScale(cell.contentType)}
            width={xScale.bandwidth()}
            height={yScale.bandwidth()}
            fill={cell.count > 0 ? colorScale(cell.count) : '#f0f0f0'}
          >
            <title>{`Tipo de Contenido: ${cell.contentType}, Tiempo en Celular: ${cell.timeSpent}, Count: ${cell.count}`}</title>
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

export default SankeyApproximation;
