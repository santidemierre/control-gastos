/* 
* App:
* Aca se van a guarda todos los gastos, x eso ponemos el boton add o + aca y lo distribuimos a lo largo de los componenetes
*/

import { useState, useEffect } from 'react';
import Filtros from './components/Filtros';
import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  ) // Se lo paso a la funcion guardarGastos()

// Definimos nuestro state de presupuesto y su valor es localStora:
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false) // Comienza en false xq cuanda carga la app esta en 0
  const [modal, setModal] = useState(false) // Comienza en false porque no quiero que se muestre al inicio, sino cuando haga click en el +
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({}) // Cada gasto es un objeto

  const [filtro, setFiltro] = useState('') // Lo iniciamos como un string vacio xq solo voy a filtrar por un option
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [ gastoEditar ])


  // LOCALSTORAGE PARA EL PRESUPUESTO
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]) // Va tener como dependencia el [presupuesto]

  // LOCALSTORAGE PARA LOS GASTOS
  useEffect(() => {
  
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])

  }, [gastos])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    
    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }

  }, []) // Como quiero que cargue una sola vez, dejo el [] vacio

  useEffect(() => {
    
    if(filtro) {
      // Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }

  }, [filtro]) // tiene como dependencia el filtro
  
  
  

// Cambio el estado a true para que me muestre la ventana modal
const handleNuevoGasto = () => {
  setModal(true)
  setGastoEditar({}) // Lo cambia a vacio para cada vez que se toque el boton +

  setTimeout(() => {
    setAnimarModal(true)
  }, 500);
} 

// Lo pasamos hacia el componente Modal
const guardarGastos = gasto => {
 
  if(gasto.id) {
    // Actualizar
    const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState )
    setGastos(gastosActualizados)
    setGastoEditar({})
  } else {
    // Nuevo gasto
    gasto.id = generarId() // Lo traigo de la carpeta helpers
    gasto.fecha = Date.now(); // Retorna la fecha en el que se genera ese objeto
    setGastos([...gastos, gasto]) // Hacemos una copia de los ...gastos y le agregamos el nuevo gasto
  }

  // Para cerrar el modal al agregar un gasto y animar el modal
  setAnimarModal(false) 
    setTimeout(() => {
        setModal(false) 
    }, 500);

}

const eliminarGasto = id => {
  const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
  setGastos(gastosActualizados)
}

  return (

    <div className={modal ? 'fijar' : ''}> {/* Cuando modal este activo, agrega la clase 'fijar', sino nada '' */}

    {/* Vamos pasando los props a cada componente */}
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}  
        isValidPresupuesto={isValidPresupuesto}      
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {/* El && sirve para los casos donde no requiero un else, solo un if. Si el presupuesto es valirdo, recien ahi aparece el + */}

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto}
              alt='Icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      
      {modal && <Modal 
                  setModal={setModal} // Paso setModal para el componente y podel cerrar el modal
                  animarModal={animarModal} // Le pasamos el state animarModal via props para que sepa CUANDO cambió
                  setAnimarModal={setAnimarModal}
                  guardarGastos={guardarGastos} // El prop es el 1° y el 2° {} es la función
                  gastoEditar={gastoEditar} // Asi sabe que información tiene que editar
                  setGastoEditar={setGastoEditar}
                />} 

    </div>
  )
}

export default App
