import { IVacancyResponse, IVacancy, ICompany } from "@/models/jobs.model";
import { HttpClient } from "@/utils/client-http";

export class JobService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async getVacancies(): Promise<IVacancy[]> {
        try {
            const response: IVacancyResponse = await this.httpClient.get<IVacancyResponse>('vacants');
            return response.content;
            // const vacanciesResponse = await this.httpClient.get<IVacancyResponse>('vacancies');
            // return vacanciesResponse.content;
        } catch (error) {
            console.error('Error getting vacancies:', error);
            throw error       
        }
    }

    async getCompanies(): Promise<ICompany[]> {
        try {
            const response: ICompany[] = await this.httpClient.get<ICompany[]>('company');
            return response;
        } catch (error) {
            console.error('Error getting companies:', error);
            throw error;
        }
    }
}