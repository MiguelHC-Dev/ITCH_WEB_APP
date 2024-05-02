import React, { useEffect, useRef, useState } from 'react'; // Importa useRef
import imgPorciento from '../../img/porciento.png';
import imgCorrecto from '../../img/correcto.png';
import imgAula from '../../img/aula.png';
import styles from '../Home.module.css';
import Chart from 'chart.js/auto';
import NavbarComplex from '../NavbarComplex';


function Home() {

    const chartRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        const ctx = document.getElementById('myChart').getContext('2d');
        if (chartRef.current !== null) {
            chartRef.current.destroy();
        }

        const categories = ['Servicio social', 'Inglés', 'Residencia'];
        const students = [150, 200, 100];

        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Estudiantes inscritos',
                    data: students,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1.5
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                maintainAspectRatio: false // Puede ser útil para mantener la gráfica dentro de su contenedor
            }
        });

        // Limpieza en el desmontaje
        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [windowWidth]); // Dependencia al ancho de la ventana para re-renderizar en redimensionamiento

    return (
        <div className={styles.mainContainer} >
        <NavbarComplex />
            <section id="home" className='lg:px-8 px-0'>
                <div className='flex flex-col md:flex-row justify-between mt-10 '>
                    <div className='text-left  mb-10 md:mb-0 text-sm sm:text-md'>
                        <h2 className='text-blue-900 text-xl text-left text-left font-semibold'>Departamento de Gestión Tecnológica y Vinculación</h2>
                        <p className='mt-5'><strong>Lorena García Rodriguez</strong></p>
                        
                        <p className='mb-2'>Jefa del Dpto. de Gestión de Vinculación</p>
                        <p><strong>Horario de Atención:</strong> 8:00 a 15:00 hrs y 17:00 a 20:00</p>
                        <p><strong>Número Telefónico:</strong> 7474541300, ext. 1223</p>
                        <p><strong>Oficina de Servicio Social:</strong> 7474541300, ext. 1337</p>
                        <p><strong>Correo:</strong> ejemplo@chilpancingo.tecnm.mx</p>
                    </div>
                    <div className='md:w-2/5 w-full h-auto m-0'>
                        <canvas id="myChart" className='w-full h-auto'></canvas>
                    </div>
                </div>
            </section>

            <section id="requerimientos" className='mt-14 font-semibold text-md'>
                <h2 className='text-md'>Requisitos para cursar el Servicio Social:</h2> <br />
                <div className='md:flex grid-cols-1  sm:justify-around 	 mt-12'>
                    <div className='flex justify-center items-center mb-24 md:mb-0'>
                    <div className={styles.card}>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                        <div className={styles.cardInner}>
                            <img src={imgPorciento} alt="Porcentaje" />
                            <p>Cumplir el 70% de avance reticular</p>
                        </div>
                    </div>
                    </div>
                     
                    <div className='flex justify-center items-center mb-24 md:mb-0'>

                    <div className={styles.card}>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                        <div className={styles.cardInner}>
                            <img src={imgCorrecto} alt="Correcto" />
                            <p>Estar inscrito al momento de registrar el servicio</p>
                        </div>
                    </div>
                    </div>

                    <div className='flex justify-center items-center'>

                    <div className={styles.card}>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                        <div className={styles.cardInner}>
                            <img src={imgAula} alt="Aula" />
                            <p>Asistir a la junta de inducción</p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

            
        </div>
    );
}

export default Home;
