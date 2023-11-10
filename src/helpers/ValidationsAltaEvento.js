export const validationsAltaEvento = (values) => {

  let errors = {};

  if (!values.ubicacion) {
    errors.ubicacion = "Debes elegir una sugerencia de dispositivo (hacer click)";
  }

  if (!values.detalle) {
    errors.detalle = "El detalle es requerido";
  } else if (values.detalle.length > 500) {
    errors.detalle = "El detalle no puede tener mas de 500 caracteres";
  } else if (values.detalle.length < 4) {
    errors.detalle = "El detalle no puede tener menos de 4 caracteres";
  } else if (!/^[a-zA-Z\u00C0-\u017F0-9,."':;/]+(?:\s[a-zA-Z\u00C0-\u017F0-9,."':;/]+)*$/
    .test(values.detalle)) {
    errors.detalle = "No se permiten símbolos especiales o espacios dobles e inncesarios.";
  }

  if (!values.naturaleza) {
    errors.naturaleza = "El tipo de Evento es obligatorio";
  }

  if (!values.categoria) {
    errors.categoria = "La categoría es obligatoria";
  }

  return errors;
};