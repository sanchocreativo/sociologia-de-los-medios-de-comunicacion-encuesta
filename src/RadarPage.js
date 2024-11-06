import React from 'react';
import RadarChart from './RadarChart';
import data from './encuesta.json';

const processData = (data) => {
  // Define labels for radar axes
  const labels = ["Confianza", "Tiempo", "Influencias", "Publicidad", "Decisiones"];
  
  // Process each entry in the survey data
  const processedData = data.map((entry, index) => ({
    name: `Usuario ${index + 1}`,  // Label each user
    values: [
      entry['En una escala del 1 al 5, ¿Cuanto Confías en la información que encuentras en redes sociales?'], // Confianza
      ['Menos de 1 hora', '1 a 3 horas', '3 a 5 horas', 'Más de 5 horas'].indexOf(entry['¿Cuánto tiempo pasas diariamente en el celular?']) + 1, // Tiempo
      entry['¿Cuánto influyen tus amigos o conocidos en la información que consumes en redes sociales?'] === 'Mucho, confío en sus recomendaciones' ? 5 : 3, // Influencias
      entry['¿Cómo te sientes acerca de la publicidad en redes sociales?'] === 'Me ayuda a descubrir productos' ? 4 : 2, // Publicidad
      entry['En una escala del 1 al 5, ¿Cuanto Crees que las redes sociales influyen en tus decisiones de compra?'] // Decisiones
    ],
    labels,  // Use predefined labels for each axis
    color: index % 2 === 0 ? "#1f77b4" : "#ff7f0e"  // Alternate colors for users
  }));
  
  return processedData;
};

const RadarPage = () => {
  const processedData = processData(data);
  
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', padding: '20px' }}>
    
      <div style={{ flex: 1 }}>
        <RadarChart data={processedData} width={500} height={500} />
        <div className="text-centered">
        <img src="https://sanchocreativo.github.io/sociologia-de-los-medios-de-comunicacion-encuesta/assets/undraw_social_sharing_re_pvmr.svg" alt={`illustration`} className="svg-image" />
      </div>
      </div>
    </div>
  );
};

export default RadarPage;
