import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import TextField from '@andes/textfield';
import {RESULT_ERROR, RESULT_SUCCESS} from "./Validations";
import {executeFunctionIfExist} from "./Util";
import {ResultObjectValidationInterface} from "./interfaces/ResultObjectValidationInterface";

const CustomInput = (props: {
    label: string,
    placeholder?: string,
    onChange: (value) => {},
    defaultValue?: string,
    objectValidation?: ResultObjectValidationInterface,
    andesProperties?: {},
    debounceTime?: number
}) => {

    const CLASS_ERROR_INPUT = "error"
    const CLASS_DEFAULT_INPUT = "default"

    const [value, setValue] = useState(props.objectValidation && props.objectValidation.value || "");
    const [message, setMessage] = useState("");
    // Esto es para solucionar un bug de cuando le pones un debounceTime y no validar al inicio. 
    // Sino carga el formulario bien, pero a los x milisegundos te queda el input rojo porque lo valida atrasado
    const [isFirstTime, setIsFirstTime] = useState(false);

    const onChange = (event) => {
        const value = event.target.value
        setValue(value)

        if (!props.debounceTime) {
            executeFunctionIfExist(props.onChange, value)
        }
    }

    // ---------------- DebounceTime
    useEffect(() => {
        if (props.debounceTime && isFirstTime) {

            const delayDebounceFn = setTimeout(() => {
                executeFunctionIfExist(props.onChange, value)
            }, props.debounceTime)

            return () => {
                clearTimeout(delayDebounceFn)
            }
        }
        setIsFirstTime(true)
    }, [value])
    // ------------------------------------------------

    return (
        <TextField
            {...props.andesProperties}
            value={value}
            label={props.label}
            placeholder={props.placeholder}
            modifier={props.objectValidation && props.objectValidation.resultValidation === RESULT_ERROR ? CLASS_ERROR_INPUT : CLASS_DEFAULT_INPUT}
            message={props.objectValidation && props.objectValidation.message}
            onChange={onChange}
        />
    )
}

export default CustomInput 
