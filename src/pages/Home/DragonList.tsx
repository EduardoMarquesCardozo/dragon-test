import Header from "../../components/Header/Header";
import SpikedDragon from "../../assets/spiked-dragon.svg";

import "./DragonList.scss"
import { IDragon } from "../../models/Dragon";
import { useEffect, useState } from "react";
import { getDragon } from "../../services/dragonService";

const DragonList = () => {
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

    return(
        <div className="wrapper-home">
            <Header></Header>
            <div className="content-home">
                {
                    dragons.map((dragon) => (
                        <div className="card-dragon">
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
        </div>
    );

}

export default DragonList