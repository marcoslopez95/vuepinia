export const required = (value: any): boolean | string => (value ? true : 'Required')

export const password = (pass: string): boolean | string => {
    const validate = /^(?=.*[a-záéíóúüñ])(?=.*[0-9])(?=.*[A-ZÁÉÍÓÚÜÑ])(?=.*\d)(?=.*[-_@$!%*?&€£.,¡¿])[A-Za-záéíóúüñÁÉÍÓÚÜÑ\d\-_@$!%*?&#€£.,¡¿]{8,}$/;
    if (validate.test(pass)) {
        return true;
    }
    return 'Format password invalid';
};

export const confirmPassword = (value: string, confirm: string): boolean | string => value === confirm || 'Passwords not equals'

export const email = (email: string): boolean | string => {
    const validate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validate.test(email)) { return true; } return 'Format email invalid';
};

export const onlyLetters = (email: string): boolean | string => {
    const validate = /^[A-ZÁÉÍÓÚÑ ]+$/i;
    if (validate.test(email)) { return true; } return 'Only letters';
};

export const onlyNumbers = (number: string): boolean | string => {
    const validate = /^[0-9 ]+$/i; if (validate.test(number)) { return true; } return 'Only numbers';
};

export const amountFormat = (event: string, length = 3): string => {
    const text = event.target.value
    let reem = text
        .toString()
        .toString()
        .replace(/[^0-9]/g, '') // quitando todo lo que no sea números
    if (reem.length < length && event.key == 'Backspace') { 
        // Si la cantidad restante de dígitos es menor a el valor y además se está borrando
        // if (reem.length == length-1) {
            // Si la cantidad de dígitos es igual a un numero inferior que el total de digitos
            reem = '0' + reem // agrego un cero al principio
        // }
    } else {
        if (reem.substring(0, 1) == '0') {
            // Si el primero número es un cero
            let subNum = reem.substring(1, reem.length) // obtengo el resto de números
            reem = subNum // es decir, los "decimales"

            if (subNum.length > length + 1 && subNum.substring(0, 2) == '00') {
                // Si los recimales es mayor que mi número total  y los dos primeros son ceros
                let subNumber = subNum.substring(2, subNum.length) // quito los dos primeros ceros
                reem = subNumber// igualo
            }
        }
    }
    console.log('numero',reem)
                                            // 9        - (8 -1)
    const partInteger = reem.substring(0, reem.length - (length - 1)) // parte entera 
    if(partInteger.length == 2 && partInteger == '00') {
        partInteger = '0'
    }
    const partDecimal = reem.substring(reem.length - (length - 1), reem.length) // parte decimal
    var coma = partInteger + ',' + partDecimal
    
    // agrupar de a grupos de a 3 antes de la coma y añadie un . 
    event.target.value = coma.toString().replace(/\d(?=(\d{3})+\,)/g, '$&.')
    console.log('numero2',event.target.value)
    if (event.target.value != null) {
        for (let i = 0; i < event.target.value.length; i++) {
            if (event.target.value.indexOf(',,') != -1) {
                event.target.value = event.target.value.split(',,').join(',')
            }
        }
    }
    console.log('ifpenu',event.target.value)
    if (event.target.value.length < length+1) {
        const lengthCurrent = event.target.value.length
        const lengthTotal = length +1
        event.target.value = '0,' 
                + '0'.repeat(lengthTotal - lengthCurrent)
                + event.target.value.replace(',','')
    }
    console.log('return',event.target.value)
    return event.target.value
}

export const transformAmount = (amount: string): number => {
    const newstring = amount
        .replace('.', '')
        .replace(',', '.')
    return parseFloat(newstring)
}

export const keyPressIsNumber = (event: any) => {
return (event.charCode >= 48 && event.charCode <= 57)
}