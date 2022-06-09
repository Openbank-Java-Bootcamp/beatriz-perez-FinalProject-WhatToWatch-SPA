import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import defaultUser from "../../images/default-user-image.png";
import styles from "./Navbar.module.scss";

function Navbar() {

    const { user, logOutUser } = useContext(AuthContext);

    return (
        <nav className={styles.navbar}>
            <div className={styles.user}>
                <Link to="/account">
                    <img className={styles.user__image} src={user.imageUrl || defaultUser} alt="user pprofile"/>
                </Link>
            </div>

            <ul className={styles.navigation}>
                <li>
                    <Link to="/home">
                        <svg className={[styles.icon, styles["icon--growing"]].join(" ")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <polyline points="5 12 3 12 12 3 21 12 19 12" />
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link to="/movies">
                        <svg className={[styles.icon, styles["icon--growing"]].join(" ")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <line x1="8" y1="4" x2="8" y2="20" />
                            <line x1="16" y1="4" x2="16" y2="20" />
                            <line x1="4" y1="8" x2="8" y2="8" />
                            <line x1="4" y1="16" x2="8" y2="16" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <line x1="16" y1="8" x2="20" y2="8" />
                            <line x1="16" y1="16" x2="20" y2="16" />
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link to="/series">
                        <svg className={[styles.icon, styles["icon--growing"]].join(" ")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <rect x="3" y="7" width="18" height="13" rx="2" />
                            <polyline points="16 3 12 7 8 3" />
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link to="/watchlists">
                        <svg className={[styles.icon, styles["icon--growing"]].join(" ")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <line x1="9" y1="6" x2="20" y2="6" />
                            <line x1="9" y1="12" x2="20" y2="12" />
                            <line x1="9" y1="18" x2="20" y2="18" />
                            <line x1="5" y1="6" x2="5" y2="6.01" />
                            <line x1="5" y1="12" x2="5" y2="12.01" />
                            <line x1="5" y1="18" x2="5" y2="18.01" />
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link to="/users">
                        <svg className={[styles.icon, styles["icon--growing"]].join(" ")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <circle cx="12" cy="7" r="4" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link to="/explore">
                        <svg className={[styles.icon, styles["icon--growing"]].join(" ")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <line x1="9" y1="12" x2="15" y2="12" />
                            <line x1="12" y1="9" x2="12" y2="15" />
                            <circle cx="12" cy="12" r="8" />
                        </svg>
                    </Link>
                </li>
            </ul>

            <div className={styles.settings}>
                <Link to="/settings">
                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                </Link>
                <button onClick={ logOutUser }>
                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="8" />
                        <path d="M10 10l4 4m0 -4l-4 4" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;