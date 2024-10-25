import React from 'react';
import Box from '../Box';
import Button from '@/components/atoms/Button/Button';
import styles from './Modal.module.sass'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className, title }) => {
    return (
        isOpen && (
            <Box className={styles.overlay}>
                <div className={`${styles.modal} ${className}`}>
                    <div className={styles.modalContent}>
                        <div className={styles.header}>
                            <h2>{title}</h2>
                            <Button variant='secondary' onClick={onClose}>×</Button>
                        </div>
                        <div className={styles.modalBody}>
                            {children}
                        </div>
                    </div>
                </div>
            </Box>
        )
    )
}

export default Modal;