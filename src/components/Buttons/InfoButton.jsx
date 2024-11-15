import styles from "../../styles/components/infoButton.module.css";
// eslint-disable-next-line
function InfoButton({ text, onClickFunction }) {
  return (
    <button className={styles.button} onClick={onClickFunction} >{text}</button>
  )
}

export default InfoButton