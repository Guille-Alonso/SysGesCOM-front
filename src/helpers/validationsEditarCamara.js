export const validationsEditarCamara = (values) => {

    let errors = {};
  
    if (!values.nombre) {
      errors.nombre = "El nombre es obligatorio";
    } else if (values.nombre.length < 6) {
      errors.nombre = "El nombre de la cámara debe tener como mínimo 6 caracteres";
    } else if (values.nombre.length > 7) {
      errors.nombre = "El nombre de la cámara no debe poseer más de 7 caracteres";
    } else if (!/^[a-zA-Z0-9 ]+$/.test(values.nombre)) {
      errors.nombre = "El nombre no debe tener simbolos especiales";
    }
    
    if (!values.ubicacion) {
      errors.ubicacion = "La ubicacion es obligatoria";
    } else if (!/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ\s\-.,']+$/.test(values.ubicacion)) {
      errors.ubicacion = "Formato de ubicación no válido";
    }
  
    if (!values.tipo) {
      errors.tipo = "Tipo de Camara obligatorio";
    }
    return errors;
  };