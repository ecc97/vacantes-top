import { IVacancyResponse, IVacancy, ICompany } from "@/models/jobs.model";
import { HttpClient } from "@/utils/client-http";

export class JobService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async getVacancies(page: number, size: number): Promise<IVacancyResponse> {
        try {
            const response: IVacancyResponse = await this.httpClient.get<IVacancyResponse>(`vacants?page=${page}&size=${size}`);
            // console.log('Vacancies response:', response);

            return response;
            // const vacanciesResponse = await this.httpClient.get<IVacancyResponse>('vacancies');
            // return vacanciesResponse.content;
        } catch (error) {
            console.error('Error getting vacancies:', error);
            throw error       
        }
    }

    async addVacancy(vacancy: IVacancy): Promise<IVacancy>{
        try {
            const response: IVacancy = await this.httpClient.post<IVacancy, IVacancy>('vacants', vacancy);
            return response;
        } catch (error) {
            console.error('Error adding vacancy:', error);
            throw error;
        }
    }
    
    async updateVacancy(vacancy: IVacancy): Promise<IVacancy> {
        try {
            const response: IVacancy = await this.httpClient.put<IVacancy, IVacancy>(`vacants/${String(vacancy.id)}`, vacancy);
            return response;
        } catch (error) {
            console.error('Error updating vacancy:', error);
            throw error;
        }
    }
    
    async deleteVacancy(id: number): Promise<void> {
        try {
            const response = await this.httpClient.delete<void>(`vacants/${String(id)}`);
            return response
        } catch (error) {
            console.error('Error deleting vacancy:', error);
            throw error;
        }
    }
}