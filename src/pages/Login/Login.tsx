import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
      navigate('/home');
    };

    return (
        <div className="wrapper-login">
            <div className="content dark">
                <div className="header-login">Sign in</div>
                <div>
                    <input placeholder="Username"></input>
                    <input placeholder="Password"></input>
                </div>
                <div>
                    <button onClick={handleLogin}>Sign in</button>
                </div>
            </div>
        </div>
    );
};

export default Login;