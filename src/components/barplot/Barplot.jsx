import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import "./Barplot.css"
import { left } from '@popperjs/core';

// Registra los componentes necesarios para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Barplot = () => {
    const usuariosTotales = [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3];
    const impresionesTotales = [2, 3, 20, 5, 1, 4, 2, 3, 20, 5, 1, 4];
    const eje_X = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const totalUsuarios = usuariosTotales.reduce((a, b) => a + b, 0);
    const totalImpresiones = impresionesTotales.reduce((a, b) => a + b, 0);

    const data = {
        labels: eje_X,
        datasets: [
            {
                label: `Usuarios totales\n  ${totalUsuarios}`,
                data: usuariosTotales,
                backgroundColor: '#2029FF',
                barPercentage: 1.0,
                categoryPercentage: 0.7,
            },
            {
                label: `Impresiones totales\n ${totalImpresiones}`,
                data: impresionesTotales,
                backgroundColor: '#666CFF',
                barPercentage: 1.0,
                categoryPercentage: 0.7,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: 'Gráfico de Barras por Mes',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                stacked: false,
            },
        },
    };

    return (
        <div className="container-fluid sinPadding">

                <div className="row cantidades mt-5 back-white">
                    <div className='col-2 barra_lateral'>
                        <p className='leyenda_barplot '>
                            <span class="blue-dot-user"></span>Usuarios totales
                        </p>
                        <p className='totales'>123123</p>
                    </div>
                    <div className='col'style={{ paddingLeft: '20px' }}>
                        <p className='leyenda_barplot' >
                            <span class="blue-dot-impresiones"></span>Impresiones totales
                        </p>
                        <p className='totales'>123123</p>
                    </div>

                </div>
                <div className="row back-white">
                    <div className="col barplot">
                        <div style={{ height: '100%' }}>
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Barplot;