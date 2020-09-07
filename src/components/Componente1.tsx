import React, { useState } from 'react';

const Componente1 = (props) => {

    const [valorInput, setValorInput] = useState("primerValor");

    const botonClick = () => {
        alert("Me clickeaste!")
    }
    
    return ( 
        <div>
             Hola {props.nombre} soy el Componente 1
            <br/>
            <br/>
            Escriba ago: <input type="text" value={valorInput} onChange={e => setValorInput(e.target.value)} />
            <br/>
            <br/>
            El valor del input es: {valorInput}
            <br/>
            <br/>
            <button type="button" onClick={botonClick}>Boton</button>
        </div>
    )
}
export default Componente1 
