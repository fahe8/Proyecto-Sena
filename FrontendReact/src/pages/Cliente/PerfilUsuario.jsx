import React, { useState, useEffect } from "react";
import cancha2 from "./imagen/cancha2.jpg";
import canchasi from "./imagen/canchasin.png";
import Header from "../../Header/Header";
import insignia from "./imagen/insignia.png";
import Calendario from "./Calendario/Calendario";

const imagen = {
  gps: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  ),
  insignia: <img src={insignia} alt="Insignia" />,
  estrella: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#FFC107"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
      />
    </svg>
  ),

  Tienda: (
    <svg 
    height="25px" 
    width="25px" 
    version="1.1" 
    id="_x32_" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
	  viewBox="0 0 512 512"  
    xml:space="preserve">
    <style 
    type="text/css">
      
    </style>
<g>
	<path 
  fill="#00A36C"
  class="st0" d="M33.394,458.311h242.247V318.635h116.323v139.676h86.642V222.61H33.394V458.311z M120.69,318.635h69.838
		v69.838H120.69V318.635z"/>
	<path 
  fill="#00A36C"
  class="st0" d="M310.836,368.565c-5.877,0-10.64,4.77-10.64,10.644v35.46c0,5.873,4.764,10.636,10.64,10.636
		c5.874,0,10.637-4.763,10.637-10.636v-35.46C321.473,373.335,316.71,368.565,310.836,368.565z"/>
	<polygon class="st0" points="230.104,53.689 158.593,53.689 143.977,196.421 226.22,196.421 	" fill="#00A36C"/>
	<polygon class="st0" points="368.026,196.421 353.408,53.689 281.896,53.689 285.781,196.421 	" fill="#00A36C"/>
	<polygon class="st0" points="512,196.421 478.606,53.689 405.207,53.689 427.591,196.421 	" fill="#00A36C"/>
	<polygon class="st0" points="106.794,53.689 33.394,53.689 0,196.421 84.409,196.421 	" fill="#00A36C"/>

</g>
</svg>
  ),

  flecha: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  ),
  flechaIzq: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  ),

  arbitro: (
    
    <svg 
    fill="#00A36C" 
    height="25px" 
    width="25px" 
    stroke-width="9.9" 
    stroke="#00A36C"
    version="1.1" 
    id="Layer_1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512 512" 
   xml:space="preserve">
<g>
	<g>
		<path 
    d="M315.528,313.54c-17.121-17.12-39.917-26.549-64.19-26.549c-24.271,0-47.068,9.428-64.188,26.548
			c-35.395,35.396-35.395,92.987-0.001,128.381c17.121,17.12,39.918,26.549,64.19,26.549c24.272,0,47.069-9.429,64.189-26.549
			c17.121-17.121,26.549-39.917,26.549-64.189C342.077,353.457,332.649,330.661,315.528,313.54z M303.995,430.386
			c-14.041,14.041-32.74,21.773-52.657,21.773s-38.617-7.732-52.657-21.773c-29.035-29.034-29.035-76.278,0-105.313
			c14.041-14.041,32.74-21.772,52.656-21.772c19.916,0,38.616,7.732,52.657,21.773c14.041,14.038,21.774,32.739,21.774,52.656
			C325.768,397.646,318.036,416.347,303.995,430.386z"/>
	</g>
</g>
<g>
	<g>
		<path 
    d="M453.99,131.068l-67.173-67.173c0-0.001-0.001-0.001-0.002-0.002L325.308,2.388c-3.185-3.184-8.349-3.184-11.532,0
			L94.885,221.277c-52.351,52.353-52.351,137.536,0,189.888l61.508,61.508C181.754,498.033,215.472,512,251.337,512
			c35.864,0,69.583-13.967,94.943-39.326c52.352-52.353,52.352-137.535,0-189.888l-16.239-16.238l123.948-123.944
			C457.175,139.417,457.175,134.254,453.99,131.068z M113.15,226.08l29.582-29.583l27.584,27.584l-30.546,30.547l-27.584-27.584
			L113.15,226.08z M118.548,397.03c0.652,4.67,1.562,9.305,2.722,13.875c0.092,0.367,0.186,0.735,0.283,1.103
			c0.311,1.186,0.635,2.369,0.98,3.548c0.025,0.087,0.047,0.175,0.072,0.261l-16.186-16.186
			c-44.054-44.054-45.904-114.567-5.564-160.851l33.148,33.148c1.592,1.592,3.68,2.388,5.766,2.388s4.174-0.796,5.766-2.388
			l42.079-42.08c1.53-1.53,2.389-3.603,2.389-5.767c0-2.164-0.86-4.236-2.389-5.767l-33.35-33.35L319.542,19.687l49.975,49.976
			c-13.734,13.734-27.468,27.468-41.202,41.202c-28.48,28.48-56.962,56.962-85.442,85.442
			c-24.215,24.215-48.429,48.43-72.644,72.644c-12.983,12.983-25.841,25.637-34.969,41.823c-1.174,2.083-2.295,4.196-3.36,6.338
			C119.699,341.646,114.752,369.86,118.548,397.03z M312.744,260.781c-1.53,1.53-2.389,3.603-2.389,5.767s0.859,4.236,2.389,5.767
			l22.005,22.004c45.993,45.993,45.993,120.828,0,166.821c-22.28,22.28-51.902,34.55-83.411,34.55
			c-31.51,0-61.132-12.269-83.411-34.55c-5.75-5.749-10.78-11.949-15.091-18.487c-1.078-1.634-2.111-3.29-3.099-4.965
			c-26.995-45.756-19.331-105.849,18.19-143.369L381.051,81.195l55.64,55.641L312.744,260.781z"/>
	</g>
</g>
</svg>
  ),

  bar: (
  <svg 
 width="25px" 
 height="25px"
 viewBox="0 0 1024 1024" 
 xmlns="http://www.w3.org/2000/svg">
  <path
   fill="#00A36C" 
   d="M768 64a192 192 0 1 1-69.952 370.88L480 725.376V896h96a32 32 0 1 1 0 64H320a32 32 0 1 1 0-64h96V725.376L76.8 273.536a64 64 0 0 1-12.8-38.4v-10.688a32 32 0 0 1 32-32h71.808l-65.536-83.84a32 32 0 0 1 50.432-39.424l96.256 123.264h337.728A192.064 192.064 0 0 1 768 64zM656.896 192.448H800a32 32 0 0 1 32 32v10.624a64 64 0 0 1-12.8 38.4l-80.448 107.2a128 128 0 1 0-81.92-188.16v-.064zm-357.888 64 129.472 165.76a32 32 0 0 1-50.432 39.36l-160.256-205.12H144l304 404.928 304-404.928H299.008z"/>
   </svg>
  ),

  baños: (
    <svg 
    fill="#00A36C" 
    version="1.1" 
    id="Capa_1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="25px" 
    height="25px" 
    viewBox="0 0 264.884 264.885"
    xml:space="preserve">
 <g>
   <g>
     <path d="M17.884,54.724c0,9.057,4.123,17.45,11.32,23.042c5.176,4.023,11.357,6.144,17.866,6.144
       c6.508,0,12.683-2.121,17.863-6.144c7.194-5.591,11.317-13.99,11.317-23.042c0-16.09-13.089-29.181-29.181-29.181
       C30.978,25.543,17.884,38.634,17.884,54.724z M47.07,39.88c8.186,0,14.844,6.663,14.844,14.844c0,4.6-2.103,8.865-5.773,11.719
       c-5.276,4.095-12.865,4.095-18.141,0c-3.675-2.854-5.778-7.12-5.778-11.719C32.221,46.538,38.883,39.88,47.07,39.88z"/>
     <path d="M9.754,181.974c0.56,0.267,1.158,0.472,1.75,0.687c0.301,0.112,0.579,0.252,0.884,0.35v21.884v0.159v14.436
       c0,9.357,8.295,16.974,18.493,16.974h1.687c5.664,0,10.739-2.343,14.132-6.034c3.351,4.153,8.7,6.855,14.72,6.855h1.664
       c10.116,0,18.347-7.621,18.347-16.979v-15.388v-22.21c0.593-0.215,1.144-0.49,1.701-0.757c0.24-0.111,0.501-0.195,0.737-0.321
       c0.516-0.275,0.982-0.593,1.465-0.901c0.259-0.168,0.542-0.312,0.789-0.49c0.437-0.312,0.822-0.676,1.218-1.017
       c0.25-0.215,0.527-0.411,0.761-0.64c0.374-0.354,0.688-0.756,1.022-1.144c0.215-0.257,0.46-0.48,0.661-0.747
       c0.31-0.41,0.565-0.854,0.835-1.288c0.168-0.275,0.369-0.527,0.518-0.807c0.261-0.485,0.458-0.999,0.667-1.508
       c0.104-0.257,0.245-0.499,0.336-0.761c0.191-0.551,0.31-1.13,0.434-1.694c0.053-0.247,0.142-0.472,0.182-0.719
       c0.138-0.826,0.214-1.666,0.214-2.524v-57.62c0-13.43-14.26-25.195-23.508-26.28l-3.441-0.306l-2.437,2.333
       c-1.286,1.228-2.735,2.327-4.296,3.269c-7.866,4.698-18.043,4.373-25.527-0.665c-1.055-0.707-2.13-1.586-3.192-2.595l-1.988-1.988
       l-3.412-0.163C14.414,83.375,0,96.422,0,109.77v57.601c0,0.896,0.082,1.774,0.235,2.633c0.065,0.383,0.206,0.747,0.301,1.115
       c0.119,0.462,0.21,0.938,0.371,1.387c0.145,0.396,0.354,0.765,0.532,1.152c0.185,0.401,0.334,0.812,0.553,1.199
       c0.24,0.42,0.542,0.808,0.817,1.209c0.222,0.312,0.401,0.648,0.642,0.947c0.329,0.416,0.721,0.784,1.094,1.167
       c0.243,0.252,0.453,0.532,0.712,0.766c0.46,0.42,0.976,0.793,1.486,1.167c0.215,0.158,0.406,0.345,0.625,0.494
       c0.593,0.396,1.234,0.737,1.878,1.073C9.416,181.773,9.572,181.886,9.754,181.974z M14.328,109.77c0-4.534,5.64-9.75,9.08-11.474
       c0.779,0.621,1.559,1.195,2.348,1.725c11.994,8.067,28.319,8.564,40.879,1.071c1.244-0.745,2.438-1.552,3.58-2.422
       c3.593,2.049,8.417,7.015,8.417,11.101v57.601c0,0.626-1.132,1.723-2.987,2.096c-0.283,0.061-0.574,0.08-0.822,0.099l-7.278,0.187
       l-0.016,0.746l-0.376,0.01l-0.14,6.884c0,0.103-0.005,0.485-0.005,1.046l-0.147,0.63l0.147,0.989
       c0.014,5.913,0.072,19.929,0.091,24.89v15.359c0,1.251-1.715,2.642-4.009,2.642h-1.664c-2.293,0-4.014-1.391-4.014-2.642v-41.089
       h-20.68v40.272c0,1.246-1.783,2.637-4.163,2.637h-1.687c-2.38,0-4.156-1.391-4.156-2.637l0.065-39.908l0.173-1.694l-0.32-8.76
       l-7.341,0.429h-0.1c-0.479,0-1.4-0.009-1.643-0.023c-2-0.312-3.232-1.475-3.232-2.161V109.77z"/>
     <path d="M240.877,215.521V180.21c1.797-0.304,4.279-0.695,7.71-1.19c1.036-0.149,1.717-0.261,1.829-0.289
       c8.513-1.718,14.468-8.363,14.468-16.139l-12.498-58.456c-0.588-13.068-14.44-24.369-23.494-25.426l-3.436-0.306l-2.44,2.334
       c-1.283,1.227-2.73,2.326-4.298,3.269c-7.869,4.697-18.048,4.366-25.52-0.661c-0.972-0.651-1.951-1.439-3.146-2.543l-1.904-2.04
       l-3.547-0.168c-10.528,0-24.558,12.499-25.155,25.541l-12.33,56.943l-0.163,1.513c0,8.041,6.436,14.901,15.275,16.315
       c0.84,0.136,1.708,0.215,2.59,0.243l0.77,0.037c0.057,0,3.048-0.009,6.235-0.028v35.545c0,9.357,8.298,16.979,18.501,16.979h1.689
       c5.661,0,10.729-2.352,14.132-6.039c3.346,4.154,8.694,6.852,14.715,6.852h1.666C232.644,232.495,240.877,224.878,240.877,215.521
       z M226.708,172.532l-0.41,1.75l0.242,1.602v39.637c0,1.246-1.717,2.638-4.014,2.638h-1.666c-2.291,0-4.009-1.392-4.009-2.638
       v-41.089h-20.68v40.272c0,1.251-1.778,2.642-4.158,2.642h-1.686c-2.38,0-4.163-1.391-4.163-2.642l0.062-39.875l0.195-1.723
       l-0.42-8.48l-7.191,0.149c-0.883,0.019-10.986,0.065-12.909,0.075l-0.5-0.028c-0.289-0.009-0.574-0.019-0.877-0.069
       c-1.685-0.267-2.819-1.125-3.137-1.807l12.219-56.439l0.158-1.517c0-4.534,5.643-9.749,9.092-11.474
       c0.771,0.621,1.554,1.195,2.338,1.725c11.999,8.067,28.315,8.573,40.889,1.071c1.232-0.735,2.417-1.538,3.575-2.422
       c3.594,2.044,8.41,7.015,8.41,11.101l12.386,57.946c-0.298,0.621-1.32,1.438-2.697,1.713l-1.228,0.183
       C231.753,166.979,228.239,167.487,226.708,172.532z"/>
     <path d="M206.509,20.764c-16.093,0-29.179,13.091-29.179,29.181c0,9.057,4.125,17.45,11.322,23.046
       c5.181,4.018,11.35,6.14,17.86,6.14s12.69-2.122,17.87-6.145c7.192-5.591,11.313-13.989,11.313-23.042
       C235.697,33.855,222.605,20.764,206.509,20.764z M215.582,61.664c-5.273,4.095-12.862,4.095-18.137,0
       c-3.673-2.854-5.777-7.12-5.777-11.719c0-8.186,6.664-14.843,14.846-14.843c8.191,0,14.846,6.662,14.846,14.843
       C221.359,54.544,219.254,58.814,215.582,61.664z"/>
     <path d="M131.707,256.698V8.186c0-3.958-3.206-7.168-7.168-7.168s-7.169,3.211-7.169,7.168v248.512
       c0,3.958,3.207,7.169,7.169,7.169S131.707,260.656,131.707,256.698z"/>
   </g>
 </g>
 </svg>
  ),

  carro : (
<svg 
height="25px" 
width="25px" 
version="1.1" 
id="_x32_" 
xmlns="http://www.w3.org/2000/svg" 
xmlns:xlink="http://www.w3.org/1999/xlink" 
viewBox="0 0 512 512"  
xml:space="preserve">
<style 
type="text/css">
</style>
<g>
	<path 
  fill="#00A36C"
  class="st0" d="M494.934,227.26h-35.293l-97.828-87.586H222.961L111.48,227.26l-91.887,17.954
		C8.33,246.648,0,256.205,0,267.469v69.017h60.697l0.502,0.002v-0.002h0.24c0-34.884,28.264-63.146,63.146-63.146
		c34.887,0,63.148,28.262,63.148,63.146h152.102l1.258,0.002v-0.002h0.24c0-34.884,28.264-63.146,63.146-63.146
		c34.885,0,63.146,28.262,63.146,63.146H512v-92.16C512,234.906,504.356,227.26,494.934,227.26z M158.818,227.076l73.631-57.842
		h88.1l0.305,0.001v58.026h-91.639L158.818,227.076z M348.16,169.233h3.211l44.576,39.936v18.09H348.16V169.233z"/>
	<path 
  fill="#00A36C"
  class="st0" d="M404.48,300.647c-19.797,0-35.84,16.111-35.84,35.84c0,19.798,16.043,35.84,35.84,35.84
		c19.73,0,35.84-16.042,35.84-35.84C440.32,316.758,424.211,300.647,404.48,300.647z"/>
	<path 
  fill="#00A36C"
  class="st0" d="M124.586,300.647c-19.797,0-35.84,16.111-35.84,35.84c0,19.798,16.043,35.84,35.84,35.84
		c19.73,0,35.84-16.042,35.84-35.84C160.426,316.758,144.316,300.647,124.586,300.647z"/>
</g>
</svg>

  ),
};

