import SpikedDragon from "../../assets/spiked-dragon.svg";
import "./DragonList.scss"
import { IDragon } from "../../models/Dragon";
import { useEffect, useState } from "react";
import { getDragon } from "../../services/dragonService";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

const DragonList = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentDragon, setCurrentDragon] = useState<IDragon | null>(null);
    const [dragons, setDragons] = useState<IDragon[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getDragon();
            setDragons(response.data);
          } catch (error) {
            console.error("Erro ao buscar dragões:", error);
          }
        };
        fetchData();
      }, []);

    const navigate = useNavigate();

    const navigationClick = (rota:string,id:string) => {
        navigate("/"+rota+"/"+id);
    };

    return(
        <div className="wrapper-home">
            <div className="content-home">
                {
                    dragons.map((dragon) => (
                        <div className="card-dragon" onClick={() => {
                                setModalOpen(true);
                                setCurrentDragon(dragon)
                            }}>
                            <div className="card-title">{dragon.name}</div>
                            <div className="card-body">
                                <div>
                                    <img src={SpikedDragon} alt="SpikedDragon" width={"64px"} />
                                </div>
                            </div>
                            <div className="card-footer">{dragon.type}</div>
                        </div>
                    ))
                }
            </div>
            <button onClick={() => setModalOpen(true)}>Cadastrar Dragão</button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <div>
                    <p>O que deseja fazer com {currentDragon?.name}</p>
                    <button onClick={() => navigationClick("details", currentDragon!.id)}>Ver detalhes</button>
                    <button onClick={() => navigationClick("form", currentDragon!.id)}>Editar</button>
                    <button>Deletar</button>
                </div>
            </Modal>
        </div>
    );

}

export default DragonList