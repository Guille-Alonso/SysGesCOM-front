export const validationsEditarSubcategoria = (values) => {

    let errors = {};
  
    if (!values.nombre) {
      errors.nombre = "El nombre es obligatorio";
    } else if (values.nombre.length < 3) {
      errors.nombre = "El nombre debe tener mas de 2 caracteres";
    } else if(values.nombre.length > 20){
        errors.nombre = "El nombre no debe tener mas de 20 caracteres";
    
    }else if (!/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/i.test(values.nombre)){
      errors.nombre = "Formato de nombre no válido";
    }
  
    if (!values.categoria) {
      errors.categoria = "El tipo de Categoría es obligatorio";
    }
  
    return errors;
  };