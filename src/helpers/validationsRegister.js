export const validationRegister = (values) => {
    let errors = {};

    if(!values.name){   
        errors.name = "El nombre es obligatorio";
    }else if(values.name.length>40){
        errors.name="El nombre no puede tener mas de 40 caracteres";
    }else if(values.name.length<4){
        errors.name="El nombre debe tener como mínimo 4 caracteres";
    }else if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g.test(values.name)){
      errors.name="El nombre solo admite letras"
  }
 

    if (!values.email) {
      errors.email = "El email es obligatorio";
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
    }else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)){
        errors.password = "La contraseña debe tener al menos una mayúscula y números";
    }

    if(values.password != values.repeatPassword){
        errors.password="Las contraseñas no coinciden";
    }
   

    return errors;
};