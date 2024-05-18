import { BaseService } from "./BaseService";
import axios from 'axios';

export class MedicoService extends BaseService{
    constructor(){
        super("/medicos");
    }

    deletar(id: number) {
        return axios.delete(`${this.url}/${id}`);
    }
}