import { useNavigate } from "react-router-dom";
import "./BackButton.scss";

const BackButton = () => {
    const navigate = useNavigate();
    const backToHome = () => {
        navigate('/home');
      };
    return (
        <button className="back-button" onClick={backToHome}>Voltar</button>
    );
}

export default BackButton;