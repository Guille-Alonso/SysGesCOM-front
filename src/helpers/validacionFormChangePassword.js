export const validationChangePassword = (values) => {
 
    let errors = {};
  
    // if (!values.password) {
    //   errors.password = "La contraseña es obligatoria";
    // } else if (values.password.length < 8) {
    //   errors.password = "La contraseña debe tener como mínimo 8 caracteres";
    // } else if (values.password.length > 30) {
    //   errors.password = "La contraseña no debe poseer más de 30 caracteres";
    // } 
    if (!values.confirmPassword) {
      errors.confirmPassword = "La confirmación de la contraseña es obligatoria";
    } else if (values.confirmPassword!== values.confirmPasswordRepeat) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }else if(!/^[a-zA-Z0-9]+$/.test(values.confirmPassword)){
        errors.confirmPassword = "La contraseña no debe tener simbolos especiales";
    }
    return errors;
  };
  