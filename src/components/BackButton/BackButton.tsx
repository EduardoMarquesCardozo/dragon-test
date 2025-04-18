import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();
    const backToHome = () => {
        navigate('/home');
      };
    return (
        <button onClick={backToHome}>Voltar</button>
    );
}

export default BackButton;