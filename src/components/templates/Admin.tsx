"use client"
import React, {useState} from 'react'
import { IVacancyResponse, IVacancy, ICompany } from '@/models/jobs.model'
import Container from '../organisms/Container/Container'
import Box from '../molecules/Box'
import Button from '../atoms/Button/Button'
import Modal from '../molecules/Modal/Modal'
import Form from '../molecules/Form/Form'
import Label from '../atoms/Label/Label'
import { Input } from '../atoms/Input/Input'
import TextArea from '../atoms/TextArea/TextArea'
import Select from '../atoms/Select/Select'
import { Pagination } from '../molecules/Pagination/Pagination'
import { FaSearch } from 'react-icons/fa'
import { companies, vacancies } from '@/helpers/data'
import { BsSuitcaseLg } from "react-icons/bs";
import { BsBuildingsFill } from "react-icons/bs";
import styles from './Admin.module.sass'

interface AdminTemplateProps {
    dataVacancy: IVacancy[]
    dataCompany: ICompany[]
}

export default function Admin({dataVacancy, dataCompany}: AdminTemplateProps) {
    const dataVacancies = dataVacancy
    const [isActiveTab, setIsActiveTab] = useState<'companies' | 'vacancies'>('vacancies')
    const [isVacancyModalOpen, setIsVacancyModalOpen] = useState<boolean>(false)
    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState<boolean>(false)

    const  [vacancyForm, setVacancyForm] = useState({
        title: '',
        description: '',
        status: '',
        company: '',
    })

    const [companyForm, setCompanyForm] = useState({
        name: '',
        location: '',
        contact: '',
    })

    const handleVacancySubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Vacancy Form:', vacancyForm)
        setIsVacancyModalOpen(false)
    }

    const handleCompanySubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Company Form:', companyForm)
        setIsCompanyModalOpen(false)
    }

    const handleOpenModal = () => {
        if(isActiveTab === 'companies') {
            setIsCompanyModalOpen(true)
        } else {
            setIsVacancyModalOpen(true)
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.adminTitle}>Panel de administración</h1>
            <div className={styles.tabs}>
                <Box className={styles.groupOpt}>
                    <Button
                        className={styles.btnOpt}
                        variant={isActiveTab === 'vacancies' ? 'primary' : 'secondary'}
                        onClick={() => setIsActiveTab('vacancies')}
                    >
                        <BsSuitcaseLg />
                        <span>Vacantes</span>
                    </Button>
                    <Button
                        variant={isActiveTab === 'companies' ? 'tertiary' : 'secondary'}
                        onClick={() => setIsActiveTab('companies')}
                    >
                        <BsBuildingsFill />
                        <span>Compañías</span>
                    </Button>
                </Box>
                <Box className={styles.searchBox}>
                    <FaSearch />
                    <Input type="text" name='search' placeholder="Buscar..." />
                </Box>
            </div>
            <Container
                items={isActiveTab === 'companies' ? dataCompany : dataVacancies}
                type={isActiveTab}
                openModalAdd={handleOpenModal}
            />

            {/* Modal de Vacante */}
            <Modal
                isOpen={isVacancyModalOpen}
                onClose={() => setIsVacancyModalOpen(false)}
                title="Agregar Vacante"
            >
                <Form onSubmit={handleVacancySubmit}>
                    <Box className={styles.inputBox}>
                        <Label htmlFor="title">Título</Label>
                        <Input
                            type="text"
                            id='title'
                            name="title"
                            value={vacancyForm.title}
                            onChange={(e) => setVacancyForm({
                                ...vacancyForm,
                                title: e.target.value
                            })}
                            required
                        />
                    </Box>
                    <Box className={styles.textAreaBox}>
                        <Label htmlFor="description">Descripción</Label>
                        <TextArea
                            name="description"
                            id='description'
                            value={vacancyForm.description}
                            onChange={(e) => setVacancyForm({
                                ...vacancyForm,
                                description: e.target.value
                            })}
                            required
                        />
                    </Box>
                    <Box className={styles.selectBox}>
                        <Label htmlFor="status">Estado</Label>
                            <Select
                                name="status"
                                id='status'
                                value={vacancyForm.status}
                                onChange={(e) => setVacancyForm({
                                    ...vacancyForm,
                                    status: e.target.value
                                })}
                                options={[
                                    { value: 'OPEN', label: 'Abierta' },
                                    { value: 'CLOSED', label: 'Cerrada' }
                                ]}
                                placeholder="Seleccione un estado"
                            />
                    </Box>
                    <Box className={styles.selectBox}>
                        <Label htmlFor="company">Compañía</Label>
                            <Select
                                name="company"
                                id='company'
                                value={vacancyForm.company}
                                onChange={(e) => setVacancyForm({
                                    ...vacancyForm,
                                    company: e.target.value
                                })}
                                options={companies.map(company => ({
                                    value: company.id.toString(),
                                    label: company.name
                                }))}
                                placeholder="Seleccione una compañía"
                            />
                    </Box>
                    <Button type="submit" variant="primary">
                        Agregar
                    </Button>
                </Form>
            </Modal>

            {/* Modal de Compañía */}
            <Modal
                isOpen={isCompanyModalOpen}
                onClose={() => setIsCompanyModalOpen(false)}
                title="Agregar Compañía"
            >
                <Form onSubmit={handleCompanySubmit}>
                    <Box className={styles.inputBox}>
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            type="text"
                            id='title'
                            name="name"
                            placeholder="Ingrese el nombre"
                            value={companyForm.name}
                            onChange={(e) => setCompanyForm({
                                ...companyForm,
                                name: e.target.value
                            })}
                            required
                        />
                    </Box>
                    <Box className={styles.inputBox}>
                        <Label htmlFor="location">Ubicación</Label>
                        <Input
                            type="text"
                            id='location'
                            name="location"
                            placeholder="Ingrese la ubicación"
                            value={companyForm.location}
                            onChange={(e) => setCompanyForm({
                                ...companyForm,
                                location: e.target.value
                            })}
                            required
                        />
                    </Box>
                    <Box className={styles.inputBox}>
                        <Label htmlFor="contact">Contacto</Label>
                        <Input
                            type="text"
                            id='contact'
                            name="contact"
                            placeholder="Ingrese el contacto"
                            value={companyForm.contact}
                            onChange={(e) => setCompanyForm({
                                ...companyForm,
                                contact: e.target.value
                            })}
                            required
                        />
                    </Box>
                    <Button type="submit" variant="tertiary">
                        Agregar
                    </Button>
                </Form>
            </Modal>
            <Pagination />
        </div>
    )
}
