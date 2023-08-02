export const validationsEditarSubcategoria = (values) => {

    let errors = {};
  
    if (!values.nombre) {
      errors.nombre = "El nombre es obligatorio";
    } else if (values.nombre.length < 3) {
      errors.nombre = "El nombre debe tener mas de 2 caracteres";
    } else if(values.nombre.length > 60){
        errors.nombre = "El nombre no debe tener mas de 60 caracteres";
    
    }else if (!/^[a-zA-Z\u00C0-\u017F0-9,.\s()"':;/]+$/.test(values.nombre)){
      errors.nombre = "Formato de nombre no válido";
    }
  
    if (!values.categoria) {
      errors.categoria = "El tipo de Categoría es obligatorio";
    }
  
    return errors;
  };