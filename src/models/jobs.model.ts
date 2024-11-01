// Interfaces base para paginación
interface IBasePaginatedResponse {
    pageable: IPageable
    totalPages: number
    totalElements: number
    last: boolean
    numberOfElements: number
    size: number
    number: number
    sort: ISort
    first: boolean
    empty: boolean
}

export interface IPageable {
    pageNumber: number
    pageSize: number
    sort: ISort
    offset: number
    paged: boolean
    unpaged: boolean
}

export interface ISort {
    sorted: boolean
    unsorted: boolean
    empty: boolean
}

// Interfaces para Vacantes
export interface IVacancyResponse extends IBasePaginatedResponse {
    content: IVacancy[]
}

export interface IVacancy {
    id?: number
    title: string
    description: string
    status: string
    company?: ICompany
}

// Interfaces para Compañías
export interface ICompanyResponse extends IBasePaginatedResponse {
    content: ICompany[]
}

export interface ICompany {
    id?: string
    name: string
    location: string
    contact: string
}

export interface ICompanyAll {
    id:       string;
    name:     string;
    location?: string;
    contact?:  string;
}