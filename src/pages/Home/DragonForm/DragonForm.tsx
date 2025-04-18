import { useParams } from "react-router-dom";
import "./DragonForm.scss";

const DragonForm = () => {
    const { id } = useParams();
    return (
        <div className="wrapper-form">
            <div className="dark">
                <h2>{id? "Edição": "Cadastro"} de Dragão</h2>
                <form>
                    <div>
                        <label>Nome:</label>
                        <input type="text" placeholder="Nome do dragão" />
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <input type="text" placeholder="Tipo do dragão" />
                    </div>
                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    )
}

export default DragonForm;