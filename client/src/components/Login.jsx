import React, { useState } from 'react'; // Importa useEffect aquí
import styles from './Login.module.css'
import logoTec from '../img/tec.png'
import { useAuth } from '../context/AuthContext';


function Login() {



    const [vistaActual, setVistaActual] = useState('Estudiante');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState('');




    const irLoginPersonal = () => {
        setVistaActual('Personal');
    };

    const irLoginEstudiantes = () => {
        setVistaActual('Estudiante');
    };

    const irHomeEstudiantes = () => {
        window.location.href = '/';
    }

    const irHomePersonal = () => {
        window.location.href = '/homePersonal';
    }


    const irLoginPersonal2 = () => {
        // Redirige al panel de administrador del backend de Django
        window.location.href = "http://127.0.0.1:8000/admin/login/?next=/admin/";
    };
    

    const loginUser = async () => {
        try {
            const tipo_usuario = vistaActual;

            // Prepara los datos que vas a enviar
            const payload = {
                username: username,
                password: password,
                tipo_usuario: tipo_usuario, // Agrega el tipo de usuario al cuerpo de la solicitud
            };

            // Imprime los datos en la consola
            console.log("Enviando datos de login:", payload);

            const response = await fetch('http://localhost:8000/api/login/', {  // Asegúrate de usar tu URL correcta
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Suponiendo que el backend envía un mensaje de error en formato JSON
                setError(errorData.error || 'Error de login');
                return; // Detén la ejecución si hay un error
            }

            const data = await response.json();
            
            // Realiza una segunda solicitud para obtener los datos del servicio social
            const servicioSocialResponse = await fetch(`http://localhost:8000/servicio-social/usuario/${data.user.id}/`, {  // Asegúrate de usar tu URL correcta
                method: 'GET',
                headers: {
                    'Authorization': `Token ${data.token}`,
                },
            });

            let servicioSocialData = null;
            if (servicioSocialResponse.ok) {
                servicioSocialData = await servicioSocialResponse.json();
            }

            login(data.user, data.token, servicioSocialData);  // Incluye los datos del servicio social

            // Redirige al usuario según su tipo o a la página principal
            if (data.user.tipo_usuario === 'Estudiante') {
                window.location.href = '/';
            } else {
                window.location.href = '/homePersonal';
            }
        } catch (error) {
            console.error("Error durante el login:", error);
            setError('Error al conectar con el servidor');
        }
    };


    return (
        <div className={styles.loginWrapper}>

            <div className={styles.container} id="container">
                <div className={`${styles.formContainer} ${styles.signInContainer}`}>
                    <form className={styles.form} action="#">
                        <h1 className={styles.h1}>Iniciar sesión</h1>
                        <div className={styles.deslizables}>
                            <button
                                type="button"
                                onClick={irLoginEstudiantes}
                                className={`${vistaActual === 'Estudiante' ? styles.active : ''}  ${styles.button}`}
                                id="btnEstudiantes"
                            >
                                Estudiante
                            </button>
                            <button
                                type="button"
                                onClick={irLoginPersonal2}
                                className={`${vistaActual === 'Personal' ? styles.active : ''}  ${styles.button}`}
                                id="btnPersonal"
                            >
                                Personal
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-center pt-2 rounded-lg">{error}</p>}

                        {vistaActual === 'Estudiante' && (
                            <>
                                <input type="text" id='noControlEstudiante' placeholder="Número de control" className={styles.inputEstudiante} value={username} onChange={(e) => setUsername(e.target.value)} />
                                <input type="password" id='passwordEstudiante' placeholder="Contraseña" className={styles.inputEstudiante} value={password} onChange={(e) => setPassword(e.target.value)} />
                            </>
                        )}

                        {vistaActual === 'Personal' && (
                            <>
                                <input type="text" id='usuarioPersonal' placeholder="Usuario" className={styles.inputPersonal} value={username} onChange={(e) => setUsername(e.target.value)} />
                                <input type="password" id='passwordPersonal' placeholder="Contraseña" className={styles.inputPersonal} value={password} onChange={(e) => setPassword(e.target.value)} />
                            </>
                        )}


                        {/* <a href="#" className={`${styles.olvidoContraseña} ${styles.a}`}>Olvidaste tu contraseña?</a> */}

                        {vistaActual === 'Estudiante' && (
                            <button type="button" onClick={loginUser} className={`${styles.botonIniciarSesion} ${styles.button}`}>INICIAR SESIÓN</button>
                        )}

                        {vistaActual === 'Personal' && (
                            <button type="button" onClick={loginUser} className={`${styles.botonIniciarSesion} ${styles.button}`} >INICIAR SESIÓN</button>
                        )}

                    </form>
                </div>
                <div className={styles.overlayContainer}>
                    <div className={styles.overlay}>

                        <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                            <img src={logoTec} alt="Logo Tecnm" className={styles.logoTec} />

                            <h1 className={`${styles.welcome} ${styles.h1}`}>Bienvenido!</h1>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

