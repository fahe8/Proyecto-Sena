import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LazyBackground from '../../utils/LazyBackground'
import { EyeIcon, EyeOffIcon, KeyIcon, LetterIcon } from '../../assets/IconosSVG/iconos';
import Loading from '../Login/components/Loading';
import LogPopUp from '../Login/components/logPopUp';
import { authServicio } from '../../services/api.js';
import { useAuth } from '../../Provider/AuthProvider.jsx';
import BackToHome from '../../components/BackToHome.jsx';

const LoginEmpresa = () => {
    const { guardarToken, setUser, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState({ show: false, message: '', subText: '' });
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await handleLogin();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        const { email, password } = formData;

        const userData = {
            role: "propietario", // ✅ Cambio principal: role propietario
            email,
            password,
        };

        try {
            const response = await authServicio.loginUsuario(JSON.stringify(userData));
            guardarToken(response.data.data.token);
            setUser(response.data.data.usuario);
            setIsAuthenticated(true);
            showSuccessMessage("Inicio de sesión exitoso", "Bienvenido al panel de propietario.");
            console.log("Inicio de sesión exitoso:", response.data);
        } catch (error) {
            handleError(error);
        }
    };

    const showSuccessMessage = (title, message) => {
        // ✅ Redirección a interfaz de propietario
        navigate("/interfazPropietario", {
            state: {
                showPopup: true,
                popupMessage: title,
                popupSubText: message
            }
        });
    };

    const showErrorMessage = (message) => {
        setPopup({
            show: true,
            message: "Error",
            subText: message
        });
    };

    const handleError = (error) => {
        console.log("El error que llega es:", error);
        const mensajeError = error.response?.data?.message || "Ocurrió un error inesperado.";
        showErrorMessage(mensajeError);
    };

    const stayThere = () => {
        // Mantener en la página actual
    };

    const goToInterfazPropietario = () => {
        navigate("/interfazPropietario");
    };

    return (
        <LazyBackground imageUrl="/src/assets/LogIn/background.webp" className="p-0 m-0 relative bg-cover w-screen h-screen">
            <div className="flex absolute w-screen h-screen bg-[#00000037] items-center z-20">
                <div className="relative w-110 p-[30px] px-10 bg-white rounded-[8px] font-[Arial] m-0 mx-auto shadow-md z-10">
                    <>
                    <BackToHome/>
                        <div className="flex justify-start gap-3 items-center mt-2 mb-[20px]">
                            <a href="/login"
                                className="px-4 py-[4px] hover:border-[#003044] hover:border-b-2 hover:text-[#003044] text-[14px]" >
                                Usuario
                            </a>
                            <div className="border-b-2 border-[#003044] px-4 py-[4px] text-[14px] text-[#003044] cursor-default">
                                Empresa
                            </div>
                        </div>

                        <h2 className="text-center text-lg mb-5 font-semibold text-[#333]">
                            {"Inicia sesión"}
                        </h2>
                    </>
                    <form onSubmit={handleSubmit}>
                        <div className="relative mb-[20px]">
                            <div className="absolute top-[35px] left-[10px] text-[13px] text-[#777] pt-[5px] cursor-pointer">
                                <LetterIcon className='text-[#003044]' />
                            </div>
                            <label htmlFor="email" className="block mb-[8px] text-[15px] text-[#555]">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Ingresa tu correo electrónico..."
                                className="w-full pl-10 pr-4 py-3 h-[46px] border border-gray-300 rounded-md text-[15px]"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="form-group relative mb-[20px]">
                            <label htmlFor="password" className="block mb-[8px] text-[15px] text-[#555]">
                                Contraseña
                            </label>
                            <div className="absolute top-[35px] left-[10px] text-[13px] text-[#777] pt-[5px] cursor-pointer">
                                <KeyIcon className='text-[#003044]' />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Ingresa tu contraseña..."
                                className="w-full pl-10 pr-4 py-3 h-[46px] border border-gray-300 rounded-md text-[15px]"
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            <div
                                className="absolute top-[38px] right-[15px] text-[13px] text-[#777] pt-[5px] cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeOffIcon className='text-[#003044]' /> : <EyeIcon className='text-[#003044]' />}
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-[22px] text-[14px] my-5">
                            <a
                                href="/recuperar-contrasena"
                                className={`block text-right text-[#1a6079] text-[14px] no-underline block-button`}
                            >
                                Olvidó su contraseña
                            </a>

                            <div className="flex items-center no-underline">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    className="mr-2 ml-[2px] accent-[rgba(9,167,46,0.912)]"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                />
                                <label htmlFor="rememberMe">Recuérdame</label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-[46px] bg-[#003044] border-none text-white text-[16px] rounded-[25px] mb-[15px] cursor-pointer hover:bg-[#1a6079] duration-200 transition ease-in-out disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="mb-[20px] mt-[15px] border-b border-[#ddd]"></div>
                    <div className="flex justify-between mt-[20px] text-[17px] text-[#555]">
                        <p className="text-[#555]">
                            ¿Eres nuevo aquí?
                        </p>
                        <a
                            href="/registro-empresa"
                            className="text-[#003044] underline cursor-pointer hover:text-[#1a6079]"
                        >
                            Registrarse como propietario
                        </a>
                    </div>
                </div>

                {loading && (
                    <div className="absolute left-1/2 top-0 translate-x-[-50%] bg-black/50 w-screen h-screen z-50 flex items-center">
                        <Loading />
                    </div>
                )}

                {popup.show && (
                    <LogPopUp
                        setShowPopUp={(show) => setPopup({ ...popup, show })}
                        message={popup.message}
                        subText={popup.subText}
                        onClose={() =>
                            popup.message === "Error" ? stayThere() : goToInterfazPropietario()
                        }
                    />
                )}
            </div>
        </LazyBackground>
    )
}

export default LoginEmpresa