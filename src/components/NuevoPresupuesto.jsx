import { useState } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({ 
    presupuesto, 
    setPresupuesto, 
    isValidPresupuesto,
    setIsValidPresupuesto 
}) => {

    const [mensaje, setMensaje] = useState('')

// Funcion para manejar y enviar el presupuesto
    const handlePresupuesto = (e) => {
        e.preventDefault();

        if(!presupuesto || presupuesto < 0) {
            setMensaje('No es un presupuesto válido')
            return; // De esta forma rompemos el ciclo de esta función
        } 
        setMensaje('') // Reseteamos cuando el presupuesto es válido

        setIsValidPresupuesto(true); // Comienza en 0 en App y una vez que "Añado" un valor al presupuesto, cambia el state a true
    }  

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                
                <label>Definir Presupesto</label>

                <input 
                    className='nuevo-presupuesto'
                    type="number"
                    placeholder="Añade tu Presupuesto"
                    value={presupuesto} // Este valor viene de App, del useState que arranca en 0
                    onChange={e => setPresupuesto(Number(e.target.value))} // Para actualizar el valor del input
                />

            </div>

            <input 
                type="submit"
                value="Añadir"
            />
            
            {/* Mostramos el mensaje cuando no es válido el valor del input */}
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        </form>


    </div>
  )
}

export default NuevoPresupuesto