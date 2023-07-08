export const required = (value: any) : boolean | string => (value  ? true : 'Required')

export const password = (pass: string) : boolean | string => {
    const validate = /^(?=.*[a-záéíóúüñ])(?=.*[0-9])(?=.*[A-ZÁÉÍÓÚÜÑ])(?=.*\d)(?=.*[-_@$!%*?&€£.,¡¿])[A-Za-záéíóúüñÁÉÍÓÚÜÑ\d\-_@$!%*?&#€£.,¡¿]{8,}$/;
    if (validate.test(pass)) {
        return true;
    } 
    return 'Format password invalid';
};

export const confirmPassword = (value: string, confirm: string) : boolean | string => value === confirm || 'Passwords not equals'

export const email = (email:string) : boolean | string => {
    const validate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validate.test(email)) { return true; } return 'Format email invalid';
};

export const onlyLetters = (email:string) : boolean | string => {
    const validate = /^[A-ZÁÉÍÓÚÑ ]+$/i;
    if (validate.test(email)) { return true; } return 'Only letters';
};

export const onlyNumbers = (number:string) : boolean | string => {
    const validate = /^[0-9 ]+$/i; if (validate.test(number)) { return true; } return 'Only numbers';
};