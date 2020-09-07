export const executeFunctionIfExist = (func, ...args: any[]) => {
    if (func) {
        return func(...args)
    }
}

// Ejemplo: arrayRemoveIf(list, (x) =>  x.id === '123')
export const arrayRemoveIf = (list, filterCondition) => {
    list.filter((x) => filterCondition(x)).forEach((item) => {
        list.splice(item, 1)
    })
}
 