import styles from "../../styles/components/header.module.css";
// eslint-disable-next-line react/prop-types
const Header = ({ heading }) => {
    return (
        <div className={styles.header}>
            <h1>{heading}</h1>
        </div>
    );
};

export default Header;
