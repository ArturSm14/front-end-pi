import * as React from "react"
import { AgendamentoService } from "../../service/AgendamentoService";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { AxiosResponse } from "axios";

function Consultas() {
  type Agendamento = {
    id : number;
    nomePaciente : String;
    medico : String;
    clinica : String;
    email : String;
    status : String;
    dataHoraAgendamento : String;
    dataCadastro : String;
  }

  const [date, setDate] = React.useState<Date>();
  const [agendamentos, setAgendamentos] = React.useState<any[]>([]);
  const agendamentoService = React.useMemo(() => new AgendamentoService(), []);
  const [carregouAgendamentos, setCarregouAgendamentos] = React.useState<boolean>(false);

  // Adicionado para suportar a atualização de um agendamento
  const [agendamentoAtual, setAgendamentoAtual] = React.useState<Agendamento | null>(null);

  React.useEffect(() =>{
    if(!carregouAgendamentos){
      agendamentoService.listarTodos()
          .then((response : AxiosResponse<any>) => {
            console.log(response.data);
            setAgendamentos(response.data);
            setCarregouAgendamentos(true)
          }).catch((error: any) => {
        console.log(error);
        setCarregouAgendamentos(true)
      })
    }
  }, [carregouAgendamentos])

  // Função para lidar com a atualização de um agendamento
  const handleUpdate = (agendamento: Agendamento) => {
    setAgendamentoAtual(agendamento);
  }

  // Função para lidar com a exclusão de um agendamento
  const handleDelete = (id: number) => {
    agendamentoService.deletar(id)
        .then(() => {
          setAgendamentos(agendamentos.filter((agendamento) => agendamento.id !== id));
        })
  }

  return (
      <div className="p-6 max-w-4x1 mx-auto space-y-4">
        <h1 className="text-4xl font-bold">Consultas</h1>

        <div className="flex items-center justify-between">
          <form className="flex items-center gap-2">
            <Input name="id" placeholder="ID da consulta"/>
            <Input name="name" placeholder="Nome do Paciente" className="w-auto"/>
            <Button variant={"destructive"} type="submit">Filtrar Resultados</Button>
          </form>
          <Dialog>
            <DialogTrigger asChild>
              <Button>{agendamentoAtual ? 'Atualizar Consulta' : 'Nova Consulta'}</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{agendamentoAtual ? 'Atualizar Consulta' : 'Nova Consulta'}</DialogTitle>
                <DialogDescription>{agendamentoAtual ? 'Atualizar uma consulta existente no sistema' : 'Criar uma nova consulta no sistema'}</DialogDescription>
              </DialogHeader>

              <form className="space-y-6">
                <div className="grid grid-cols-6 items-center text-right gap-3">
                  <Label htmlFor="name">Nome</Label>
                  <Input className="col-span-3" defaultValue={agendamentoAtual ? agendamentoAtual.nomePaciente : ''} />
                </div>

                <div className="grid grid-cols-6 items-center text-right gap-3">
                  <Label htmlFor="name">Medico</Label>
                  <Input className="col-span-3" defaultValue={agendamentoAtual ? agendamentoAtual.medico : ''} />
                </div>

                <div className="grid grid-cols-6 items-center text-right gap-3">
                  <Label htmlFor="name">Clínica</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Clinicas"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clinica Sim</SelectItem>
                      <SelectItem value="dark">Clinica Unifametro</SelectItem>
                      <SelectItem value="system">Unimed Clinica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-6 items-center text-right gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input className="col-span-3" defaultValue={agendamentoAtual ? agendamentoAtual.email : ''} />
                </div>

                <div className="grid grid-cols-6 items-center text-right gap-3">
                  <Label htmlFor="email">Data da Consulta</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                          variant={"outline"}
                          className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                          )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Selecione uma Data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <DialogFooter>
                  <Button type="button" variant={"outline"}>Cancelar</Button>
                  <Button type="submit">{agendamentoAtual ? 'Atualizar' : 'Salvar'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>

          </Dialog>

        </div>
        <div className="border rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableHead>ID</TableHead>
              <TableHead>Nome do Paciente</TableHead>
              <TableHead>Medico</TableHead>
              <TableHead>Clinica</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data e Hora da Consulta</TableHead>
              <TableHead>Data Cadastro</TableHead>
              <TableHead>Ações</TableHead> {/* Adicionado para suportar ações de atualização e exclusão */}
            </TableHeader>
            {agendamentos.map((agendamento : Agendamento) => {
              return(
                  <TableBody>
                    <TableRow key={agendamento.id}>
                      <TableCell>{agendamento.id}</TableCell>
                      <TableCell>{agendamento.nomePaciente}</TableCell>
                      <TableCell>{agendamento.medico}</TableCell>
                      <TableCell>{agendamento.clinica}</TableCell>
                      <TableCell>{agendamento.email}</TableCell>
                      <TableCell>{agendamento.status}</TableCell>
                      <TableCell>{agendamento.dataHoraAgendamento}</TableCell>
                      <TableCell>{agendamento.dataCadastro}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleUpdate(agendamento)}>Atualizar</Button>
                        <Button onClick={() => handleDelete(agendamento.id)}>Excluir</Button>
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

export default Consultas