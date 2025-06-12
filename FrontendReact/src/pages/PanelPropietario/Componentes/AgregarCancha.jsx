import React, { useState, useEffect } from 'react'
import InfoCanchas from '../../FormularioEmpresa/InfoCanchas'
import { canchasServicio } from '../../../services/api'
import { useNavigate } from 'react-router-dom'
import LogPopUp from "../../Login/components/logPopUp"

const AgregarCancha = () => {
  const [canchasData, setCanchasData] = useState([{
    nombre: '',
    tipo_cancha_id: '',
    id_estado_cancha: '',
    imagen: '',
    NIT: '987654321', // NIT por defecto, podría venir de un contexto o estado global
    precio: ''
  }])
  const [errors, setErrors] = useState([{}])
  const [mostrarPopUp, setMostrarPopUp] = useState(false)
  const [textoPopUp, setTextoPopUp] = useState({ titulo: "", subtitulo: "" })
  const navigate = useNavigate()

  const handleAddCancha = () => {
    setCanchasData([...canchasData, {
      nombre: '',
      tipo_cancha_id: '',
      id_estado_cancha: '',
      imagen: '',
      NIT: '987654321',
      precio: ''
    }])
    setErrors([...errors, {}])
  }

  const handleRemoveCancha = (index) => {
    if (canchasData.length > 1) {
      const nuevasCanchas = [...canchasData]
      nuevasCanchas.splice(index, 1)
      setCanchasData(nuevasCanchas)

      const nuevosErrores = [...errors]
      nuevosErrores.splice(index, 1)
      setErrors(nuevosErrores)
    }
  }

  const handleChange = (index, field, value) => {
    const nuevasCanchas = [...canchasData]
    nuevasCanchas[index][field] = value
    setCanchasData(nuevasCanchas)

    // Limpiar error cuando el usuario corrige el campo
    if (errors[index] && errors[index][field]) {
      const nuevosErrores = [...errors]
      nuevosErrores[index] = { ...nuevosErrores[index] }
      delete nuevosErrores[index][field]
      setErrors(nuevosErrores)
    }
  }

  const validarCanchas = () => {
    let esValido = true
    const nuevosErrores = canchasData.map(cancha => {
      const erroresCancha = {}
      
      if (!cancha.nombre) {
        erroresCancha.nombre = "El nombre es obligatorio"
        esValido = false
      }
      
      if (!cancha.tipo_cancha_id) {
        erroresCancha.tipo_cancha_id = "Seleccione un tipo de cancha"
        esValido = false
      }
      
      if (!cancha.id_estado_cancha) {
        erroresCancha.id_estado_cancha = "Seleccione un estado"
        esValido = false
      }
      
      if (!cancha.imagen) {
        erroresCancha.imagen = "La URL de la imagen es obligatoria"
        esValido = false
      }
      
      if (!cancha.NIT) {
        erroresCancha.NIT = "El NIT es obligatorio"
        esValido = false
      }
      
      if (!cancha.precio || parseFloat(cancha.precio) <= 0) {
        erroresCancha.precio = "Ingrese un precio válido"
        esValido = false
      }
      
      return erroresCancha
    })
    
    setErrors(nuevosErrores)
    return esValido
  }

  const guardarCanchas = async () => {
    if (!validarCanchas()) return
    
    try {
      // Guardar cada cancha individualmente
      const promesas = canchasData.map(cancha => {
        return canchasServicio.agregar(cancha);   
      })
      await Promise.all(promesas)
      
      setTextoPopUp({
        titulo: "Canchas agregadas exitosamente",
        subtitulo: "Las canchas se han registrado correctamente"
      })
      setMostrarPopUp(true)
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/InterfazPropietario')
      }, 2000)
    } catch (error) {
      setTextoPopUp({
        titulo: "Error al guardar",
        subtitulo: error.response?.data?.message || "Ocurrió un problema al guardar las canchas"
      })
      setMostrarPopUp(true)
    }
  }

  return (
    <div className='w-full min-h-screen bg-white p-6  '>
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-[#003044] mb-6">Agregar Canchas</h1>
        
        <InfoCanchas 
          data={canchasData}
          onAddCancha={handleAddCancha}
          onChange={handleChange}
          onRemoveCancha={handleRemoveCancha}
          errors={errors}
        />
        
        <div className="mt-6 flex justify-end gap-4">
          <button 
            onClick={() => navigate('/InterfazPropietario')}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={guardarCanchas}
            className="px-4 py-2 bg-[#39de02] text-black rounded-md hover:bg-green-400 transition-colors"
          >
            Guardar Canchas
          </button>
        </div>
      </div>
      
      {mostrarPopUp && (
        <LogPopUp
          setShowPopUp={setMostrarPopUp}
          message={textoPopUp.titulo}
          subText={textoPopUp.subtitulo}
          onClose={() => setMostrarPopUp(false)}
        />
      )}
    </div>
  )
}

export default AgregarCancha
