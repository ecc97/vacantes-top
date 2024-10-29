const urlApi: string = 'https://vacantsbackendgates-production.up.railway.app/api/v1'

export class HttpClient {
    private baseUrl: string

    constructor(url?: string) {
        this.baseUrl = url || urlApi
    }

    private async getHeader(){ 
        return {
            'Content-Type': 'application/json',
        }
    }

    private async handleResponse(response: Response){
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error en la respuesta:', errorData); 
            throw new Error(`HTTP error! status: ${response.status}, error: ${JSON.stringify(errorData)}`);
        }
        if (response.status === 204) return null;
        return await response.json();   
    }

    async get<T>(url: string): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: 'GET',
            cache: 'no-cache',
        });

        return this.handleResponse(response);
    }
    async post<T,B>(url: string, body: B): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(body),
        });
        console.log(response);
        return this.handleResponse(response);
    }
    async put<T, B>(url: string, body: B): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: 'PUT',
            body: JSON.stringify(body),
        });
        return this.handleResponse(response);
    }
    async delete<T>(url: string): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: 'DELETE',
        });
        return this.handleResponse(response);
    }

}