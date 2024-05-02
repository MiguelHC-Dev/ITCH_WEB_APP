import React, { useEffect, useState } from 'react'
import NavbarComplex from './NavbarComplex'
import { useAuth } from '../context/AuthContext';
import { Select, Option } from "@material-tailwind/react";
import SuccessModal from './SuccessModal';
import {
    Card,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
} from "@material-tailwind/react";

function MisDatos() {

    const { user, token, servicioSocial } = useAuth(); // hook useAuth para acceder al usuario y al token del contexto
    const [carreras, setCarreras] = useState([]); // Estado para almacenar las carreras disponibles y mostrarlas en el select
    const [datosUsuario, setDatosUsuario] = useState({});//Estado para almacenar los datos del usuario
    const [datosServicio, setDatosServicio] = useState({}); // Estado para almacenar los datos del servicio social del usuario


    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [inputErrors, setInputErrors] = useState({});

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState({});
    const [passwordChangeError, setPasswordChangeError] = useState('');
    const [generalMessage, setGeneralMessage] = useState(''); // Se agrega generalMessage al estado

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');


    const handleCloseSuccessModal = () => setShowSuccessModal(false);


    const handleOpenPasswordModal = () => {
        setOpenPasswordModal(!openPasswordModal);
        setGeneralMessage(''); // Se limpia el mensaje general al abrir/cerrar el modal
        setPasswordErrors({}); // Se limpian los errores específicos también
        setCurrentPassword(''); // Se limpian los campos de contraseña
        setNewPassword('');
    };

    const handleOpenModal = () => setOpenModal(!openModal);

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handlePasswordChange = async () => {
        const errors = {};

        if (!currentPassword) {
            errors.currentPassword = 'La contraseña actual es obligatoria.';
        }
        if (!newPassword) {
            errors.newPassword = 'La nueva contraseña es obligatoria.';
        }
        if (newPassword.length < 8) {
            errors.newPassword = 'La nueva contraseña debe tener al menos 8 caracteres.';
        }
        if (newPassword.length > 50) {
            errors.newPassword = 'La nueva contraseña no puede tener más de 50 caracteres.';
        }

        if (newPassword.includes(' ')) {
            errors.newPassword = 'La nueva contraseña no puede contener espacios en blanco.';
        }

        if (newPassword === currentPassword) {
            errors.newPassword = 'La nueva contraseña no puede ser igual a la actual.';
        }

        if (datosUsuario.password === newPassword) {
            errors.newPassword = 'La nueva contraseña no puede ser igual a la actual.';
        }



        setPasswordErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch(`http://localhost:8000/cambiar-contrasena/${user.id}/`, { // Asegúrate de que esta URL sea correcta
                    method: 'PATCH', // o POST si es el método requerido por tu API
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`, // Si es necesario
                    },
                    body: JSON.stringify({
                        contrasena_anterior: currentPassword,
                        nueva_contrasena: newPassword,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'No se pudo cambiar la contraseña');
                }

                // Procesa la respuesta si fue exitosa
                setOpenPasswordModal(false); // Cierra el modal
                setSuccessMessage("La contraseña se ha modificado exitosamente.");
                setShowSuccessModal(true);
            } catch (error) {
                console.error('Error al cambiar la contraseña:', error);
                setGeneralMessage("No se pudo cambiar la contraseña. Por favor, verifica que la contraseña actual sea correcta.");
            }
        }
    };




    const handleGuardarCambios = async () => {


        const errors = {};
        let errorMessage = "Por favor, corrige los siguientes errores:\n";

        if (!datosUsuario.first_name) {
            errors.first_name = true;
            errorMessage += "- El nombre es obligatorio.\n";
        }

        if (!datosUsuario.last_name) {
            errors.last_name = true;
            errorMessage += "- El apellido es obligatorio.\n";
        }

        if (!datosUsuario.carrera) {
            errors.carrera = true;
            errorMessage += "- La carrera es obligatoria.\n";
        }

        if (!datosUsuario.username) {
            errors.username = true;
            errorMessage += "- El número de control es obligatorio.\n";
        }

        if (!datosServicio.nombre_programa) {
            errors.nombre_programa = true;
            errorMessage += "- El nombre del programa es obligatorio.\n";
        }

        if (!datosServicio.area) {
            errors.area = true;
            errorMessage += "- El área es obligatoria.\n";
        }

        if (!datosServicio.dependencia_organizacion) {
            errors.dependencia_organizacion = true;
            errorMessage += "- La dependencia u organización es obligatoria.\n";
        }

        if (!datosServicio.titular_organizacion) {
            errors.titular_organizacion = true;
            errorMessage += "- El titular de la organización es obligatorio.\n";
        }

        if (!datosServicio.cargo_titular) {
            errors.cargo_titular = true;
            errorMessage += "- El cargo del titular de la organización es obligatorio.\n";
        }

        if (Object.keys(errors).length > 0) {
            setInputErrors(errors);
            setModalMessage(errorMessage);
            setOpenModal(true); // Aquí es donde necesitas pasar true para abrir el modal
        } else {
            const updateData = {
                first_name: datosUsuario.first_name,
                last_name: datosUsuario.last_name,
                carrera: datosUsuario.carrera,
                username: datosUsuario.username,
            };


            try {
                const responseUsuario = await fetch(`http://localhost:8000/usuario/${user.id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateData),
                });

                if (!responseUsuario.ok) {
                    throw new Error('No se pudieron guardar los cambios');
                }

                const resultDatosUsuario = await responseUsuario.json();
                setDatosUsuario(resultDatosUsuario);


                // Si la solicitud fue exitosa entonces se vuelve a hacer una solicitud para actualizar los datos de servicio social del usuario

                const responseServicioSocial = await fetch(`http://localhost:8000/serviciosocial/${servicioSocial.id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datosServicio),
                });

                // console.log('Datos de servicio social enviados para hacer el patch:', datosServicio);

                if (!responseServicioSocial.ok) {
                    throw new Error('No se pudieron guardar los cambios');
                }

                const resultDatosServicio = await responseServicioSocial.json();
                setDatosServicio(resultDatosServicio);

                console.log('Datos actualizados con éxito:', resultDatosServicio);

                setSuccessMessage("Los datos se han actualizado con éxito.");
                setShowSuccessModal(true);
                login(resultDatosUsuario, token, resultDatosServicio);



            } catch (error) {
                console.error('Error al guardar los cambios:', error);
                // Maneja los errores, como mostrar un mensaje al usuario
            }
        }





    };

    // Carga inicial de datos del usuario y carreras
    useEffect(() => {
        const cargarDatos = async () => {
            await fetchUsuario();
            await fetchCarreras();
            await fetchServicioSocial();

        };

        cargarDatos();
    }, [user]); // Dependencia en 'user' para recargar cuando el usuario cambie

    const fetchUsuario = async () => {
        try {
            const response = await fetch(`http://localhost:8000/usuario/${user.id}/`, {
                headers: {
                    // 'Authorization': `Token ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('No se pudieron cargar los datos del usuario');
            }
            const data = await response.json();
            setDatosUsuario(data); // Establece todos los datos del usuario en un solo estado
        } catch (error) {
            console.error('Error al cargar los datos del usuario:', error);
        }
    };

    const fetchCarreras = async () => {
        try {
            const response = await fetch('http://localhost:8000/carrera', {
                headers: {
                    // 'Authorization': `Token ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('No se pudieron cargar las carreras');
            }
            const data = await response.json();
            setCarreras(data);
        } catch (error) {
            console.error('Error al cargar carreras:', error);
        }
    };

    const fetchServicioSocial = async () => {
        try {
            const servicioSocialResponse = await fetch(`http://localhost:8000/servicio-social/usuario/${user.id}/`, {  // Asegúrate de usar tu URL correcta
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            if (!servicioSocialResponse.ok) {
                throw new Error('No se pudieron cargar los datos del servicio social');
            }
            const data = await servicioSocialResponse.json();
            setDatosServicio(data);
        } catch (error) {
            console.error('Error al cargar los datos del servicio social:', error);
        }
    };


    // Componente CarreraSelect definido dentro de MisDatos
    const CarreraSelect = ({ carreras, carrera, setCarrera }) => {
        return (
            <Select
                label='Carrera'
                value={carrera.toString()}
                onChange={(e) => setCarrera(e)}

            >
                {carreras.map((carreraItem) => (
                    <Option key={carreraItem.id.toString()} value={carreraItem.id.toString()}>
                        {carreraItem.nombre_carrera_display}
                    </Option>
                ))}
            </Select>
        );
    };

    return (
        <div>

            <NavbarComplex />

            <section className='mt-10 '>
                <h1 className="text-2xl font-semibold text-blue-900 mb-10">Mis datos</h1>

                <div id='main' className='flex-column md:flex justify-around mb-5'>

                    <div id='container-datos-generales' className='border border-2 border-gray-300 md:w-2/5 mb-8 md:mb-0  h-fit rounded-xl overflow-hidden '>
                        <Card color="transparent" className='' shadow={false}>
                            <h2 className='bg-gray-300 text-black text-xl font-semibold py-2'>
                                Datos Generales
                            </h2>
                            <form className="mt-6 mb-2 px-6 py-2 w-full">
                                <div className="mb-1 flex flex-col gap-6">
                                    <Input
                                        size="md"
                                        label="Nombre"
                                        value={datosUsuario.first_name || ''}
                                        onChange={(e) => setDatosUsuario({ ...datosUsuario, first_name: e.target.value })}
                                        className='w-full'
                                        required
                                        error={inputErrors.first_name}
                                    />
                                    <Input
                                        size="md"
                                        label="Apellido"
                                        value={datosUsuario.last_name || ''}
                                        onChange={(e) => setDatosUsuario({ ...datosUsuario, last_name: e.target.value })}
                                        className='w-full'
                                        required
                                        error={inputErrors.last_name}
                                    />
                                    <CarreraSelect
                                        carreras={carreras}
                                        carrera={datosUsuario.carrera || ''}
                                        setCarrera={(carreraId) => setDatosUsuario({ ...datosUsuario, carrera: carreraId })}
                                        error={inputErrors.carrera}
                                    />
                                    <Input
                                        size="md"
                                        label="No. de control"
                                        value={datosUsuario.username || ''}
                                        onChange={(e) => setDatosUsuario({ ...datosUsuario, username: e.target.value })}
                                        className='w-full'
                                        required
                                        error={inputErrors.username}
                                    />

                                </div>

                            </form>
                        </Card>
                    </div>

                    <div id='container-datos-servicio' className='  border border-2 border-gray-300 md:w-2/5  h-fit rounded-xl overflow-hidden'>
                        <Card color="transparent" className='' shadow={false}>
                            <h2 className='bg-gray-300 text-black text-xl font-semibold py-2'>
                                Servicio Social
                            </h2>
                            <form className="mt-6 mb-2 px-6 py-2 w-full">
                                <div className="mb-1 flex flex-col gap-6">
                                    <Input
                                        size="lg"
                                        label="Nombre del programa"
                                        value={datosServicio.nombre_programa || ''}
                                        onChange={(e) => setDatosServicio({ ...datosServicio, nombre_programa: e.target.value })}
                                        className='w-full'
                                        required
                                        error={inputErrors.nombre_programa}
                                    />
                                    <Input
                                        size="lg"
                                        label="Área"
                                        value={datosServicio.area || ''}
                                        onChange={(e) => setDatosServicio({ ...datosServicio, area: e.target.value })}
                                        className='w-full'
                                        required
                                        error={inputErrors.area}
                                    />
                                    <Input
                                        size="lg"
                                        label="Dependencia u Organización"
                                        value={datosServicio.dependencia_organizacion || ''}
                                        onChange={(e) => setDatosServicio({ ...datosServicio, dependencia_organizacion: e.target.value })}
                                        className='w-full'
                                        required
                                        error={inputErrors.dependencia_organizacion}
                                    />
                                    <Input
                                        size="lg"
                                        label="Titular de la Organización"
                                        value={datosServicio.titular_organizacion || ''}
                                        onChange={(e) => setDatosServicio({ ...datosServicio, titular_organizacion: e.target.value })}
                                        className='w-full'
                                        required
                                        error={inputErrors.titular_organizacion}
                                    />
                                    <Input
                                        size="lg"
                                        label="Cargo del Titular de la Organización"
                                        value={datosServicio.cargo_titular || ''}
                                        onChange={(e) => setDatosServicio({ ...datosServicio, cargo_titular: e.target.value })}
                                        className='w-full'
                                        required
                                        error={inputErrors.cargo_titular}
                                    />
                                    <Input
                                        size="lg"
                                        label="Con atención a (nombre)"
                                        value={datosServicio.atencion_a_nombre || ''}
                                        onChange={(e) => setDatosServicio({ ...datosServicio, atencion_a_nombre: e.target.value })}
                                        className='w-full'
                                    />
                                    <Input
                                        size="lg"
                                        label="Con atención a (cargo)"
                                        value={datosServicio.atencion_a_cargo || ''}
                                        onChange={(e) => setDatosServicio({ ...datosServicio, atencion_a_cargo: e.target.value })}
                                        className='w-full'
                                    />
                                </div>
                            </form>
                        </Card>

                    </div>
                </div>
                <div className='flex justify-center gap-3'>
                    <Button color='blue-gray' onClick={handleOpenPasswordModal} >Cambiar Contraseña</Button>
                    <Button color='green' onClick={handleGuardarCambios}>Guardar Cambios</Button>
                </div>

            </section>

            {/* Modal para los mensajes de error */}
            <Dialog open={openModal} handler={handleOpenModal} size="xs">
                <DialogHeader>Error</DialogHeader>
                <DialogBody>
                    {modalMessage.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpenModal}>
                        <span>Cerrar</span>
                    </Button>
                </DialogFooter>
            </Dialog>


            {/* Modal para cambiar contraseña */}
            <Dialog open={openPasswordModal} handler={handleOpenPasswordModal} size="xs">
                <DialogHeader>Cambiar Contraseña</DialogHeader>
                {generalMessage && (
                    <p className="text-red-500 text-sm mt-1 mb-4 px-5">{generalMessage}</p> // Muestra el mensaje general de error
                )}
                <DialogBody>
                    <div className="relative flex w-full">



                        <Input
                            type={showCurrentPassword ? "text" : "password"}
                            label="Contraseña Actual"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="pr-20 "
                            containerProps={{
                                className: "min-w-0",
                            }}
                            error={!!passwordErrors.currentPassword} // Marca el input como erróneo si hay un mensaje de error
                            required
                        />



                        <Button size="sm" onClick={toggleShowCurrentPassword} className="!absolute right-1 top-1 rounded">
                            {showCurrentPassword ? 'Ocultar' : 'Mostrar'}
                        </Button>

                    </div>
                    {passwordErrors.currentPassword && (
                        <p className="text-red-500 text-sm mt-1">{passwordErrors.currentPassword}</p> // Muestra el mensaje de error
                    )}


                    <br />


                    <div className='relative flex w-full '>
                        <Input
                            type={showNewPassword ? "text" : "password"}
                            label="Nueva Contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            error={!!passwordErrors.newPassword} // Marca el input como erróneo si hay un mensaje de error
                            className="pr-20 "
                            containerProps={{
                                className: "min-w-0",
                            }}
                            required
                        />
                        <Button size="sm" onClick={toggleShowNewPassword} className="!absolute right-1 top-1 rounded">
                            {showNewPassword ? 'Ocultar' : 'Mostrar'}
                        </Button>
                    </div>



                    <Typography
                        variant="small"
                        color="gray"
                        className="mt-2 flex items-center gap-1 font-normal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="-mt-px h-4 w-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Use al menos 8 caracteres.
                    </Typography>
                    {passwordErrors.newPassword && (
                        <p className="text-red-500 text-sm mt-1 ">{passwordErrors.newPassword}</p> // Muestra el mensaje de error
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpenPasswordModal}>
                        Cancelar
                    </Button>
                    <Button color="green" onClick={handlePasswordChange}>
                        Guardar
                    </Button>
                </DialogFooter>
            </Dialog>



            {/* Modal de éxito */}
            <SuccessModal
                open={showSuccessModal}
                onClose={handleCloseSuccessModal}
                message={successMessage}
            />


        </div>
    )
}




export default MisDatos