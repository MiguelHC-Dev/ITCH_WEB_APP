import React, { useEffect, useState } from 'react';
import NavbarComplex from './NavbarComplex';
import documento from '../img/documento.png'; // Asegúrate de tener la ruta correcta a la imagen
import { Button } from "@material-tailwind/react";
import { useAuth } from '../context/AuthContext'; // Asegúrate de tener la ruta correcta al contexto

function Formatos() {
    const { token } = useAuth(); // Obtener el token desde el contexto
    const [tiposFormato, setTiposFormato] = useState([]);
    const [formatos, setFormatos] = useState({}); // Un objeto para almacenar los formatos por tipo

    useEffect(() => {
        fetchTiposFormato();
    }, [token]); // Añadir token como dependencia para re-ejecutar useEffect si cambia

    const fetchTiposFormato = async () => {
        // Fetch para obtener los tipos de formato
        try {
            const response = await fetch('http://localhost:8000/tiposformatos/', {
                headers: {
                    'Authorization': `Token ${token}` // Usar el token en las peticiones
                }
            });
            const tipos = await response.json();
            setTiposFormato(tipos);
            tipos.forEach(tipo => {
                fetchFormatosPorTipo(tipo.id);
            });
        } catch (error) {
            console.error('Failed to fetch tipos formato:', error);
        }
    };

    const fetchFormatosPorTipo = async (tipoId) => {
        try {
            const response = await fetch(`http://localhost:8000/formatosPorTipo/${tipoId}`, {
                headers: {
                    'Authorization': `Token ${token}` // Usar el token en las peticiones
                }
            });
            const formatosData = await response.json();
            setFormatos(prev => ({...prev, [tipoId]: formatosData}));
        } catch (error) {
            console.error(`Failed to fetch formatos for tipo_formato_id ${tipoId}:`, error);
        }
    };

    const handleDownload = async (formatoId, nombreFormato) => {  // Añadir nombreFormato como parámetro
        try {
            const response = await fetch(`http://localhost:8000/descargar-formato/${formatoId}`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to download file');
            }
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = nombreFormato;  // Usar el nombre del formato aquí
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };
    
    // En el renderizado de cada formato:
    

    return (
        <div>
            <NavbarComplex />
            {tiposFormato.map((tipo) => (
                <section key={tipo.id} className="mt-10">
                    <h1 className="text-2xl font-semibold text-blue-900 mb-10">{tipo.nombre_formato}</h1>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 justify-items-center sm:px-24 gap-10">
                        {formatos[tipo.id]?.map((formato, index) => (
                            <div key={index} className="grid-item">
                                <img src={documento} alt={`Formato ${index + 1}`} className='size-40' />
                                <div className="text-container mt-2 mb-1">
                                    <h2>{formato.nombre_formato}</h2>
                                </div>
                                <Button color="blue" onClick={() => handleDownload(formato.id, formato.nombre_formato)}>Descargar</Button>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}

export default Formatos;
