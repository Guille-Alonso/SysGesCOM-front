export const validationAltaUsuario = (values) => {
    let errors = {};

    if (!values.name) {
        errors.name = "El campo nombre es obligatorio";
    } else if (values.name.length > 40) {
        errors.name = "El nombre no puede tener mas de 40 caracteres";
    } else if (values.name.length < 4) {
        errors.name = "El nombre debe tener como mínimo 4 caracteres";
    } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g.test(values.name)) {
        errors.name = "El nombre solo admite letras"
    }

    if (!values.userName) {
        errors.userName = "El campo usuario es obligatorio";
    }
    if (!values.email) {
        errors.email = "El campo email es obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "El email no es válido";
    } else if (values.email.length > 30) {
        errors.email = "El email no debe poseer más de 30 caracteres";
    }

    if (!values.password) {
        errors.password = "La contraseña es obligatoria";
    } else if (values.password.length < 8) {
        errors.password = "La contraseña debe tener como mínimo 8 caracteres";
    } else if (values.password.length > 30) {
        errors.password = "La contraseña no debe poseer más de 30 caracteres";
    }else if(!/^[a-zA-Z0-9]+$/.test(values.password)){
        errors.confirmPassword = "La contraseña no debe tener simbolos especiales";
    }else if(!/^(?=.*[A-Za-z])(?=.*\d)/.test(values.password)){
        errors.password = "La contraseña debe tener al menos una mayúscula y números";
    }

    if (values.password != values.repeatPassword) {
        errors.password = "Las contraseñas no coinciden";
    }

    if(values.photo !== '' && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(values.photo)){
        errors.photo = "URL no válida"
    }

    if(!values.dni){
        errors.dni = "El campo DNI es obligatorio"
    }else if(values.dni.length != 8){
        errors.dni = "El DNI contiene 8 números"
    }else if( !/^\d+$/.test(values.dni)){
        errors.dni = "El DNI solo contiene numeros ";
    }

    if(!values.numAfil){
        errors.numAfil = "El campo Num Afiliado es obligatorio"
    }else if(values.numAfil.length != 5){
        errors.numAfil = "El Número de Afiliado contiene 5 números"
    }else if( !/^\d+$/.test(values.numAfil)){
        errors.numAfil = "El Num de Afiliado solo contiene numeros ";
    }
    
    if(!values.fechaNac){
        errors.fechaNac = "El campo Fecha Nacimiento es obligatorio"
    }
    return errors;
};