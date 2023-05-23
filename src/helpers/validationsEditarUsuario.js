export const validationEditarUsuario = (values) => {
    let errors = {};

    if (!values.nombre) {
        errors.nombre = "El campo nombre es obligatorio";
    } else if (values.nombre.length > 40) {
        errors.nombre = "El nombre no puede tener mas de 40 caracteres";
    } else if (values.nombre.length < 4) {
        errors.nombre = "El nombre debe tener como mínimo 4 caracteres";
    } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g.test(values.nombre)) {
        errors.nombre = "El nombre solo admite letras"
    }

    if (!values.nombreUsuario) {
        errors.nombreUsuario = "El campo usuario es obligatorio";
    }
    if (!values.email) {
        errors.email = "El campo email es obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "El email no es válido";
    } else if (values.email.length > 30) {
        errors.email = "El email no debe poseer más de 30 caracteres";
    }

    // if (!values.contraseña) {
    //     errors.contraseña = "La contraseña es obligatoria";
    // } else if (values.contraseña.length < 8) {
    //     errors.contraseña = "La contraseña debe tener como mínimo 8 caracteres";
    // } else if (values.contraseña.length > 30) {
    //     errors.contraseña = "La contraseña no debe poseer más de 30 caracteres";
    // }else if(!/^[a-zA-Z0-9]+$/.test(values.contraseña)){
    //     errors.confirmcontraseña = "La contraseña no debe tener simbolos especiales";
    // }else if(!/^(?=.*[A-Za-z])(?=.*\d)/.test(values.contraseña)){
    //     errors.contraseña = "La contraseña debe tener al menos una mayúscula y números";
    // }

    // if (values.contraseña != values.repeatPassword) {
    //     errors.contraseña = "Las contraseñas no coinciden";
    // }

    // if(values.foto !== '' && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(values.foto)){
    //     errors.foto = "URL no válida"
    // }

    if(!values.dni){
        errors.dni = "El campo DNI es obligatorio"
    }else if(values.dni.length != 8){
        errors.dni = "El DNI contiene 8 números"
    }else if( !/^\d+$/.test(values.dni)){
        errors.dni = "El DNI solo contiene numeros ";
    }

    if(!values.afiliado){
        errors.afiliado = "El campo Num Afiliado es obligatorio"
    }else if(values.afiliado.length != 5){
        console.log(values);
        errors.afiliado = "El Número de Afiliado debe tener 5 números"
    }else if( !/^\d+$/.test(values.afiliado)){
        errors.afiliado = "El Num de Afiliado solo contiene numeros ";
    }
    
    if(!values.nacimiento){
        errors.nacimiento = "El campo Fecha Nacimiento es obligatorio"
    }
    return errors;
};