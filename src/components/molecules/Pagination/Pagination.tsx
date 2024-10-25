import React from 'react'
import Box from '../Box'
import Button from '@/components/atoms/Button/Button'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from './Pagination.module.sass'

export const Pagination = () => {
  return (
    <Box className={styles.boxPagination}>
        <Button className={styles.btnLeft} variant="secondary">
            <FaAngleLeft className={styles.iconLeft}/>
        </Button>
        <span>Página 1 / 2</span>
        <Button className={styles.btnRight} variant="secondary">
            <FaAngleRight className={styles.iconRight}/>
        </Button>
    </Box>
  )
}
