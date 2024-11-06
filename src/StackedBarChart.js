// src/StackedBarChart.js
import React from 'react';
import { BarStack } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { useTooltip, Tooltip } from '@visx/tooltip';

const colors = { fintech: '#4CAF50', banks: '#FF9800', crypto: '#F44336' };

const StackedBarChart = ({ width, height, data }) => {
  // Initialize processedData with categories and counts set to zero
  const processedData = [
    { appType: 'Fintech Apps', fintech: 0, banks: 0, crypto: 0 },
    { appType: 'Traditional Banks', fintech: 0, banks: 0, crypto: 0 }
  ];

  // Process each survey response
  data.forEach(d => {
    const appUsage = d['¿Utilizas alguna aplicación o red social para manejar tus finanzas o hacer pagos?'] || '';
    const trust = d['¿En qué confías más para manejar tu dinero?'] || '';

    // If user uses fintech apps
    if (appUsage.toLowerCase().includes('fintech')) {
      if (trust.toLowerCase().includes('fintech')) processedData[0].fintech++;
      if (trust.toLowerCase().includes('banco')) processedData[0].banks++;
      if (trust.toLowerCase().includes('cripto')) processedData[0].crypto++;
    }

    // If user uses traditional bank apps
    if (appUsage.toLowerCase().includes('banco')) {
      if (trust.toLowerCase().includes('fintech')) processedData[1].fintech++;
      if (trust.toLowerCase().includes('banco')) processedData[1].banks++;
      if (trust.toLowerCase().includes('cripto')) processedData[1].crypto++;
    }
  });

  // Define scales
  const xScale = scaleBand({
    domain: processedData.map(d => d.appType),
    padding: 0.2,
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...processedData.map(d => d.fintech + d.banks + d.crypto))],
    range: [height, 0],
  });

  const colorScale = scaleOrdinal({
    domain: Object.keys(colors),
    range: Object.values(colors),
  });

  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } = useTooltip();

  return (
    <div className="chart-container">
      <h2 className="chart-title">Uso de Aplicaciones Financieras y Preferencia de Recursos Financieros</h2>
      <svg width={width} height={height + 40}>
        <text x={width / 2} y={20} textAnchor="middle" fontSize={16} fontWeight="bold">
          Preferencia de Recursos Financieros
        </text>
        <Group top={20}>
          <BarStack
            data={processedData}
            keys={['fintech', 'banks', 'crypto']}
            x={d => xScale(d.appType)}
            xScale={xScale}
            yScale={yScale}
            color={colorScale}
          >
            {barStacks =>
              barStacks.map(barStack =>
                barStack.bars.map(bar => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    onMouseOver={() => {
                      showTooltip({
                        tooltipData: `${bar.key}: ${bar.bar.data[bar.key]}`,
                        tooltipLeft: bar.x + bar.width / 2,
                        tooltipTop: bar.y,
                      });
                    }}
                    onMouseOut={hideTooltip}
                  />
                ))
              )
            }
          </BarStack>
          <AxisBottom scale={xScale} top={height} label="Tipo de Aplicación Financiera" />
          <AxisLeft scale={yScale} label="Cantidad de Preferencias" />
        </Group>
        {tooltipData && (
          <Tooltip left={tooltipLeft} top={tooltipTop}>
            {tooltipData}
          </Tooltip>
        )}
      </svg>
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: colors.fintech }}></div>
          Fintech
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: colors.banks }}></div>
          Bancos Tradicionales
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: colors.crypto }}></div>
          Criptomonedas
        </div>
      </div>
    </div>
  );
};

export default StackedBarChart;
