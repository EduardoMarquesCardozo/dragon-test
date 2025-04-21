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
            <div className="content dark default-border">
                <div className="header-login">Acesso</div>
                <div className="body-login">
                    <label>Usuário</label>
                    <input 
                        placeholder="Eduardo" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Senha</label>
                    <input 
                        placeholder="*****" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error !== "" && <p>{error}</p>}
                <div>
                    <button onClick={handleLogin} disabled={password =="" && username == ""}>Acessar</button>
                </div>
            </div>
        </div>
    );
};

export default Login;