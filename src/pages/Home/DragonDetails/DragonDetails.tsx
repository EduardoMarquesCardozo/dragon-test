import { useNavigate, useParams } from "react-router-dom";
import "./DragonDetails.scss";
import { useEffect, useState } from "react";
import { getDragonById } from "../../../services/dragonService";
import { IDragon } from "../../../models/Dragon";
import BackButton from "../../../components/BackButton/BackButton";

const DragonDetails = () => {
    const { id } = useParams();
    const [dragon, setDragon] = useState<IDragon | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchDragon = async () => {
            try {
                const response = await getDragonById(id);
                setDragon(response.data);
            } catch (error) {
                navigate("/home");
            }
            };
        
            fetchDragon();
        }
        }, [id]);



    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
    };
      
    return (
        <div className="wrapper-details">
            <div className="dark">
                <h2>Detalhes do Dragão {id}</h2>
                <div className="details">
                    <div>
                        <label>Criação:</label>
                        <p>{formatDate(dragon?.createdAt || '')}</p>
                    </div>
                    <div>
                        <label>Nome:</label>
                        <p>{dragon?.name}</p>
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <p>{dragon?.type}</p>
                    </div>
                    <BackButton/>
                </div>
            </div>
        </div>
    )
}

export default DragonDetails;