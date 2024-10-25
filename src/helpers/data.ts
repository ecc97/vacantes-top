export interface Company {
    id: number;
    name: string;
    location: string;
    contact: string;
}

export interface Vacancy {
    id: number;
    title: string;
    status: string;
    company: string;
}

export const companies: Company[] = [
    {
        id: 1,
        name: 'TechCorp',
        location: 'Ciudad de México',
        contact: '555-0001'
    },
    {
        id: 2,
        name: 'DesignHub',
        location: 'Guadalajara',
        contact: '555-0002'
    },
    {
        id: 3,
        name: 'Innovatech',
        location: 'Monterrey',
        contact: '555-0003'
    },
    {
        id: 4,
        name: 'Creative Minds',
        location: 'Puebla',
        contact: '555-0004'
    },
    {
        id: 5,
        name: 'Digital Solutions',
        location: 'Querétaro',
        contact: '555-0005'
    },
];

export const vacancies: Vacancy[] = [
    {
        id: 1,
        title: 'Desarrollador Frontend',
        status: 'OPEN',
        company: companies[0].name
    },
    {
        id: 2,
        title: 'Diseñador UX',
        status: 'OPEN',
        company: companies[1].name
    },
    {
        id: 3,
        title: 'Ingeniero de Software',
        status: 'OPEN',
        company: companies[2].name
    },
    {
        id: 4,
        title: 'Gerente de Proyecto',
        status: 'OPEN',
        company: companies[3].name
    },
    {
        id: 5,
        title: 'Desarrollador Backend',
        status: 'OPEN',
        company: companies[4].name
    },
];
