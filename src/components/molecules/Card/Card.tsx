import React from 'react'
import Box from '../Box';
import Button from '../../atoms/Button/Button';
import { MdModeEditOutline } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import styles from './Card.module.sass'

interface CardProps {
  title: string;
  description?: string;
  status?: string;
  subtitle?: string;
  extraInfo?: string;
  company?: string;
  type?: 'companies' | 'vacancies';
  onEdit: () => void
  onDelete: () => Promise<void>
}

export const Card = ({ title, description, status, subtitle, extraInfo, company, type, onEdit, onDelete }: CardProps) => {
  return (
    <Box className={styles.card}>
      <div className={styles.header}>{title}</div>
      <div className={styles.content}>
        <p>{type === 'vacancies' ? description : subtitle}</p>
        <p>{type === 'vacancies' ? status : extraInfo}</p>
        {company && <p>{company}</p>}   
      </div>
      <Box className={styles.groupBtn}>
        <Button variant="secondary" onClick={onEdit}>
          <MdModeEditOutline className={type === 'vacancies' ? `${styles.iconEditVacant}` : `${styles.iconEditCompany}`}/>
        </Button>
        <Button variant="secondary" onClick={onDelete}>
          <FaRegTrashAlt className={styles.iconDelete}/>
        </Button>
      </Box>
    </Box>
  );
};
