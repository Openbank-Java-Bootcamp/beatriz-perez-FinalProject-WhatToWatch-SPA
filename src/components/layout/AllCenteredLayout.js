import styles from "./AllCenteredLayout.module.scss";

function AllCenteredLayout({  children}) {
    return (
        <div className={styles.page}>
            <main className={styles.mainSection}>
                { children }
            </main>
        </div>
    );
}

export default AllCenteredLayout;