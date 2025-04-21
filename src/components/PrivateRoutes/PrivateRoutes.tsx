import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Dragon from "../../assets/dragon.svg";
import "./PrivateRoutes.scss";
const PrivateRoutes = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleLogout = async () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return token == "fake-jwt-token-123" ?
        <>
            <header className="default-border">
                <div>
                    <img className="img" src={Dragon} alt="Dragon logo" width={"32px"}/>
                    <h1>Dragon List</h1>
                </div>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </header>
            <Outlet /> 
        </>
    :<Navigate to="/" />;
}


export default PrivateRoutes;