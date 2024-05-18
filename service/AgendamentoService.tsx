import {axiosInstance, BaseService} from "./BaseService";


export class AgendamentoService extends BaseService{
    deletar(id: number) {
        return axiosInstance.delete(`${this.url}/${id}`);
    }
    constructor(){
        super("/agendamento");
    }
}