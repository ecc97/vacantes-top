import styles from './Button.module.sass'

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'tertiary';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, disabled, type, variant = 'primary' }) => {
    return (
        <button type={type} onClick={onClick} className={`${styles.button} ${styles[variant]}  ${className}`} disabled={disabled}>
            {children}
        </button>
    );
}
export default Button;
