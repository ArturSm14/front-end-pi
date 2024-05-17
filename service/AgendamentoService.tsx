import { BaseService } from "./BaseService";


export class AgendamentoService extends BaseService{
    constructor(){
        super("/agendamento");
    }
}