import Dragon from "../../assets/dragon.svg";
import "./Header.scss";
const Header = () => {
    return (
        <header>
            <div>
                <img className="img" src={Dragon} alt="Dragon logo" width={"32px"}/>
                <h1>Dragon List</h1>
            </div>
        </header>
    );
}


export default Header;