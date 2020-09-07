export interface ParentValidationInterface {
    execute: (value) => Promise<string>,
    getMessage: () => string
    asyncValidation: boolean
    message: string
};
