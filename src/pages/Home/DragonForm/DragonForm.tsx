import { useNavigate, useParams } from "react-router-dom";
import "./DragonForm.scss";
import { useEffect, useState } from "react";
import { createDragon, getDragonById, putDragon } from "../../../services/dragonService";
import { IDragon } from "../../../models/Dragon";
import BackButton from "../../../components/BackButton/BackButton";

const DragonForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [error, setError] = useState("");
    const [dragon, setDragon] = useState<IDragon | null>(null);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const data = {
        name,
        type,
      };
      if(id){
        try {
            await putDragon(dragon!.id, data);
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
          const fetchDragon = async () => {
            try {
              const response = await getDragonById(id);
              setDragon(response.data);
              setName(response.data.name);
              setType(response.data.type);
            } catch (error) {
              setError("Não foi possível carregar os dados do dragão." + error);
              navigate("/home");
            }
          };
      
          fetchDragon();
        }
      }, [id]);

    return (
        <div className="wrapper-form">
            <div className="dark">
                <h2>{id? "Edição": "Cadastro"} de Dragão</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nome:</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <input value={type} onChange={(e) => setType(e.target.value)} required />
                    </div>
                    <button type="submit" disabled={name == "" && type==""}>Salvar</button>
                    <BackButton/>
                </form>
                {error !== "" && <p>{error}</p>}
            </div>
        </div>
    )
}

export default DragonForm;