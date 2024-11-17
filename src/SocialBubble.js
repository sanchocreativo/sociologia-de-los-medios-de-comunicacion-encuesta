import React from 'react';
import { Circle } from '@visx/shape';

import { FaTiktok, FaYoutube, FaReddit, FaTumblr, FaTwitter, FaBlogger, FaLinkedin } from 'react-icons/fa';


const branchesdata = [
 
 
  {
    gender: "Masculino",
    networks: ["LinkedIn", "WhatsApp"],
    color: "#1f77b4",
    centerX: 450,
    centerY: 150,
    genderclass: "masculino"
  },  {
    gender: "Femenino",
    networks: ["Facebook", "Instagram", "Twitter"],
    color: "#FFB1C1",
    centerX: 150,
    centerY: 150,
    genderclass: "femenino"
  },  {
    gender: "No binario",
    networks: ["TikTok", "YouTube", "Bluesky", "Tumblr", "Reddit"],
    color: "#2ca02c",
    centerX: 300,
    centerY: 150,
    genderclass: "nobinario"
  }
];

const networkIcons = {
  TikTok: <FaTiktok />, 
  YouTube: <FaYoutube />, 
  Bluesky: <FaBlogger />, 
  Tumblr: <FaTumblr />, 
  Reddit: <FaReddit />,
  Facebook: <FaTumblr />,
  Instagram: <FaTiktok />,
  Twitter: <FaTwitter />,
  LinkedIn: <FaLinkedin />,
  WhatsApp: <FaTiktok />
};



const SocialBubble = () => {


  return (
    <div>

    {branchesdata.map((d, index) => (
        <React.Fragment key={index}>
          <svg version="1.1" width="600" height="300" className={`svgsocialnetworks ${d.genderclass}`}>

          

        {d.networks.map((network, i) => {
            const angle = (i / d.networks.length) * Math.PI * 2;
            const branchX = d.centerX + Math.cos(angle) * 200; 
            const branchY = d.centerY + Math.sin(angle) * 200; 

            return (
              <>
                <line
                  x1={d.centerX}
                  y1={d.centerY}
                  x2={branchX}
                  y2={branchY}
                  stroke="#6C63FF"
                  strokeWidth={2}
                />
                <Circle cx={branchX} cy={branchY} r={30} fill="#d9d9d9" />
                <text
                  x={branchX - 25}
                  y={branchY + 45}
                  fontSize={12}
                  fontWeight="bold"
                  fill="#6C63FF"
                >
                  {network}
                </text>
                <g transform={`translate(${branchX - 10}, ${branchY - 10})`}>
                  {networkIcons[network]}
                </g>
                </>
            );
          })}
                     <Circle cx={d.centerX} cy={d.centerY} r={50} fill={d.color} />

            </svg>
        </React.Fragment>
      ))}

    <h3>Análisis Sociológico</h3>
      <p>
        Desde la perspectiva sociológica, Durkheim argumenta que la cohesión social en sociedades modernas se basa en la <strong>solidaridad orgánica</strong>, donde las diferencias individuales contribuyen al funcionamiento colectivo. En este caso, la persona no binaria ocupa un rol distintivo al diversificar las plataformas sociales y los contenidos que consume, actuando como un nodo que conecta diversas comunidades digitales.
      </p>
      <p>
        Por otro lado, según Weber, el uso de redes menos tradicionales como Tumblr o Bluesky refleja la acción social basada en valores (<strong>Wertrationalität</strong>), lo que muestra cómo esta persona prioriza espacios que resuenan con su identidad y creencias, en lugar de conformarse con redes masificadas. Esto subraya cómo las estructuras sociales y culturales influyen en las decisiones individuales.
      </p>
    </div>
  );
};

export default SocialBubble;
