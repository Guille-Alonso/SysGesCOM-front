import { Form, Button, Alert } from 'react-bootstrap';
import './altaUsuarios.css'
import useForm from '../../hooks/useForm';
import { REGISTER_ALTA_USUARIOS_VALUES } from '../../constants';
import { toast } from 'react-toastify';
import axios from 'axios';
import { validationAltaUsuario } from '../../helpers/validationsAltaUsuario';
import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AltaUsuarios = () => {


    const agregarUsuario = async () => {

        const datosUsuario = {
            name: values.name,
            userName: values.userName,
            password: values.password,
            repeatPassword: values.repeatPassword,
            grupoAltaUsuarios: values.grupoAltaUsuarios,
            photo: values.photo
        };
        try {
            const respuesta = await axios.post('/alta-usuarios', datosUsuario);
        } catch (error) {
            console.log('Error al enviar los datos. Intente nuevamente más tarde.')
            console.log(datosUsuario);
            toast.error(error.message);

            setValues(REGISTER_ALTA_USUARIOS_VALUES);
        }
    }

    const { handleChange, handleSubmit, values, setValues, errors } = useForm(
        REGISTER_ALTA_USUARIOS_VALUES,
        agregarUsuario,
        validationAltaUsuario
    )

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [showPassword2, setShowPassword2] = useState(false);
    const handleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    return (
        <>
            <div className='containerAltaUsuarios'>

                <Form className="formAltaUsuarios" onSubmit={handleSubmit}>

                    <div className='contAltaUsuarios col-md-12'>

                        <Form.Group className='inputBoxAltaUsuarios col-md-6'>

                            <Form.Label>Nombre de Usuario</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Ingrese su nombre"
                                onChange={handleChange}
                                value={values.name}
                                name='name'
                                maxLength={40}
                                minLength={4}
                                required
                            />

                        </Form.Group>

                        <Form.Group className='inputBoxAltaUsuarios col-md-6'>

                            <Form.Label>Usuario</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Ingrese el usuario"
                                onChange={handleChange}
                                value={values.userName}
                                name='userName'
                                maxLength={30}
                                minLength={4}
                                required
                            />

                        </Form.Group>

                    </div>

                    <Form.Group className='inputBoxAltaUsuarios'>

                        <Form.Label>Email</Form.Label>

                        <Form.Control
                            type="email"
                            placeholder="Ingrese su email"
                            onChange={handleChange}
                            value={values.email}
                            name='email'
                            maxLength={25}
                            minLength={4}
                            required
                        />

                    </Form.Group>

                    <Form.Group className='inputBoxAltaUsuariosPassword'>

                        <Form.Label>Contraseña</Form.Label>

                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingrese su contraseña"
                            onChange={handleChange}
                            value={values.password}
                            name='password'
                            maxLength={25}
                            minLength={4}
                            required
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            onClick={handleShowPassword}
                            className="icono-password"
                        />

                    </Form.Group>

                    <Form.Group className='inputBoxAltaUsuariosPassword'>

                        <Form.Label>Confirmar contraseña</Form.Label>

                        <Form.Control
                            type={showPassword2 ? "text" : "password"}
                            placeholder="Ingrese su contraseña"
                            onChange={handleChange}
                            value={values.repeatPassword}
                            name='repeatPassword'
                            maxLength={25}
                            minLength={4}
                            required
                        />
                        <FontAwesomeIcon
                            icon={showPassword2 ? faEye : faEyeSlash}
                            onClick={handleShowPassword2}
                            className="icono-password-2"
                        />

                    </Form.Group>

                    <Form.Group className='inputBoxAltaUsuarios'>

                        <Form.Label>Grupo</Form.Label>

                        <Form.Select
                            className='grupoAltaUsuarios'
                            onChange={handleChange}
                            value={values.grupoAltaUsuarios}
                            name='grupoAltaUsuarios'
                            required
                        >
                            <option value="">------------------Seleccionar-----------------</option>
                            <option>ADMIN</option>
                            <option>AREA ESTADISTICA</option>
                            <option>AREA TECNICA</option>
                            <option>DEPTO LEGAL</option>
                            <option>SUPERVISOR</option>
                            <option>VISU    ALIZADOR</option>
                        </Form.Select>

                    </Form.Group>

                    <Form.Group className='inputBoxAltaUsuarios'>

                        <Form.Label>Fotografía</Form.Label>

                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            value={values.photo}
                            name='photo'
                        />

                    </Form.Group>

                    <Button className="btnAltaUsuarios" variant="primary" type="submit">
                        Registrar
                    </Button>
                </Form>
            </div>

            <div className="alertasAltaUsuario">

                {Object.keys(errors).length !== 0 &&
                    Object.values(errors).map((error, index) => (
                        <Alert variant="danger" className="mt-3" key={index}>
                            {error}
                        </Alert>
                    ))}
            </div>
        </>
    );
};

export default AltaUsuarios;