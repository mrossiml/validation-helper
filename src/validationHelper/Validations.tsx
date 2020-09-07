import {ParentValidationInterface} from "./interfaces/ParentValidationInterface";

export const RESULT_ERROR = 'ERROR'
export const RESULT_SUCCESS = 'OK'

export const returnString = (boolean) => {
    return boolean ? RESULT_ERROR : RESULT_SUCCESS
}

abstract class ParentValidation implements ParentValidationInterface {
    asyncValidation: boolean
    message: string

    constructor(message, asyncValidation = false) {
        this.message = message
        this.asyncValidation = asyncValidation
    }

    abstract execute(value)

    abstract getMessage()
}


export class NOT_EMPTY extends ParentValidation {

    constructor(message = "El campo es obligatorio") {
        super(message)
    }

    execute(value) {
        return returnString(!value)
    }

    getMessage() {
        return this.message
    }
}

export class MIN_LENGHT extends ParentValidation {
    minLenght: number

    constructor(minLenght, message?) {
        super(message)
        this.minLenght = minLenght
    }

    execute(value) {
        return returnString(!value || value.length < this.minLenght)
    }

    getMessage() {
        return this.message || "El campo no puede ser menor a " + this.minLenght + " caracteres"
    }
}

export class MAX_LENGHT extends ParentValidation {
    maxLenght: number

    constructor(maxLenght, message?) {
        super(message)
        this.maxLenght = maxLenght
    }

    execute(value) {
        return returnString(!value || value.length > this.maxLenght)
    }

    getMessage() {
        return this.message || "El campo no puede ser mayor a " + this.maxLenght + " caracteres"
    }
}

export class MIN_AND_MAX_LENGHT extends ParentValidation {
    minLenght: number
    maxLenght: number

    constructor(minLenght, maxLenght, message?) {
        super(message)
        this.minLenght = minLenght
        this.maxLenght = maxLenght
    }

    execute(value) {
        return returnString(!value || value.length < this.minLenght || value.length > this.maxLenght)
    }

    getMessage() {
        return this.message || "El campo tiene que tener entre " + this.minLenght + " y " + this.maxLenght + " caracteres"
    }
}

export class PATTERN extends ParentValidation {
    pattern: string

    constructor(pattern, message?) {
        super(message)
        this.pattern = pattern
    }

    execute(value) {
        return returnString(!value || !value.match(this.pattern))
    }

    getMessage() {
        return this.message || "Ingrese un valor válido"
    }
}

export class CUSTOM extends ParentValidation {
    myFunction: (value) => string

    constructor(myFunction, message, asyncValidation?) {
        super(message, asyncValidation)
        this.myFunction = myFunction
    }

    execute(value) {
        return this.myFunction(value)
    }

    getMessage() {
        return this.message
    }
}

// Si la funcion devuelve TRUE va a devolver 'ERROR'. Si devuelve FALSE devuelve 'OK'
export class CUSTOM_BOOLEAN extends ParentValidation {
    myFunction: (value) => string

    constructor(myFunction, message, asyncValidation?) {
        super(message, asyncValidation)
        this.myFunction = myFunction
    }

    execute(value) {
        return returnString(this.myFunction(value))
    }

    getMessage() {
        return this.message
    }
}

// Si NO es true da un error
export class EQUAL_TRUE extends ParentValidation {

    constructor(message) {
        super(message)
    }

    execute(value) {
        return returnString(!value)
    }

    getMessage() {
        return this.message
    }
}

// Si NO es false da error
export class EQUAL_FALSE extends ParentValidation {

    constructor(message) {
        super(message)
    }

    execute(value) {
        return returnString(value)
    }

    getMessage() {
        return this.message
    }
}


