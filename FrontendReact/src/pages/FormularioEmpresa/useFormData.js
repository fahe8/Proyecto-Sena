import { useState } from 'react';

export function useFormData() {
  const [formData, setFormData] = useState({
    // Datos del representante
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    
    // Datos de la empresa
    nombreEmpresa: '',
    direccion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    alert('Formulario enviado con éxito!');
  };

  return { formData, handleChange, handleSubmit };
}