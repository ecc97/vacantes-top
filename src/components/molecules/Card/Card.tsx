import React from 'react'
import Box from '../Box';
import Button from '../../atoms/Button/Button';
import { MdModeEditOutline } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import styles from './Card.module.sass'

interface CardProps {
  title: string;
  subtitle: string;
  extraInfo?: string;
  company?: string;
  type?: 'companies' | 'vacancies';
}

export const Card = ({ title, subtitle, extraInfo, company, type }: CardProps) => {
  return (
    <Box className={styles.card}>
      <div className={styles.header}>{title}</div>
      <div className={styles.content}>
        <p>{subtitle}</p>
        <p>{extraInfo}</p>
        {company && <p>{company}</p>}   
      </div>
      <Box className={styles.groupBtn}>
        <Button variant="secondary">
          <MdModeEditOutline className={type === 'vacancies' ? `${styles.iconEditVacant}` : `${styles.iconEditCompany}`}/>
        </Button>
        <Button variant="secondary">
          <FaRegTrashAlt className={styles.iconDelete}/>
        </Button>
      </Box>
    </Box>
  );
};
