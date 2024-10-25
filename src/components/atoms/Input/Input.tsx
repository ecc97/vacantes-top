import React from 'react'
import styles from './Input.module.sass'

interface InputProps {
    name: string;
    id?: string
    type: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

export const Input: React.FC<InputProps> = ({name, type, placeholder, value, onChange, required, className}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`${styles.input} ${className}`}
    />
  )
}

