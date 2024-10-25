import React from 'react'
import { JobService } from '@/services/vacancies.service'
import Admin from '@/components/templates/Admin'

const useJobService = new JobService()

export default async function AdminPage() {
    const vacancies = await useJobService.getVacancies()
    
    return (
        <Admin dataVacancy={vacancies}/>
    )
}
