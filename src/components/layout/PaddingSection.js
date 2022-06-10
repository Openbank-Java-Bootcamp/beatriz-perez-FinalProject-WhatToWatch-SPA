import styles from "./PaddingSection.module.scss";

function PaddingSection({ children }) {
    return (
        <section className={styles.section}>
            {children}
        </section>
    );
}

export default PaddingSection;