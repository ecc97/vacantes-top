import { ICompanyResponse, ICompany } from "@/models/jobs.model";
import { HttpClient } from "@/utils/client-http";

export class CompanyService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async getCompanies(): Promise<ICompany[]> {
        try {
            const response: ICompanyResponse = await this.httpClient.get<ICompanyResponse>('company');
            return response.content;
        } catch (error) {
            console.error('Error getting companies:', error);
            throw error;
        }
    }
}