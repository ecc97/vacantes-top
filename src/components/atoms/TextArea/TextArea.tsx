import styles from './Textarea.module.sass'

interface TextAreaProps {
    name: string;
    id?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ name, id, value, onChange, placeholder, required, className }) => {
    return (
        <textarea
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${styles.textarea} ${className}`}
        />
    );
}

export default TextArea;