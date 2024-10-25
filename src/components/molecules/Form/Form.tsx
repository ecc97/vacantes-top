import styles from './Form.module.sass'

interface FormProps {
    children: React.ReactNode;
    onSubmit?: (e: React.FormEvent) => void;
    className?: string;
}

const Form: React.FC<FormProps> = ({ children, onSubmit, className }) => {
    return (
        <form onSubmit={onSubmit} className={`${styles.form} ${className}`}>
            {children}
        </form>
    );
}

export default Form;