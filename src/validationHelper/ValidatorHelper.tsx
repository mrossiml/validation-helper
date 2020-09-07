import React, {SetStateAction} from "react";
import {ObjectValidation} from "./ObjectValidation";
import {RESULT_SUCCESS} from "./Validations";
import {ResultObjectValidationInterface} from "./interfaces/ResultObjectValidationInterface";

export class ValidatorHelper {

    objectValidations: ObjectValidation[]
    onChange: Function
    isValid: boolean
    startWithoutValidation: boolean


    validate = (name, value) => {

        return new Promise((resolve, reject) => {

            const objectValidation = this.objectValidations.find(x => x.name === name)

            const callback = () => {
                this.setIsValid()

                const resultObjectValidation: ResultObjectValidationInterface = {
                    name,
                    value,
                    // @ts-ignore
                    resultValidation: this.startWithoutValidation ? RESULT_SUCCESS : objectValidation.resultValidation,
                    // @ts-ignore
                    message: objectValidation.message
                }

                const result = {
                    isValid: this.isValid,
                    objectValidation: resultObjectValidation
                }

                if (this.onChange) {
                    this.onChange(result)
                }

                resolve()
            }

            if (this.startWithoutValidation) {
                callback()
            } else {
                // @ts-ignore
                objectValidation.evaluate(value).then(() => {
                    callback()
                })
            }
        })
    }

    constructor(objectValidations, onChange?, startWithoutValidation?) {
        this.objectValidations = objectValidations
        this.onChange = onChange
        this.isValid = true

        //--------- Aqui se validan todos cuando se crea el ValidatorService para que se seteen todas las propiedades en el state
        // y se pone la propiedad startWithoutValidation porque ya no se va a usar mas
        this.startWithoutValidation = startWithoutValidation
        for (let objectValidation of this.objectValidations) {
            this.validate(objectValidation.name, objectValidation.defaultValue).then(() => {

            })
        }
        this.startWithoutValidation = false
        //------------------------------------------------------------------------
    }

    setIsValid() {
        this.isValid = this.startWithoutValidation || this.objectValidations.every(objectValidation => !objectValidation.resultValidation || objectValidation.resultValidation === RESULT_SUCCESS)
    }

    validateAll() {
        return new Promise((resolve, reject) => {

            let promises = []

            for (let objectValidation of this.objectValidations) {
                // @ts-ignore
                promises.push(this.validate(objectValidation.name, objectValidation.value))
            }

            Promise.all(promises).then(responses => {

                if (this.isValid) {
                    resolve(true)

                } else {
                    reject(false)
                }
            })
        })
    }

    static getStateValidations(prevState, resultValidation) {
        return ({
            validations: {
                ...prevState.validations,
                isValid: resultValidation.isValid,
                [resultValidation.objectValidation.name]: resultValidation.objectValidation
            }
        })
    }

    static getValidationsHook(prevState, resultValidation) {
        return ({
            ...prevState,
            isValid: resultValidation.isValid,
            [resultValidation.objectValidation.name]: resultValidation.objectValidation
        })
    }
}


export function getStateValidations(prevState, validation) {
    return ({
        validations: {
            ...prevState.validations,
            isValid: validation.isValid,
            [validation.objectValidation.name]: validation.objectValidation
        }
    })
}
