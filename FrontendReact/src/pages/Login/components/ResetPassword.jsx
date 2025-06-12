import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import image from "../../../assets/LogIn/background.webp"
import { useParams, useSearchParams } from 'react-router';
import { authServicio } from '../../../services/api';
const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // null, 'success', 'error'
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('Mínimo 8 caracteres');
    if (!/[A-Z]/.test(password)) errors.push('Una letra mayúscula');
    if (!/[a-z]/.test(password)) errors.push('Una letra minúscula');
    if (!/\d/.test(password)) errors.push('Un número');

    return errors;
  };

  const getPasswordStrength = (password) => {
    const errors = validatePassword(password);
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (errors.length === 0) return { strength: 100, text: 'Muy fuerte', color: 'text-green-600' };
    if (errors.length <= 2) return { strength: 75, text: 'Fuerte', color: 'text-blue-600' };
    if (errors.length <= 3) return { strength: 50, text: 'Media', color: 'text-yellow-600' };
    return { strength: 25, text: 'Débil', color: 'text-red-600' };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Limpiar mensaje de estado general
    if (status) {
      setStatus(null);
      setMessage('');
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    console.log(token)
    // Validar contraseña
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = 'La contraseña no cumple con los requisitos';
    }

    // Validar confirmación
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Por favor confirma tu contraseña';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    setStatus(null);
    setMessage('');

    try {
      // Aquí llamarías a tu función de Firebase
      const dataEnviar = {
        email: email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        token: token,

      }
      console.log(dataEnviar)
      const result =await authServicio.cambiarContrasena(dataEnviar);
      console.log(result)

      setStatus('success');
      setMessage('¡Contraseña actualizada exitosamente! Ya puedes iniciar sesión con tu nueva contraseña.');
    } catch (error) {
      setStatus('error');
      setMessage('Hubo un error al actualizar la contraseña. El enlace puede haber expirado.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ password: '', confirmPassword: '' });
    setStatus(null);
    setMessage('');
    setErrors({});
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div><img src="" alt="" /></div>
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Contraseña actualizada!
          </h2>
          <p className="text-gray-600 mb-8">
            Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Ir al inicio de sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Crear nueva contraseña
          </h2>
          <p className="text-gray-600 text-sm">
            Tu nueva contraseña debe ser diferente a las anteriores
          </p>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          {/* Nueva contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Nueva contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Ingresa tu nueva contraseña"
                disabled={isLoading}
                className={`w-full text-sm px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Indicador de fortaleza */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">Fortaleza de contraseña</span>
                  <span className={passwordStrength.color + ' font-medium'}>
                    {passwordStrength.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.strength >= 75 ? 'bg-green-500' :
                      passwordStrength.strength >= 50 ? 'bg-blue-500' :
                        passwordStrength.strength >= 25 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    style={{ width: `${passwordStrength.strength}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Requisitos de contraseña */}
            {formData.password && (
              <div className="mt-3 space-y-1">
                {validatePassword(formData.password).map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-red-600">
                    <AlertCircle className="w-3 h-3" />
                    <span>Falta: {req}</span>
                  </div>
                ))}
              </div>
            )}

            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirma tu nueva contraseña"
                disabled={isLoading}
                className={`w-full text-sm px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all ${errors.confirmPassword ? 'border-red-300 bg-red-50' :
                  formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-green-300 bg-green-50' :
                    'border-gray-300'
                  } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Indicador de coincidencia */}
            {formData.confirmPassword && (
              <div className="mt-2 flex items-center gap-2 text-xs">
                {formData.password === formData.confirmPassword ? (
                  <>
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-green-600">Las contraseñas coinciden</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3 text-red-600" />
                    <span className="text-red-600">Las contraseñas no coinciden</span>
                  </>
                )}
              </div>
            )}

            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Mensaje de estado */}
          {message && (
            <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${status === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
              'bg-red-50 text-red-700 border border-red-200'
              }`}>
              {status === 'success' ? (
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{message}</span>
            </div>
          )}

          {/* Botón de actualizar */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !formData.password || !formData.confirmPassword}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Actualizando contraseña...
              </div>
            ) : (
              'Actualizar contraseña'
            )}
          </button>
        </div>

        {/* Footer informativo */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-start gap-2 text-xs text-gray-500">
            <Lock className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <p>
              Tu contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, números y símbolos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;