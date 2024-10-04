import styles from "../../styles/components/blueButton.module.css"
// eslint-disable-next-line 
const BlueButton = ({ text, onClickFunction }) => {
    return (
        <button onClick={onClickFunction} className={styles.button}>{text}</button>
    )

}

export default BlueButton;