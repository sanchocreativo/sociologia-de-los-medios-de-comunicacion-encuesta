import React, {useState} from 'react';
import StackedBarChart from './StackedBarChart';
import SankeyApproximation from './SankeyApproximation';
import HeatmapChart from './HeatmapChart';
import ScatterPlot from './ScatterPlot';
import RadarPage from './RadarPage';
import './App.css';
import data from './encuesta.json';
import BubbleChart from './GenderBubble';
import BarChart from './BarChart';
import SocialBubble from './SocialBubble';

const timeOnPhoneData = [
  { category: '1 a 3 horas', Femenino: 5, Masculino: 10 },
  { category: '3 a 5 horas', Femenino: 10, Masculino: 15 },
  { category: 'Más de 5 horas', Femenino: 20, Masculino: 10 },
];

const financeAppData = [
  { category: 'Fintech', Femenino: 25, Masculino: 10 },
  { category: 'Bancarias Tradicionales', Femenino: 10, Masculino: 20 },
];


const ChartPage = ({ title, description, chart, svg, secondaryDescription, className }) => (
  <div className={`custom-row ${className}`}>
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

const ChartPage2 = ({ title, description, chart, svg, secondaryDescription, className }) => (
  <div className={`custom-row ${className}`}>
    <div className="custom-col-4 custom-col-6-content">
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
    <div className="custom-col-8 custom-col-6-content">
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
  const secondHTML = `<h3>Uso de aplicaciones financieras por género: Análisis Sociológico</h3> 
      <p>
        <strong>Capital Cultural:</strong> La confianza en redes sociales refleja un conocimiento y habilidad para navegar en entornos digitales, donde la persona aplica su entendimiento sobre fuentes y confiabilidad de la información, lo cual constituye un tipo de capital cultural digital. Este capital cultural varía según el nivel de experiencia en internet y habilidades críticas.
      </p>
    
      <p>
        <strong>Capital Social:</strong> Las redes sociales en sí mismas también actúan como un tipo de capital social. Si alguien sigue influenciadores o grupos confiables para recomendaciones, está utilizando su red para obtener información que considera de valor, aumentando su capital social en términos de pertenencia a comunidades que comparten intereses.
      </p>`
        return (
    <div className="container">
      <h2 className="chart-title-main">
        Encuesta anónima sobre Consumo de Información y Uso de Redes Sociales en Jóvenes de 18 a 22 Años: Relaciones con la Sociedad y el Capital Cultural
      </h2>
      <ChartPage2
        title="Empecemos con el Género (y redes sociales)"
        description="Este gráfico muestra el género de los encuestados y su relacion con el mayor uso de redes sociales de cada genero"
        svg="https://sanchocreativo.github.io/sociologia-de-los-medios-de-comunicacion-encuesta/assets/gender-symbols-svgrepo-com.svg"
        className="svgChart"
        chart={<BubbleChart width={1000} height={600} data={filteredData} />
      }
      />
      <div style={{height: '700px', position: 'relative'}}>
          <SocialBubble />
  </div>
<ChartPage
        description=""
        chart={ <BarChart
          data={timeOnPhoneData}
          width={600}
          height={400}
          yMax={30}
          xKey="category"
          keys={['Femenino', 'Masculino']}
          colors={['#FFB1C1', '#9AD0F5']}
        />}
        svg="https://sanchocreativo.github.io/sociologia-de-los-medios-de-comunicacion-encuesta/assets/undraw_shopping_re_hdd9.svg"
        secondaryDescription={`<h3>Tiempo diario en el celular por género</h3>`}
      />

<ChartPage
        description=""
        chart={    <BarChart
          data={financeAppData}
          width={600}
          height={400}
          yMax={30}
          xKey="category"
          keys={['Femenino', 'Masculino']}
          colors={['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)']}
        />}
        secondaryDescription={secondHTML}
      />
      
      <ChartPage
        title="Uso de Aplicaciones Financieras y Preferencia de Recursos Financieros"
        description="Este gráfico muestra la preferencia de los encuestados por diferentes recursos financieros, como fintech, bancos tradicionales y criptomonedas. Permite analizar cómo los jóvenes eligen manejar sus finanzas."
        chart={<StackedBarChart width={600} height={400} data={filteredData} />}
        svg="https://sanchocreativo.github.io/sociologia-de-los-medios-de-comunicacion-encuesta/assets/undraw_bitcoin_re_urgq.svg"
      />

      <ChartPage
        title="Relación entre Tipo de Contenido Preferido y Tiempo en Celular"
        description="Este gráfico analiza la relación entre el tipo de contenido que prefieren los jóvenes para informarse y el tiempo que pasan en el celular. Proporciona una perspectiva sobre cómo el tiempo de uso afecta el consumo de diferentes tipos de información."
        chart={<HeatmapChart width={600} height={400} data={filteredData} />}
        svg="https://sanchocreativo.github.io/sociologia-de-los-medios-de-comunicacion-encuesta/assets/undraw_social_ideas_re_j5v4.svg"
      />

      <ChartPage
        title="Confianza e Influencia en Decisiones de Compra"
        description="Este gráfico muestra cómo la confianza en la información de redes sociales y la influencia de amigos afectan las decisiones de compra de los encuestados. Es útil para entender los factores sociales en las decisiones de compra."
        chart={<SankeyApproximation width={500} height={400} data={filteredData} />}
        svg="https://sanchocreativo.github.io/sociologia-de-los-medios-de-comunicacion-encuesta/assets/undraw_social_distancing_2g0u.svg"
        secondaryDescription={`  <p>
        <strong>Capital Económico:</strong> Si la persona usa redes sociales para informarse antes de una compra, está aprovechando su capital económico (su capacidad de compra). Al usar redes sociales para comparar opciones, busca maximizar el valor de su dinero.
      </p>`}
      />

      <ChartPage
        title="Influencia de Amigos en Decisiones de Compra"
        description="Este gráfico presenta la influencia de los amigos de los encuestados en sus decisiones de compra. Examina el rol que juegan las relaciones sociales en el comportamiento de consumo."
        chart={<ScatterPlot width={600} height={400} data={filteredData} />}
        svg="https://sanchocreativo.github.io/sociologia-de-los-medios-de-comunicacion-encuesta/assets/undraw_social_sharing_re_pvmr.svg"
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