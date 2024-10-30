"use client"
import React from 'react'
import Box from '../Box'
import Button from '@/components/atoms/Button/Button'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from './Pagination.module.sass'
import { ICompanyResponse, IVacancyResponse } from '@/models/jobs.model';
import { useRouter, useSearchParams } from 'next/navigation';

type TypePage = 'companies' | 'vacancies'

interface PaginationProps {
  dataCompany: ICompanyResponse;
  dataVacants: IVacancyResponse;
  type: TypePage;
}

export const Pagination = ({dataCompany, dataVacants, type}: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onPageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(newPage))
    router.push(`?${params.toString()}`);
  }
  
  const currentPageC = dataCompany.pageable.pageNumber + 1
  const currentPageV = dataVacants.pageable.pageNumber + 1
  
  return (
    <Box className={styles.boxPagination}>
      {
         type === 'companies'? 
         (
          <>
            <Button className={styles.btnLeft} variant="secondary" disabled={currentPageC === 1} onClick={() => onPageChange(currentPageC - 1)}>
              <FaAngleLeft className={styles.iconLeft}/>
            </Button>
              <span>Página {currentPageC} / {dataCompany.totalPages}</span>
            <Button className={styles.btnRight} variant="secondary" onClick={() => onPageChange(currentPageC + 1)} disabled={currentPageC === dataCompany.totalPages}>
                <FaAngleRight className={styles.iconRight}/>
            </Button>
          </>
         ) : (
           <>
            <Button className={styles.btnLeft} variant="secondary" disabled={currentPageV === 1} onClick={() => onPageChange(currentPageV - 1)}>
              <FaAngleLeft className={styles.iconLeft}/>
            </Button>
              <span>Página {currentPageV} / {dataVacants.totalPages}</span>
            <Button className={styles.btnRight} variant="secondary" onClick={() => onPageChange(currentPageV + 1)} disabled={currentPageV === dataVacants.totalPages}>
                <FaAngleRight className={styles.iconRight}/>
            </Button>
          </>
         )
       }
    </Box>
  )
}
