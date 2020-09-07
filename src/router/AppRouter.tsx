import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import FormComponent from "../components/FormComponent";
import HomeComponent from "../components/HomeComponent";


const AppRouter = () => {

    return (
        <Router>
            {/*<table>*/}
            {/*    <tr>*/}
            {/*        <td><Link to="/">Formulario</Link></td>*/}
            {/*        <td><Link to="/componente1">Componente 1</Link></td>*/}
            {/*    </tr>*/}
            {/*</table>*/}

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                {/* Si no le pones el exact vas a tener que ponerl el path="/" por defecto al final,
                     porque sino va evaluando la primera, y como ya tiene una barra ya coincide y entra a esa*/}
                <Route exact path="/" component={HomeComponent}/>
                {/*<Route exact path="/componente1" component={Componente1}/>*/}
            </Switch>
        </Router>
    );
}
export default AppRouter