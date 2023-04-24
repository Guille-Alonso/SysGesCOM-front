import './login.css'

export const Login = () => {
    return (
        <>
            <div className='box'>
                <span className='borderLine'></span>
                <form>
                    <img src="src\img\logo_comm.png" alt="logo del com" />
                    <div className="inputBox">
                        <input type="text" required="required" />
                        <span>Nombre de Usuario</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="password" required="required" />
                        <span>Contraseña</span>
                        <i></i>
                    </div>
                    <div className="links">
                        <a href="#">Olvidaste tu contraseña?</a>
                    </div>
                    <input type="submit" value="Entrar" />
                </form>
            </div>

        </>
    )
}

export default Login;