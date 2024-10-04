import styles from "../../styles/components/editButton.module.css";
// eslint-disable-next-line
function EditButton({ text, onClickFunction }) {
  return (
    <button className={styles.button} onClick={onClickFunction} >{text}</button>
  )
}

export default EditButton