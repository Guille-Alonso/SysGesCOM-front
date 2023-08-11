export const validationsAltaCategoria = (values) => {

    let errors = {};
  
    if (!values.categoria) {
      errors.categoria = "La categoria es obligatoria";
    } else if (values.categoria.length < 3) {
      errors.categoria = "La categoria debe tener mas de 2 caracteres";
    } else if(values.categoria.length > 40){
        errors.categoria = "La categoria no debe tener mas de 40 caracteres";
    
    }else if (!/^[a-zA-Z\u00C0-\u017F0-9,.\s()"':;/]+$/.test(values.categoria)){
      errors.categoria = "Formato de categoria no válido";
    }
  
    if (!values.naturaleza) {
      errors.naturaleza = "El tipo de Categoría es obligatorio";
    }
  
    return errors;
  };