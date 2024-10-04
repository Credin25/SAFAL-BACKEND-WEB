import styles from "../../styles/components/greyButton.module.css"
// eslint-disable-next-line 
const   GreyButton = ({ text, onClickFunction }) => {
    return (
        <button onClick={onClickFunction} className={styles.button}>{text}</button>
    )

}

export default   GreyButton;