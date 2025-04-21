import { useNavigate, useParams } from "react-router-dom";
import "./DragonForm.scss";
import { useEffect, useState } from "react";
import { createDragon, putDragon } from "../../../services/dragonService";
import BackButton from "../../../components/BackButton/BackButton";
import { useDragonStore } from "../../../store/DragonStore";

const DragonForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [error, setError] = useState("");
    const { currentDragon, fetchDragonById } = useDragonStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            name,
            type,
        };
        if(id){
            try {
                await putDragon(currentDragon!.id, data);
                navigate("/home");
            } catch (error) {
                setError("Erro ao editar o dragão:"+ error);
            }
            }else{
            try {
                await createDragon(data);
                navigate("/home");
            } catch (error) {
                setError("Erro ao criar dragão:"+ error);
            }
        }
        
    };

    useEffect(() => {
        if (id) {
            fetchDragonById(id!);
            setName(currentDragon!.name);
            setType(currentDragon!.type);
        }
        }, [id]);

    return (
        <div className="wrapper-form">
            <div className="dark default-border form-dragon">
                <h2>{id? "Edição": "Cadastro"}</h2>
                <p>{id? 
                    "Altere os dados cadastrados do dragão."
                    : "Informe os dados do dragão."}</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nome:</label>
                        <input placeholder="Ex: Smaug" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <input placeholder="Ex: Vermelho" value={type} onChange={(e) => setType(e.target.value)} required />
                    </div>
                    <div className="button-group">
                        <BackButton/>
                        <button type="submit" disabled={name == "" && type==""}>{id? "Salvar": "Criar"}</button>
                    </div>
                </form>
                {error !== "" && <p>{error}</p>}
            </div>
        </div>
    )
}

export default DragonForm;