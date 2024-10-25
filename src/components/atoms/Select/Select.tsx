import styles from './Select.module.sass'

interface SelectProps {
    name: string;
    id?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string; }[];
    placeholder?: string;
    className?: string;
}

const Select: React.FC<SelectProps> = ({
    name,
    id,
    value,
    onChange,
    options,
    placeholder,
    className
}) => {
    return (
        <select
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            className={`${styles.select} ${className}`}
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;