import React, {useState} from 'react';
import StackedBarChart from './StackedBarChart';
import SankeyApproximation from './SankeyApproximation';
import HeatmapChart from './HeatmapChart';
import ScatterPlot from './ScatterPlot';
import RadarPage from './RadarPage';
import './App.css';
import data from './encuesta.json';

const ChartPage = ({ title, description, chart, svg, secondaryDescription }) => (
  <div className="custom-row">
    <div className="custom-col-6 custom-col-6-content">
      <h2 className="chart-title-main">{title}</h2>
      <p>{description}</p>
      <div dangerouslySetInnerHTML={{ __html: secondaryDescription }} />
        { svg && (
      <div className="text-centered">
        <img src={svg} alt={`${title} illustration`} className="svg-image" />
      </div>
      )
      }
    </div>
    <div className="custom-col-6 custom-col-6-content">
      {chart}
    </div>
  </div>
);

const App = () => {
  const [filteredData, setFilteredData] = useState(data);
   const secondaryDescriptionHTML = `<h2>Análisis Sociológico</h2>
        <p>Este gráfico radar presenta un análisis de cinco aspectos claves del comportamiento de los usuarios en redes sociales:</p>
        <ul>
          <li><strong>Confianza:</strong> Nivel de confianza que los encuestados tienen en la información que encuentran en redes sociales.</li>
          <li><strong>Tiempo en Celular:</strong> Tiempo promedio diario que los encuestados pasan en sus dispositivos móviles, indicando el grado de conexión con el mundo digital.</li>
          <li><strong>Influencias:</strong> La influencia que los amigos o conocidos tienen en el contenido que los encuestados consumen, reflejando la presión social y el capital social (Bourdieu).</li>
          <li><strong>Publicidad:</strong> Actitud de los encuestados hacia la publicidad en redes sociales, que puede indicar su disposición a aceptar mensajes comerciales y cómo estos impactan su visión de productos y servicios.</li>
          <li><strong>Decisiones de Compra:</strong> Grado en el que las redes sociales influyen en las decisiones de compra de los encuestados, relacionándose con el poder persuasivo de las plataformas.</li>
        </ul>
        <p>Este análisis permite explorar cómo el tiempo de uso, las creencias, y la confianza en las redes sociales influyen en el tipo de contenido consumido y en las decisiones de compra. Desde una perspectiva de Pierre Bourdieu, estos aspectos reflejan el capital social y cultural de los usuarios, así como su disposición a participar en la economía de consumo moderna influenciada por redes sociales.</p>`
  return (
    <div className="container">
      <h2 className="chart-title-main">
        Encuesta anónima sobre Consumo de Información y Uso de Redes Sociales en Jóvenes de 18 a 22 Años: Relaciones con la Sociedad y el Capital Cultural
      </h2>
      
      <ChartPage
        title="Uso de Aplicaciones Financieras y Preferencia de Recursos Financieros"
        description="Este gráfico muestra la preferencia de los encuestados por diferentes recursos financieros, como fintech, bancos tradicionales y criptomonedas. Permite analizar cómo los jóvenes eligen manejar sus finanzas."
        chart={<StackedBarChart width={600} height={400} data={filteredData} />}
        svg="/assets/undraw_bitcoin_re_urgq.svg"
      />

      <ChartPage
        title="Relación entre Tipo de Contenido Preferido y Tiempo en Celular"
        description="Este gráfico analiza la relación entre el tipo de contenido que prefieren los jóvenes para informarse y el tiempo que pasan en el celular. Proporciona una perspectiva sobre cómo el tiempo de uso afecta el consumo de diferentes tipos de información."
        chart={<HeatmapChart width={600} height={400} data={filteredData} />}
        svg="/assets/undraw_social_ideas_re_j5v4.svg"
      />

      <ChartPage
        title="Confianza e Influencia en Decisiones de Compra"
        description="Este gráfico muestra cómo la confianza en la información de redes sociales y la influencia de amigos afectan las decisiones de compra de los encuestados. Es útil para entender los factores sociales en las decisiones de compra."
        chart={<SankeyApproximation width={600} height={400} data={filteredData} />}
        svg="/assets/undraw_social_distancing_2g0u.svg"
      />

      <ChartPage
        title="Influencia de Amigos en Decisiones de Compra"
        description="Este gráfico presenta la influencia de los amigos de los encuestados en sus decisiones de compra. Examina el rol que juegan las relaciones sociales en el comportamiento de consumo."
        chart={<ScatterPlot width={600} height={400} data={filteredData} />}
        svg="/assets/undraw_social_sharing_re_pvmr.svg"
      />

      <ChartPage
        title="Análisis Sociológico de Comportamiento en Redes Sociales"
        description="Este radar chart explora cinco aspectos clave del comportamiento en redes sociales, incluyendo confianza, tiempo, influencias, publicidad, y decisiones. Analiza cómo estos factores se relacionan con conceptos de capital social y cultural."
        chart={<RadarPage />}
        secondaryDescription={secondaryDescriptionHTML}
      />
    </div>
  );
};

export default App;