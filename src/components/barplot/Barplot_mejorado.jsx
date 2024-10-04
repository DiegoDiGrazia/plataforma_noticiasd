import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar } from 'react-chartjs-2';
import { formatNumberMiles } from '../Dashboard/Dashboard.jsx';

const BarplotUpdate = (ejeX_1, ejeX_2, desde, hasta) => {



    const Totales1 = ejeX_1.reduce((a, b) => a + b, 0);
    const Totales2 = ejeX_2.reduce((a, b) => a + b, 0);

    const dataReal = {
        labels: fechas.slice(cantidad_meses), ///leyenda eje x
        datasets: [
            {
                label: `Usuarios totales\n  ${Totales1}`,
                data: ejeX_1,
                backgroundColor: '#2029FF',
                barPercentage: 1.0,
                categoryPercentage: 0.7,
            },
            {
                label: `Impresiones totales\n ${Totales2}`,
                data: ejeX_2,
                backgroundColor: '#666CFF',
                barPercentage: 1.0,
                categoryPercentage: 0.7,
            },
        ],
    };

    const optionsReal = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true, // Habilita el tooltip
                callbacks: {
                    label: function(context) {
                        // Devuelve solo el valor de la barra (el número)
                        return context.raw;
                    },
                    title: function() {
                        // Retorna un string vacío para no mostrar el título
                        return '';
                    }
                },
                backgroundColor: '#f5f5f5', // Cambia el color de fondo del tooltip
                bodyColor: '#333', // Cambia el color del texto del valor
                borderColor: '#999', // Opcional, para agregar un borde
                borderWidth: 1, // Establece el grosor del borde (opcional)
            },
        },
        scales: {
            x: {
                offset: true,
                grid: {
                    offset: false,
                    color: 'rgba(128, 128, 128, 0.1)',
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(128, 128, 128, 0.1)',
                },
            },
        },
    };


    
    // Mostrar el gráfico real una vez cargados los datos
    return (
        <div className="container-fluid sinPadding">
            <div className="row cantidades mt-3 back-white">
            <div className='col-4 barra_lateral'>
                <p className='leyenda_barplot'>
                    <span className="blue-dot-user"></span> Usuarios Redes Sociales
                    <img src="/images/help-circle.png" alt="Descripción" className="info-icon" title= "aca va el texto"/>  
                </p>
                <p className='totales'>{formatNumberMiles(Totales1)}</p>
            </div>
                <div className='col' style={{ paddingLeft: '20px' }}>
                    <p className='leyenda_barplot'>
                        <span className="blue-dot-impresiones"></span>Usuarios Medios
                        <img src="/images/help-circle.png" alt="Descripción" className="info-icon" title= "aca va el texto"/>  
                    </p>
                    <p className='totales'>{formatNumberMiles(Totales2)}</p>
                </div>
            </div>
            <div className="row back-white">
                <div className="col barplot">
                    <div style={{ height: '100%' }}>
                        <Bar data={dataReal} options={optionsReal} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarplotUpdate;