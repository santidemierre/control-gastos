// Este componente va a tener state porque tiene un formulario

import {useState, useEffect} from 'react';
import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg';

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGastos, 
    gastoEditar,
    setGastoEditar
}) => {
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('') // 1° lo asociamos al imput "nombre"
    const [cantidad, setCantidad] = useState('') // 1° lo asociamos al imput "cantidad"
    const [categoria, setCategoria] = useState('') // 1° lo asociamos al imput "categoria"
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
          }
    }, [])
    

    // Cambio el estado de este componente, lo regresamos a false, digamos que no aparezca
    const ocultarModal = () => {

        setAnimarModal(false) // Lo regresamos a false para volver a tener la animación del formulario
        setGastoEditar({}) // Resetea el estado al finalizar un gasto editado
        setTimeout(() => {
            setModal(false) // Lo regresamos a false en un setTimeout para que tenga el CSS y la opacity de "cerrar"
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        // Si alguno de los 3 esta vacio, entonces 
        if([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los  son obligatorios')
            setTimeout(() => {
                setMensaje('')
            }, 3000);

            return;
        }

        guardarGastos({ nombre, cantidad, categoria, fecha, id }); // Funcion creada en el App
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img
                src={CerrarBtn}
                alt="cerra modal"
                onClick={ocultarModal} // Evento para cerrar el modal
            />
        </div>

        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
        >
            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>

            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>} {/* Cuando mensaje tenga algo, llama al componente */}

            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>
                <input
                    id='nombre'
                    type="text"
                    placeholder='Añade el Nombre del Gasto'
                    value={nombre}
                    onChange={ e => setNombre(e.target.value) } // Lo que se escribe aca se guarda en el value={nombre} 
                />
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>
                <input
                    id='cantidad'
                    type="number"
                    placeholder='Añade la cantidad del gasto: ej. 300'
                    value={cantidad}
                    onChange={ e => setCantidad(Number(e.target.value)) } // Lo que se escribe aca se guarda en el value={nombre} 
                />
            </div>

            <div className='campo'>
                <label htmlFor="categoria">Categoría</label>
                <select 
                    id='categoria'
                    value={categoria}
                    onChange={ e => setCategoria(e.target.value) } // Lo que se escribe aca se guarda en el value={nombre} 
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="free">Free time</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>

                </select>
            </div>

            <input 
                type="submit"
                value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto' }
            />

        </form>

    </div>
  )
}

export default Modal