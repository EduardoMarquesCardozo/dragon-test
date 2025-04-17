import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
      navigate('/home');
    };

    return (
        <div className="wrapper">
        <div className="content dark">
            <header>Sign in</header>
            <div>
                <input placeholder="Username"></input>
                <input placeholder="Password"></input>
            </div>
            <div>
                {/* <button onClick={handleLogin}>Sign in</button> */}
                <button>Sign in</button>
            </div>
        </div>

        </div>

    );
};

export default Login;