import React from 'react';
import "./validatorMessage.scss";
import Message from '@andes/message';
import {RESULT_SUCCESS} from "../Validations";
import {ResultObjectValidationInterface} from "../interfaces/ResultObjectValidationInterface";

export const TEXT = "text";
export const ANDES_MESSAGE_NEUTRAL = "neutral";
export const ANDES_MESSAGE_SUCCESS = "success";
export const ANDES_MESSAGE_WARNING = "warning";
export const ANDES_MESSAGE_ERROR = "error";

const ValidatorMessage = (props: {
    objectValidation?: ResultObjectValidationInterface,
    objectValidations?: ResultObjectValidationInterface[],
    type: typeof TEXT | typeof ANDES_MESSAGE_NEUTRAL | typeof ANDES_MESSAGE_SUCCESS | typeof ANDES_MESSAGE_WARNING | typeof ANDES_MESSAGE_ERROR,
    styleDivConteiner?: {},
    andesProperties?: {}
}) => {

    const getConteiner = () => {

        let tempObjectValidations = props.objectValidations || []

        if (props.objectValidation) {
            tempObjectValidations.push(props.objectValidation)
        }

        let htmlMessages: any[] = []

        for (let property in tempObjectValidations) {
            if (property !== 'isValid') {
                htmlMessages.push(getMessageHtml(tempObjectValidations[property].resultValidation, tempObjectValidations[property].message))
            }
        }

        let result

        if (htmlMessages.length) {
            result = <div style={props.styleDivConteiner}>{htmlMessages}</div>
        }

        return result
    }

    function getMessageHtml(resultValidation, message) {
        let result
        if (resultValidation !== RESULT_SUCCESS) {
            switch (props.type) {
                case ANDES_MESSAGE_NEUTRAL:
                case ANDES_MESSAGE_SUCCESS:
                case ANDES_MESSAGE_WARNING:
                case ANDES_MESSAGE_ERROR:
                    result = <div style={{marginBottom: '10px'}}><Message
                        type={props.type} {...props.andesProperties}>{message}</Message></div>
                    break
                case TEXT:
                default:
                    result = <div className="error" style={{marginBottom: '10px'}}>{message}</div>
                    break
            }
        }
        return result
    }

    return <div>{getConteiner()}</div>
}
export default ValidatorMessage 
