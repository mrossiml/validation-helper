import React from 'react';
import CustomInput from "../validationHelper/CustomInput";
import {Patterns} from "../validationHelper/Patterns";
import Button from '@andes/button';
import Checkbox from '@andes/Checkbox';
import {ObjectValidation} from "../validationHelper/ObjectValidation";
import {ValidatorHelper} from "../validationHelper/ValidatorHelper";
import {
    CUSTOM,
    CUSTOM_BOOLEAN,
    EQUAL_TRUE,
    MAX_LENGHT,
    MIN_AND_MAX_LENGHT,
    MIN_LENGHT,
    NOT_EMPTY,
    PATTERN
} from "../validationHelper/Validations";
import ValidatorMessage, {ANDES_MESSAGE_ERROR, TEXT} from "../validationHelper/validationMessage/ValidatorMessage";
import {DataContext} from "./App";
import User from "../clases/User";

//-------- INPUTS
const NAME = "name";
const LAST_NAME = "lastName";
const USERNAME = "username";
const EMAIL = "email";
const ACCEPT = "accept";
//--------------------------


const withDataContext = Component => {
    return props => {
        return (
            <DataContext.Consumer>
                {({addUser, editUser}) => {
                    return <Component {...props} addUser={addUser} editUser={editUser}/>;
                }}
            </DataContext.Consumer>
        );
    };
};

class FormComponent extends React.Component<{ swichTab, addUser, editUser }, any> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        console.log(this.props.editUser)

        this.setState({
            validator: new ValidatorHelper([
                    // new ObjectValidation(NAME, [ ], this.props.editUser?.name),
                    // new ObjectValidation(LAST_NAME, [ ], this.props.editUser?.lastName),

                    new ObjectValidation(USERNAME, [new CUSTOM((value) => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                console.log("Promesa 1 terminada")
                                resolve(value === "martincho" ? "ERROR" : "OK");
                            }, 10000);
                        })
                    }, "Usuario repetido, por favor ingrese otro", true)], this.props.editUser?.username),

                    new ObjectValidation(EMAIL, [

                        // new PATTERN(Patterns.PATTERN_EMAIL),

                        new CUSTOM((value) => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    console.log("Promesa 2 terminada")
                                    resolve(value === "abc@gmail.com" ? "ERROR" : "OK");
                                }, 10000);
                            })
                        }, "Correo repetido, por favor ingrese otro", true)

                    ], this.props.editUser?.email),

                    // new ObjectValidation(ACCEPT, [ ], this.props.editUser?.accept),
                ],
                this.onChangeValidation,
                true
            )
        })
    }

    guardarClick = async () => {
        // if (await this.state.validator.validateAll()) {
        //
        //     console.log("Siii salio todo bien2!")
        //     // this.props.addUser(new User(this.state.validations[NAME].value, this.state.validations[LAST_NAME].value, this.state.validations[EMAIL].value))
        //     // this.props.swichTab(0)
        // } else {
        //     console.log("Errror!")
        // }


        this.state.validator.validateAll().then((rep) => {
            console.log("Siii salio todo bien2!")
            console.log(rep)
        }, (err) => {
            console.log("Errror!")
            console.log(err)
        })

        // if (await this.state.validator.validateAll()) {
        //
        //     console.log("Siii salio todo bien2!")
        //     // this.props.addUser(new User(this.state.validations[NAME].value, this.state.validations[LAST_NAME].value, this.state.validations[EMAIL].value))
        //     // this.props.swichTab(0)
        // } else {
        //     console.log("Errror!")
        // }
    }

    onChangeValidation = (resultValidation) => {
        this.setState(prevState => ValidatorHelper.getStateValidations(prevState, resultValidation))
    }

    render() {
        return (
            <div>
                {this.state.validations && <div>
                    {/*<br/>*/}
                    {/*<CustomInput*/}
                    {/*    label="Nombre"*/}
                    {/*    objectValidation={this.state.validations[NAME]}*/}
                    {/*    onChange={value => this.state.validator.validate(NAME, value)}*/}
                    {/*    debounceTime={1000}*/}
                    {/*    andesProperties={{width: 100}}*/}
                    {/*/>*/}
                    {/*<br/>*/}
                    {/*<CustomInput*/}
                    {/*    label="Apellido"*/}
                    {/*    objectValidation={this.state.validations[LAST_NAME]}*/}
                    {/*    onChange={value => this.state.validator.validate(LAST_NAME, value)}*/}
                    {/*    andesProperties={{width: 100}}*/}
                    {/*/>*/}
                    <br/>
                    <CustomInput
                        label="Nombre de Usuario"
                        objectValidation={this.state.validations[USERNAME]}
                        onChange={value => this.state.validator.validate(USERNAME, value)}
                        andesProperties={{width: 100}}
                    />
                    <br/>
                    <CustomInput
                        label="Email"
                        objectValidation={this.state.validations[EMAIL]}
                        onChange={value => this.state.validator.validate(EMAIL, value)}
                        andesProperties={{width: 100}}
                    />
                    <br/>

                    {/*<Checkbox label="Acepto los términos"*/}
                    {/*          checked={this.state.validations[ACCEPT] && this.state.validations[ACCEPT].value}*/}
                    {/*          onChange={event => this.state.validator.validate(ACCEPT, event.target.checked)}/>*/}

                    {/*<ValidatorMessage objectValidation={this.state.validations[ACCEPT]}*/}
                    {/*                  type={ANDES_MESSAGE_ERROR} styleDivConteiner={{width: '50%'}}/>*/}

                    <br/>
                    <br/>
                    <br/>
                    <Button onClick={this.guardarClick}
                            disabled={!this.state.validations.isValid}>Guardar con disabled</Button>

                    <Button onClick={this.guardarClick} style={{marginLeft: '20px'}}>Guardar sin
                        disabled</Button>


                    <ValidatorMessage objectValidations={this.state.validations} type={TEXT}
                                      styleDivConteiner={{width: '50%'}}
                                      andesProperties={{title: "Título"}}/>

                </div>}
            </div>
        )
    }
}

export default withDataContext(FormComponent)