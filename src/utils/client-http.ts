const urlApi: string = 'http://192.168.88.153/api/v1'

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
            const errorData = await response.json()
            throw new Error(`HTTP error! status: ${response.status}, error: ${errorData}` || "Ocurrió un error en la petición");
        }
        return await response.json();   
    }

    async get<T>(url: string): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: 'GET',
            cache: 'no-store'
        });

        return this.handleResponse(response);
    }

}