import React, { useState, useEffect } from 'react'
import InfoCanchas from '../../FormularioEmpresa/InfoCanchas'
import { canchasServicio } from '../../../services/api'
import { useNavigate } from 'react-router-dom'
import LogPopUp from "../../Login/components/logPopUp"
import { useAuth } from '../../../Provider/AuthProvider'

const AgregarCancha = () => {
  const {user} = useAuth()
  const [canchasData, setCanchasData] = useState([{
    nombre: '',
    tipo_cancha_id: '',
    id_estado_cancha: '',
    imagen: '',
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
    console.log(canchasData)
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
        erroresCancha.imagen = "La imagen es obligatoria"
        esValido = false
      } else if (!(cancha.imagen instanceof File)) {
        erroresCancha.imagen = "Debe seleccionar un archivo de imagen válido"
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
    console.log(validarCanchas())
    console.log(errors)
    if (!validarCanchas()) return
    
    try {
      console.log('Cancha a enviar', canchasData)
      for (const cancha of canchasData) {
        const canchaFormData = new FormData();
        canchaFormData.append('nombre', cancha.nombre);
        canchaFormData.append('precio', cancha.precio);
        canchaFormData.append('NIT', user.NIT);
        canchaFormData.append('id_estado_cancha', cancha.id_estado_cancha);
        canchaFormData.append('tipo_cancha_id', cancha.tipo_cancha_id);
        
        // Agregar imagen de la cancha si existe
        if (cancha.imagen instanceof File) {
          canchaFormData.append('imagen', cancha.imagen);
        }
        for (let pair of canchaFormData.entries()) {
          console.log(pair[0] + ':', pair[1]);
        }
        const canchaResponse = await canchasServicio.agregar(canchaFormData);
        console.log('Cancha creada:', canchaResponse.data);
      }
      
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
    <div className='w-full px-4 py-6 min-h-screen bg-gradient-to-br from-slate-100 to-blue-50'>
      <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-[#003044] mb-4 sm:mb-6">Agregar Canchas</h1>
        
        <InfoCanchas 
          data={canchasData}
          onAddCancha={handleAddCancha}
          onChange={handleChange}
          onRemoveCancha={handleRemoveCancha}
          errors={errors}
        />
        
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4">
          <button 
            onClick={() => navigate('/InterfazPropietario')}
            className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button 
            onClick={guardarCanchas}
            className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors cursor-pointer"
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
