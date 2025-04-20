import SpikedDragon from "../../assets/spiked-dragon.svg";
import "./DragonList.scss"
import { useEffect, useState } from "react";
import { deleteDragon } from "../../services/dragonService";
import Plus from "../../assets/plus.svg";
import Trash from "../../assets/trash.svg";
import Pencil from "../../assets/pencil.svg";
import Info from "../../assets/info.svg";

import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useDragonStore } from "../../store/DragonStore";
import OptionCard from "../../components/OptionCard/OptionCard";

const DragonList = () => {
    const navigate = useNavigate();

    const [isConfirmDelete, setIsConfirmDelete] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState("");
    const { dragons, fetchDragons, currentDragon, fetchDragonById } = useDragonStore();

    useEffect(() => {
        fetchDragons();
    }, []);

    const navigationClick = (rota: string, id?: string) => {
        const path = id ? `/${rota}/${id}` : `/${rota}`;
        navigate(path);
    };

    const returnModal = () => {
        setModalOpen(false);
        setIsConfirmDelete(false);
    };

    const handleDelete = async () => {
        if (!currentDragon) return;
      
        try {
            await deleteDragon(currentDragon.id);
            setIsConfirmDelete(false);
            setModalOpen(false);
            fetchDragons();
        } catch (error) {
            setError("Erro ao deletar dragão:"+ error);
        }
      };

    return(
        <div className="wrapper-home">
            <div className="content-home">
                        <div className="card-dragon dark default-border" onClick={() => navigationClick("form")}>
                            <div className="card-body register">
                                <div>
                                    <img src={Plus} alt="SpikedDragon" width={"42px"} />
                                </div>
                                <p>
                                    Cadastrar Dragão
                                </p>
                            </div>
                        </div>
                {
                    dragons.map((dragon) => (
                        <div key={dragon.id} className="card-dragon dark default-border" onClick={() => {
                                setModalOpen(true);
                                fetchDragonById(dragon.id)
                            }}>
                            <div className="card-type">{dragon.type}</div>
                            <div className="card-title">{dragon.name}</div>
                            <div className="card-body">
                                <div>
                                    <img src={SpikedDragon} alt="SpikedDragon" width={"74px"} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <>
                    {isConfirmDelete? 
                        (<div className="modal-confirm">
                            <h1>Confirmar deleção ?</h1>
                            {error ? <p>{error}</p>: <p>Todas as informações sobre {currentDragon?.name} serão removidas do sistema e não será mais possível acessá-las.</p>}
                            <div className="button-group">
                                <button className="back" onClick={() => returnModal()}>Voltar</button>
                                <button className="delete" onClick={() => handleDelete()}>Excluir</button>
                            </div>
                        </div>):
                        (<div className="modal-actions">
                            <div>
                                <h1>Ações</h1>
                                <p>O que deseja fazer com {currentDragon?.name}</p>
                            </div>
                            <OptionCard
                                icon={Info}
                                text="Ver detalhes"
                                onClick={() => navigationClick("details", currentDragon!.id)}
                            />
                            <OptionCard
                                icon={Pencil}
                                text="Editar"
                                onClick={() => navigationClick("form", currentDragon!.id)}
                            />
                            <OptionCard
                                icon={Trash}
                                text="Excluir"
                                onClick={() => setIsConfirmDelete(true)}
                            />
                        </div>)
                    }
                </>
            </Modal>
        </div>
    );

}

export default DragonList