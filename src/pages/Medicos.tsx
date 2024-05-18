import * as React from "react"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MedicoService } from "../../service/MedicoService";
import { AxiosResponse } from "axios"
import { Label } from "@/components/ui/label"

function Medicos() {

    type Medico = {
        id : number;
        nomeMedico: string;
    }

    const [medicos, setMedicos] = React.useState([]);
    const medicoService = React.useMemo(() => new MedicoService(), []);
    const [carregouAgendamentos, setCarregouAgendamentos] = React.useState<boolean>(false);

    const [medicoAtual, setMedicoAtual] = React.useState<Medico | null>(null);

    React.useEffect(() =>{
        if(!carregouAgendamentos){
            medicoService.listarTodos()
                .then((response : AxiosResponse<any>) =>{
                    console.log(response.data);
                    setMedicos(response.data);
                    setCarregouAgendamentos(true);
                }).catch((error: any) => {
                console.log(error);
                setCarregouAgendamentos(true)
            })
        }
    }, [carregouAgendamentos])

    const handleUpdate = (medico: Medico) => {
        setMedicoAtual(medico);
    }

    const handleDelete = (id: number) => {
        medicoService.deletar(id)
            .then(() => {
                setMedicos(medicos.filter((medico : Medico) : boolean => medico.id !== id));
            })
    }

    return (
        <div className="p-6 max-w-4x1 mx-auto space-y-4">
            <h1 className="text-4xl font-bold">Medicos</h1>

            <div className="flex items-center justify-between">
                <form className="flex items-center gap-2">
                    <Input name="id" placeholder="ID do Medico"/>
                    <Input name="name" placeholder="Nome do Medico" className="w-auto"/>
                    <Button variant={"destructive"} type="submit">Filtrar Resultados</Button>
                </form>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>{medicoAtual ? 'Atualizar Medico' : 'Novo Medico'}</Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{medicoAtual ? 'Atualizar Medico' : 'Novo Medico'}</DialogTitle>
                            <DialogDescription>{medicoAtual ? 'Atualizar um medico existente no sistema' : 'Cadastrar um novo medico no sistema'}</DialogDescription>
                        </DialogHeader>

                        <form className="space-y-6">
                            <div className="grid grid-cols-6 items-center text-right gap-3">
                                <Label htmlFor="name">Nome</Label>
                                <Input className="col-span-3" defaultValue={medicoAtual ? medicoAtual.nomeMedico : ''} />
                            </div>

                            <DialogFooter>
                                <Button type="button" variant={"outline"}>Cancelar</Button>
                                <Button type="submit">{medicoAtual ? 'Atualizar' : 'Salvar'}</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

            </div>
            <div className="border rounded-lg p-2">
                <Table>
                    <TableHeader>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome do Medico</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableHeader>
                    {medicos.map((medico : Medico) =>{
                        return(
                            <TableBody>
                                <TableRow>
                                    <TableCell>{medico.id}</TableCell>
                                    <TableCell>{medico.nomeMedico}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleUpdate(medico)}>Atualizar</Button>
                                        <Button onClick={() => handleDelete(medico.id)}>Excluir</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    })}
                </Table>
            </div>
        </div>
    )
}

export default Medicos