// implemento este componente para el Carrusel
const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para moverse a la siguiente imagen
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para moverse a la imagen anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // aca le coloco  cambio automático de imágenes cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-lg overflow-hidden mb-6">
      <div className="w-full h-64 bg-gray-200">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md"
        aria-label="Anterior"
      >
        {imagen.flechaIzq}
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md"
        aria-label="Siguiente"
      >
        {imagen.flecha}
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-white" : "bg-white/50"
              }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Perfil = () => {
  const [selectedField, setSelectedField] = useState("Fútbol 7");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);



  const [showBookingSummary, setShowBookingSummary] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Lucas Morales",
      date: "13/04/2023",
      fieldType: "Fútbol 7",
      rating: 4,
      comment:
        "Reservar esta cancha fue muy sencillo y la calidad del césped sintético es impresionante. Mis amigos y yo disfrutamos de un partido increíble sin ningún inconveniente. Definitivamente volveré a reservar aquí.",
    },
    {
      id: 2,
      name: "María Gómez",
      date: "13/04/2023",
      fieldType: "Fútbol 5",
      rating: 5,
      comment:
        "Me encantó jugar en esta cancha. El espacio es amplio, las condiciones son perfectas, y además ofrecen un servicio al cliente excelente. Lo recomendaría a cualquiera que quiera pasar un buen rato.",
    },
    {
      id: 3,
      name: "Javier Torres",
      date: "13/04/2023",
      fieldType: "Fútbol 7",
      rating: 5,
      comment:
        "La cancha está en perfectas condiciones, y el proceso de reserva fue rápido y sin complicaciones. El césped se siente casi natural. Fue una gran experiencia para todos.",
    },
  ]);
  const [newReview, setNewReview] = useState({
    name: "Usuario Actual",
    fieldType: selectedField,
    rating: 5,
    comment: "",
  });
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Imágenes que implementarios al carrusel
  const carouselImages = [cancha2, canchasi];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectField = (field) => {
    setSelectedField(field);
    setIsDropdownOpen(false);
    setNewReview({ ...newReview, fieldType: field });
  };

  const toggleOpenStatus = () => {
    setIsOpen(!isOpen);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;

    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      date: formattedDate,
      fieldType: newReview.fieldType,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    setReviews([review, ...reviews]);
    setNewReview({ ...newReview, comment: "", rating: 5 });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handlePayment = () => {
    setShowBookingSummary(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* encabezado de navegacion */}
      <Header />

      {/* Contenido principal*/}
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column: Venue info */}
          <div className="md:col-span-2">
            <div className="bg-white shadow-md pr-25 pl-25 pt-10 mb-6 ">
              {/* Venue header */}
              <div className="flex items-start mb-4">
                <div className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-gray-600">🏟️</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-lg">Canchas MeteGol</h2>
                  <div className="flex">
                    {imagen.gps}
                    <p className="text-sm text-gray-500">
                      Calle 3 N°00-00 Barrio salado
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between text-center">
                  
                    <span className="flex flex-col items-center text-xs mr-5 ml-6">
                      <span className="mr-1 w-8 h-auto">
                        {imagen.insignia}
                      </span>
                      <p className="font-semibold">Preferido</p>
                       </span>
                

                  <div className=" text-sm text-gray-600">
                    <button
                      className={`text-white px-4 py-2 w-16 rounded-md text-sm transition duration-100 ease-in-out ${isOpen
                        ? " text-green-400 dark:text-green-500"
                        : "text-red-500 dark:text-red-500"
                        }`}
                      onClick={toggleOpenStatus}
                    >
                      {isOpen ? "Abierto" : "Cerrado"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Carrusel - reemplaza el grid de 2 columnas */}
              <Carousel images={carouselImages} />

              {/* Informacion del empresario */}
              <div className="flex items-center mb-4">
                <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <span className="text-gray-600">👤</span>
                </div>
                <div>
                  <h3 className="font-medium">Encargado: Juan Avila</h3>
                </div>
              </div>

              {/* Descripcion de la empresa */}
              <p className="text-sm text-gray-700 mb-6">
                Canchas MeteGoles una empresa especializada en la administración
                y alquiler de canchas sintéticas de última generación. Ofrecemos
                espacios deportivos de alta calidad para fútbol 5, 7 y 9, con
                césped sintético de alta resistencia, iluminación LED, graderías
                cómodas y vestuarios equipados. Nuestras canchas garantizan
                durabilidad, confort y un excelente rendimiento para jugadores
                de todos los niveles.
              </p>

              {/* Canchas disponibles que los usuarios visualizan */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Canchas disponibles:</h3>
                <div className="space-y-2 max-w-70">
                  <div className="flex justify-between bg-gray-100 px-3 py-2 rounded-md">
                    <span className="text-sm">Fútbol 5</span>
                    <span className="text-sm text-gray-500">(3)</span>
                  </div>
                  <div className="flex justify-between bg-gray-100 px-3 py-2 rounded-md">
                    <span className="text-sm">Fútbol 7</span>
                    <span className="text-sm text-gray-500">(2)</span>
                  </div>
                  <div className="flex justify-between bg-gray-100 px-3 py-2 rounded-md">
                    <span className="text-sm">Fútbol 9</span>
                    <span className="text-sm text-gray-500">(3)</span>
                  </div>
                  <div className="flex justify-between bg-gray-100 px-3 py-2 rounded-md">
                    <span className="text-sm">Fútbol 11</span>
                    <span className="text-sm text-gray-500">(1)</span>
                  </div>
                </div>
              </div>

              <hr className="my-6" />

              {/* Servicios adicionales */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Servicios adicionales:</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center text-sm">
                    <span className="mr-2"><div>{imagen.arbitro}</div> </span>
                   

                    <span>Árbitro</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2"><div>{imagen.baños}</div></span>
                    <span>Baños</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2">
                      <div> {imagen.Tienda}</div>
                    </span>

                    <span>Tienda</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2"><div>{imagen.bar}</div></span> 
                    <span>Bar</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2">{imagen.carro}</span>
                    <span>Parqueadero</span>
                  </div>
                </div>
              </div>

              <hr className="my-6" />

              {/* valoracion general de usuarios */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Valoración general:</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1"></span>{" "}
                    {imagen.estrella}
                    <span className="font-medium">4.8</span>
                    <span className="text-gray-500 text-sm ml-1">(23)</span>
                    <div className="ml-3 bg-gray-100 px-2 py-1 rounded-md text-sm">
                      {reviews.length} Reseñas
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">5</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">4</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full w-1/5"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">3</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full w-0"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">2</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full w-0"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 text-sm mr-2">1</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full w-0"></div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-6" />


              {/* opiniones de usuarios  */}
              <div className="space-y-6">
                <h3 className="font-medium mb-3">Reseñas de usuarios:</h3>

                {/* Mostrar reseñas de usuarios  */}
                {reviews
                  .slice(0, showAllReviews ? reviews.length : 3)
                  .map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                            <span className="text-gray-600">👤</span>
                          </div>
                          <span className="font-medium">{review.name}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {review.date} - {review.fieldType}
                        </div>
                      </div>
                      <div className="flex text-yellow-500 mb-2">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                          ))}
                      </div>
                      <p className="text-sm">"{review.comment}"</p>
                    </div>
                  ))}

                {reviews.length > 3 && (
                  <div className="text-center">
                    <button
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                      {showAllReviews
                        ? "Mostrar menos"
                        : "Mostrar todas las reseñas"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* pie de pagina */}
            <div className="text-center text-sm text-gray-500 mb-6"></div>
          </div>
          {/*aca fabian coloca el calendario */}
          <div className="flex justify-center ">
            <div className="fixed">
              <Calendario />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;