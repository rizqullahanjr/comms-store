import styles from "./button.module.scss";

type PropTypes = {
    type: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void;
    children: React.ReactNode;
    variant?: string;
    className?: string;
};

const button = (props: PropTypes) => {
    const { type, onClick, children, variant = 'primary', className } = props;
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${styles.button} ${styles[variant]} ${className}`}
      >
        {children}
      </button>
    );
}

export default button;