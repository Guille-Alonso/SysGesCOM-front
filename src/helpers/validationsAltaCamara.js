export const validationsAltaCamara = (values) => {
 
    let errors = {};
  
    if (!values.idCamara) {
      errors.idCamara = "Campo obligatorio";
    } else if (values.idCamara.length < 6) {
      errors.idCamara = "El nombre de la cámara debe tener como mínimo 6 caracteres";
    } else if (values.idCamara.length > 7) {
      errors.idCamara = "El nombre de la cámara no debe poseer más de 7 caracteres";
    } 
    if (!values.ubicacion) {
      errors.ubicacion = "La ubicacion es obligatoria";
    }else if(!/^[a-zA-Z0-9 ]+$/.test(values.ubicacion)){
        errors.ubicacion = "La ubicación no debe tener simbolos especiales";
    }

    if (!values.tipoDeCamara) {
        errors.tipoDeCamara = "Tipo de Camara obligatorio";
    }
    return errors;
  };