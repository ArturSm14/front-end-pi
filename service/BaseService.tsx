import axios, { AxiosResponse } from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export class BaseService{

    url : string;

    constructor(url: string){
        this.url = url;
    }
    
    listarTodos(): Promise<AxiosResponse<any>> {
        return axiosInstance.get(this.url);
    }

    buscarPorId(id : number) {
        return axiosInstance.get(this.url);
    }

    inserir(objeto : any) {
        return axiosInstance.post(this.url, objeto);
    }

    alterar(objeto : any) {
        return axiosInstance.put(this.url,objeto);
    }

    excluir( id : number) {
        return axiosInstance.delete(this.url + "/" + id);
    }
}