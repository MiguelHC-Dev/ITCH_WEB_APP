import React, { useState, useContext } from 'react';
import NavbarComplex from './NavbarComplex';
import { useAuth } from '../context/AuthContext';

function CartaPresentacion() {
    const { user, token } = useAuth();
    const [documentUrl, setDocumentUrl] = useState('');
    const [documentGenerated, setDocumentGenerated] = useState(false); // Estado para controlar la visibilidad de los botones


    const generarCarta = async () => {
        try {
            // Obtener los datos del usuario
            const userResponse = await fetch(`http://localhost:8000/usuario/${user.id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            if (!userResponse.ok) {
                throw new Error('Error al obtener los datos del usuario');
            }

            const userData = await userResponse.json();

            // Obtener los datos del servicio social del usuario
            const socialServiceResponse = await fetch(`http://localhost:8000/servicio-social/usuario/${user.id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            if (!socialServiceResponse.ok) {
                throw new Error('Error al obtener los datos del servicio social');
            }

            const socialServiceData = await socialServiceResponse.json();

            const documentData = {
                nombre: userData.first_name,
                apellido: userData.last_name,
                numero_control: userData.username,
                carrera: userData.carrera,
                dependencia: socialServiceData.dependencia_organizacion,
                nombre_programa: socialServiceData.nombre_programa,
                titular: socialServiceData.titular_organizacion,
                cargo: socialServiceData.cargo_titular,
                atencion_nombre: socialServiceData.atencion_a_nombre,
                atencion_cargo: socialServiceData.atencion_a_cargo
            };

            const documentResponse = await fetch('http://localhost:8000/api/document/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(documentData)
            });

            if (!documentResponse.ok) {
                throw new Error('Error al generar el documento');
            }

            const blob = await documentResponse.blob();
            const url = URL.createObjectURL(blob);
            setDocumentUrl(url);
            setDocumentGenerated(true); // Cambia el estado para ocultar el botón de generar y mostrar el de descargar


        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
        <NavbarComplex />
        <section className='mt-10'>
            <h1 className="text-2xl font-semibold text-blue-900 mb-10">Carta Presentación</h1>
            {!documentGenerated && (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={generarCarta}>
                    Generar Carta Presentación
                </button>
            )}
            {documentUrl && (
                <a href={documentUrl} download="Carta_Presentacion.docx">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5">
                        Descargar Documento
                    </button>
                </a>
            )}
        </section>
    </div>
    );
}

export default CartaPresentacion;
