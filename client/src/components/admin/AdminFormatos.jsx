import NavbarComplex from '../NavbarComplex';
import React, { useState } from 'react';
import styles from './AdminFormatos.module.css';


import imgDocumentopng from '../../img/documento.png';
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from "@material-tailwind/react";

const formatosInicio = [
    { titulo: "Carta de Asignación", imagen: imgDocumentopng },
    { titulo: "Tarjeta de control", imagen: imgDocumentopng },
    { titulo: "Solicitud Servicio Social", imagen: imgDocumentopng },
    { titulo: "Carta compromiso", imagen: imgDocumentopng },
    { titulo: "Plan de trabajo", imagen: imgDocumentopng }
];

const formatosDurante = [
    { titulo: "Reporte bimestral 1", imagen: imgDocumentopng },
    { titulo: "Reporte bimestral 2", imagen: imgDocumentopng }
];

const formatosFinal = [
    { titulo: "Reporte bimestral 3", imagen: imgDocumentopng },
    { titulo: "Reporte bimestral final", imagen: imgDocumentopng }
];

function Formatos() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const [fileName, setFileName] = useState(''); // Estado para el nombre del archivo
    // Maneja el cambio en el input de archivo
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Obtiene el archivo seleccionado
        if (file) {
            setFileName(file.name); // Actualiza el estado con el nombre del archivo
        } else {
            setFileName(''); // Limpia el nombre del archivo si no hay archivo seleccionado
        }
    };

    return (
        <div>
            <NavbarComplex />
            <section className="mt-10">
                <div className='w-full  h-full sm:px-24 md:flex md:flex-row flex-col justify-start gap-4 h-10 md:mb-10 mb-8'>
                    <h1 className="text-2xl font-semibold text-blue-900 md:mb-10">Formatos de inicio</h1>
                    <Button color="orange" className='h-10' onClick={handleOpen}>Agregar Formato</Button>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 justify-items-center sm:px-24 gap-10">
                    {formatosInicio.map((formato, index) => (
                        <div key={index} className="grid-item w-full">
                            <img src={formato.imagen} alt={`Imagen ${index + 1}`} className='size-40 m-auto' />
                            <div className="text-container mt-2 mb-1">
                                <h2>{formato.titulo}</h2>
                            </div>
                            <div className='w-full flex flex-col gap-1 lg:px-3'>
                                <Button color="blue" className='w-full'>Descargar</Button>
                                <Button color="red" className='w-full'>Eliminar</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-16">
                <div className='w-full  h-full sm:px-24 md:flex md:flex-row flex-col justify-start gap-4 h-10 md:mb-10 mb-8'>
                    <h1 className="text-2xl font-semibold text-blue-900 md:mb-10">Formatos durante el Servicio</h1>
                    <Button color="orange" className='h-10' onClick={handleOpen}>Agregar Formato</Button>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 justify-items-center sm:px-24 gap-10">
                    {formatosDurante.map((formato, index) => (
                        <div key={index} className="grid-item w-full">
                            <img src={formato.imagen} alt={`Imagen ${index + 1}`} className='size-40 m-auto' />
                            <div className="text-container mt-2 mb-1">
                                <h2>{formato.titulo}</h2>
                            </div>
                            <div className='w-full flex flex-col gap-1 lg:px-3'>
                                <Button color="blue" className='w-full'>Descargar</Button>
                                <Button color="red" className='w-full'>Eliminar</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-16">
                <div className='w-full  h-full sm:px-24 md:flex md:flex-row flex-col justify-start gap-4 h-10 md:mb-10 mb-8'>
                    <h1 className="text-2xl font-semibold text-blue-900 md:mb-10">Formatos al final del Servicio</h1>
                    <Button color="orange" className='h-10' onClick={handleOpen}>Agregar Formato</Button>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 justify-items-center sm:px-24 gap-10">
                    {formatosFinal.map((formato, index) => (
                        <div key={index} className="grid-item w-full">
                            <img src={formato.imagen} alt={`Imagen ${index + 1}`} className='size-40 m-auto' />
                            <div className="text-container mt-2 mb-1">
                                <h2>{formato.titulo}</h2>
                            </div>
                            <div className='w-full flex flex-col gap-1 lg:px-3'>
                                <Button color="blue" className='w-full'>Descargar</Button>
                                <Button color="red" className='w-full'>Eliminar</Button>
                            </div>

                        </div>
                    ))}
                </div>
            </section>

            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Agregar Formato
                        </Typography>

                        <Typography className="-mb-3" variant="h6">
                            Nombre del documento
                        </Typography>
                        <Input label="Documento" size="lg" />

                        <label for="file" class={styles.fileUploadLabel}>
                            <div class={styles.fileUploadDesign}>
                                <svg viewBox="0 0 640 512" height="1em">
                                    <path
                                        d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                                    ></path>
                                </svg>
                                <p className='hidden sm:block'>Arrastre y suelte el archivo</p>
                                <p className='hidden sm:block'>O</p>
                                <span class={styles.browseButton}>Buscar Documento</span>
                            </div>
                            <input id="file" type="file" onChange={handleFileChange}/>
                        </label>
                        {fileName && (
                            <Typography variant="paragraph" color="blue-gray" className="text-center">
                                Archivo seleccionado: {fileName}
                            </Typography>
                        )}

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleOpen} fullWidth>
                            Subir Documento
                        </Button>


                    </CardFooter>
                </Card>
            </Dialog>

        </div>
    );
}

export default Formatos;
