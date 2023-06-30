export const validationsEditarEvento = (values) => {

    let errors = {};
  
    if (!values.dispositivo) {
      errors.ubicacion = "Debes elegir un dispositivo";
    } 

    if (!values.detalle) {
      errors.detalle = "El detalle es requerido";
    }  else if (values.detalle.length > 200) {
      errors.detalle = "El detalle no puede tener mas de 200 caracteres";
    }
  
    if (!values.naturaleza) {
        errors.naturaleza = "El tipo de Evento es obligatorio";
      }

      if (!values.categoria) {
        errors.categoria = "La categoría es obligatoria";
      }

    return errors;
  };