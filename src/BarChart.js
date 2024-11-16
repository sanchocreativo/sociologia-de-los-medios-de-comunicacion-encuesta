import React, { useState } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Tooltip, useTooltip } from '@visx/tooltip';

const timeOnPhoneData = [
  { category: '1 a 3 horas', Femenino: 5, Masculino: 10 },
  { category: '3 a 5 horas', Femenino: 10, Masculino: 15 },
  { category: 'Más de 5 horas', Femenino: 20, Masculino: 10 },
];

const financeAppData = [
  { category: 'Fintech', Femenino: 25, Masculino: 10 },
  { category: 'Bancarias Tradicionales', Femenino: 10, Masculino: 20 },
];

const margin = { top: 20, right: 30, bottom: 50, left: 40 };

const BarChart = ({ data, width, height, yMax, xKey, keys, colors }) => {
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const xScale = scaleBand({
    domain: data.map(d => d[xKey]),
    range: [margin.left, width - margin.right],
    padding: 0.2,
  });

  const yScale = scaleLinear({
    domain: [0, yMax],
    range: [height - margin.bottom, margin.top],
  });

  const colorScale = key => colors[keys.indexOf(key)];

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <Group>
          {data.map((d, i) => (
            keys.map((key, j) => {
              const barX = xScale(d[xKey]) + (j * xScale.bandwidth()) / keys.length;
              const barY = yScale(d[key]);
              const barWidth = xScale.bandwidth() / keys.length;
              const barHeight = yScale(0) - barY;

              return (
                <Bar
                  key={`bar-${i}-${j}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={colorScale(key)}
                  onMouseOver={(e) => {
                    setTooltipData({ label: key, value: d[key], category: d[xKey] });
                    setTooltipPosition({
                      x: e.clientX,
                      y: e.clientY - 40,
                    });
                  }}
                  onMouseOut={() => setTooltipData(null)}
                />
              );
            })
          ))}

          {/* Axes */}
          <AxisLeft
            scale={yScale}
            left={margin.left}
            labelOffset={10}
            label="Número de Respuestas"
          />

          <AxisBottom
            top={height - margin.bottom}
            scale={xScale}
            label={xKey}
          />
        </Group>
      </svg>

      {/* Tooltip */}
      {tooltipData && (
        <Tooltip top={tooltipPosition.y} left={tooltipPosition.x} style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '5px' }}>
          <strong>{tooltipData.category}</strong>
          <div>{tooltipData.label}: {tooltipData.value}</div>
        </Tooltip>
      )}

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {keys.map((key, i) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: colors[i], marginRight: '5px' }}></div>
            {key}
          </div>
        ))}
      </div>
    </div>
  );
};


export default  BarChart;