import React from 'react'
import { JobService } from '@/services/vacancies.service'
import { CompanyService } from '@/services/companies.service'
import Admin from '@/components/templates/Admin'

const useJobService = new JobService()
const useCompanyService = new CompanyService()

interface IParamsProps {
    searchParams: {
      page: string;
      size: string;
      name: string; 
    }
  }
  
  export const generateMetaData = async ({ searchParams}: IParamsProps)=> {
    const page = searchParams.page ?? 1;
    return {
      title: `Clientes - Página ${page}`,
      description: 'Gestion de compañias'
    }
  }

export default async function AdminPage({searchParams}: IParamsProps) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const size = searchParams.size ? parseInt(searchParams.size) : 5;
    const name = searchParams.name || "";
    const vacancies = await useJobService.getVacancies(page, size)
    const companies = await useCompanyService.getCompanies(page, size, name)
    const allCompanies = await useCompanyService.getCompaniesAll()
    
    return (
        <Admin dataVacancy={vacancies} dataCompany={companies} dataAllCompany={allCompanies} isActiveTabPag={searchParams.name ? "vacancies" : "companies"}/>
    )
}
