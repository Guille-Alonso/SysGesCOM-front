import { Alert } from 'react-bootstrap';
import { LOGIN_VALUES } from '../../constants';
import { validationLogin } from '../../helpers/validationsLogin';
import useForm from '../../hooks/useForm';
import './login.css'

export const Login = () => {

    const iniciarSesion = async ()=>{
        try {
            console.log(values);

            setValues(LOGIN_VALUES)
        } catch (error) {
            console.log(error);
        }
    }

    const { handleChange, handleSubmit, values, setValues, errors } = useForm(LOGIN_VALUES,iniciarSesion,validationLogin)
    return (
      <>
        <div className="box">
          <span className="borderLine"></span>
          <form onSubmit={handleSubmit}>
            <img src="src\img\logo_comm.png" alt="logo del com" />
            <div className="inputBox">
              <input
                name="nombreUsuario"
                value={values.nombreUsuario}
                onChange={handleChange}
                type="text"
                required="required"
                maxLength={15}
              />
              <span>Nombre de Usuario</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input
                name="contraseña"
                value={values.contraseña}
                onChange={handleChange}
                type="password"
                required="required"
              />
              <span>Contraseña</span>
              <i></i>
            </div>
            <div className="links">
              <a href="#">Olvidaste tu contraseña?</a>
            </div>
            {Object.keys(errors).length !== 0 &&
              Object.values(errors).map((error, index) => (
                <Alert variant="danger" className="mt-3" key={index}>
                  {error}
                </Alert>
              ))}
            <input type="submit" value="Entrar" />
          </form>
        </div>
      </>
    );
}

export default Login;