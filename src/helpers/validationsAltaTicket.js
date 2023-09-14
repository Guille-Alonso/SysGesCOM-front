export const validationsAltaTicket = (values) => {

    let errors = {};
  
    if(!values.titulo){
      errors.titulo = "El titulo es necesario"
    }else if (values.titulo.length > 200) {
      errors.titulo = "El titulo no puede tener mas de 200 caracteres";
    } else if (values.titulo.length < 4) {
      errors.titulo = "El titulo no puede tener menos de 4 caracteres";
    }

    if (!values.ubicacion) {
      errors.ubicacion = "Debes elegir una sugerencia de dispositivo (hacer click)";
    }
  
    if (!values.descripcion) {
      errors.descripcion = "La descripción es requerida";
    } else if (values.descripcion.length > 1000) {
      errors.descripcion = "La descripción no puede tener mas de 1000 caracteres";
    } else if (values.descripcion.length < 4) {
      errors.descripcion = "La descripción no puede tener menos de 4 caracteres";
    } else if (!/^[a-zA-Z\u00C0-\u017F0-9,."':;/]+(?:\s[a-zA-Z\u00C0-\u017F0-9,."':;/]+)*$/
      .test(values.descripcion)) {
      errors.descripcion = "No se permiten símbolos especiales o espacios dobles e inncesarios.";
    }
  
    return errors;
  };