import { ICompanyResponse, ICompany } from "@/models/jobs.model";
import { HttpClient } from "@/utils/client-http";

export class CompanyService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async getCompanies(page: number, size: number): Promise<ICompanyResponse> {
        try {
            const response: ICompanyResponse = await this.httpClient.get<ICompanyResponse>(`company?page=${page}&size=${size}`);
            // console.log('Companies response:', response);
            return response;
        } catch (error) {
            console.error('Error getting companies:', error);
            throw error;
        }
    }
    async getCompany(id: string): Promise<ICompany> {
        try {
            const response: ICompany = await this.httpClient.get<ICompany>(`company/${id}`);
            // console.log('Company response:', response);
            return response;
        } catch (error) {
            console.error('Error getting company:', error);
            throw error;
        }
    }
    
    async addCompany(company: ICompany): Promise<ICompany> {
        try {
            const response: ICompany = await this.httpClient.post<ICompany, ICompany>('company', company);
            // console.log('Company added response:', response);
            return response;
        } catch (error) {
            console.error('Error adding company:', error);
            throw error;
        }
    }
    
    async updateCompany(id: string, company: ICompany): Promise<ICompany> {
        try {
            const response: ICompany = await this.httpClient.put<ICompany, ICompany>(`company/${id}`, company);
            // console.log('Company updated response:', response);
            return response;
        } catch (error) {
            console.error('Error updating company:', error);
            throw error;
        }
    }
    
    async deleteCompany(id: string): Promise<void> {
        try {
            const response = await this.httpClient.delete<void>(`company/${id}`);
            // console.log('Company deleted with id:', id);
            if (response === null) {
                console.log(`Company with id ${id} deleted successfully.`);
              }
        } catch (error) {
            console.error('Error deleting company:', error);
            throw error;
        }
    }
}