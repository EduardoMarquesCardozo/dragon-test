import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
import { dragonLogin } from "../../services/authService";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await dragonLogin(username, password);
            if (response.data?.success) {
                localStorage.setItem("token", response.data!.user.token);
                navigate("/home");
            } else {
                setError("Algo deu errado. Tente novamente!");
            }
        } catch (err) {
            const errorMessage = (err as { response: { data: { message?: string } } }).response.data.message ??"Erro desconhecido.";
            setError(errorMessage);
        }
    };

    return (
        <div className="wrapper-login">
            <div className="content dark">
                <div className="header-login">Sign in</div>
                <div>
                    <input 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                        placeholder="Password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error !== "" && <p>{error}</p>}
                <div>
                    <button onClick={handleLogin} disabled={password =="" && username == ""}>Sign in</button>
                </div>
            </div>
        </div>
    );
};

export default Login;