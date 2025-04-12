import React, { useEffect, useState, useRef } from "react";
const LazyBackground = ({ imageUrl, className,children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect(); // Detiene la observación después de cargar
        }
      },
      { threshold: 0.1 } // Se activa cuando el 10% del div es visible
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={divRef}
      className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      style={{
        backgroundImage: isLoaded ? `url(${imageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
};

export default LazyBackground;
