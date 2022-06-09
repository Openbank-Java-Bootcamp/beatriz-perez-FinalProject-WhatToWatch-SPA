import styles from "./GeneralLayout.module.scss";
import Navbar from "./Navbar";

function GeneralLayout({  children}) {
    return (
        <div className={styles.page}>
            <Navbar/>
            <main className={styles.mainSection}>
                <h1 className={styles.mainSection__title}>What To Watch</h1>
                { children }
            </main>
        </div>
    );
}

export default GeneralLayout;