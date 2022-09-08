import { useState, useEffect } from "react" // Va a estar escuchando por los cambios que surjan en gatos
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar' // Gráfica circular de gastos
import "react-circular-progressbar/dist/styles.css"


/* ({presupuesto}) viene de Header */
const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    const [porcentaje, setPorcentaje] = useState(0)

    // Creamos los estados para lo disponible y lo gastado
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0 )
        const totalDisponible = presupuesto - totalGastado

        // Calcular el porcentaje gastado:
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed();

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 800);
        
        setGastado(totalGastado)
        setDisponible(totalDisponible   )

    }, [gastos])
    

    const formatearCantidad = cantidad => {
        return cantidad.toLocaleString('es-AR', { 
            style: 'currency', 
            currency: 'ARS' 
        })
    }

    // RESETEAR APP
    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuestos y gastos?')

        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        } 
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#dc2626' : '#50ad6e',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#dc2626' : '#50ad6e'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
        </div>

        <div className="contenido-presupuesto">
            <button 
                className="reset-app"
                type="button"
                onClick={handleResetApp}
            >
                Resetear App
            </button>
            <p>
                <span>Presupesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : '' }`}>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto