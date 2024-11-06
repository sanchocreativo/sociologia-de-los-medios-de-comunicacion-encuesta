// src/RadarChart.js
import React from 'react';
import { scaleLinear } from '@visx/scale';
import { Line, Circle } from '@visx/shape';
import { Group } from '@visx/group';
import { Point } from '@visx/point';

const RadarChart = ({ data, width, height, levels = 5 }) => {
  // Configuración de dimensiones y centro
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 40;

  // Crear escalas
  const maxValue = Math.max(...data.map((d) => Math.max(...d.values)));
  const angleStep = (Math.PI * 2) / data[0].values.length;
  const radiusScale = scaleLinear({
    range: [0, radius],
    domain: [0, maxValue],
  });

  // Función para calcular puntos
  const getPointCoordinates = (angle, value) => {
    const x = centerX + Math.cos(angle) * radiusScale(value);
    const y = centerY + Math.sin(angle) * radiusScale(value);
    return new Point({ x, y });
  };

  return (
    <svg width={width} height={height}>
      <Group>
        {/* Dibujar niveles circulares */}
        {[...Array(levels)].map((_, i) => (
          <Circle
            key={`level-${i}`}
            cx={centerX}
            cy={centerY}
            r={(radius / levels) * (i + 1)}
            fill="none"
            stroke="#e0e0e0"
          />
        ))}

        {/* Dibujar ejes */}
        {data[0].values.map((_, i) => {
          const angle = i * angleStep;
          const point = getPointCoordinates(angle, maxValue);
          return (
            <Line
              key={`axis-${i}`}
              from={new Point({ x: centerX, y: centerY })}
              to={point}
              stroke="#e0e0e0"
            />
          );
        })}

        {/* Dibujar líneas de datos */}
        {data.map((entry, i) => (
          <Group key={`data-${i}`}>
            <polygon
              points={entry.values
                .map((value, j) => {
                  const angle = j * angleStep;
                  const point = getPointCoordinates(angle, value);
                  return `${point.x},${point.y}`;
                })
                .join(' ')}
              fill={entry.color}
              fillOpacity={0.2}
              stroke={entry.color}
              strokeWidth={2}
            />
          </Group>
        ))}

        {/* Dibujar etiquetas de ejes */}
        {data[0].labels.map((label, i) => {
          const angle = i * angleStep;
          const point = getPointCoordinates(angle, maxValue * 1.1);
          return (
            <text
              key={`label-${i}`}
              x={point.x}
              y={point.y}
              dy="0.35em"
              fontSize={10}
              textAnchor="middle"
            >
              {label}
            </text>
          );
        })}
      </Group>
    </svg>
  );
};

export default RadarChart;
