import styles from "./styles.module.css";

const { footerContainer } = styles

const Footer = () => {
    return (
        <div className={footerContainer}>
            <span>Copyright &copy; 2025 | kerolos khairy</span>
        </div>
    )
}

export default Footer