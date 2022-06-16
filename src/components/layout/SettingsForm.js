//Styles:
import styles from "./SettingsForm.module.scss";

function SettingsForm() {
  return (
    <div className={styles.settings}>
      <h2 className={styles.title}>Select a color scheme</h2>
      <ul className={styles.optionList}>
        <li className={styles.option}>Scheme 1</li>
        <li className={styles.option}>Scheme 2</li>
        <li className={styles.option}>Scheme 3</li>
      </ul>
    </div>
  );
}

export default SettingsForm;
