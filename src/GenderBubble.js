import React, { useState } from 'react';
import { scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';

// Map gender categories for easy labeling in the tooltip
const genderMapping = {
  Masculino: 'Masculino',
  Femenino: 'Femenino',
  'No binario': 'No binario'
};

// Process data from JSON file to count responses by gender
const processData = (data) => {
  const genderCounts = {};

  // Count each gender
  data.forEach((d) => {
    const gender = d['¿Cual es tu genero?'];
    if (genderCounts[gender]) {
      genderCounts[gender] += 1;
    } else {
      genderCounts[gender] = 1;
    }
  });

  // Convert counts to array format for charting
  return Object.entries(genderCounts).map(([gender, count]) => ({
    gender,
    count,
  }));
};

const BubbleChart = ({ width, height, data }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip();

  // Process the data for the chart
  const chartData = processData(data);

  // Define x position and radius scales
  const xScale = scaleLinear({
    domain: [0, chartData.length],
    range: [50, width - 50],
  });

  const radiusScale = scaleLinear({
    domain: [0, Math.max(...chartData.map(d => d.count))],
    range: [5, 100], // Adjust min and max radius sizes
  });

  // Color scale for each gender
  const colorScale = {
    Masculino: '#1f77b4',
    Femenino: '#ff7f0e',
    'No binario': '#2ca02c'
  };

  return (
    <div>
      <svg width={width} height={height}>
        <Group>
          {chartData.map((d, i) => (
            <Circle
              key={`circle-${d.gender}`}
              className="bubble" // Add class for transition effect
              cx={xScale(i)}
              cy={height / 2} // Center vertically
              r={radiusScale(d.count)}
              fill={colorScale[d.gender]}
              onMouseMove={(event) => {
                const coords = localPoint(event.target.ownerSVGElement, event);
                showTooltip({
                  tooltipData: d,
                  tooltipLeft: coords.x + 10, // Offset tooltip to the right
                  tooltipTop: coords.y,
                });
                setHoveredId(i);
              }}
              onMouseLeave={() => {
                setTimeout(hideTooltip, 100); // Small delay to reduce flicker
                setHoveredId(null);
              }}
            />
          ))}
        </Group>
      </svg>

      {/* Tooltip */}
      {tooltipData && (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={ { position: 'absolute', left: '950px',  top: '100px'}}>
          <strong>{genderMapping[tooltipData.gender]}</strong>: {tooltipData.count} respuestas
        </TooltipWithBounds>
      )}
    </div>
  );
};

export default BubbleChart;
