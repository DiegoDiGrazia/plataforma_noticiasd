import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./InteraccionPorNota.css"


const InteraccionPorNota = () => {


    return (
        <div className="container-fluid">
            <div className='row'>
                <p id= "titulo_relevantes">Notas con Mayor interaccion</p>
            </div>

            <div className='row'>
                <div className='col'>
                    <p>imagen</p>
                </div>
                <div className='col'>
                    <div className='row p-0'> 
                        aca 
                    </div>
                    <div className='row p-0'> 
                        aca
                    </div>
                </div>
                <div className='col'>
                    <p>Aca</p>
                </div>

            </div>

            <div className='row'>
                <p>Notas con Mayor interaccion</p>
            </div>
            <div className='row'>
                <p>Notas con Mayor interaccion</p>
            </div>
        </div>
    );
};

export default InteraccionPorNota;