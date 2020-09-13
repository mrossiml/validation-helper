import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import AppRouter from "../router/AppRouter";
import User from "../clases/User";
import Componente1 from "./Componente1";
import Componente2 from "./Componente2";
import Componente3 from "./Componente3";

//Falta:
// - Validacion asincronica
// - Probar componentes con JS
// - Agregar User selector y otros inputs como select, radio buton
// - Agregar una funcion onchangeSucces en el new del ObjectValidation la cual se ejecuta si la validacion salio OK
// - Salen un par de warnings, no se si seran de andes o del input, no se. Hay que ver si se pueden quitar
// - Fijarse si hay que excluir el nodemodule de las demas cosas
// - Agregar que el ValidatorMessage admita columnas
// - Fijarse si el validator no se puede poner en una constante en vez de un hook
// - Hacer que una validacion pueda devolver mas de un mesj. Osea i tenes 3 tipos de strings. Un OK, un ERROR_USUARIO_REPETIDO, NOMBRE_OFENSIVO
// - Usan un Promise All para hacer las validaciones asincronicas en paralelo y no lineal
//   https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise/all
// - Fjate como va a ser el editar de un select porque no se si va a estar tan facil eh

export const DataContext = React.createContext({} as {
    users: any,
    addUser: any,
    deleteUser: any,
    editUser?: User,
});

const App = () => {

    const [users, setUsers] = useState([
        new User("Nombre1", "Apellido1", "email1@gmail.com"),
        new User("Nombre2", "Apellido2", "email2@gmail.com"),
        new User("Nombre3", "Apellido3", "email3@gmail.com"),
        new User("Nombre4", "Apellido4", "email4@gmail.com"),
    ]);


    const addUser = (user) => {
        setUsers([...users, user])
    }

    const deleteUser = (user) => {
        setUsers(users.filter((x) => x.name !== user.name))
    }


    return (
        <>
            <DataContext.Provider value={{users, addUser, deleteUser}}>
                <Componente1></Componente1>
                <Componente2></Componente2>
                <Componente3></Componente3>
                <AppRouter/>
            </DataContext.Provider>
        </>
    );
}
export default App