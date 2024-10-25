import React from 'react'
import { Card } from '@/components/molecules/Card/Card'
import Button from '@/components/atoms/Button/Button'
import styles from '../Container/Container.module.sass'
import { Company, Vacancy } from '@/helpers/data'
import { MdOutlineAddCircleOutline } from "react-icons/md";


interface ContainerProps {
  items: (Company | Vacancy)[];
  type: 'companies' | 'vacancies';
  openModalAdd: () => void;
}

const Container = ({ items, type, openModalAdd }: ContainerProps) => {
  const getCardData = (item: Company | Vacancy) => {
    if (type === 'companies') {
      const company = item as Company;
      return {
        title: company.name,
        subtitle: company.location,
        extraInfo: `Contacto: ${company.contact}`
      };
    } else {
      const vacancy = item as Vacancy;
      return {
        title: vacancy.title,
        subtitle: vacancy.company,
        extraInfo: `Estado: ${vacancy.status}`,
        company: `Compañía: ${vacancy.company}`
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
              title={cardData.title}
              subtitle={cardData.subtitle}
              extraInfo={cardData.extraInfo}
              company={cardData.company}
              type={type}
            />
          );
        })}
      </div>
    </section>
  )
}

export default Container
