import { useParams } from "react-router-dom";
import "./DragonDetails.scss";
import { useEffect } from "react";
import BackButton from "../../../components/BackButton/BackButton";
import { useDragonStore } from "../../../store/DragonStore";

const DragonDetails = () => {
    const { id } = useParams();
    const { currentDragon, fetchDragonById } = useDragonStore();

    useEffect(() => {
        fetchDragonById(id!);
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
                        <p>{formatDate(currentDragon?.createdAt || '')}</p>
                    </div>
                    <div>
                        <label>Nome:</label>
                        <p>{currentDragon?.name}</p>
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <p>{currentDragon?.type}</p>
                    </div>
                    <BackButton/>
                </div>
            </div>
        </div>
    )
}

export default DragonDetails;