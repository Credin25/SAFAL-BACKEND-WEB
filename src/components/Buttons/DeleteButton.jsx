import styles from "../../styles/components/deleteButton.module.css";
// eslint-disable-next-line
function DeleteButton({ text, onClickFunction }) {
  return (
    <button className={styles.button} onClick={onClickFunction}>{text}</button>
  )
}

export default DeleteButton;