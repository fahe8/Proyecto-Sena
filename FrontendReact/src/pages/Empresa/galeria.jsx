import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({images}) => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Imágenes de ejemplo (usando URLs de Unsplash para demostración)
  // const images = [
  //   {
  //     id: 1,
  //     src: 'https://images.pexels.com/photos/47343/the-ball-stadion-horn-corner-47343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     alt: 'Interior de avión',
  //     title: 'Cabina de pasajeros'
  //   },
  //   {
  //     id: 2,
  //     src: 'https://images.pexels.com/photos/918798/pexels-photo-918798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     alt: 'Playa tropical',
  //     title: 'Destino paradisíaco'
  //   },
  //   {
  //     id: 3,
  //     src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  //     alt: 'Montañas',
  //     title: 'Paisaje montañoso'
  //   },
  //   {
  //     id: 4,
  //     src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
  //     alt: 'Naturaleza',
  //     title: 'Bosque natural'
  //   },
  //   {
  //     id: 5,
  //     src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=600&fit=crop',
  //     alt: 'Ciudad',
  //     title: 'Paisaje urbano'
  //   }
  // ];
// console.log('images que llegan al carrousel:', images && images[currentImage].url)
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
      {/* Imagen principal */}
      <div className="relative h-96 bg-black">
        <img
          src={images[currentImage].url}
          alt={"Imagen de la cancha"}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay con información */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h3 className="text-white text-xl font-semibold mb-2">
            {/* Eliminado el contenido problemático */}
          </h3>
          <p className="text-gray-300 text-sm">
            {currentImage + 1} de {images.length}
          </p>
        </div>

        {/* Botones de navegación */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Miniaturas */}
      <div className="bg-gray-800 p-4">
        <div className="flex gap-3 justify-center overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index} // Cambiado de image.id a index para garantizar una key única
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 relative group ${
                index === currentImage 
                  ? 'ring-2 ring-blue-400' 
                  : 'hover:ring-2 hover:ring-gray-400'
              } rounded-lg overflow-hidden transition-all duration-200`}
            >
              <img
                src={image.url}
                alt={"previzualización de las imagenes del carrousel"}
                className="w-20 h-16 object-cover"
              />
              {index === currentImage && (
                <div className="absolute inset-0 bg-blue-400/20"></div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;