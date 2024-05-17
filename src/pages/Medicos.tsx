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
                <Button>Novo Medico</Button>
              </DialogTrigger>
              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo Medico</DialogTitle>
                  <DialogDescription>Cadastrar um novo medico no sistema</DialogDescription>
                </DialogHeader>

                <form className="space-y-6">
                  <div className="grid grid-cols-6 items-center text-right gap-3">
                    <Label htmlFor="name">Nome</Label>
                    <Input className="col-span-3" />
                  </div>

                  <DialogFooter>
                    <Button type="button" variant={"outline"}>Cancelar</Button>
                    <Button type="submit">Salvar</Button>
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
            </TableHeader>
        {medicos.map((medico : Medico) =>{
          return(
              <TableBody>
                <TableRow>
                  <TableCell>{medico.id}</TableCell>
                  <TableCell>{medico.nomeMedico}</TableCell>
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