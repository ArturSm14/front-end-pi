import { BaseService } from "./BaseService";


export class MedicoService extends BaseService{
    constructor(){
        super("/medicos");
    }
}