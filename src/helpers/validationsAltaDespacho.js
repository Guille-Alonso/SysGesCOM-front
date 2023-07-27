export const validationsAltaDespacho = (values) => {

    let errors = {};
  
    if (values.acuse.length > 500) {
      errors.acuse = "El acuse no puede tener mas de 500 caracteres";
    } else if(!/^[a-zA-Z\u00C0-\u017F0-9,.\s()"':;/]*$/.test(values.acuse)){
      errors.acuse = "El acuse no puede tener simbolos especiales";
    }

    if (values.reparticiones.length < 1) {
        errors.reparticiones = "Debe seleccionar al menos una repartición";
      }

    return errors;
  };