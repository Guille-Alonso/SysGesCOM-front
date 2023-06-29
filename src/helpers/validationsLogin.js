export const validationLogin = (values) => {
 
  let errors = {};
  if (!values.nombreUsuario) {
    errors.nombreUsuario = "El nombre de usuario es obligatorio";
  } else if (!/^[a-zA-Z]+\.[a-zA-Z]+$/.test(values.nombreUsuario)) {
    errors.nombreUsuario = "Nombre de usuario no válido";
  } else if (values.nombreUsuario.length > 15) {
    errors.nombreUsuario = "El Usuario no debe poseer más de 15 caracteres";
  }

  if (!values.contraseña) {
    errors.contraseña = "La contraseña es obligatoria";
  } else if (values.contraseña.length < 6) {
    errors.contraseña = "La contraseña debe tener como mínimo 6 caracteres";
  } else if (values.contraseña.length > 30) {
    errors.contraseña = "La contraseña no debe poseer más de 30 caracteres";
  } else if (!/^[a-zA-Z0-9]+$/.test(values.contraseña)){
    errors.contraseña = "Formato de contraseña incorrecto"
  }
  return errors;
};
