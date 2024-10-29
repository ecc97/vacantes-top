import React from 'react'
import { Card } from '@/components/molecules/Card/Card'
import Button from '@/components/atoms/Button/Button'
import styles from '../Container/Container.module.sass'
import { Company, Vacancy } from '@/helpers/data'
import { IVacancy, ICompany } from '@/models/jobs.model'
import { JobService } from '@/services/vacancies.service'
import { CompanyService } from '@/services/companies.service'
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useRouter } from 'next/navigation'

type ItemType = IVacancy | ICompany

interface ContainerProps {
  items: ItemType[];
  type: 'companies' | 'vacancies';
  openModalAdd: () => void;
  openModalEdit: (item: ItemType) => void;
}

const jobService = new JobService()
const companyService = new CompanyService()


const Container = ({ items, type, openModalAdd, openModalEdit }: ContainerProps) => {
  const router = useRouter()
  const handleDelete = async (id: string) => {
    const confirmed = confirm('¿Estás seguro de que quieres eliminar este elemento?')
    if (!confirmed) return
    if (type === 'companies') {
      await companyService.deleteCompany(id)
    } else {
      await jobService.deleteVacancy(Number(id))
    }
    router.refresh()
  }
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
        company: `Compañía: ${vacancy.company!.name}`
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
              onEdit={() => openModalEdit(item)} 
              onDelete={() => handleDelete(item.id!.toString())}
            />
          );
        })}
      </div>
    </section>
  )
}

export default Container
