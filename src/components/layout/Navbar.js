import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar({ logOtFunction }) {

    const { user, logOutUser } = useContext(AuthContext);

    return (
        <nav>
            <button onClick={ logOutUser }>Logout</button>
            <span>{user && user.username}</span>
            <img src={user.imageUrl} alt="user account image"/>
        </nav>
    );
}

export default Navbar;