export const validationsAltaNoticias = (values,setErrors, newErrors, lengthFile) => {

  
  // let newErrors = {};

  if (!values.titulo) {
    newErrors.titulo = "El titulo es necesario"
  } else if (values.titulo.length > 200) {
    newErrors.titulo = "El titulo no puede tener más de 200 caracteres";
  } else if (values.titulo.length < 4) {
    newErrors.titulo = "El titulo no puede tener menos de 4 caracteres";
  }
console.log(values.files)
  if (!values.files) {
    newErrors.files = "El arichivo de la noticia es necesario"
  }else if(lengthFile > 4 ){
    newErrors.files = "No puede adjuntar más de 4 archivos"

  }


  setErrors(newErrors);
};