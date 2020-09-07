import React from "react";
import {RESULT_SUCCESS} from "./Validations";
import {ParentValidationInterface} from "./interfaces/ParentValidationInterface";

export class ObjectValidation {
    name: string
    message: string
    validations: ParentValidationInterface[]
    resultValidation: string
    defaultValue: any
    value: any

    constructor(name, validations, defaultValue?) {
        this.name = name
        this.validations = validations
        this.message = ""
        this.resultValidation = ""
        this.defaultValue = defaultValue
        this.value = this.defaultValue
    }


    evaluate = (value) => {

        return new Promise((resolve, reject) => {

            this.resultValidation = RESULT_SUCCESS
            this.message = ""
            this.value = value

            if (this.validations.length) {

                let promises = []

                this.validations.forEach((validation) => {
                    // @ts-ignore
                    promises.push(validation.execute(value))
                })

                Promise.all(promises).then(responses => {

                    let parcialResult = RESULT_SUCCESS

                    for (let i = 0; i < responses.length; i++) {

                        parcialResult = responses[i]

                        if (parcialResult !== RESULT_SUCCESS) {
                            this.resultValidation = parcialResult
                            this.message = this.validations[i].getMessage()
                            break
                        }
                    }

                    resolve()
                })
            }
        })
    }
}

