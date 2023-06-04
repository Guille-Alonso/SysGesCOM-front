export const validationChangePassword = (values) => {
 
    let errors = {};
  
    if (!values.userName) {
      errors.userName = "El nombre de usuario es requerido";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "La confirmación de la contraseña es obligatoria";
    } else if (values.confirmPassword!== values.confirmPasswordRepeat) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }else if(!/^[a-zA-Z0-9]+$/.test(values.confirmPassword)){
        errors.confirmPassword = "La contraseña no debe tener simbolos especiales";
    }
    return errors;
  };
  