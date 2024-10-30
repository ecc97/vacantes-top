"use client"
import React, { useState } from 'react'
import styles from './Search.module.sass'
import { FaSearch } from 'react-icons/fa'
import Box from '../Box'
import { Input } from '@/components/atoms/Input/Input'
import Button from '@/components/atoms/Button/Button'
import { useRouter, useSearchParams } from 'next/navigation'

type SearchProps = {
    type: 'companies' | 'vacancies'
}

const Search: React.FC<SearchProps> = ({ type }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParams.get('name') || '')

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('name', searchTerm)
        params.set('page', '1')
        router.push(`?${params.toString()}`);
    }

    return (
        <Box className={styles.searchBox}>
            <Button className={styles.btnSearch} variant="primary" onClick={handleSearch}>
                <FaSearch />
            </Button>
            <Input type="text" name='search' placeholder={`Buscar...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </Box>
    )
}

export default Search




/*
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        router.push(`/search?q=${searchTerm}&type=${type}`)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <Input
                type="text"
                name='search'
                placeholder={`Buscar ${type}`}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <Button type="submit">
                <FaSearch />
            </Button>
        </form>
    )
 */