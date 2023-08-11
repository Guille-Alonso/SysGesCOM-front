export const validationRelevamientoMotos = (values) => {

    if (!values.personas) {
        errors.personas = "El campo personas es obligatorio";
    }

    if (!values.cascos) {
        errors.cascos = "El campo cascos es obligatorio";
    }

    return errors;
};