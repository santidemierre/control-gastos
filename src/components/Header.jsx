import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({ 
    gastos,
    setGastos,
    presupuesto, 
    setPresupuesto,  
    isValidPresupuesto,
    setIsValidPresupuesto 
}) => {

  return (
    <header>
        <h1>Planificador de Gastos</h1>

      {/* Si el presupuesto es valido, se imprime la etiqueta <p></p> y BORRA el componente NuevoPresupuesto para poder mostrar , sino se imprime todo el componente */}
        {isValidPresupuesto ? (
          <ControlPresupuesto 
            gastos={gastos}
            setGastos={setGastos}
            presupuesto={presupuesto} // Mando el valor del input a ControlPresupuesto
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        ) : (
          <NuevoPresupuesto 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}  
            setIsValidPresupuesto={setIsValidPresupuesto}
        />
        )}

    </header>
  )
}

export default Header