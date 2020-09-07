import React, {useContext, useEffect, useState} from 'react';
import Componente1 from './Componente1';
import Componente2 from './Componente2';
import CustomInput from "../validationHelper/CustomInput";
import {Patterns} from "../validationHelper/Patterns";
import Button from '@andes/button';
import Checkbox from '@andes/Checkbox';
import {ObjectValidation} from "../validationHelper/ObjectValidation";
import {CUSTOM_BOOLEAN, EQUAL_TRUE, MAX_LENGHT, MIN_LENGHT, NOT_EMPTY, PATTERN} from "../validationHelper/Validations";
import {ValidatorHelper} from "../validationHelper/ValidatorHelper";
import ValidatorMessage, {TEXT} from "../validationHelper/validationMessage/ValidatorMessage";
import {DataContext} from "./App";
import User from "../clases/User";

const FormHook = (props) => {

    //-------- INPUTS
    const NAME = "name";
    const LAST_NAME = "lastName";
    const EMAIL = "email";
    const ACCEPT = "accept";
    //--------------------------

    const [validator, setValidator]: any = useState({});
    const [validations, setValidations]: any = useState({});

    const dataContext = useContext(DataContext);

    useEffect(() => {
        setValidator(new ValidatorHelper([
                new ObjectValidation(NAME, [new NOT_EMPTY(), new MIN_LENGHT(3), new MAX_LENGHT(10)]),
                new ObjectValidation(LAST_NAME, [new NOT_EMPTY(), new MIN_LENGHT(3), new MAX_LENGHT(10)]),
                new ObjectValidation(EMAIL, [new PATTERN(Patterns.PATTERN_EMAIL)]),
                new ObjectValidation(ACCEPT, [new EQUAL_TRUE("Debe aceptar los terminos")], false),
            ],
            onChangeValidation,
            true
        ))
    }, []);

    const onChangeValidation = (resultValidation) => {
        setValidations(prevState => ValidatorHelper.getValidationsHook(prevState, resultValidation))
    }

    const guardarClick = () => {
        console.log(validations)

        if (validator.validateAll()) {
            console.log("Siii salio todo bien!")

            dataContext.addUser(new User(validations[NAME].value, validations[LAST_NAME].value, validations[EMAIL].value))
            props.swichTab(0)
        } else {
            console.log("Errror!")
        }
    }

    return (
        <div>
            {validations && <div>
                <br/>
                <CustomInput
                    label="Nombre"
                    objectValidation={validations[NAME]}
                    onChange={value => validator.validate(NAME, value)}
                    andesProperties={{width: 100}}
                />
                <br/>
                <CustomInput
                    label="Apellido"
                    objectValidation={validations[LAST_NAME]}
                    onChange={value => validator.validate(LAST_NAME, value)}
                    andesProperties={{width: 100}}
                />
                <br/>
                <CustomInput
                    label="Email"
                    objectValidation={validations[EMAIL]}
                    onChange={value => validator.validate(EMAIL, value)}
                    andesProperties={{width: 100}}
                />
                <br/>

                <Checkbox label="Acepto los términos"
                          checked={validations[ACCEPT] && validations[ACCEPT].value}
                          onChange={event => validator.validate(ACCEPT, event.target.checked)}/>

                <ValidatorMessage objectValidation={validations[ACCEPT]} type={TEXT}/>
                <br/>
                <br/>
                <br/>
                <Button onClick={guardarClick}
                        disabled={!validations.isValid}>Guardar con disabled</Button>

                <Button onClick={guardarClick} styleDivConteiner={{marginLeft: '20px'}}>Guardar sin disabled</Button>
            </div>}
        </div>
    )
}

export default FormHook 