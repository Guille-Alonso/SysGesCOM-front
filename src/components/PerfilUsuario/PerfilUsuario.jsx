import React from 'react'
import "./PerfilUsuario.css";
import { Form } from 'react-bootstrap';
import useForm from '../../hooks/useForm';
import axios from '../../config/axios';
import useGet from '../../hooks/useGet';



export const PerfilUsuario = () => {

    
    
    return (
        <>
            <div className='contPadrePerfilUser'>

                {/* <img src={
            values.foto !== undefined
              ? values.foto
              : "https://us.123rf.com/450wm/hugok1000/hugok10001905/hugok1000190500198/123291745-ilustraci%C3%B3n-de-avatar-de-perfil-predeterminado-en-azul-y-blanco-sin-persona.jpg"
          } /> */}

                <Form.Group className="inputPerfilUser">
                    <Form.Label>Nombre</Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="Nombre"
                        // value={values.nombre}
                        // onChange={handleChange}
                        name="nombre"
                        disabled
                    />
                </Form.Group>
                <Form.Group className="inputPerfilUser">
                    <Form.Label>Usuario</Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="Usuario"
                        //   value={values.user}
                        // onChange={handleChange}
                        name="user"
                        disabled
                    />
                </Form.Group>
                <Form.Group className="inputPerfilUser">
                    <Form.Label>DNI</Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="DNI"
                        //   value={values.dni}
                        // onChange={handleChange}
                        name="dni"
                        disabled
                    />
                </Form.Group>
                <Form.Group className="inputPerfilUser">
                    <Form.Label>Fecha Nacimiento</Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="Fecha Nacimiento"
                        //   value={values.fechaNac}
                        // onChange={handleChange}
                        name="fechaNac"
                        disabled
                    />
                </Form.Group>
                <Form.Group className="inputPerfilUser">
                    <Form.Label>Email</Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="Email"
                        //   value={values.email}
                        // onChange={handleChange}
                        name="email"
                        disabled
                    />
                </Form.Group>
                <Form.Group className="inputPerfilUser">
                    <Form.Label>N° Afiliado</Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="N° Afiliado"
                        //   value={values.numAfil}
                        // onChange={handleChange}
                        name="numAfil"
                        disabled
                    />
                </Form.Group>
                <Form.Group className="inputPerfilUser">
                    <Form.Label>Turno</Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="Turno"
                        //   value={values.turno}
                        // onChange={handleChange}
                        name="turno"
                        disabled
                    />
                </Form.Group>
                <Form.Group className="inputPerfilUser">
                    <Form.Label>Tipo de Usuario</Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="Tipo de Usuario"
                        //   value={values.tipoDeUsuario}
                        // onChange={handleChange}
                        name="tipoDeUsuario"
                        disabled
                    />
                </Form.Group>
            </div>
        </>
    )
}
