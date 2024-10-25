import React from 'react'
import { Card } from '@/components/molecules/Card/Card'
import Button from '@/components/atoms/Button/Button'
import styles from '../Container/Container.module.sass'
import { Company, Vacancy } from '@/helpers/data'
import { IVacancy, ICompany } from '@/models/jobs.model'
import { MdOutlineAddCircleOutline } from "react-icons/md";

type ItemType = IVacancy | ICompany

interface ContainerProps {
  items: ItemType[];
  type: 'companies' | 'vacancies';
  openModalAdd: () => void;
}

const Container = ({ items, type, openModalAdd }: ContainerProps) => {
  const getCardData = (item: ItemType) => {
    if (type === 'companies') {
      const company = item as ICompany;
      return {
        title: company.name,
        subtitle: company.location,
        extraInfo: `Contacto: ${company.contact}`
      };
    } else {
      const vacancy = item as IVacancy;
      return {
        title: vacancy.title,
        description: vacancy.description,
        status: `Estado: ${vacancy.status}`,
        company: `Compañía: ${vacancy.company.name}`
      };
    }
  };
  return (
    <section className={styles.cardSection}>
      <div className={styles.header}>
        <h2>{type === 'companies' ? 'Compañías' : 'Vacantes'}</h2>
        <Button variant={type === 'companies' ? 'tertiary' : 'primary' } onClick={openModalAdd}>
          <MdOutlineAddCircleOutline /> &nbsp;{' '}
          {type === 'companies' ? 'Agregar Compañía' : 'Agregar Vacante'}
        </Button>
      </div>
      <div className={styles.cardContent}>
        {items.map((item) => {
          const cardData = getCardData(item);
          return (
            <Card
              key={item.id}
              {...cardData}
              type={type}
            />
          );
        })}
      </div>
    </section>
  )
}

export default Container
