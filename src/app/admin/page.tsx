import React from 'react'
import { JobService } from '@/services/vacancies.service'
import { CompanyService } from '@/services/companies.service'
import Admin from '@/components/templates/Admin'

const useJobService = new JobService()
const useCompanyService = new CompanyService()

export default async function AdminPage() {
    const vacancies = await useJobService.getVacancies()
    const companies = await useCompanyService.getCompanies()
    
    return (
        <Admin dataVacancy={vacancies} dataCompany={companies}/>
    )
}
