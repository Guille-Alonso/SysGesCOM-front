export const validationsAltaCamara = (values) => {

  let errors = {};

  if (!values.nombre) {
    errors.nombre = "El nombre es obligatorio";
  } else if (values.nombre.length !== 6) {
    errors.nombre = "El nombre del dispositivo debe tener 6 caracteres";
  } else if (!/^[a-zA-Z0-9 ]+$/.test(values.nombre)) {
    errors.nombre = "El nombre no debe tener simbolos especiales";
  }else if (!/^(cam|dom)\d{3}$/i.test(values.nombre)){
    errors.nombre = "Formato de nombre no válido";
  }

  if (!values.ubicacion) {
    errors.ubicacion = "La ubicacion es obligatoria";
  } else if (!/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ\s\-.,']+$/.test(values.ubicacion)) {
    errors.ubicacion = "Formato de ubicación no válido";
  }

  if (!values.tipoDeCamara) {
    errors.tipoDeCamara = "Tipo de Camara obligatorio";
  }
  return errors;
};