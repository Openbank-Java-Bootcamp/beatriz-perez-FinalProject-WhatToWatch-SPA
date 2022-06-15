// Modules:
import { useNavigate } from "react-router-dom";

// Styles:
import styles from "./LandingPage.module.scss";
import 'animate.css';

// Components:
import AllCenteredLayout from "../../components/layout/AllCenteredLayout";
import { useState } from "react";

function LandingPage() {

    const navigate = useNavigate();
    const [style, setstyle] = useState("");

    const start = () => {
        setstyle("animate__animated animate__bounce");
        setTimeout(() => {setstyle("animate__animated animate__backOutUp");}, 1500);
        setTimeout(() => {navigate("/watchlists");}, 3000);
    }

    return (
        <AllCenteredLayout>
            <div className={style} >
                <h1 className={styles.title} >What To Watch</h1>
                <h2 className={styles.phrase} >List it. Share it. Watch it.</h2>
                <button onClick={start} className={styles.button} >Go</button>
            </div>
        </AllCenteredLayout>
    );
}

export default LandingPage;