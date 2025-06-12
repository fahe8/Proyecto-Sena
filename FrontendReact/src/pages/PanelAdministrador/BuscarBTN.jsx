import React, { useEffect, useRef, useState } from "react";

const BuscarBTN = () => {
  // Estados
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Referencias
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Abrir/Cerrar el input
  const handleClick = () => {
    setIsOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        setTimeout(() => inputRef.current?.focus(), 100);
      } else {
        setSearch("");
      }
      return nextState;
    });
  };

  const handleChange = (e) => setSearch(e.target.value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Dropdown con Tailwind CSS */}
      <div className="relative text-center">
        <div
          ref={containerRef}
          className={` border border-green-400 relative inline-flex items-center p-1 rounded-full transition-all duration-400 ${
            isOpen
              ? "bg-opacity-100 bg-white"
              : " hover:bg-gray-50"
          }`}
        >
          <input
            ref={inputRef}
            onChange={handleChange}
            placeholder="Buscar..."
            value={search}
            type="text"
            className={`max-w-0 p-0 outline-none bg-transparent text-gray-800 font-['Poppins'] text-lg transition-all duration-400 ${
              isOpen ? "max-w-[300px] px-5" : ""
            }`}
          />
          <button
            onClick={handleClick}
<<<<<<< HEAD
            className={`flex items-center justify-center w-9 h-9 rounded-full text-2xl transition-all duration-300 ${
=======
            className={`flex items-center justify-center w-[50px] h-[50px] rounded-full text-2xl transition-all duration-300 cursor-pointer ${
>>>>>>> b163683687ab589bd05847ec61d89c848221a080
              isOpen
                ? "bg-green-400 text-white"
                : "bg-green-400 text-white"
            }`}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuscarBTN;
