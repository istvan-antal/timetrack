// tslint:disable-next-line:no-any
export const deepFreeze = (o: any) => {
    Object.freeze(o);

    // tslint:disable-next-line:only-arrow-functions no-any
    Object.getOwnPropertyNames(o).forEach(function (prop: any) {
        if (o.hasOwnProperty(prop)
            && o[prop] !== null
            && (typeof o[prop] === 'object' || typeof o[prop] === 'function')
            && !Object.isFrozen(o[prop])) {
            deepFreeze(o[prop]);
        }
    });

    return o;
};