export const validationsAltaEvento = (values) => {

    let errors = {};
  
    if (!values.ubicacion) {
      errors.ubicacion = "Debes elegir una sugerencia de dispositivo (hacer click)";
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
        errors.naturaleza = "La categoría es obligatoria";
      }

    return errors;
  };