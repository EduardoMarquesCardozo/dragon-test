import { useNavigate, useParams } from "react-router-dom";
import "./DragonDetails.scss";

const DragonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const backToHome = () => {
      navigate('/home');
    };
    return (
        <div className="wrapper-details">
            <div className="dark">
                <h2>Detalhes do Dragão {id}</h2>
                <div className="details">
                    <div>
                        <label>Criação:</label>
                        <p>25/08/-14448</p>
                    </div>
                    <div>
                        <label>Nome:</label>
                        <p>Smaug</p>
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <p>Black</p>
                    </div>
                    <button onClick={backToHome}>Voltar</button>
                </div>
            </div>
        </div>
    )
}

export default DragonDetails;