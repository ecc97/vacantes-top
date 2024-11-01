"use client"
import React, { useState } from 'react'
import { IVacancyResponse, ICompanyResponse, IVacancy, ICompany, ICompanyAll } from '@/models/jobs.model'
import { CompanyService } from '@/services/companies.service'
import { JobService } from '@/services/vacancies.service'
import { useRouter } from 'next/navigation'
import Container from '../organisms/Container/Container'
import Search from '../molecules/Search/Search'
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
    dataVacancy: IVacancyResponse
    dataCompany: ICompanyResponse
    dataAllCompany: ICompanyAll[]
    isActiveTabPag: "companies" | "vacancies"
}

export default function Admin({ dataVacancy, dataCompany, dataAllCompany, isActiveTabPag }: AdminTemplateProps) {
    const dataVacancies = dataVacancy
    const router = useRouter()
    const useCompanyService = new CompanyService()
    const useJobService = new JobService()
    const [isActiveTab, setIsActiveTab] = useState<'companies' | 'vacancies'>('vacancies')
    const [isVacancyModalOpen, setIsVacancyModalOpen] = useState<boolean>(false)
    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState<boolean>(false)

    const [vacancyForm, setVacancyForm] = useState({
        title: '',
        description: '',
        status: '',
        company: {} as ICompany | ICompanyAll,
    })

    const [companyForm, setCompanyForm] = useState({
        name: '',
        location: '',
        contact: '',
    })

    const [isEditMode, setIsEditMode] = useState(false);
    const [currentEditId, setCurrentEditId] = useState<number | string | null>(null);


    const handleVacancySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const vacancyData = {
                title: vacancyForm.title,
                description: vacancyForm.description,
                status: vacancyForm.status,
                companyId: vacancyForm.company.id!.toString(),
            };
            if (isEditMode && currentEditId) {
                // Editamos la vacante
                await useJobService.updateVacancy({ ...vacancyData, id: Number(currentEditId) });
            } else {
                // Creamos nueva vacante
                await useJobService.addVacancy(vacancyData);
            }
            setVacancyForm({ title: '', description: '', status: '', company: {} as ICompany | ICompanyAll });
            setIsVacancyModalOpen(false)
            setIsEditMode(false);
            router.refresh()
        } catch (error) {
            console.error('Error en añadir vacante:', error)
        }
    }

    const handleCompanySubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (isEditMode && currentEditId) {
                // Editamos la compañía
                await useCompanyService.updateCompany(currentEditId as string, companyForm);
            } else {
                // Creamos nueva compañía
                await useCompanyService.addCompany(companyForm);
            }

            // Reiniciamos el formulario y refrescamos la página.
            setCompanyForm({ name: '', location: '', contact: '' });
            setIsCompanyModalOpen(false);
            setIsEditMode(false); // Salimos del modo edición.
            router.refresh();
        } catch (error) {
            console.error('Error en añadir compañía:', error)
        }
    }

    const handleOpenModal = () => {
        if (isActiveTab === 'companies') {
            setIsCompanyModalOpen(true)
        } else {
            setIsVacancyModalOpen(true)
        }
    }

    const handleEditVacancy = (vacancy: IVacancy) => {
        setIsEditMode(true);
        setCurrentEditId(vacancy.id!);
        setVacancyForm({
            title: vacancy.title,
            description: vacancy.description,
            status: vacancy.status,
            company: vacancy.company || {} as ICompany | ICompanyAll,
        }); // Cargamos los datos en el formulario.
        setIsVacancyModalOpen(true); // Abrimos el modal.
    };

    const handleEditCompany = (company: ICompany) => {
        setIsEditMode(true);
        setCurrentEditId(company.id!);
        setCompanyForm(company); // Cargamos los datos en el formulario.
        setIsCompanyModalOpen(true); // Abrimos el modal.
    };

    // para filtar por compañía al seleccionarla en el formulario
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState('');

    const filteredCompanies = dataAllCompany.filter(company =>
        company.name.toLowerCase().includes(filter.toLowerCase())
    );

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
                <Search type={isActiveTabPag} />
                {/* <Box className={styles.searchBox}>
                    <FaSearch />
                    <Input type="text" name='search' placeholder="Buscar..." />
                </Box> */}
            </div>
            <Container
                items={isActiveTab === 'companies' ? dataCompany.content : dataVacancies.content}
                type={isActiveTab}
                openModalAdd={handleOpenModal}
                openModalEdit={(item) =>
                    isActiveTab === 'vacancies'
                        ? handleEditVacancy(item as IVacancy)
                        : handleEditCompany(item as ICompany)
                }
            />

            {/* Modal de Vacante */}
            <Modal
                isOpen={isVacancyModalOpen}
                onClose={() => { setIsVacancyModalOpen(false); setIsEditMode(false); setCurrentEditId(null); setVacancyForm({ title: '', description: '', status: '', company: {} as ICompany }); }}
                title={isEditMode ? "Editar Vacante" : "Agregar Vacante"}
            >
                <Form onSubmit={handleVacancySubmit}>
                    <Box className={styles.inputBox}>
                        <Label htmlFor="title">Título</Label>
                        <Input
                            type="text"
                            id='title'
                            name="title"
                            value={vacancyForm.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const { name, value } = e.target
                                setVacancyForm({
                                    ...vacancyForm,
                                    [name]: value
                                })
                            }
                            }
                            required
                        />
                    </Box>
                    <Box className={styles.textAreaBox}>
                        <Label htmlFor="description">Descripción</Label>
                        <TextArea
                            name="description"
                            id='description'
                            value={vacancyForm.description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setVacancyForm({
                                    ...vacancyForm,
                                    description: e.target.value
                                })
                            }}
                            required
                        />
                    </Box>
                    <Box className={styles.selectBox}>
                        <Label htmlFor="status">Estado</Label>
                        <Select
                            name="status"
                            id='status'
                            value={vacancyForm.status}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setVacancyForm({
                                ...vacancyForm,
                                status: e.target.value
                            })}
                            options={[
                                { value: 'ACTIVE', label: 'Abierta' },
                                { value: 'INACTIVE', label: 'Cerrada' }
                            ]}
                            placeholder="Seleccione un estado"
                        />
                    </Box>
                    <Box className={styles.selectBox}>
                        <Label htmlFor="company">Compañía</Label>
                        {/* <Select
                                name="company"
                                id='company'
                                value={vacancyForm.company?.id || ''}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const selectedCompany = dataCompany.content.find(c => c.id === (e.target.value));
                                    if (selectedCompany) {
                                      setVacancyForm({ ...vacancyForm, company: selectedCompany });
                                    }
                                  }}
                                options={dataCompany.content.map(company => ({
                                    value: company.id!.toString(),
                                    label: company.name
                                }))}
                                placeholder="Seleccione una compañía"
                            /> */}
                        {/* <input 
                            list="allcompany" 
                            id="company" 
                            name="company" 
                            value={vacancyForm.company?.id || ''} 
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                const selectedCompany = dataAllCompany.find(company => company.id === selectedId);
                                
                                setVacancyForm({
                                    ...vacancyForm,
                                    company: {
                                        id: selectedId,
                                        name: selectedCompany ? selectedCompany.name : ''
                                    }
                                });
                            }}
                            placeholder='Seleccione una compañía'
                        />

                        <datalist id="allcompany">
                            {dataAllCompany.map(company => (
                                <option key={company.id} value={company.id!.toString()}>
                                    {company.name}
                                </option>
                            ))}
                        </datalist> */}
                        <input
                            type="text"
                            value={vacancyForm.company?.name || ''}
                            onChange={(e) => {
                                setFilter(e.target.value);
                                setVacancyForm({ ...vacancyForm, company: { id: '', name: e.target.value } });
                            }}
                            onFocus={() => setIsOpen(true)}
                            onBlur={() => setTimeout(() => setIsOpen(false), 100)} // Para permitir seleccionar opciones
                            placeholder='Seleccione una compañía'
                            style={{ padding: '.5rem', border: '1px solid #6b7280' , borderRadius: '.375rem' }}
                        />
                        {isOpen && (
                            <ul style={{ border: '1px solid #ccc', maxHeight: '200px', overflowY: 'auto' }}>
                                {filteredCompanies.map(company => (
                                    <li key={company.id} onClick={() => {
                                        setVacancyForm({
                                            ...vacancyForm,
                                            company: { id: company.id, name: company.name }
                                        });
                                        setFilter(company.name);
                                        setIsOpen(false);
                                    }} 
                                    style={{ cursor: 'pointer'}}>
                                        {company.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Box>
                    <Button type="submit" variant="primary">
                        {isEditMode ? "Actualizar" : "Agregar"}
                    </Button>
                </Form>
            </Modal>

            {/* Modal de Compañía */}
            <Modal
                isOpen={isCompanyModalOpen}
                onClose={() => { setIsCompanyModalOpen(false); setIsEditMode(false); setCurrentEditId(null); setCompanyForm({ name: '', location: '', contact: '' }); }}
                title={isEditMode ? "Editar Compañía" : "Agregar Compañía"}
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
                        {isEditMode ? "Actualizar" : "Agregar"}
                    </Button>
                </Form>
            </Modal>
            <Pagination dataCompany={dataCompany} dataVacants={dataVacancies} type={isActiveTab} />
        </div>
    )
}
